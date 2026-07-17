---
title: Metatube
description: MetaTube 是一个开源工具，专门为 Jellyfin、Emby 和 Plex 等媒体服务器抓取影片信息，支持高精度识别中文资源。
keywords: [MetaTube, 元数据, 刮削, 海报墙, Jellyfin]
tags: [plugin, metadata]
sidebar_position: 1
sidebar_label: "Metatube"
---

# Metatube

MetaTube 是一个开源工具，专门给 Jellyfin、Emby 和 Plex 这类媒体服务器抓取影片信息。它能自动获取海报、简介、演员、制作公司、评分等数据。这个插件特别擅长识别中文资源，通过自建 API 帮你把媒体库整理成漂亮的「海报墙」。

## 特性

MetaTube 插件有以下几个核心功能：

- 🎯 **高精度识别**：针对中文资源优化了识别算法，识别成功率更高
- 🌍 **多平台支持**：兼容 Jellyfin、Emby 和 Plex 等主流媒体服务器
- 📦 **双服务模式**：支持远程部署和内置服务两种模式
- 🔐 **安全鉴权**：通过 TOKEN（令牌）机制保证服务访问安全
- 🌐 **多部署方案**：支持 Docker 本地部署和 Koyeb 云服务部署
- 📝 **自动翻译**：内置多种翻译服务，能自动翻译元数据
- 🎭 **丰富数据源**：整合了多个演员和影片数据提供商

## 部署方案

MetaTube 有几种不同的部署方式，你可以按需选择：

### 自部署方案

:::info 官方文档
更详细的部署说明可以参考 [MetaTube 官方文档](https://metatube-community.github.io/)
:::

#### Docker 部署

**部署命令**：

```bash
docker run -d -p 8080:8080 -v $PWD/config:/config --name metatube ghcr.io/metatube-community/metatube-server:latest -dsn /config/metatube.db
```

**升级操作**：

```bash
docker stop metatube
docker rm metatube
docker run -d -p 8080:8080 -v $PWD/config:/config --name metatube ghcr.io/metatube-community/metatube-server:latest -dsn /config/metatube.db
```

#### Docker Compose 部署

**创建配置文件**：

```bash
vi docker-compose.yml
```

**配置内容**：

```yaml
services:
  metatube-server:
    image: ghcr.io/metatube-community/metatube-server:latest
    container_name: metatube
    restart: always
    network_mode: bridge
    ports:
      - 8080:8080
    environment:
      - HTTP_PROXY=${HTTP_PROXY:-}
      - HTTPS_PROXY=${HTTPS_PROXY:-}
      - DB_AUTO_MIGRATE=true
      - PORT=8080
```

**启动服务**：

```bash
docker-compose up -d
```

**升级服务**：

```bash
docker-compose up -d --force-recreate
```

#### 配置访问令牌

部署完成后，要记下以下信息，后面配置会用到：

- **访问地址**：一般是部署主机的 IP 加 8080 端口，比如：`http://192.168.1.100:8080`
- **TOKEN**：32 位的字符串，用来验证身份，建议随机生成

**生成随机 TOKEN**：

```bash
openssl rand -hex 16
```

**配置 TOKEN**：

#### Docker 命令配置

```bash
docker run -d -p 8080:8080 -v $PWD/config:/config --name metatube -e TOKEN=your_token ghcr.io/metatube-community/metatube-server:latest -dsn /config/metatube.db
```

#### Docker Compose 配置

```yaml
services:
  metatube-server:
    environment:
      - TOKEN=your_token
```

### Koyeb 部署方案

Koyeb 是一个云服务平台，可以在线部署，适合没有自己服务器的人：

:::info 账户准备
部署前要先注册 Koyeb 账户，免费账户就够用了。
:::

#### 快捷部署

点下面的按钮一键部署：

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=metatube-ms&type=docker&image=ghcr.io/metatube-community/metatube-server:latest&instance_type=free&regions=was&instances_min=0&autoscaling_sleep_idle_delay=300&env[MT_PROVIDER_MADOUQU__PRIORITY]=1000&env[MT_PROVIDER_MODELMEDIAASIA__PRIORITY]=1000&env[PORT]=3000&ports=3000;http;/&hc_protocol[3000]=tcp&hc_grace_period[3000]=5&hc_interval[3000]=30&hc_restart_limit[3000]=3&hc_timeout[3000]=5&hc_path[3000]=/)

**部署步骤**：
1. 登录 Koyeb 账户
2. 点上面的按钮创建应用
3. 在环境变量里添加 `TOKEN`（建议用随机生成的 32 位字符串）
4. 点「部署」按钮，等部署完成

#### 手动部署

**步骤 1：创建服务**

![Create service](/img/plugin/metatube-koyeb-01.png)

- 登录 Koyeb 控制台，点左侧「Create service」按钮
- 服务类型选「Web service」
- 部署方式选「Docker」

**步骤 2：配置镜像**

![Create service](/img/plugin/metatube-koyeb-02.png)

- 镜像地址：`ghcr.io/metatube-community/metatube-server:latest`

**步骤 3：选择区域**

![Create service](/img/plugin/metatube-koyeb-03.png)

- 免费账户只能用 Washington, DC 区域
- 建议选日本或美国区域，访问体验更好（需要付费账户）

**步骤 4：配置环境变量**

![Create service](/img/plugin/metatube-koyeb-04.png)

- 设置 `PORT` 为 `3000`
- 设置 `TOKEN` 作为鉴权密钥，防止别人乱访问

**步骤 5：配置端口映射**

![Create service](/img/plugin/metatube-koyeb-05.png)

- 端口填：`3000`（要和环境变量 `PORT` 一致）
- 协议选：`http`
- 勾选「Public HTTPS access」并把路径设为 `/`

**步骤 6：配置健康检查**

![Create service](/img/plugin/metatube-koyeb-06.png)

- 协议选：`tcp`
- 端口填：`3000`（要和环境变量 `PORT` 一致）
- 其他参数保持默认

**步骤 7：完成部署**
点「Deploy」按钮，等部署完成就行。

#### 部署完成

![Create service](/img/plugin/metatube-koyeb-07.png)

- 在 Koyeb 控制台的「Overview」页面可以查看应用的访问地址

![Create service](/img/plugin/metatube-koyeb-08.png)

- 访问这个地址可以验证 Metatube 服务是否正常工作
- 服务地址格式：`https://xxxx-xxx-xxx.koyeb.app/`（xxxx-xxx-xxx 是 Koyeb 分配的应用名称）

:::tip 重要信息
记下访问地址和 TOKEN，后面配置 AMMDS 插件时会用到。
:::

## 插件配置

在 AMMDS 管理界面，通过「集成应用」→「元数据」→「Metatube」进入配置页面。

### 服务模式

MetaTube 插件支持两种服务模式：

- **远程服务**：使用外部部署的 MetaTube 服务
- **内置服务**：使用 AMMDS 自带的 MetaTube 服务

:::note 优先级说明
同一时间只能用一种服务模式，内置服务优先级比远程服务高。
:::

### 快捷操作

![Metatube 插件配置](/img/plugin/metatube-01.png)

配置页面右上角有这些快捷操作：

- **启动服务**：启动内置 Metatube 服务
- **停止服务**：停止内置 Metatube 服务
- **重启服务**：重启内置 Metatube 服务
- **刷新配置**：刷新配置项
- **保存配置**：保存当前配置（所有配置修改都要点这个按钮才会生效）

### 配置参数

![Metatube 插件配置](/img/plugin/metatube-02.png)

#### 基本配置

| 参数 | 说明 | 默认值 |
|------|------|--------|
| 启用状态 | 控制是否启用 Metatube 插件 | 关闭 |
| 跟随启动 | 控制是否随 AMMDS 启动而自动启动内置 Metatube 服务 | 关闭 |
| 远程服务地址 | Metatube 服务的访问地址 | - |

**远程服务地址示例**：
- `https://xxxx-xxx-xxx.koyeb.app`
- `http://192.168.1.100:3000`

:::info 注意事项
- 远程服务地址结尾不要加 `/`，否则会访问出错。
:::

#### 鉴权配置

| 参数 | 说明 | 默认值 |
|------|------|--------|
| 开启鉴权 | 是否开启 Metatube 服务身份验证 | 关闭 |
| 令牌 | Metatube 服务的访问令牌 | - |

:::warning 鉴权说明
如果部署 Metatube 服务时设置了 TOKEN，那这里必须开启鉴权并填上正确的令牌。
:::

#### 数据源配置

- **优先级**：设置数据源的先后顺序，排在前面的会优先使用

#### 翻译配置

![Metatube 插件配置](/img/plugin/metatube-03.png)

| 参数 | 说明 | 默认值 |
|------|------|--------|
| 自动翻译 | 是否开启自动翻译服务 | 关闭 |
| 翻译服务 | 选择翻译服务提供商 | - |
| API 密钥 | 部分翻译服务需要填 API 密钥 | - |

:::info 翻译说明
开启自动翻译后，会自动翻译标题、描述等字段，而且对其他插件的翻译也有效。
:::

### 测试模块

![Metatube 插件测试](/img/plugin/metatube-04.png)

**快捷操作**：

- **测试连接**：测试远程服务地址能不能连上（只检测网络通不通，不保证服务正常）
- **内置应用信息**：查看内置 Metatube 服务的应用信息（版本号、配置等）
- **远程应用信息**：查看远程 Metatube 服务的应用信息（版本号、配置等）

![Metatube 插件测试](/img/plugin/metatube-05.png)

**应用信息展示**：

- **基本信息**：包括版本号、数据库版本等
- **演员供应商**：提供演员数据（头像、基本信息等）的数据源
- **影片供应商**：提供影片元数据（标题、描述、演员、导演、上映日期等）的数据源

### 注意事项

#### 地域限制

部分供应商站点（比如 DMM）对访问地域有限制，可能导致数据获取失败。

:::tip 建议
部署在日本或美国区域，访问效果最好。
:::

#### 代理配置

- **内置服务**：会自动使用 AMMDS 的代理设置
- **远程服务**：需要自己解决网络访问问题，确保服务能正常访问供应商站点

:::note 代理生效
如果代理没生效，建议配好代理后重启 AMMDS 服务。
:::

## 常见问题

### 服务无法访问

**排查步骤**：
1. 检查服务是否正常运行
2. 验证网络连接是否正常
3. 确认防火墙有没有放行对应端口
4. 检查 TOKEN 配置是否正确

### 数据获取失败

**可能原因**：
- 网络环境限制（比如地域限制）
- 数据源站点暂时不可用
- 服务配置错误

**解决方案**：
- 尝试换个部署区域
- 检查网络代理设置
- 验证数据源配置是否正确

### 翻译服务不工作

**排查步骤**：
1. 确认已开启自动翻译功能
2. 检查翻译服务 API 密钥是否正确
3. 验证网络连接是否正常
4. 尝试换个翻译服务提供商
