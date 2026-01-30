---
sidebar_position: 2
sidebar_label: "快速入门"
---

# 快速入门

:::info
欢迎使用 AMMDS！本指南将帮助您使用支持的方法之一部署 AMMDS：Windows、飞牛 Nas 或 Docker。
:::

## 🚀 部署方法

### Windows 部署

:::note
**包类型**：EXE 安装包
:::

对于 Windows 用户，我们提供了简单直观的可执行安装包：

1. 从 [AMMDS Launcher 发布页面](https://github.com/QYG2297248353/AMMDS-Launcher/releases) 下载最新的 `ammds-setup.exe`
2. 找到下载的 `ammds-setup.exe` 文件
3. 右键单击并选择 **以管理员身份运行**
4. 按照直观的屏幕向导完成安装
5. 安装完成后，服务将自动启动

---

### 飞牛 Nas 部署

:::note
**包类型**：FPK（飞牛包）
:::

对于飞牛 Nas 用户，我们提供了一个 FPK 包，专为直接导入飞牛应用商店而设计：

1. 从 [飞牛 Nas 发布页面](https://github.com/QYG2297248353/AMMDS-Offline-FnNas/releases) 下载最新的 `AMMDS.offline.fpk`
2. 访问您的飞牛 Nas 仪表盘
3. 打开 **飞牛应用商店**
4. 选择 **导入本地包** 并找到下载的 FPK 文件
5. 按照提示完成安装
6. 服务将通过飞牛 Nas 应用商店界面进行管理

---

### Docker 部署

:::note
**包类型**：Docker 镜像
:::

对于已安装 Docker 的用户，使用单个命令部署 AMMDS：

```bash showLineNumbers title="Docker Command"
docker run -itd \
   --name AMMDS \
   -p 8080:80 \
   -v $(pwd)/data:/ammds/data \
   -v $(pwd)/db:/ammds/db \
   --restart always \
   qyg2297248353/ammds:latest
```

#### Docker 命令说明

| 选项 | 描述 |
|--------|-------------|
| `-itd` | 在交互式模式下运行容器，带有伪 TTY，与终端分离 |
| `--name AMMDS` | 为容器分配名称 "AMMDS"，便于管理 |
| `-p 8080:80` | 将主机端口 8080 映射到容器端口 80（Web 界面） |
| `-v $(pwd)/data:/ammds/data` | 用于应用数据的持久存储 |
| `-v $(pwd)/db:/ammds/db` | 用于数据库文件的持久存储 |
| `--restart always` | 如果容器意外停止，自动重启容器 |
| `qyg2297248353/ammds:latest` | 使用最新的 AMMDS Docker 镜像 |

---

## 🌐 访问服务

成功部署后，通过您的 Web 浏览器访问 AMMDS：

1. 打开您喜欢的 Web 浏览器
2. 导航到 `http://localhost:8080`（如果是远程部署，请将 `localhost` 替换为您的服务器 IP）
3. 您将看到 AMMDS 登录页面

### 📝 默认凭据

| 凭据 | 值 |
|------------|-------|
| **用户名** | `ammds` |
| **密码** | `ammds` |

### 💡 首次访问提示

:::warning
如果您没有立即看到登录页面，请耐心等待。系统可能仍在后台下载和初始化资源。根据您的网络速度，此过程可能需要几分钟时间。
:::

- 登录后，**立即从设置菜单更改默认密码**
- 探索直观的仪表板，熟悉 AMMDS 的功能
- 检查右下角的系统状态，确保所有服务都在运行

## 📋 后续步骤

1. **查看文档**：查看 [介绍](/docs/intro) 获取详细的使用说明
2. **配置首选项**：在设置菜单中自定义您的体验
3. **添加媒体源**：连接您的媒体库以开始使用 AMMDS
4. **探索功能**：尝试使用各种可用的工具和功能

---

祝您使用 AMMDS 愉快！ 🎉