---
title: 部署方式总览
description: 对比 Docker、Windows/Linux 原生 JAR、NAS 应用包与 GraalVM 原生镜像四种部署形态，说明各自的适用场景、端口与共同的数据目录约定。
keywords: [部署方式, Docker, JAR, NAS, 原生镜像, 选型]
tags: []
sidebar_position: 1
---

# 部署方式总览

AMMDS 提供四种部署形态：Docker 镜像、Windows/Linux 直接运行 JAR、NAS 应用包，以及不依赖 JVM 的 GraalVM 原生镜像。本页对比它们的差异，帮你在安装前选定一种，并了解所有形态共用的端口与目录约定。

{/* truncate */}

## 开始之前的三个前提

| 项目 | 说明 |
| --- | --- |
| 系统架构 | 需要 64 位系统。系统检查会把 32 位系统标记为告警，并提示 FFmpeg、VideoHashes 等依赖资源可能无法使用 |
| 运行环境 | 原生 JAR 需要 JDK 21；Docker 与原生镜像自带运行时，无需额外安装 Java |
| 网络 | 元数据刮削、榜单采集、订阅检索、通知推送都需要访问外网；纯内网环境只能使用本地已有的元数据 |

:::warning[媒体目录]
媒体文件始终放在宿主机上，通过路径告诉 AMMDS 去扫描。使用 Docker 时，请把宿主机的媒体目录以**相同路径**挂载进容器（例如 `-v /mnt/media:/mnt/media`），不要让媒体目录落在 `/ammds` 前缀下，以免与程序数据混淆。
:::

## 四种方式对比

| 方式 | 运行形态 | 适合谁 | 升级方式 |
| --- | --- | --- | --- |
| Docker | 单容器内同时运行 Nginx 与后端，对外只暴露 Nginx 端口 | 已有 Docker 的 Linux 服务器与 NAS | 拉取新镜像后重建容器，数据在挂载目录中保留 |
| 原生 JAR | `java -jar` 运行可执行 JAR，同时提供页面与接口 | Windows Server、已有 JDK 21 的 Linux 主机 | 替换 JAR 后重启进程 |
| NAS 应用包 | 由 NAS 应用中心安装、启停与更新 | 飞牛 FnOS、威联通等以应用包为主要分发方式的设备 | 在应用中心安装新版本包 |
| GraalVM 原生镜像 | 免 JVM 的单个可执行文件 | 想减少运行时依赖、加快启动的 Linux 环境 | 替换可执行文件后重启 |

### 怎么选

| 你的情况 | 建议 |
| --- | --- |
| 服务器已装 Docker，或希望端口、目录、随开机启动都由编排统一管理 | 选择 Docker，见[Docker 部署](/docs/getting-started/docker) |
| 设备是飞牛 FnOS，习惯在应用中心管理软件 | 优先使用 NAS 应用包，见[NAS 部署](/docs/getting-started/nas) |
| Windows 主机没有 Docker，但可以安装 JDK 21 | 直接运行 JAR，见[原生 JAR 部署](/docs/getting-started/native) |
| 希望不装 JVM、用 systemd 托管一个静态二进制 | 使用 GraalVM 原生镜像，同样参考[原生 JAR 部署](/docs/getting-started/native)中的目录与升级思路 |

## 端口与访问入口

| 形态 | 浏览器访问端口 | 说明 |
| --- | --- | --- |
| Docker | 容器内 `80`（Nginx） | 宿主机端口自行映射，例如 `-p 8080:80` 后用 `http://主机IP:8080` 访问 |
| 原生 JAR | `8080` | 由 `AMMDS_SERVER_PORT` 控制，默认监听 `0.0.0.0` |
| NAS 应用包 | 安装时设定 | 安装向导中填写访问端口，安装完成后用 `http://NAS_IP:端口` 访问 |
| 原生镜像 | `8080` | 与 JAR 相同，读取同一套环境变量 |

Docker 镜像内部还会启动后端 `8080` 端口，但它只在容器内被 Nginx 反向代理，不需要映射到宿主机。

:::note[局域网服务发现]
桌面客户端可以自动发现同一局域网内的 AMMDS 服务，使用 UDP `47823`（探测）与 `47824`（广播）。Docker 的 Nginx 只转发 TCP，若需要自动发现，必须把这两个 UDP 端口单独映射出来；否则请在客户端手动填写地址。
:::

## 共同的数据目录

无论哪种形态，程序都以**启动时的工作目录**为基准解析相对路径：

| 目录 | 内容 |
| --- | --- |
| `data/` | 图片、缓存、字幕、日志、恢复密钥，以及自动下载的 FFmpeg、MetaTube、WinRAR 等依赖程序 |
| `db/` | H2 数据库文件（`./db/ammds`），保存影视、任务、配置等全部业务数据 |
| `download/` | 镜像预留的数据卷，通常与下载器的保存目录共用，便于下载完成后直接扫描 |
| `data/logs/` | 运行日志 `AMMDS.log`，系统检查与「运行日志」页面读取这里 |

:::tip[备份优先级]
`db/` 与 `data/` 是必须备份的两块：前者是全部业务数据，后者包含图片与恢复密钥。媒体文件按你自己的备份策略处理。
:::

## 安装完成之后

1. 用浏览器打开访问地址，使用默认管理员账号登录，见[首次登录与初始化](/docs/getting-started/first-login)。
2. 需要调整端口、上传大小、调度开关等，见[环境变量与启动参数](/docs/getting-started/environment)。
3. 部署或运行异常时，先看[系统检查](/docs/system/system-check)与[常见问题](/docs/faq)。
