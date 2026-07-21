---
title: ThePornDB
description: ThePornDB 是一个专业的成人视频元数据管理工具，支持自动匹配视频元数据，兼容 Plex、Jellyfin 等主流媒体服务器。
keywords: [ThePornDB, 元数据, Stash-Box, 视频管理, 刮削]
tags: [plugin, metadata]
sidebar_position: 2
sidebar_label: "ThePornDB"
---

# ThePornDB

本文介绍 ThePornDB 插件的配置方法，用于自动匹配成人视频元数据，兼容 Plex、Jellyfin 等媒体服务器。

{/* truncate */}

ThePornDB 是一个专业的成人视频元数据管理工具，主要功能是重命名视频文件，让 Plex、Jellyfin 等媒体服务器和 Stash 脚本能自动匹配元数据，不用你手动一个一个改。它支持服务器模式和命令行模式，管理媒体库很方便。

官网：[https://theporndb.net/](https://theporndb.net/)

## 核心特性

- 🎯 **自动匹配**：自动识别视频文件，帮你找到对应的元数据
- 🔧 **多模式运行**：支持服务器模式和命令行模式
- 🌍 **多平台兼容**：和 Plex、Jellyfin 等主流媒体服务器无缝集成
- 📦 **丰富数据源**：提供全面的视频元数据信息
- 🔗 **Stash-Box 支持**：兼容 Stash-Box 元数据管理系统

# Stash-Box

Stash-Box 是一个用 Go 语言开发的自托管元数据管理系统，专门用来组织和提供各种内容集合，不管是安全内容还是成人内容都能管。

官网：[https://docs.stashapp.cc/](https://docs.stashapp.cc/)

## 插件配置

### 前置条件

配置插件前，需要先做好以下准备工作：

#### ThePornDB

##### 账户注册

访问 ThePornDB 官方注册页面注册账户：

- 注册地址：[https://theporndb.net/register](https://theporndb.net/register)

![ThePornDB 账户注册](/img/plugin/theporndb-04.png)

##### API 密钥获取

注册完成后，登录账户获取 API 密钥：

- API 密钥获取地址：[https://theporndb.net/user/api-tokens](https://theporndb.net/user/api-tokens)

#### Stash-Box

Stash-Box 是 Stash 项目的元数据管理组件，提供标准化的元数据存储和搜索服务：

##### 官方实例

访问 Stash-Box 官方文档，查看支持的公共实例：

- 实例列表：[https://docs.stashapp.cc/metadata-sources/stash-box-instances/](https://docs.stashapp.cc/metadata-sources/stash-box-instances/)

:::info[实例说明]
在这个页面可以看到 Stash-Box 支持的公共站点，包括 ThePornDB。你也可以根据官方文档自己部署一个私有 Stash-Box 实例。
:::

:::tip[兼容性提示]
ThePornDB 也可以当 Stash-Box 客户端来用，能获取更丰富的元数据。
:::

![Stash-Box 配置](/img/plugin/theporndb-05.png)

##### API 密钥获取

登录选好的 Stash-Box 实例，在用户设置里生成并获取 API 密钥，后面配置客户端时会用到。

### 配置信息

在 AMMDS 管理界面，通过「集成应用」→「元数据」→「ThePornDB」进入配置页面。

![ThePornDB 插件配置](/img/plugin/theporndb-01.png)

#### 基本配置参数

| 参数 | 说明 | 默认值 | 建议 |
|------|------|--------|------|
| 启动状态 | 控制是否启用 ThePornDB 插件 | 关闭 | 按需开启 |
| 服务地址 | ThePornDB 服务的访问地址 | `https://theporndb.net` | 官方地址稳定可靠，不用改 |
| 密钥 | ThePornDB API 密钥，用来验证身份 | - | 填从官方站点获取的 API 密钥 |

![ThePornDB 高级配置](/img/plugin/theporndb-02.png)

#### 高级配置参数

| 参数 | 说明 | 默认值 | 建议 |
|------|------|--------|------|
| 感知哈希计算 | 是否启用视频感知哈希计算功能（通过分析视频特征来识别） | 开启 | 依赖原始视频文件，不是常规视频文件建议关闭 |
| 模糊匹配 | 是否通过文件名进行模糊匹配 | 关闭 | 如果关闭了感知哈希计算，建议开启这个 |

:::info[配置说明]
- 感知哈希计算能提高识别准确率，但会多占系统资源
- 模糊匹配适合文件名规范但视频文件比较特殊的情况
:::

### Stash 客户端

通过配置 Stash-Box 客户端，可以获取更多元数据：

#### 添加客户端

点「添加客户端」按钮，进入 Stash-Box 客户端配置界面：

![Stash-Box 客户端配置](/img/plugin/theporndb-03.png)

#### 配置参数

| 参数 | 说明 | 配置建议 |
|------|------|----------|
| 是否启用 | 控制这个 Stash-Box 客户端是否生效 | 按需开启 |
| 客户端名称 | 自定义客户端标识名称 | 建议用站点名称，方便识别 |
| GraphQL 地址 | Stash-Box 站点的 API 访问地址 | 下拉选择或手动输入完整 URL |
| API 密钥 | Stash-Box 站点的访问密钥 | 填从对应站点获取的 API 密钥 |

#### 配置方法

1. **选择预设站点**：在客户端名称下拉列表里选官方预设的 Stash-Box 站点，系统会自动填好 GraphQL 地址
2. **手动配置**：如果想添加自定义的 Stash-Box 实例，可以手动填：
   - GraphQL 地址：通常是 `https://{site}/graphql` 这种格式
   - API 密钥：在对应 Stash-Box 站点的用户设置里生成

:::tip[配置建议]
- 建议多添加几个 Stash-Box 客户端，能获取更全面的元数据
- 优先级顺序会影响元数据获取的顺序，可以按需调整
:::

### 测试模块

测试模块提供以下功能，用来验证插件配置和服务是否正常：

#### 测试功能

| 功能 | 说明 | 作用 |
|------|------|------|
| 测试连接 | 验证 ThePornDB 服务地址能不能连上 | 确认网络正常，地址可用 |
| 获取用户信息 | 尝试获取并显示 ThePornDB 账户信息 | 验证 API 密钥是否正确，授权是否成功 |

#### 使用建议

- **配置前测试**：保存配置前，建议先测一下连接，确认服务地址没问题
- **API 密钥验证**：通过获取用户信息功能，验证 API 密钥有没有效
- **故障排查**：元数据获取失败时，可以用测试功能快速定位问题

:::info[测试说明]
- 测试连接只验证网络通不通，不保证服务一定正常
- 获取用户信息需要有效的 API 密钥和网络连接
:::

## 常见问题

### 服务连接失败

**可能原因**：
- 网络连接问题
- 服务地址配错了
- API 密钥无效

**解决方案**：
- 检查网络连接是否正常
- 确认服务地址格式对不对
- 确认 API 密钥有没有过期或填错
- 试试用官方默认的服务地址

### 元数据获取失败

**可能原因**：
- 视频文件命名不规范
- 感知哈希计算失败
- 数据源站点暂时不可用

**解决方案**：
- 开启模糊匹配功能
- 检查视频文件格式是否支持
- 换个 Stash-Box 客户端试试
- 等一会儿再重试

### Stash-Box 客户端配置错误

**可能原因**：
- GraphQL 地址格式不对
- API 密钥权限不够
- 站点访问受限

**解决方案**：
- 确认 GraphQL 地址是不是完整的路径
- 确保 API 密钥有足够的权限
- 检查网络环境能不能访问该站点
- 试试用其他 Stash-Box 实例

### 性能问题

**可能原因**：
- 感知哈希计算占系统资源
- 多个客户端同时请求
- 网络延迟高

**解决方案**：
- 如果设备性能有限，考虑关闭感知哈希计算
- 合理配置客户端优先级，避免同时请求
- 选网络延迟低的 Stash-Box 实例

:::tip[最佳实践]
- 定期更新 API 密钥，保证安全
- 只添加必要的 Stash-Box 客户端，避免浪费资源
- ThePornDB 和 Stash-Box 配合使用，获取更全面的元数据
:::
