---
sidebar_position: 3
sidebar_label: "飞牛Nas"
---

# 飞牛 FnOS 部署指南

飞牛 FnOS 是由骨灰级玩家团队倾心打造的 NAS 系统，融合 AI 本地端模型，致力于为家庭和企业提供高效、安全的存储解决方案。本指南将详细介绍 AMMDS 在飞牛 FnOS 环境下的部署流程。

<!-- truncate -->

## 部署方式概述

AMMDS 在飞牛 FnOS 上提供两种部署方式：

- **FPK 离线应用安装**：通过飞牛 FnOS 应用中心手动安装，适合大多数用户
- **Docker 安装**：通过 Docker 容器部署，适合熟悉容器技术的用户

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

您可以选择将安装包下载到本地计算机，或直接在飞牛 FnOS 设备上下载。

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

   选择应用安装的磁盘位置，建议选择空间充足的磁盘。

![AMMDS FPK 设置管理员密码](/img/deploy/install-fnos-fpk-06.png)

5. **设置管理员密码**

   设置 AMMDS 管理界面的登录密码，建议使用强密码。

![AMMDS FPK 设置访问端口](/img/deploy/install-fnos-fpk-07.png)

6. **设置访问端口**

   设置 AMMDS 的访问端口，默认端口为 9523。
   阅读服务条款，点击**同意**。

![AMMDS FPK 开始安装](/img/deploy/install-fnos-fpk-08.png)

7. **开始安装**

   在最后的安装提示界面，点击**确定**开始安装。

![AMMDS FPK 安装进度](/img/deploy/install-fnos-fpk-09.png)

8. **等待安装完成**

   安装过程中会显示进度条，请耐心等待安装完成。如果出现错误提示，请根据提示进行处理，或尝试使用旧版本的 FPK 安装包。

![AMMDS FPK 安装完成](/img/deploy/install-fnos-fpk-10.png)

9. **确认安装成功**

   安装完成后，可以在已安装应用列表中找到 AMMDS 应用。

### 安装目录

![AMMDS 安装目录](/img/deploy/install-fnos-fpk-11.png)

在文件管理中，应用文件中可以找到 AMMDS 应用的安装目录。

## Docker 安装

### 镜像下载

![AMMDS Docker 镜像搜索](/img/deploy/install-fnos-docker-00.png)

1. **搜索镜像**

   打开 Docker 应用，完成初始化后，点击左侧菜单的**镜像仓库**，搜索 AMMDS 镜像。

2. **选择镜像**

   选择下载量最多的镜像，完整镜像名称为 `qyg2297248353/ammds`。

![AMMDS Docker 镜像版本选择](/img/deploy/install-fnos-docker-01.png)

3. **选择版本**

   默认版本为 `latest`。如果您的设备属于老设备，可能不支持 `latest` 版本，需要选择标签结尾为 `ol8` 的版本。

![AMMDS Docker 镜像下载完成](/img/deploy/install-fnos-docker-02.png)

4. **等待下载完成**

   在本地镜像中可以查看下载进度，下载完成后，即可看到运行按钮。

### 容器创建与配置

![AMMDS Docker 容器创建](/img/deploy/install-fnos-docker-03.png)

1. **创建容器**

   点击**运行**按钮开始部署。
   容器名称自定义，例如 `ammds`。
   根据设备性能和需求，分配适当的资源。
   可选择开启**开机自动开启**功能。

![AMMDS Docker 端口设置](/img/deploy/install-fnos-docker-04.png)

2. **端口设置**

   在高级设置中，配置端口映射：
   - 默认容器端口为 80（TCP）
   - 修改访问端口为 9523（或其他可用端口）

![AMMDS Docker 存储设置](/img/deploy/install-fnos-docker-05.png)

3. **存储设置**

   建议挂载本地目录到容器中以实现持久化存储：
   - 默认飞牛会创建统一临时存储目录，但该目录容易被系统清理
   - 建议您手动创建对应目录并挂载到容器中

![AMMDS Docker 信息确认](/img/deploy/install-fnos-docker-06.png)

4. **确认配置**

   确认所有配置信息无误后，勾选**创建后启动**选项。

### 运行与管理

![AMMDS Docker 容器运行状态](/img/deploy/install-fnos-docker-07.png)

1. **查看运行状态**

   在容器列表中可以看到 AMMDS 应用正在运行。右侧三个点可以进行快捷操作。

![AMMDS Docker 应用详情](/img/deploy/install-fnos-docker-08.png)

2. **查看应用详情**

   点击容器进入详情页面，查看应用的详细信息。

![AMMDS Docker 运行日志](/img/deploy/install-fnos-docker-09.png)

3. **查看运行日志**

   点击**查看日志**可以查看应用运行状态和下载进度。

   :::info 首次启动提示
   首次安装时，系统会自动下载必要的资源文件，需要等待一段时间。日志中会显示下载进度。
   :::

## 安装完成

![AMMDS 安装完成界面](/img/deploy/install-fnos-finish.png)

安装完成后，您可以通过浏览器访问 AMMDS 管理界面，开始使用所有功能。

## 高级尝试

![AMMDS Docker Compose 部署](/img/deploy/install-fnos-compose.png)

如果您熟悉 Docker 的编排模式，您可以选择通过 Compose 文件部署 AMMDS，以获得更灵活的配置和管理体验。

## 警告和注意事项

### 安全警告

:::danger 重要安全提示

- **官方来源**：仅从官方 GitHub Releases 页面下载 AMMDS 安装包，避免使用第三方下载源
- **密码安全**：设置强密码并定期更换，避免使用弱密码
- **端口安全**：确保修改默认端口，减少被攻击的风险

:::

### 系统要求

:::info 系统配置要求

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

- **数据备份**：定期备份 AMMDS 的配置文件和重要数据
- **资源管理**：监控磁盘空间使用情况，及时清理不需要的资源文件
- **网络连接**：确保稳定的网络连接，特别是在下载资源和更新时
- **系统维护**：定期更新飞牛 FnOS 系统，确保系统稳定性

### 故障排除

#### 常见问题

- **安装失败**：检查磁盘空间是否充足，网络连接是否正常
- **启动异常**：查看运行日志获取详细错误信息
- **访问失败**：检查端口配置是否正确，防火墙是否允许访问
- **升级失败**：尝试先卸载旧版本再安装新版本

#### 联系方式

如遇到无法解决的问题，请访问官方 GitHub 仓库提交 Issue 或寻求帮助。

## 最佳实践

- **定期更新**：保持 AMMDS 为最新版本，获取最新功能和安全修复
- **合理配置**：根据设备性能合理配置 AMMDS 参数，避免资源过度占用
- **安全使用**：遵循官方文档指导，避免修改核心配置文件
- **社区参与**：参与 AMMDS 社区，分享使用经验和反馈问题



