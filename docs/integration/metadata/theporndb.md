---
title: ThePornDB / StashBox
description: 配置 ThePornDB 服务地址与 API 密钥，管理 Stash 客户端，并通过影视、演员检索与感知哈希程序完成元数据导入。
keywords: [ThePornDB, StashBox, Stash, 元数据, API Key]
tags: []
sidebar_position: 5
---

# ThePornDB / StashBox

ThePornDB 提供影片与演员元数据；除官方 API 外，还可以接入自建或公共的 Stash-Box 实例。AMMDS 把两类来源放在同一页面，分别用于检索与导入。

{/* truncate */}

## 打开方式

进入 **集成应用 → 元数据 → ThePornDB**。页面包含「配置信息」「Stash 客户端」「程序下载」「连接测试」「资源检索」。

## 配置项

| 配置键 | 界面名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `theporndb_enabled` | 启用状态 | 布尔 | `false` | 插件总开关 |
| `theporndb_service_url` | 服务地址 | 字符串 | `https://api.theporndb.net` | ThePornDB API 地址 |
| `theporndb_api_key` | 密钥 | 字符串 | 空 | 在 ThePornDB 用户设置中生成的 API Token |
| `theporndb_enable_hash` | 感知哈希计算 | 布尔 | `false` | 开启后计算图片感知哈希用于相似度比对，依赖 VideoHashes 程序 |
| `theporndb_enable_fuzzy_match` | 模糊匹配 | 布尔 | `false` | 开启后允许按标题模糊匹配 |
| `theporndb_ranking_enabled` | 榜单采集 | 布尔 | `false` | 开启后定时采集站点榜单 |

:::note[API 密钥]
登录 ThePornDB 后，在账户的 API Token 页面生成密钥并填入配置；随后可用「连接测试」与「获取用户信息」验证。
:::

## Stash 客户端

「Stash 客户端」卡片用于管理 Stash-Box 连接，与上方 ThePornDB 配置相互独立：

| 操作 | 说明 |
| --- | --- |
| 添加客户端 | 填写名称、端点（GraphQL 入口，形如 `http://host:9999/graphql`）、密钥与启用状态 |
| 健康检查 | 新增或编辑时按填写的端点与密钥探测，已保存的客户端也可单独检查 |
| 编辑 / 删除 | 修改连接参数或移除客户端 |

添加客户端后，检索区的「Stash 影视」「Stash 演员」会遍历所有已配置且启用的客户端；没有可用客户端时会提示检查 Stash 客户端配置。

:::warning[不要把 Stash 密钥填到主配置]
ThePornDB 的 `theporndb_api_key` 与 Stash 客户端密钥是两套凭据。Stash 密钥随客户端保存，主配置里的密钥只用于官方 API。
:::

## 程序下载

「感知哈希计算」依赖 VideoHashes 程序。缺失时后端会在启动后自动异步下载，也可在卡片中手动下载、查看进度或删除本地文件。未开启感知哈希时无需该程序。

## 连接测试

| 按钮 | 检查内容 |
| --- | --- |
| 测试连接 | 请求 ThePornDB API，确认服务可达 |
| 获取用户信息 | 用当前密钥读取账户信息，验证密钥有效并展示用户资料 |

连接测试通过但获取用户信息失败，通常是密钥错误或配额问题。

## 资源检索

| 标签页 | 检索对象 | 可执行操作 |
| --- | --- | --- |
| ThePornDB 影视 | 按关键词检索，可切换「场景 / 影片」类型 | 查看详情、官网，点「导入影视库」 |
| ThePornDB 演员 | 按演员名检索 | 查看生日、国籍、身高、三围、罩杯、别名，点「导入演员库」 |
| Stash 影视 | 在已配置的 Stash 客户端中检索 | 查看详情，点「导入影视库」 |
| Stash 演员 | 在已配置的 Stash 客户端中检索 | 查看详情，点「导入演员库」 |

检索仅用于验证与手动补录，日常刮削由[刮削任务](/docs/task/scrape)按配置自动完成。

## 榜单采集

打开「榜单采集」后，后台会定时采集 ThePornDB 的「最近更新」榜单。该开关只影响榜单任务，不影响检索与刮削。

## 相关页面

[插件总览](/docs/integration/overview) · [TheJavDB](/docs/integration/metadata/thejavdb) · [R18.dev](/docs/integration/metadata/r18dev) · [影视](/docs/media/movie) · [常见问题](/docs/faq)
