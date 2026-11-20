---
title: 在 Windows / Linux 上直接运行
sidebar_label: 本地安装
description: 不用 Docker，直接运行 AMMDS 的二进制程序，下载对应系统的发行包、启动命令、工作目录与数据位置、改端口、设内存和升级步骤。
sidebar_position: 3
---

# 在 Windows / Linux 上直接运行

没有 Docker、或者你更习惯自己管一个程序进程，就用这种方式：运行发行包里的那个可执行文件，网页和后台都在这一个程序里，默认用 `8080` 端口。

开始前只需要做一件事：**下载和你系统对应的发行包**。不用装 Java，也不用准备别的运行环境。还没决定用哪种方式的话，先看[先选一种安装方式](./overview.md)。

> **二进制程序**：也叫可执行文件，Windows 上是 `.exe` 结尾的文件，Linux 上是一个没有扩展名的文件。AMMDS 把程序提前编译成这样一个文件，所以运行时不需要 Java，也没有 JAR / WAR 这类文件要管。

## 环境要求

| 项目 | 要求 |
| --- | --- |
| 系统 | 64 位 Windows 或 64 位 Linux。可执行文件按系统分别编译，下载时选对应自己系统的那一份 |
| 运行环境 | 不需要 Java，也不需要装别的运行环境 |
| 磁盘 | 除了影片文件，还要给 `data/`、`db/` 留空间；首次启动还要下载依赖程序 |
| 网络 | 自动补资料、找资源需要能访问外网 |

## 拿到程序文件

从官方发布页下载与你系统对应的发行包，解压后里面是一个可执行文件：Linux 上通常叫 `ammds`，Windows 上叫 `ammds.exe`，文件名里的版本号与发行版本一致，具体以你下载到的为准。

:::note[Windows 另有安装包]
Windows 用户建议优先用官方安装包：一键安装、托盘管理、开机自启，不用命令行。见[用 Windows 安装包（启动器）](./launcher.md)；发布页在 https://github.com/QYG2297248353/AMMDS-Launcher/releases
:::

## 在 Windows 上运行

1. 把可执行文件放到一个固定目录，例如 `C:\AMMDS\`。
2. 打开 PowerShell 或命令提示符，**进入这个目录**。
3. 启动：

```powershell
cd C:\AMMDS
.\ammds.exe
```

4. 浏览器打开 `http://127.0.0.1:8080`。

关掉窗口就停止服务。想长期运行，可以把这条命令写进批处理脚本，再用「任务计划程序」在开机时执行；也可以用任意进程守护工具托管它。

## 在 Linux 上运行

```bash
mkdir -p /opt/ammds
cd /opt/ammds
chmod +x ./ammds
./ammds
```

:::note[提示「权限不够」时]
Linux 下新下载的文件默认没有执行权限，先执行一次 `chmod +x ./ammds` 再启动。
:::

想让它随开机自动启动，可以用系统服务托管。下面是一个参考配置：

```ini title="/etc/systemd/system/ammds.service"
[Unit]
Description=AMMDS
After=network-online.target

[Service]
WorkingDirectory=/opt/ammds
ExecStart=/opt/ammds/ammds
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

:::note[关于上面那段配置里的运行账号]
`User=ammds` 要求主机上已经有这个账号。没有的话请改成实际的运行账号，或者先建这个用户，并把 `/opt/ammds` 的属主改成它。
:::

## 工作目录与数据放在哪

AMMDS 把**启动时所在的目录**当作根目录，`data/`、`db/` 都建在这下面。所以必须先进入程序目录再启动；用系统服务托管时要设置好工作目录。

| 路径 | 里面是什么 |
| --- | --- |
| `data/` | 图片、缓存、字幕、日志、恢复密钥，以及自动下载的 FFmpeg 等依赖程序 |
| `data/logs/` | 运行日志，按天滚动，另外还有一份只记错误的日志 |
| `db/` | 数据库文件，保存影片、任务、配置等全部业务数据 |
| `download/` | 可选的下载存放目录，和下载器共用时保持路径一致即可 |

:::warning[不要在临时目录里启动]
如果把程序文件放在临时目录或下载目录里直接双击运行，工作目录会落在意料之外的地方，数据就分散了。请先建一个专用目录，并在那里启动。
:::

## 第一次启动会下载依赖

启动后会自动按需下载 FFmpeg 等依赖程序，分别落在 `data/` 下的对应子目录里。首次启动的日志里能看到下载进度，网络慢时请耐心等。这些依赖是否就绪，可以在头像菜单的**系统检查**里逐条确认。

## 设置项说明

这些设置都在启动前通过环境变量指定（就是写在启动命令前的那几行），改完**必须重启**才生效。

| 设置项 | 它管什么（大白话） | 不填会怎样 | 改完要不要重启 |
| --- | --- | --- | --- |
| 访问端口（`AMMDS_SERVER_PORT`） | 浏览器里访问用的端口号 | 不填用默认的 `8080` | 要 |
| 监听地址（`AMMDS_SERVER_HOST`） | 允许哪些设备连进来，默认谁都能连 | 不填按默认值；改成只听本机后，其它设备就连不上了 | 要 |
| 上传大小（`AMMDS_MAX_FILE_SIZE` / `AMMDS_MAX_REQUEST_SIZE`） | 单个文件、单次请求的大小上限 | 不填用程序默认值；传大文件失败时再调大，两个要一起调 | 要 |
| 缓存目录（`AMMDS_CACHE_PATH`） | 上传文件时临时存放的地方 | 不填放在 `data/cache`；目录所在磁盘满了会导致上传失败 | 要 |
| 日志详细程度（`AMMDS_DEBUG`） | 日志记到多细 | 不填按默认级别；排查问题时可临时调成最详细 | 要 |
| 自动发现开关与端口（`AMMDS_DISCOVERY_ENABLED` / `AMMDS_DISCOVERY_PORT` / `AMMDS_DISCOVERY_ANNOUNCE_ENABLED` / `AMMDS_DISCOVERY_ANNOUNCE_PORT`） | 能不能让客户端自动找到服务，用哪两个 UDP 端口 | 不填按默认开启；关掉后只能在客户端手动填地址 | 要 |
| 定时任务总开关（`AMMDS_SCHEDULER_ENABLE`） | 到点自动跑的任务还跑不跑 | 不填按默认开启；关掉后连手动执行定时任务也会被拒绝 | 要 |
| 目录监控开关（`AMMDS_MONITOR_ENABLE`） | 文件一有变动就自动扫描 | 不填按默认开启；关掉后只能用定时扫描 | 要 |
| 内存上限（`-Xmx` / Docker 用 `AMMDS_MAX_HEAP`） | 程序最多能用多少内存 | 不填按程序自带的上限；觉得占用偏高时显式设一个 | 要 |

改端口的写法：

```bash
# Linux
AMMDS_SERVER_PORT=9090 ./ammds

# Windows PowerShell
$env:AMMDS_SERVER_PORT = "9090"
.\ammds.exe
```

:::tip[内存占用看着偏高？]
二进制程序默认会按机器内存预留一块上限，扫描或刮削结束后，占用的内存可能不会马上降下来。可以显式设一个上限，例如 `./ammds -Xmx2g`，Linux 下再配合环境变量 `MALLOC_ARENA_MAX=2` 使用，能明显降低占用。设置后可以在资源占用页看到当前生效的上限值。
:::

完整的启动设置表见[环境变量](./settings.md)。

## 怎么升级

1. 停掉程序（系统服务用 `systemctl stop ammds`，或者关掉控制台窗口）。
2. 备份 `db/` 和 `data/`。
3. 用新版本的可执行文件替换旧文件。
4. 重新启动，确认页面上的版本号和「系统检查」的结果。

数据库结构会自动更新，正常升级不用手工改表；但跨大版本升级前，仍建议留一份升级前的数据库副本。

## 出问题了怎么办

- **双击没反应，或提示不是可执行的程序**：多半下载了别的系统的发行包（Windows 和 Linux 不通用）。重新下载对应系统的那一份；Linux 上再确认执行过 `chmod +x ./ammds`。
- **一启动就提示 CPU 指令集不支持**：确认下载的包和你的机器匹配；老机器可以换用适配旧 CPU 的发行包，或改用带 `ol8` 标签的 Docker 镜像。
- **页面打不开**：确认进程还在运行、端口没有被别的程序占用、防火墙放行了；首次启动还要等依赖程序下载完。
- **能启动但功能不对劲**：看 `data/logs/` 下的运行日志，并跑一次系统检查。
- **数据「不见了」**：多半是启动时所在的目录变了，程序在另一个地方新建了数据目录。回到原来的目录重新启动。
- **还是解决不了**：到[常见问题](../faq.md)按现象找。

## 接着看

- [第一次打开：登录和基本设置](./first-login.md)
- [环境变量](./settings.md)
- [十分钟整理好第一批影片](./first-library.md)
