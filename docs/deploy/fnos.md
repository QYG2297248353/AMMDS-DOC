---
sidebar_position: 3
sidebar_label: "飞牛Nas"
title: "飞牛 FnOS 部署指南"
description: "了解如何在飞牛 FnOS 系统上通过 FPK 离线应用安装或 Docker 方式部署 AMMDS。"
keywords: [AMMDS, 飞牛FnOS, Nas, FPK, Docker部署]
tags: [deploy]
---

# 飞牛 FnOS 部署指南

飞牛 FnOS 是一款专为 NAS（家庭存储服务器）设计的系统，由骨灰级玩家团队打造，内置了 AI 本地模型，方便家庭和企业管理数据。下面介绍如何在飞牛 FnOS 上部署 AMMDS。

## 部署方式

AMMDS 在飞牛 FnOS 上有两种安装方式：

- **FPK 离线应用安装**：通过飞牛 FnOS 应用中心手动安装，适合大多数用户
- **Docker 安装**：通过 Docker 容器部署，适合熟悉容器的用户

## FPK 离线应用安装

### 下载

![AMMDS FPK 下载页面](/img/deploy/install-fnos-fpk-00.png)

#### 官方发行地址

[AMMDS Offline FnNas GitHub Releases](https://github.com/QYG2297248353/AMMDS-Offline-FnNas/releases)

#### 可用安装包

| 文件名                  | 类型 | 说明                 |
| ----------------------- | ---- | -------------------- |
| `AMMDS-Offline-FnNas.fpk` | FPK  | AMMDS 离线安装包，适用于飞牛 FnOS 系统 |

#### 下载方式

![AMMDS FPK 下载选项](/img/deploy/install-fnos-fpk-01.png)

可以把安装包下载到本地电脑，也可以直接在飞牛设备上下载。

### 安装步骤

![AMMDS FPK 安装界面](/img/deploy/install-fnos-fpk-02.png)

1. **启动安装流程**

   打开应用中心，点击左下角的**手动安装**，选择下载的 FPK 文件，点击**安装**。

![AMMDS FPK 安装提示](/img/deploy/install-fnos-fpk-03.png)

2. **确认安装**

   在安装提示界面，点击**同意**进入安装流程。

![AMMDS FPK 许可说明](/img/deploy/install-fnos-fpk-04.png)

3. **阅读许可说明**

   仔细阅读安装许可说明，了解相关条款。

![AMMDS FPK 选择安装位置](/img/deploy/install-fnos-fpk-05.png)

4. **选择安装位置**

   选一个空间充足的磁盘来安装。

![AMMDS FPK 设置管理员密码](/img/deploy/install-fnos-fpk-06.png)

5. **设置管理员密码**

   设置 AMMDS 管理界面的登录密码，建议用强密码。

![AMMDS FPK 设置访问端口](/img/deploy/install-fnos-fpk-07.png)

6. **设置访问端口**

   设置 AMMDS 的访问端口，默认是 9523。
   阅读服务条款，点击**同意**。

![AMMDS FPK 开始安装](/img/deploy/install-fnos-fpk-08.png)

7. **开始安装**

   在最后的安装提示界面，点击**确定**开始安装。

![AMMDS FPK 安装进度](/img/deploy/install-fnos-fpk-09.png)

8. **等待安装完成**

   安装过程中会显示进度条，稍等一下就好。如果报错，根据提示处理，或者试试旧版本的 FPK 安装包。

![AMMDS FPK 安装完成](/img/deploy/install-fnos-fpk-10.png)

9. **确认安装成功**

   安装完成后，在已安装应用列表里就能看到 AMMDS 了。

### 安装目录

![AMMDS 安装目录](/img/deploy/install-fnos-fpk-11.png)

在文件管理 -> 应用文件中，可以找到 AMMDS 的安装目录。

## Docker 安装

### 镜像下载

![AMMDS Docker 镜像搜索](/img/deploy/install-fnos-docker-00.png)

1. **搜索镜像**

   打开 Docker 应用，完成初始化后，点击左侧菜单的**镜像仓库**，搜索 AMMDS 镜像。

2. **选择镜像**

   选下载量最多的那个，完整镜像名是 `qyg2297248353/ammds`。

![AMMDS Docker 镜像版本选择](/img/deploy/install-fnos-docker-01.png)

3. **选择版本**

   默认版本是 `latest`。如果你的设备比较老，可能不支持 `latest` 版本，需要选标签结尾为 `ol8` 的版本。

![AMMDS Docker 镜像下载完成](/img/deploy/install-fnos-docker-02.png)

4. **等待下载完成**

   在本地镜像中可以查看下载进度，下载完了就能看到运行按钮。

### 容器创建与配置

![AMMDS Docker 容器创建](/img/deploy/install-fnos-docker-03.png)

1. **创建容器**

   点击**运行**按钮开始部署。
   容器名称自定义，比如 `ammds`。
   根据设备性能分配适当的资源。
   可以开启**开机自动运行**。

![AMMDS Docker 端口设置](/img/deploy/install-fnos-docker-04.png)

2. **端口设置**

   在高级设置里配置端口映射：
   - 默认容器端口是 80（TCP）
   - 修改访问端口为 9523（或其他可用端口）

![AMMDS Docker 存储设置](/img/deploy/install-fnos-docker-05.png)

3. **存储设置**

   建议挂载本地目录到容器中，这样数据不会丢失：
   - 默认飞牛会创建临时存储目录，但这个目录容易被系统清理
   - 建议手动创建对应目录，挂载到容器中

![AMMDS Docker 信息确认](/img/deploy/install-fnos-docker-06.png)

4. **确认配置**

   确认所有配置无误后，勾选**创建后启动**。

### 运行与管理

![AMMDS Docker 容器运行状态](/img/deploy/install-fnos-docker-07.png)

1. **查看运行状态**

   在容器列表中可以看到 AMMDS 正在运行。右侧三个点可以快速操作。

![AMMDS Docker 应用详情](/img/deploy/install-fnos-docker-08.png)

2. **查看应用详情**

   点击容器进入详情页面，查看详细信息。

![AMMDS Docker 运行日志](/img/deploy/install-fnos-docker-09.png)

3. **查看运行日志**

   点击**查看日志**可以看到运行状态和下载进度。

   :::info 首次启动提示
   首次安装时，系统会自动下载必要的资源文件，需要等一会儿。日志里会显示下载进度。
   :::

## 安装完成

![AMMDS 安装完成界面](/img/deploy/install-fnos-finish.png)

安装完成后，可以通过浏览器访问 AMMDS 管理界面，开始使用了。

## 高级尝试

![AMMDS Docker Compose 部署](/img/deploy/install-fnos-compose.png)

如果你熟悉 Docker Compose（容器编排工具），也可以用 Compose 文件来部署 AMMDS，配置更灵活。

## 警告和注意事项

### 安全警告

:::danger[重要安全提示]

- **官方来源**：只从官方 GitHub Releases 页面下载安装包，别用第三方来源
- **密码安全**：设置强密码，定期更换
- **端口安全**：修改默认端口，降低被攻击的风险

:::

### 系统要求

:::info[系统配置要求]

#### 最低配置

- 操作系统：飞牛 FnOS 最新版本
- 处理器：Intel Core i3 或同等性能
- 内存：4GB RAM
- 磁盘空间：至少 10GB 可用空间
- 网络：宽带互联网连接

#### 推荐配置

- 操作系统：飞牛 FnOS 最新版本
- 处理器：Intel Core i5 或同等性能
- 内存：8GB RAM 或更多
- 磁盘空间：20GB 可用空间
- 网络：稳定的宽带互联网连接

:::

### 使用注意事项

- **数据备份**：定期备份配置文件和重要数据
- **资源管理**：留意磁盘空间，及时清理不需要的文件
- **网络连接**：下载资源和更新时，确保网络稳定
- **系统维护**：定期更新飞牛 FnOS 系统

### 故障排除

#### 常见问题

- **安装失败**：检查磁盘空间和网络连接
- **启动异常**：查看运行日志获取错误信息
- **访问失败**：检查端口配置和防火墙设置
- **升级失败**：试试先卸载旧版再安装新版

#### 联系方式

遇到解决不了的问题，请到官方 GitHub 仓库提交 Issue。

## 最佳实践

- **定期更新**：保持 AMMDS 为最新版本
- **合理配置**：根据设备性能合理设置参数
- **安全使用**：按官方文档操作，别乱改核心配置文件
- **社区参与**：参与社区，分享经验和反馈问题
