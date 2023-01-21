---
id: docker-use
title: Docker 使用
---
## 使用镜像

### 获取镜像

```shell
docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]
```

具体的选项可以通过 `docker pull --help` 命令看到，这里我们说一下镜像名称的格式。

- Docker 镜像仓库地址：地址的格式一般是 `<域名/IP>[:端口号]`。默认地址是 Docker Hub(`docker.io`)。
- 仓库名：如之前所说，这里的仓库名是两段式名称，即 `<用户名>/<软件名>`。对于 Docker Hub，如果不给出用户名，则默认为 `library`，也就是官方镜像。

### 运行

```shell
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

举个例子：

```shell
docker run -it --rm ubuntu:18.04 bash
```

`docker run` 就是运行容器的命令，具体格式我们会在 [容器](#使用容器) 一节进行详细讲解，我们这里简要的说明一下上面用到的参数。

- `-it`：这是两个参数，一个是 `-i`：交互式操作，一个是 `-t` 终端。我们这里打算进入 `bash` 执行一些命令并查看返回结果，因此我们需要交互式终端。

- `--rm`：这个参数是说容器退出后随之将其删除。默认情况下，为了排障需求，退出的容器并不会立即删除，除非手动 `docker rm`。我们这里只是随便执行个命令，看看结果，不需要排障和保留结果，因此使用 `--rm` 可以避免浪费空间。

- `ubuntu:18.04`：这是指用 `ubuntu:18.04` 镜像为基础来启动容器。

- `bash`：放在镜像名后的是 **命令**，这里我们希望有个交互式 Shell，因此用的是 `bash`。

进入容器后，我们可以在 Shell 下操作，执行任何所需的命令。这里，我们执行了 `cat /etc/os-release`，这是 Linux 常用的查看当前系统版本的命令，从返回的结果可以看到容器内是 `Ubuntu 18.04.1 LTS` 系统。

最后我们通过 `exit` 退出了这个容器。

### 查看镜像

```shell
docker image ls
```

:::tip
通过 `docker system df` 命令来便捷的查看镜像、容器、数据卷所占用的空间。
:::

下面的命令会直接列出镜像结果，并且只包含镜像ID和仓库名

```shell
docker image ls --format "{{.ID}}: {{.Repository}}"
```

或者打算以表格等距显示，并且有标题行，和默认一样，不过自己定义列

```shell
docker image ls --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"
```

### 删除镜像

```shell
docker image rm [选项] <镜像1> [<镜像2> ...]
```

其中，`<镜像>` 可以是 `镜像短 ID`、`镜像长 ID`、`镜像名` 或者 `镜像摘要`。我们可以用镜像的完整 ID，也称为 `长 ID`，来删除镜像。使用脚本的时候可能会用长 ID，但是人工输入就太累了，所以更多的时候是用 `短 ID` 来删除镜像。`docker image ls` 默认列出的就已经是短 ID 了，一般取前3个字符以上，只要足够区分于别的镜像就可以了。

:::info

删除行为分为两类，一类是 `Untagged`，另一类是 `Deleted`。镜像的唯一标识是其 ID 和摘要，而一个镜像可以有多个标签。因此当我们使用上面命令删除镜像的时候，实际上是在要求删除某个标签的镜像。所以首先需要做的是将满足我们要求的所有镜像标签都取消。因为一个镜像可以对应多个标签，因此当我们删除了所指定的标签后，可能还有别的标签指向了这个镜像，如果是这种情况，那么 `Delete` 行为就不会发生。所以并非所有的 `docker image rm` 都会产生删除镜像的行为，有可能仅仅是取消了某个标签而已。

:::

删除无用的镜像

```shell
docker image prune -a -f 
```

配合`docker image ls` 一起使用

```shell
$ docker image rm $(docker image ls -q -f)
```

### 构建镜像

Docker 使用`Dockerfile` 来定制构建镜像（后面详细讲解），在 `Dockerfile` 文件所在目录执行

```shell
docker build [选项] <上下文路径/URL/->
# docker build -t nginx:v3 .
```

## Dockerfile

镜像只是一个虚拟的概念，其实际体现并非由一个文件组成，而是由一组文件系统组成，或者说，由多层文件系统联合组成。镜像构建时，会一层层构建，前一层是后一层的基础。每一层构建完就不会再发生改变，后一层上的任何改变只发生在自己这一层。构建镜像需要`Dockerfile` 

### FROM

一个 `Dockerfile` 中 `FROM` 是必备的指令，并且必须是第一条指令。`FROM` 就是指定 **基础镜像**

### COPY

```dockerfile
COPY [--chown=<user>:<group>] <源路径>... <目标路径>
```

`COPY` 指令将从构建上下文目录中 `<源路径>` 的文件/目录复制到新的一层的镜像内的 `<目标路径>` 位置。比如：

```dockerfile
COPY package.json /usr/src/app/
```

`<源路径>` 可以是多个，甚至可以是通配符，其通配符规则要满足 Go 的 [`filepath.Match`](https://golang.org/pkg/path/filepath/#Match) 规则，如：

```dockerfile
COPY hom* /mydir/
COPY hom?.txt /mydir/
```
`<目标路径>` 可以是容器内的绝对路径，也可以是相对于工作目录的相对路径（工作目录可以用 `WORKDIR` 指令来指定）。目标路径不需要事先创建，如果目录不存在会在复制文件前先行创建缺失目录。
此外，还需要注意一点，使用 `COPY` 指令，源文件的各种元数据都会保留。比如读、写、执行权限、文件变更时间等。这个特性对于镜像定制很有用。特别是构建相关文件都在使用 Git 进行管理的时候。
在使用该指令的时候还可以加上 `--chown=<user>:<group>` 选项来改变文件的所属用户及所属组。
```dockerfile
COPY --chown=55:mygroup files* /mydir/
COPY --chown=bin files* /mydir/
COPY --chown=1 files* /mydir/
COPY --chown=10:11 files* /mydir/
```

如果源路径为文件夹，复制的时候不是直接复制该文件夹，而是将文件夹中的内容复制到目标路径。

### ADD

`ADD` 指令和 `COPY` 的格式和性质基本一致。但是在 `COPY` 基础上增加了一些功能。如果 `<源路径>` 为一个 `tar` 压缩文件的话，压缩格式为 `gzip`, `bzip2` 以及 `xz` 的情况下，`ADD` 指令将会自动解压缩这个压缩文件到 `<目标路径>` 去。

在 Docker 官方的 [Dockerfile 最佳实践文档](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) 中要求，尽可能的使用 `COPY`，因为 `COPY` 的语义很明确，就是复制文件而已，而 `ADD` 则包含了更复杂的功能，其行为也不一定很清晰。最适合使用 `ADD` 的场合，就是所提及的需要自动解压缩的场合。

另外需要注意的是，`ADD` 指令会令镜像构建缓存失效，从而可能会令镜像构建变得比较缓慢。因此在 `COPY` 和 `ADD` 指令中选择的时候，可以遵循这样的原则，所有的文件复制均使用 `COPY` 指令，仅在需要自动解压缩的场合使用 `ADD`。

### RUN

```dockerfile
RUN <命令>
```
Dockerfile 中每一个指令都会建立一层，`RUN` 也不例外。每一个 `RUN` 的行为，就和刚才我们手工建立镜像的过程一样：新建立一层，在其上执行这些命令，执行结束后，`commit` 这一层的修改，构成新的镜像。
:::tip
Union FS 是有最大层数限制的，比如 AUFS，曾经是最大不得超过 42 层，现在是不得超过 127 层。
:::

### CMD

```dockerfile
#shell 格式
CMD <命令>
#exec 格式
CMD ["可执行文件", "参数1", "参数2"...]
```

在指令格式上，一般推荐使用 `exec` 格式，这类格式在解析时会被解析为 JSON 数组，因此一定要使用双引号 `"`，而不要使用单引号。

如果使用 `shell` 格式的话，实际的命令会被包装为 `sh -c` 的参数的形式进行执行。比如：

CMD echo $HOME

在实际执行中，会将其变更为：

```dockerfile
CMD [ "sh", "-c", "echo $HOME" ]
```
这就是为什么我们可以使用环境变量的原因，因为这些环境变量会被 shell 进行解析处理。

### ENTRYPOINT

`ENTRYPOINT` 的格式和 `RUN` 指令格式一样，分为 `exec` 格式和 `shell` 格式。`ENTRYPOINT` 的目的和 `CMD` 一样，都是在指定容器启动程序及参数。不同于`CMD` ，存在 `ENTRYPOINT` 后，`CMD` 的内容将会作为参数传给 `ENTRYPOINT`

### ENV

```dockerfile
ENV <key> <value>
ENV <key1>=<value1> <key2>=<value2>...
```

### ARG

```dockerfile
ARG <参数名>[=<默认值>]
```

构建参数和 `ENV` 的效果一样，都是设置环境变量。所不同的是，`ARG` 所设置的构建环境的环境变量，在将来容器运行时是不会存在这些环境变量的。但是不要因此就使用 `ARG` 保存密码之类的信息，因为 `docker history` 还是可以看到所有值的。

### VOLUME

```dockerfile
VOLUME ["<路径1>", "<路径2>"...]
VOLUME <路径>
```

容器运行时应该尽量保持容器存储层不发生写操作，对于数据库类需要保存动态数据的应用，其数据库文件应该保存于卷(volume)中，后面的章节我们会进一步介绍 Docker 卷的概念。为了防止运行时用户忘记将动态文件所保存目录挂载为卷，在 `Dockerfile` 中，我们可以事先指定某些目录挂载为匿名卷，这样在运行时如果用户不指定挂载，其应用也可以正常运行，不会向容器存储层写入大量数据。
```dockerfile
VOLUME /data
```

这里的 `/data` 目录就会在容器运行时自动挂载为匿名卷，任何向 `/data` 中写入的信息都不会记录进容器存储层，从而保证了容器存储层的无状态化。当然，运行容器时可以覆盖这个挂载设置。比如：
```dockerfile
docker run -d -v mydata:/data xxxx
```

在这行命令中，就使用了 `mydata` 这个命名卷挂载到了 `/data` 这个位置，替代了 `Dockerfile` 中定义的匿名卷的挂载配置。

### EXPOSE

`EXPOSE` 指令是声明容器运行时提供服务的端口，这只是一个声明，在容器运行时并不会因为这个声明应用就会开启这个端口的服务。在 Dockerfile 中写入这样的声明有两个好处，一个是帮助镜像使用者理解这个镜像服务的守护端口，以方便配置映射；另一个用处则是在运行时使用随机端口映射时，也就是 `docker run -P` 时，会自动随机映射 `EXPOSE` 的端口。

### WORKDIR

```dockerfile
WORKDIR <工作目录路径>
```

使用 `WORKDIR` 指令可以来指定工作目录（或者称为当前目录），以后各层的当前目录就被改为指定的目录，如该目录不存在，`WORKDIR` 会帮你建立目录。

### USER

```dockerfile
USER <用户名>[:<用户组>]
```

`USER` 指令和 `WORKDIR` 相似，都是改变环境状态并影响以后的层。`WORKDIR` 是改变工作目录，`USER` 则是改变之后层的执行 `RUN`, `CMD` 以及 `ENTRYPOINT` 这类命令的身份。

### HEALTHCHECK

```dockerfile
HEALTHCHECK [选项] CMD <命令>：设置检查容器健康状况的命令
HEALTHCHECK NONE：如果基础镜像有健康检查指令，使用这行可以屏蔽掉其健康检查指令
```

在 `HEALTHCHECK [选项] CMD` 后面的命令，格式和 `ENTRYPOINT` 一样，分为 `shell` 格式，和 `exec` 格式。命令的返回值决定了该次健康检查的成功与否：`0`：成功；`1`：失败；`2`：保留，不要使用这个值。

假设我们有个镜像是个最简单的 Web 服务，我们希望增加健康检查来判断其 Web 服务是否在正常工作，我们可以用 `curl` 来帮助判断，其 `Dockerfile` 的 `HEALTHCHECK` 可以这么写：

```dockerfile
FROM nginx
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
HEALTHCHECK --interval=5s --timeout=3s \
  CMD curl -fs http://localhost/ || exit 1
```

## 使用容器

### 启动容器

```dockerfile
#	新建并启动
docker run
# 启动已终止容器
docker start
```

### 守护态运行

让 Docker 在后台运行而不是直接把执行命令的结果输出在当前宿主机下。此时，可以通过添加 `-d` 参数来实现。后台运行后，获取容器的输出信息，可以通过 `docker container logs` 命令。

```dockerfile
docker container logs [container ID or NAMES]
```

### 终止

```dockerfile
docker container stop [container ID or NAMES]
```

### 进入容器

```dockerfile
docker attach [container ID or NAMES] 
docker exec -it [container ID or NAMES] bash
```

`attach`  进入后，执行`exit`，会导致容器的停止。而`exec` 不会，所有平常推荐使用`exec` 。

### 删除

```dockerfile
docker rm [container ID or NAMES]
```

如果要删除一个运行中的容器，可以添加 `-f` 参数。

```dockerfile
docker container prune
```

可以清理掉所有处于终止状态的容器。