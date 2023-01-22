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

### Docker Client

我们安装完 Docker 包之后，直接使用敲命令：`docker` ，界面是有提示的，这个 docker 就是 docker client。

docker client 都是用来和 docker daemon 交互的。

### Docker Daemon

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

### Docker Registry

Registry 中文一般翻译为**注册中心**，是用来**存储 Docker 镜像**的地方。Docker Registry 有多种不同的表现，比如 Docker Hub 就是一个公开的注册中心，同时各大云厂商也提供了自己的注册中心，比如阿里云、腾讯云等，甚至你可以搭建自己的私有注册中心。

Docker 默认使用 Docker Hub，比如我们执行 `docker pull <image-name>` 时，Docker 默认去 Docker Hub 中寻找名字为 image-name 的镜像。如果使用自己的 Registry 需要进行单独的配置。

### Docker Images

Image 一般中文称之为**镜像**。官方对镜像的定义比较复杂，我一般使用类比的方式来理解镜像。**镜像可以理解成计算机系统中的程序，也就是静态的位于磁盘上面可以通过特定方式执行的文件**（程序是操作系统可以识别的特定的二进制文件，Docker 镜像是可以被 Docker Daemon 识别并执行的特定文件）。

镜像和普通的可执行文件的区别在于**镜像是分层架构，每个镜像一般都依赖于一个基础镜像**。最基本的镜像叫 scratch 镜像。当然我们也可以构建自己的镜像，然后发布到镜像中心别人就也可以使用了。

Docker 镜像的构建是通过一个 DSL 语言来编写的，叫 Dockerfile。

### Docker Container

Container 也就是容器。Docker 官方对容器的定义非常的优雅。

> A container is a runnable instance of an image.

翻译过来就是：

> 容器是镜像的运行实例。

这个定义和进程的定义非常类似：**进程是程序的运行实例**。这样我们就**可以将镜像类比为程序，容器类比为进程**，这样就更好理解了。

我们可以使用 Docker 的 CLI 命令或者 API 来创建、启动、停止和删除容器等操作。同时对于运行状态的容器我们可以登录进去，类似 ssh 命令等操作。

容器默认是和其他容器以及其宿主机隔离开的。具体的隔离策略可以进行自定义设置。

## 命名空间namespace

Docker 或者说容器技术的一个核心优势就是资源隔离性，那么这篇文章我们就来看一下资源隔离技术的内核支持，也就是 namespace 技术。

### 1. namespace 简介

namespace 的中文一般翻译成命名空间，我们也可以将 linux 的 namespace 理解成一系列的资源的抽象的集合。每个进程都有一个 namespace 属性，进程的 namespace 可以相同。对于同属于一个 namespace 中进程，可以感知到彼此的存在和变化，而对外界的进程一无所知，而这正是 docker 所需要的。

关于 namespace 的更多技术，我们可以通过 linux 自带的 manpage 查看，链接在文末的参考链接里面。

### 2. namespace 种类

Linux 内核中提供了 6 中隔离支持，分别是：IPC 隔离、网络隔离、挂载点隔离、进程编号隔离、用户和用户组隔离、主机名和域名隔离。

| Namespace | flag          | 隔离内容                  |
|:----------|:--------------|:----------------------|
| IPC       | CLONE_NEWIPC  | IPC（信号量、消息队列和共享内存等）隔离 |
| Network   | CLONE_NEWNET  | 网络隔离（网络栈、端口等）         |
| Mount     | CLONE_NEWNS   | 挂载点（文件系统）             |
| PID       | CLONE_NEWPID  | 进程编号                  |
| User      | CLONE_NEWUSER | 用户和用户组                |
| UTS       | CLONE_NEWUTS  | 主机名和域名                |

每个进程都有一个 namespace，在 `/proc/<pid>/ns` 下面，下面是一个示例：

```bash
[root@xxx ns]# ls -al
total 0
dr-x--x--x 2 root root 0 Nov  3 16:16 .
dr-xr-xr-x 9 root root 0 Nov  3 15:50 ..
lrwxrwxrwx 1 root root 0 Nov  3 16:16 ipc -> ipc:[4026531839]
lrwxrwxrwx 1 root root 0 Nov  3 16:16 mnt -> mnt:[4026531840]
lrwxrwxrwx 1 root root 0 Nov  3 16:16 net -> net:[4026531956]
lrwxrwxrwx 1 root root 0 Nov  3 16:16 pid -> pid:[4026531836]
lrwxrwxrwx 1 root root 0 Nov  3 16:16 user -> user:[4026531837]
lrwxrwxrwx 1 root root 0 Nov  3 16:16 uts -> uts:[4026531838]
```

如上图，我们可以看到 ns 目录下共有 6 个 link 文件，分别为 ipc, mnt, net, pid, user, uts，分别对应了我们上面提到的 6 中隔离技术。对于我们直接运行宿主机上并且没有做资源隔离的进程，这 6 个 link 文件指向的目标文件也都是一致的。而对于 docker 进程，ns 目录下的 link 文件和宿主机上的 link 文件是不一样的，也就是说他们属于不同的 namespace 空间。

## 控制组CGroups

CGroups 的作用就是限制一个进程组能够使用的资源上限，CPU，内存等。

###  CGroups 的历史

CGroups 最初由 Google 的工程师 Paul Menage 和 Rohit Seth 发起，当时项目名叫 `Process Container` 。后来为了避免 Linux 系统中各种各样的 `container` 含义引入歧义，改名为 `control groups` 。

CGroups 的正式面世在 2008 年初，伴随 Linux 的内核版本 2.6.24 的 release 发布，这个是版本 version 1。后来越来越多的特性开始被加入到 CGroups 中，但是由于设计并不是很好，后面 CGroups 中代码越来越多，越难维护，甚至出现某些情况下冲突的问题。

![图片描述](https://img1.sycdn.imooc.com/5f3a1c730001f24e08000450.png)

为了解决上面 CGroups version 1 的问题，在 Linux Kernel 3.10 版本开始了 version 2 的开发工作，相当于重写了 version 1 的 CGroups。Version 2 版本的 CGroups 在 Linux 4.5 发布中正式面世。

尽管 CGroups v2 旨在替换 CGroups v1，但是考虑到兼容性，目前这两个版本是并存的，而且目前来看官方也没有移除 CGroups v1 的计划。

目前 CGroups v2 只是实现了 v1 中的 controller 的一个子集。我们可以在同一个系统中同时挂载 CGroups 的 v1 和 v2 版本。

举个例子：我们可以使用 v2 中实现的 controller，同时使用 v2 中没有实现而在 v1 中实现的 controller。需要注意的是我们不能同时使用在 v1 和 v2 中都实现的 controller。

### 核心概念

CGroups 中有几个重要概念：

- **cgroup**：通过 CGroups 系统进行限制的一组进程。CGroups 中的资源限制都是以进程组为单位实现的，一个进程可以加入到某个进程组，从而受到相同的资源限制。
- **task**：在 CGroups 中，task 可以理解为一个进程。
- **hierarchy**：可以理解成层级关系，CGroups 的组织关系就是层级的形式，每个节点都是一个 cgroup。cgroup 可以有多个子节点，子节点默认继承父节点的属性。
- **subsystem**：更准确的表述应该是 ***resource controllers***，也就是资源控制器，比如 cpu 子系统负责控制 cpu 时间的分配。子系统必须应用（attach）到一个 hierarchy 上才能起作用。

其中最核心的是 ***subsystem***，CGroups 目前支持的 ***subsystem*** 包括：

- **cpu**：限制进程的 cpu 使用率；
- **cpuacct**：统计 CGroups 中的进程的 cpu 使用情况；
- **cpuset**：为 CGroups 中的进程分配单独的 cpu 节点或者内存节点；
- **memory**：限制进程的内存使用；
- **devices**：可以控制进程能够访问哪些设备；
- **blkio**：限制进程的块设备 IO；
- **freezer**：挂起或者恢复 CGroups 中的进程；
- **net_cls**：标记进程的网络数据包，然后可以使用防火墙或者 tc 模块（traffic controller）控制该数据包。这个控制器只适用从该 cgroup 离开的网络包，不适用到达该 cgroup 的网络包；
- **ns**：将不同 CGroups 下面的进程应用不同的 namespace；
- **perf_event**：监控 CGroups 中的进程的 perf 事件（注：perf 是 Linux 系统中的性能调优工具）；
- **pids**：限制一个 cgroup 以及它的子节点中可以创建的进程数目；
- **rdma**：限制 cgroup 中可以使用的 RDMA 资源。

通过上面列举出来的 ***subsystem***，我们可以简单的了解到，通过 Linux CGroups 我们可以控制的资源包括：CPU、内存、网络、IO、文件设备等。

## Docker文件系统

### UnionFS

Docker 的存储驱动的实现是基于 Union File System，简称 UnionFS，中文可以叫做联合文件系统。UnionFS 设计将其他文件系统联合到一个联合挂载点的文件系统服务。

所谓联合挂载技术，是指**在同一个挂载点同时挂载多个文件系统，将挂载点的源目录与被挂载内容进行整合，使得最终可见的文件系统将会包含整合之后的各层的文件和目录**。

举个例子：比如我们运行一个 ubuntu 的容器。由于初始挂载时读写层为空，所以从用户的角度来看：**该容器的文件系统与底层的 rootfs 没有区别**；然而从内核角度来看，**则是显式区分的两个层**。

当需要修改镜像中的文件时，只对处于最上方的读写层进行改动，不会覆盖只读层文件系统的内容，只读层的原始文件内容依然存在，但是**在容器内部会被读写层中的新版本文件内容隐藏**。当 `docker commit` 时，读写层的内容则会被保存。

:::info 写时复制（Copy On Write）

我们知道 **Linux 系统内核启动时首先挂载的 rootfs 是只读的**，在系统正式工作之后，再将其切换为读写模式。Docker 容器启动时文件挂载类似 Linux 内核启动的方式，将 rootfs 设置为只读模式。不同之处在于：**在挂载完成之后，利用上面提到的联合挂载技术在已有的只读 rootfs 上再挂载一个读写层**。
读写层位于 Docker 容器文件系统的最上层，其下可能联合挂载多个只读层，只有在 Docker 容器运行过程中文件系统发生变化时，才会把变化的文件内容写到可读写层，并隐藏只读层的老版本文件，这就叫做 **写实复制**，简称 **CoW**。

:::

###  AUFS

**AUFS** 是 UnionFS 的一种实现，全称为 Advanced Multi-Layered Unification Filesystem，是早期 Docker 版本默认的存储驱动，最新的 Docker 版本默认使用 OverlayFS。

**AUFS** 将镜像层（只读）组织成多个目录，在 **AUFS** 的术语中成为 ***branch***。运行时容器文件会作为一层容器层（container lay，读写）覆盖在镜像层之上。最后通过联合挂载技术进行呈现。下图是 **AUFS** 的文章组织架构的示意图。由于 **AUFS** 可以算是一种过时的技术，所以这里我们就不在赘述了。

![图片描述](https://img1.sycdn.imooc.com/5f39e48f00014cd907320403.png)

### OverlayFS

**OverlayFS** 是类似 **AUFS** 的联合文件系统的一种实现，相比 **AUFS** 性能更好，实现更加简单。Docker 针对 **OverlayFS** 提供了两种存储驱动：***overlay*** 和 ***overlay2*** ，我们在前面的演示部分就是 ***overlay2***。这两种驱动相比之下，***overlay2*** 在 inode 使用率上更加高效，所以一般也是推荐 ***overlay2***，Linux 内核版本要求是 4.0 或者更高版本。

**OverlayFS** 将镜像层（只读）称为 ***lowerdir***，将容器层（读写）称为 ***upperdir***，最后联合挂载呈现出来的为 ***mergedir***。文件层次结构可以用下图表示。 从图中我们也可以看出相比 **AUFS**，文件层更少，这也是 **OverlayFS**相比 **AUFS** 性能更好的一个原因。

![图片描述](https://img1.sycdn.imooc.com/5f39e499000157bd07540193.png)

举个例子，下图是我们运行中的 busybox 容器的 `docker inspect` 的结果。

![图片描述](https://img1.sycdn.imooc.com/5f39e4a1000180cd28480628.png)

我们在容器中做的改动，都会在 ***upperdir*** 和 ***mergeddir*** 中体现。比如我们在容器中的 `/tmp` 目录下新建一个文件，那么在 ***upperdir*** 和 ***mergeddir*** 中就能够看到该文件。

