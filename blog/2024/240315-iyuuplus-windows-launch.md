---
slug: iyuuplus-windows-launch
title: IYUUPlus-Windows 客户端正式发布
authors: [studio]
tags: [studio, release, feature]
date: 2024-03-15
---

# IYUUPlus-Windows 客户端正式发布

经过数月的开发与内测，我们很高兴地宣布 **IYUUPlus-Windows 客户端** 正式发布！这是一款基于 Electron + IYUUPlus 封装的 Windows 桌面客户端，旨在为 Windows 用户提供更为便捷的 IYUUPlus 使用体验。

{/* truncate */}

## 核心功能

IYUUPlus-Windows 客户端在保留 IYUUPlus 全部功能的基础上，针对桌面环境进行了深度优化：

- **一键刷新**：无需登录 Web 后台，直接在系统托盘即可触发站点资源刷新
- **服务重启**：当服务出现异常时，可快速重启 IYUUPlus 服务，无需进入命令行
- **数据统计**：在桌面端直观展示运行数据，包括站点连接状态、下载任务统计、成功/失败比率等
- **托盘管理**：最小化至系统托盘运行，支持开机自启，不干扰日常工作

## 技术架构

客户端采用 Electron 框架封装，底层集成了 IYUUPlus 的核心服务。整体架构分为三层：

1. **UI 层**：基于 Web 技术构建的图形界面，提供友好的用户交互体验
2. **桥接层**：Electron 主进程负责管理窗口生命周期、系统托盘、自动更新等桌面功能
3. **服务层**：内置 IYUUPlus 服务进程，处理站点调度、种子下载等核心业务

这种架构设计的优势在于：用户无需单独部署 Web 环境和配置 PHP 运行环境，安装客户端即可开箱即用。

## 下载与安装

客户端安装包已上传至 GitHub Release 页面，支持 Windows 10/11 64 位系统。安装过程简单直观：

1. 从 GitHub Releases 下载最新版安装包
2. 运行安装程序，按照向导完成安装
3. 启动客户端，配置站点信息即可开始使用

## 回顾与展望

IYUUPlus-Windows 客户端是 AMMDS 诞生前工作室最重要的产品之一。通过这个项目，我们积累了丰富的桌面端开发经验，深入理解了自托管用户在使用媒体管理工具时的痛点和需求。这些经验后来被直接应用到了 AMMDS 的设计与开发中，从用户体验到架构设计都产生了深远影响。

欢迎广大用户下载体验，如有问题或建议，请通过 GitHub Issues 反馈。
