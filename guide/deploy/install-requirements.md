---
outline: deep
---

# 需求说明

应用部署前的检查

## 硬件需求

### 操作系统 (OS)

- 推荐使用 Linux 或\*nix 操作系统（如 Ubuntu, Debian 等）。
- 非 Linux 操作系统通常会提供较差的 Docker 体验，并强烈不建议使用。我们对非 Linux 操作系统的安装或故障排除的支持将大幅减少。如果您仍想尝试使用非 Linux 操作系统，可以按如下设置：
  - Windows: 使用 Windows 上的 Docker Desktop 或 WSL 2。
  - macOS: 使用 Mac 上的 Docker Desktop。

#### 增大文件句柄限制与文件描述符限制

为确保 AMMDS 在 Linux 系统上正常运行，您需要适当增加 inotify 和文件描述符限制。

##### `524288` 与 `1048576` 的区别

| 项目                     | `524288`                           | `1048576`                                  |
| ------------------------ | ---------------------------------- | ------------------------------------------ |
| 十进制含义               | 524,288                            | 1,048,576                                  |
| 二进制含义               | 2<sup>19</sup>                     | 2<sup>20</sup>                             |
| 可监控的文件/目录数      | 50 万左右                          | 100 万左右                                 |
| 占用内核内存（粗略估计） | 每个 watch 占 \~200 字节（可能变） | 双倍内存占用（约 200 MB）                  |
| 适用场景                 | 一般中型系统/项目足够              | 需要监控大量文件，如递归目录监听或多个实例 |

##### 检查当前系统参数

```bash
cat /proc/sys/fs/inotify/max_user_instances
cat /proc/sys/fs/inotify/max_user_watches
ulimit -n
```

##### 增加系统参数 (sysctl)

须在 root 用户下执行以下命令：

```bash
# 增加 inotify 实例数
echo fs.inotify.max_user_instances=1024 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
# 增加 inotify 监听数量
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
# 加系统最大文件句柄数
echo fs.file-max=524288 | sudo tee -a /etc/sysctl.conf
```

##### 增加文件描述符限制（ulimit）

编辑 `/etc/security/limits.conf` 文件，添加以下内容：

```bash
* soft nofile 524288
* hard nofile 524288
```

然后，重新登录终端或重启系统即可。

> 请注意，增加文件描述符限制可能会影响其他正在运行的应用程序。如果您不确定如何设置，请咨询您的系统管理员或技术支持人员。

### 内存 (RAM)

- 最低要求：4GB
- 推荐配置：6GB

### 处理器 (CPU)

- 最低要求：2 核
- 推荐配置：4 核

### 存储

- 推荐使用 Unix 兼容的文件系统（如 EXT4, ZFS, APFS 等），并支持用户/组所有权和权限。
- 刮削数据以及影视其他数据，可能会使媒体库的大小增加 10-20%。

## 软件需求

AMMDS 需要带有 Docker Compose 插件的 Docker：

- **Docker Engine**: 此 CLI 变体专为 Linux 服务器设计（或通过 WSL2 在 Windows 上使用）。
- **Docker Desktop**: 此 GUI 变体不推荐用于 Linux，但可用于 Windows 或 macOS。

<!--@include: ../../snippets/copyright.md-->
