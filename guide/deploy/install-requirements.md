---
outline: deep
---

# 需求说明

应用部署前的检查

## 硬件需求

### 操作系统 (OS)
- 推荐使用Linux或*nix操作系统（如Ubuntu, Debian等）。
- 非Linux操作系统通常会提供较差的Docker体验，并强烈不建议使用。我们对非Linux操作系统的安装或故障排除的支持将大幅减少。如果您仍想尝试使用非Linux操作系统，可以按如下设置：
  - Windows: 使用Windows上的Docker Desktop或WSL 2。
  - macOS: 使用Mac上的Docker Desktop。

### 内存 (RAM)
- 最低要求：4GB
- 推荐配置：6GB

### 处理器 (CPU)
- 最低要求：2核
- 推荐配置：4核

### 存储
- 推荐使用Unix兼容的文件系统（如EXT4, ZFS, APFS等），并支持用户/组所有权和权限。
- 刮削数据以及影视其他数据，可能会使媒体库的大小增加10-20%。

## 软件需求

AMMDS需要带有Docker Compose插件的Docker：

- **Docker Engine**: 此CLI变体专为Linux服务器设计（或通过WSL2在Windows上使用）。
- **Docker Desktop**: 此GUI变体不推荐用于Linux，但可用于Windows或macOS。


<!--@include: ../../snippets/copyright.md-->