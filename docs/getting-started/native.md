---
title: 原生 JAR 部署
description: 在 Windows 或 Linux 上直接运行 AMMDS 可执行 JAR，说明 Java 版本要求、启动命令、工作目录、日志与升级方式。
keywords: [JAR, Java 21, Windows, Linux, systemd, 原生部署]
tags: []
sidebar_position: 3
---

# 原生 JAR 部署

如果主机已经装好 Java，或你希望把 AMMDS 交给 systemd 之类的进程管理器托管，可以直接运行可执行 JAR。它同时提供管理页面与后端接口，默认监听 `8080`。

{/* truncate */}

## 环境要求

| 项目 | 要求 |
| --- | --- |
| 操作系统 | 64 位 Windows 或 64 位 Linux 发行版（具体版本取决于 JDK 21 是否提供对应构建） |
| Java | JDK 21（项目编译目标为 Java 21，低于该版本无法启动） |
| 磁盘 | 除媒体文件外，为 `data/`、`db/` 预留空间；首次启动还要下载依赖资源 |
| 网络 | 元数据刮削、榜单采集、订阅检索需要访问外网 |

:::note[32 位系统]
系统检查会把 32 位系统标记为不受支持，FFmpeg、VideoHashes 等依赖资源可能无法运行。请使用 64 位系统。
:::

## 获取可执行 JAR

有两种来源：

1. **发行包**：从你获取的 AMMDS 发行包中取出 `ammds-<版本>.jar`，文件名中的版本号与发行版本一致。
2. **自行构建**：在源码目录执行下面的命令，产物位于 `target/`。

```bash
mvn clean package -DskipTests
```

默认构建会打包后端与已提交的前端静态资源；需要连同管理端前端一起重建时使用 `mvn clean package -Pfrontend-build -DskipTests`。

## Windows 运行

1. 把 JAR 放到一个固定目录，例如 `C:\AMMDS\`。
2. 打开 PowerShell 或命令提示符，进入该目录。
3. 启动服务：

```powershell
cd C:\AMMDS
java -jar ammds-2.0.0.jar
```

4. 浏览器访问 `http://127.0.0.1:8080`。

关闭窗口即停止服务。需要长期运行，可把命令写入批处理脚本，再用「任务计划程序」在开机时执行；也可以使用任意进程守护工具托管该命令。

## Linux 运行

```bash
mkdir -p /opt/ammds
cd /opt/ammds
java -jar ammds-2.0.0.jar
```

用 systemd 托管时，可参考下面的单元文件：

```ini title="/etc/systemd/system/ammds.service"
[Unit]
Description=AMMDS
After=network-online.target

[Service]
WorkingDirectory=/opt/ammds
ExecStart=/usr/bin/java -jar /opt/ammds/ammds-2.0.0.jar
Restart=on-failure
User=ammds

[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload
systemctl enable --now ammds
journalctl -u ammds -f
```

## 工作目录与数据

AMMDS 以**启动时的工作目录**为基准解析 `data/`、`db/` 等相对路径，因此必须先 `cd` 到程序目录再启动，systemd 中则要设置 `WorkingDirectory`。

| 路径 | 内容 |
| --- | --- |
| `data/` | 图片、缓存、字幕、日志、恢复密钥，以及下载的 FFmpeg、MetaTube、WinRAR 等依赖程序 |
| `data/logs/AMMDS.log` | 运行日志，按天滚动，另有 `AMMDS-error.log` |
| `db/` | H2 数据库文件 `db/ammds.mv.db`，保存全部业务数据 |
| `download/` | 可选的下载文件存放目录，与下载器共用时保持路径一致即可 |

:::note[关于 systemd 单元]
上面的 `User=ammds` 需要主机上已存在同名账号；没有的话请改成实际运行账号，或先创建该用户并把 `/opt/ammds` 的属主改为它。
:::

:::warning[不要在临时目录启动]
如果把 JAR 放在 `/tmp` 或用户下载目录里直接双击运行，工作目录会落在意料之外的位置，导致数据分散。请先建立专用目录并固定工作目录。
:::

## 首次启动会下载依赖资源

后端启动后会按需下载 FFmpeg、ffprobe、VideoHashes、MetaTube、WinRAR 等资源，分别落在 `data/ffmpeg`、`data/metatube`、`data/winrar` 等目录。首次启动的日志里能看到下载进度，网络较慢时请耐心等待。

这些资源是否就绪，可以在头像菜单的 **系统检查** 里逐条确认。

## 修改端口与运行参数

端口通过环境变量覆盖，无需改配置文件：

```bash
# Linux
AMMDS_SERVER_PORT=9090 java -jar ammds-2.0.0.jar

# Windows PowerShell
$env:AMMDS_SERVER_PORT = "9090"
java -jar ammds-2.0.0.jar
```

其余环境变量（上传大小、缓存目录、调度开关、插件接入等）见[环境变量与启动参数](/docs/getting-started/environment)。

## 升级

1. 停止进程（`systemctl stop ammds` 或关闭控制台窗口）。
2. 备份 `db/` 与 `data/`。
3. 用新版本 JAR 替换旧文件。
4. 重新启动，确认页面版本号与「系统检查」结果。

数据库结构由 Hibernate 自动更新，正常升级不需要手工改表；但跨大版本仍建议保留升级前的数据库副本。

## 排障

| 现象 | 排查方向 |
| --- | --- |
| 启动即报 `UnsupportedClassVersionError` | Java 版本低于 21，执行 `java -version` 确认 |
| 页面打不开 | 确认进程仍在运行、端口未被占用；检查防火墙是否放行 |
| 启动成功但功能异常 | 查看 `data/logs/AMMDS.log`，并运行系统检查 |
| 数据「消失」 | 多半是工作目录变了，检查启动命令所在的目录 |
