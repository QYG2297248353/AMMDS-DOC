---
sidebar_position: 2
sidebar_label: "快速入门"
---

# 快速入门

:::info
欢迎使用 AMMDS！跟着本指南，你可以用 Windows、飞牛 Nas 或 Docker 来部署。
:::

## 🚀 部署方法

### Windows 部署

:::note
**包类型**：EXE 安装包
:::

Windows 用户看这里，我们提供了傻瓜式安装包：

1. 从 [AMMDS Launcher 发布页面](https://github.com/QYG2297248353/AMMDS-Launcher/releases) 下载最新的 `ammds-setup.exe`
2. 找到下载好的 `ammds-setup.exe` 文件
3. 右键单击，选择 **以管理员身份运行**
4. 跟着安装向导一步步操作就行
5. 安装完成后，服务会自动启动

---

### 飞牛 Nas 部署

:::note
**包类型**：FPK（飞牛包）
:::

飞牛 Nas 用户看这里，我们提供了 FPK 包，可以直接导入飞牛应用商店：

1. 从 [飞牛 Nas 发布页面](https://github.com/QYG2297248353/AMMDS-Offline-FnNas/releases) 下载最新的 `AMMDS.offline.fpk`
2. 登录你的飞牛 Nas 管理界面
3. 打开 **飞牛应用商店**
4. 选择 **导入本地包**，找到下载好的 FPK 文件
5. 按提示完成安装
6. 之后可以在飞牛 Nas 应用商店里管理服务

---

### 威联通 Nas 部署

:::note
**包类型**：QKPG（威联通包）
:::

威联通 Nas 用户看这里，我们提供了 QKPG 包，可以直接导入威联通应用商店：

1. 从 [威联通 Nas 发布页面](https://github.com/QYG2297248353/AMMDS-Offline-QNAP/releases) 下载最新的 `AMMDS_x86.qkpg` 或 `AMMDS_arm.qkpg`
2. 登录你的威联通 Nas 管理界面
3. 打开 **威联通应用商店**
4. 选择 **导入本地包**，找到下载好的 QKPG 文件
5. 按提示完成安装
6. 之后可以在威联通 Nas 应用商店里管理服务

---

### Docker 部署

:::note
**包类型**：Docker 镜像
:::

已经装了 Docker？一行命令就能部署 AMMDS：

```bash showLineNumbers title="Docker Command"
docker run -itd \
   --name AMMDS \
   -p 8080:80 \
   -v $(pwd)/data:/ammds/data \
   -v $(pwd)/db:/ammds/db \
   --restart always \
   qyg2297248353/ammds:latest
```

#### 命令参数说明

| 选项 | 作用 |
|--------|-------------|
| `-itd` | 后台运行容器，不占用终端窗口 |
| `--name AMMDS` | 给容器取名叫 "AMMDS"，方便管理 |
| `-p 8080:80` | 把本机的 8080 端口映射到容器的 80 端口（网页界面） |
| `-v $(pwd)/data:/ammds/data` | 把数据存到本机，删了容器也不会丢 |
| `-v $(pwd)/db:/ammds/db` | 把数据库存到本机，删了容器也不会丢 |
| `--restart always` | 容器意外挂了会自动重启 |
| `qyg2297248353/ammds:latest` | 使用最新的 AMMDS Docker 镜像 |

---

## 🌐 访问服务

部署完成后，打开浏览器就能访问 AMMDS：

1. 打开你常用的浏览器
2. 访问 `http://localhost:8080`（如果是远程部署，把 `localhost` 换成你服务器的 IP）
3. 就会看到 AMMDS 的登录页面

### 📝 默认账号密码

| 项目 | 默认值 |
|------------|-------|
| **用户名** | `ammds` |
| **密码** | `ammds` |

### 💡 第一次登录要注意

:::warning
如果没马上看到登录页面，别着急。系统可能在后台下载和初始化资源，根据你的网速，可能需要等几分钟。
:::

- 登录后，**马上去设置里改掉默认密码**
- 逛逛主界面，熟悉一下 AMMDS 的各项功能
- 看看右下角的系统状态，确保所有服务都正常运行

## 📋 接下来做什么

1. **看文档**：查看 [介绍](/docs/intro) 获取详细的使用说明
2. **调设置**：在设置菜单里自定义你的偏好
3. **加媒体源**：连接你的媒体库，开始使用 AMMDS
4. **探索功能**：试试各种可用的工具和功能

---

祝使用愉快！ 🎉
