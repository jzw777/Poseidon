---
title: maven-resources-plugin
description: 项目打包时如果有证书，脚本等文件需要跟项目jar包放在一起，可以使用这个插件
authors: jiangzw09
date: 2022-10-06 00:05:04
tags: 
  - java
  - maven
image: https://s1.ax1x.com/2022/11/09/zSGoyq.jpg
---

> 官网地址：https://maven.apache.org/plugins/maven-resources-plugin/

​	Resources Plugin处理项目资源到输出目录的复制。有两种不同的资源：主资源和测试资源。不同之处在于，主资源是与主源代码关联的资源，而测试资源则与测试源代码关联。

因此，这允许分离主源代码及其单元测试的资源。

### Goals

​	共有三个目标：

- Resources:resources

​	拷贝main resources到main output directory。它绑定了process-resources生命周期阶段，当执行Compiler:compile插件目标前就会执行此阶段。

- Resources:testResources

​	拷贝test resources到test output directory。它绑定了process-test-resources生命周期阶段，当执行surefire:test插件目标前就会执行此阶段。

- Resources:copy-resources

​	手动拷贝资源到输出目录。

### 使用

#### 拷贝资源

该插件支持将特定位置的资源拷贝到指定路径下。

```xml
<plugin>
    <artifactId>maven-resources-plugin</artifactId>
    <version>3.3.0</version>
    <executions>
        <execution>
            <id>copy-resources</id>
            <!-- here the phase you need -->
            <phase>validate</phase>
            <goals>
                <goal>copy-resources</goal>
            </goals>
            <configuration>
                <outputDirectory>${basedir}/target/extra-resources</outputDirectory>
                <resources>
                    <resource>
                        <directory>src/non-packaged-resources</directory>
                        <filtering>true</filtering>
                    </resource>
                </resources>
            </configuration>
        </execution>
    </executions>
</plugin>
```

#### 过滤/替换

​	在你的resources中包含变量，这些变量以`${...}`分隔符表示。可以来自系统属性，项目属性，过滤器资源和命令行。

> Springboot 项目做了如下配置<resource.delimiter>@</resource.delimiter>
>
> 需要添加 <resource.delimiter>${}</resource.delimiter> 改回默认的，否则会发现替换不能生效。

```xml
<!--项目属性-->
<!-- -Dfoo=bar -->
<project>
    <!--项目属性-->
    <properties>
        <your.name>world</your.name>
    </properties>
    ...
    <build>
        ...
        <!--过滤器资源-->
        <filters>
            <filter>[a filter property]</filter>
        </filters>
        ...
    </build>
    ...
</project>
```

#### 包含/排除

指定资源目录包含的文件/排除的文件

```xml
<build>
    <resources>
        <resource>
            <directory>src/my-resources</directory>
            <includes>
                <include>**/*.txt</include>
                <include>**/*.rtf</include>
                <include>[resource file #1]</include>
                <include>[resource file #2]</include>
            </includes>
            <excludes>
                <exclude>**/*test*.*</exclude>
                <exclude>**/*.pdf</exclude>
                <exclude>[non-resource file #n]</exclude>
            </excludes>
        </resource>
    </resources>
</build>
```

其他的使用场景可以到官网上看。

-------

## 相关知识点：

### Maven 生命周期

​	maven有三个生命周期，每个周期下又有多个阶段（phase），而目标（goal）是绑定在阶段上的，每一个 phase 都对应 1 个或多个 goal。


- #### clean

>  `pre-clean`  ,  `clean`  ,  `post-clean` 

- #### default

>`validate`,`initialize`,`generate-sources`,`process-sources`,`generate-resources`,
>`	process-resources`,`compile`,`process-classes`,`generate-test-sources`,
>`	process-test-sources`,`generate-test-resources`,`process-test-resources`,
>`test-compile`,`process-test-classes`,`test,prepare-package`, 
>`		package` ,`pre-integration-test`,`integration-test`, 
>` 	post-integration-test`,`verify`,`install`,`deploy`


- #### site

> `pre-site`,`site`,`post-site`,`site-deploy`
