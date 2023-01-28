---
id: docker-install
title: Docker 安装与使用
---

:::note

​	基于Linux的安装，因CentOS 停止维护，推荐使用AlmaLinux。

:::

:::caution
​	切勿在没有配置 Docker YUM 源的情况下直接使用 yum 命令安装 Docker.
:::

### 卸载旧版本

旧版本的 Docker 称为 `docker` 或者 `docker-engine`，使用以下命令卸载旧版本：

```shell
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
```

### 使用 yum 安装

执行以下命令安装依赖包：
```shell
 sudo yum install -y yum-utils
```
鉴于国内网络问题，强烈建议使用国内源，官方源请在注释中查看。

执行下面的命令添加 `yum` 软件源：
```sh
sudo yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
sudo sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo
# 官方源
# $ sudo yum-config-manager \
#     --add-repo \
#     https://download.docker.com/linux/centos/docker-ce.repo
```

如果需要测试版本的 Docker 请执行以下命令：

```sh
 sudo yum-config-manager --enable docker-ce-test
```

### 安装 Docker

更新 `yum` 软件源缓存，并安装 `docker-ce`。

```sh
 sudo yum install docker-ce docker-ce-cli containerd.io
```

### 修改配置文件

Docker的配置文件路径 `/etc/docker/daemon.json`

```json
{
  "registry-mirrors": ["https://hub-mirror.c.163.com","https://bmtrgdvx.mirror.aliyuncs.com","https://y9lmbx5j.mirror.aliyuncs.com"],
  "insecure-registries":["https://harbor.zhangsan.com"],
  "data-root": "/data/docker",
  "log-driver":"json-file",
  "log-opts":{
        "max-size" :"50m",
        "max-file":"3"
    }
}
```
:::tip

 Docker 数据默认存储位置 `/var/lib/docker`

:::

上面三项分别是配置的镜像加速，私库，Docker的数据位置。随着使用，Docker 会占用很大的存储空间，有必要修改 Docker的目录，比如指向一块扩展磁盘上。
执行如下命令使配置生效

```sh
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 启动 Docker

```shell
sudo systemctl enable docker
sudo systemctl start docker
```

### 建立 docker 用户组

默认情况下，`docker` 命令会使用 [Unix socket](https://en.wikipedia.org/wiki/Unix_domain_socket) 与 Docker 引擎通讯。而只有 `root` 用户和 `docker` 组的用户才可以访问 Docker 引擎的 Unix socket。出于安全考虑，一般 Linux 系统上不会直接使用 `root` 用户。因此，更好地做法是将需要使用 `docker` 的用户加入 `docker` 用户组。

建立 `docker` 组：

```shell
sudo groupadd docker
```
将当前用户加入 `docker` 组：
```sh
sudo usermod -aG docker $USER
```
### 开启TCP连接

```sh
vi /lib/systemd/system/docker.service
#ExecStart=/usr/bin/dockerd -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375

sudo systemctl daemon-reload
sudo systemctl restart docker
```

-H代表指定docker的监听方式，这里是socket文件位置，也就是socket方式，2375就是tcp端口。

### 安装管理工具portainer

```sh
docker pull 6053537/portainer-ce  #直接用汉化版镜像
docker volume create portainer_data
docker run -d --name portainer -p 9000:9000 --restart=always \
     -v /var/run/docker.sock:/var/run/docker.sock \
     -v portainer_data:/data  6053537/portainer-ce
```



### 参考文档

- [Docker 官方 CentOS 安装文档](https://docs.docker.com/install/linux/docker-ce/centos/)。