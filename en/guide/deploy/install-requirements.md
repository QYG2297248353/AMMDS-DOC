---
outline: deep
---

# Requirements Specification

## Pre-deployment Checks

## Hardware Requirements

### Operating System (OS)
- It is recommended to use Linux or *nix operating systems (such as Ubuntu, Debian, etc.).
- Non-Linux operating systems generally provide a poorer Docker experience and are strongly discouraged. Our support for installation or troubleshooting on non-Linux operating systems will be significantly reduced. If you still wish to try using a non-Linux operating system, you can set it up as follows:
  - Windows: Use Docker Desktop on Windows or WSL 2.
  - macOS: Use Docker Desktop on Mac.

### Memory (RAM)
- Minimum Requirement: 4GB
- Recommended Configuration: 6GB

### Processor (CPU)
- Minimum Requirement: 2 cores
- Recommended Configuration: 4 cores

### Storage
- It is recommended to use Unix-compatible file systems (such as EXT4, ZFS, APFS, etc.) that support user/group ownership and permissions.
- Scraping data and other media-related data may increase the size of the media library by 10-20%.

## Software Requirements

AMMDS requires Docker with Docker Compose plugin:

- **Docker Engine**: This CLI variant is designed for Linux servers (or use via WSL2 on Windows).
- **Docker Desktop**: This GUI variant is not recommended for Linux but can be used on Windows or macOS.


<!--@include: ../snippets/copyright.md-->