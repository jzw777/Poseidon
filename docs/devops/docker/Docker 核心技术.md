---
id: docker-core
title: Docker 核心技术
---
## Docker 架构

很多人说 Docker 是简单的 Server-Client 的架构，其实并不一定准确。Docker 的架构比较复杂，并不是纯粹的只有 Server 和 Client。下图是 Docker 架构的一个详细的图。几个主要的组成部分有：

- Docker Client；
- Docker Daemon；
- Docker Registry。

![图片描述](https://img1.sycdn.imooc.com/5f1684e100017c4e08700422.png)

#### Docker Client

我们安装完 Docker 包之后，直接使用敲命令：`docker` ，界面是有提示的，这个 docker 就是 docker client。

docker client 都是用来和 docker daemon 交互的。

#### Docker Daemon

docker daemon 是一个 docker 后台运行的守护进程，我们的 docker client 的命令就是和 Docker Daemon 来进行交互的。

Docker daemon 启动可以使用 service 或者 systemctl 操作.

```bash
service docker start
systemctl start docker.service
```

然后我们使用 ps 命令就能看到 docker daemon 进程了。

```bash
$ ps aux | grep dockerd
root     10214  1.2  0.0 1014252 23768 ?       Ssl  00:58   0:00 /usr/bin/dockerd-current --add-runtime docker-runc=/usr/libexec/docker/docker-runc-current --default-runtime=docker-runc --exec-opt native.cgroupdriver=systemd --userland-proxy-path=/usr/libexec/docker/docker-proxy-current --init-path=/usr/libexec/docker/docker-init-current --seccomp-profile=/etc/docker/seccomp.json --selinux-enabled --log-driver=journald --signature-verification=false --storage-driver overlay2
```

然后我们查看和 client 交互的 socket 文件也存在了。

```bash
$ll /var/run/docker.sock
srw-rw---- 1 root root 0 Dec  3 00:58 /var/run/docker.sock
```

#### Docker Registry

Registry 中文一般翻译为**注册中心**，是用来**存储 Docker 镜像**的地方。Docker Registry 有多种不同的表现，比如 Docker Hub 就是一个公开的注册中心，同时各大云厂商也提供了自己的注册中心，比如阿里云、腾讯云等，甚至你可以搭建自己的私有注册中心。

Docker 默认使用 Docker Hub，比如我们执行 `docker pull <image-name>` 时，Docker 默认去 Docker Hub 中寻找名字为 image-name 的镜像。如果使用自己的 Registry 需要进行单独的配置。

#### Docker Images

Image 一般中文称之为**镜像**。官方对镜像的定义比较复杂，我一般使用类比的方式来理解镜像。**镜像可以理解成计算机系统中的程序，也就是静态的位于磁盘上面可以通过特定方式执行的文件**（程序是操作系统可以识别的特定的二进制文件，Docker 镜像是可以被 Docker Daemon 识别并执行的特定文件）。

镜像和普通的可执行文件的区别在于**镜像是分层架构，每个镜像一般都依赖于一个基础镜像**。最基本的镜像叫 scratch 镜像。当然我们也可以构建自己的镜像，然后发布到镜像中心别人就也可以使用了。

Docker 镜像的构建是通过一个 DSL 语言来编写的，叫 Dockerfile。

#### Docker Container

Container 也就是容器。Docker 官方对容器的定义非常的优雅。

> A container is a runnable instance of an image.

翻译过来就是：

> 容器是镜像的运行实例。

这个定义和进程的定义非常类似：**进程是程序的运行实例**。这样我们就**可以将镜像类比为程序，容器类比为进程**，这样就更好理解了。

我们可以使用 Docker 的 CLI 命令或者 API 来创建、启动、停止和删除容器等操作。同时对于运行状态的容器我们可以登录进去，类似 ssh 命令等操作。

容器默认是和其他容器以及其宿主机隔离开的。具体的隔离策略可以进行自定义设置。

