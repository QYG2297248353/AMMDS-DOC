---
title: MetaTube
description: 配置 MetaTube 元数据源，选择内置服务或远程服务、调整数据源优先级与翻译，并通过连接测试和资源检索验证接入。
keywords: [MetaTube, 元数据, 内置服务, 数据源优先级, 翻译]
tags: []
sidebar_position: 1
---

# MetaTube

MetaTube 是面向影视元数据的聚合刮削服务，支持多个影片与演员提供方，并可通过内置翻译把标题、简介等字段转为中文。AMMDS 既能使用本机内置的 MetaTube 进程，也能连接你自行部署的远程服务。

{/* truncate */}

## 打开方式

进入 **集成应用 → 元数据 → MetaTube**。页面自上而下分为应用信息、配置信息、程序下载、连接测试与资源检索。

## 服务模式

| 模式 | 触发条件 | 说明 |
| --- | --- | --- |
| 内置服务 | 「内置服务优先」开启，且本机内置进程正在运行 | 由 AMMDS 启动并管理，默认监听 18080 端口，实际地址由进程状态决定 |
| 远程服务 | 「内置服务优先」关闭，或内置进程未运行 | 使用「远程服务地址」指向的独立 MetaTube 实例 |

:::note[两种模式不会同时生效]
开启「内置服务优先」时优先走内置进程，内置进程未运行时才回退到远程地址。切换模式前先保存配置，再重启内置服务或验证远程地址。
:::

## 配置项

| 配置键 | 界面名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `meta_tube_enabled` | 启用状态 | 布尔 | `false` | 插件总开关，关闭时不参与刮削 |
| `meta_tube_integration_service` | 内置服务优先 | 布尔 | `true` | 优先使用本机内置服务 |
| `meta_tube_service_url` | 远程服务地址 | 字符串 | `https://metatube.lifebus.fun` | 远程实例地址，须带 `http(s)://`，不能以 `/` 结尾 |
| `meta_tube_auth_enabled` | 开启鉴权 | 布尔 | `false` | 远程服务启用 TOKEN 时打开 |
| `meta_tube_token` | 令牌 | 字符串 | 空 | 与远程服务的 TOKEN 一致 |
| `meta_tube_sort` | 优先级 | 列表（逗号分隔） | `Caribbeancom,AVBASE,Pcolle,DUGA,MYWIFE,1Pondo,JAV321,FC2,TOKYO-HOT,JavBus,Getchu,fc2hub,Gcolle,HeyDouga,FALENO,FANZA,H0930,DAHLIA,H4610,HEYZO,SOD,10musume,KIN8,ThePornDBScene,C0930,AVE,PACOPACOMAMA,MGS,ThePornDBMovie,JAVFREE,CaribbeancomPR,MURAMURA` | 数据源尝试顺序，越靠前优先级越高 |
| `meta_tube_enabled_translate` | 开启翻译 | 布尔 | `false` | 刮削时翻译标题、简介等字段 |
| `meta_tube_translate_endpoint` | 翻译服务 | 单选 | `GoogleFree`（候选项：`GoogleFree,Google,OpenAI,DeepL,Baidu,Microsoft`） | 实际只使用其中一个引擎 |
| `meta_tube_google_api_key` | Google API Key | 字符串 | 空 | 选择 Google 翻译时必填 |
| `meta_tube_google_api_url` | Google API Url (自定义) | 字符串 | 空 | 留空使用服务默认地址 |
| `meta_tube_deepl_api_key` | DeepL API Key | 字符串 | 空 | 选择 DeepL 时必填 |
| `meta_tube_deepl_api_url` | DeepL API Url (自定义) | 字符串 | 空 | 留空使用 DeepL 默认地址 |
| `meta_tube_openai_api_key` | OpenAI API Key | 字符串 | 空 | 选择 OpenAI 时必填 |
| `meta_tube_openai_api_url` | OpenAI API Url (自定义) | 字符串 | 空 | 自建网关时填写 |
| `meta_tube_openai_model` | OpenAI Model (模型) | 字符串 | 空 | 使用的模型名称 |
| `meta_tube_openai_prompt` | OpenAI Prompt (提示词) | 字符串 | 空 | 自定义翻译提示词 |
| `meta_tube_baidu_app_id` | Baidu 应用 ID | 字符串 | 空 | 百度翻译应用 ID |
| `meta_tube_baidu_secret_key` | Baidu 密钥 | 字符串 | 空 | 百度翻译密钥 |

:::note[单选默认值]
「翻译服务」的候选清单是 `GoogleFree,Google,OpenAI,DeepL,Baidu,Microsoft`，首次初始化时实际生效的是第一个选项 `GoogleFree`，之后按你保存的引擎运行。`GoogleFree` 为免费通道，稳定性不保证；选择 `Google`、`OpenAI`、`DeepL`、`Baidu` 时还需填写对应的密钥。
:::

## 配置卡片操作

「配置信息」右上角提供：

| 按钮 | 作用 |
| --- | --- |
| 启动内置服务 | 异步启动本机 MetaTube 进程（默认 18080 端口） |
| 停止内置服务 | 异步停止内置进程 |
| 重启内置服务 | 先停止再启动，修改端口占用或程序版本后使用 |
| 刷新配置 | 重新读取当前配置，放弃未保存修改 |
| 保存配置 | 提交全部配置项 |

下方「资源下载」卡片用于 MetaTube 程序本身：缺失时后端会在启动后自动异步下载，也可手动下载、查看进度或删除本地文件。

## 连接测试

| 按钮 | 检查内容 |
| --- | --- |
| 测试连接 | 对「远程服务地址」做健康检查，地址必须以 `http(s)://` 开头且不以 `/` 结尾 |
| 内置应用信息 | 读取内置服务的应用名称、版本与数据库版本，以及演员 / 影片提供方清单 |
| 远程应用信息 | 读取远程服务的同类信息 |

:::tip[内置服务排错]
「测试连接」测的是远程服务地址，不是内置进程。内置服务是否就绪应看「内置应用信息」；提示获取失败时，先确认程序已下载并点击「启动内置服务」。
:::

## 资源检索

「资源检索」用于验证整条链路，分两个标签页：

- **影视检索**：输入关键词或番号（如 `SSIS-001`），点击结果条目加载详情，确认标题、番号、发行日期、时长、评分、演员、导演、制作商、厂商、系列、类型、简介与剧照；确认无误后点「导入影视库」。
- **演员检索**：输入演员名，点击结果加载演员详情（生日、国籍、身高、三围、血型等）。

检索结果为空时，先在「应用信息」中确认对应提供方是否可用，再检查数据源优先级是否把目标站点排得过低。

## 注意事项

- 修改远程地址、鉴权或优先级后必须点「保存配置」，否则只影响当前表单。
- 远程实例位于受限网络时，需要自行解决其出网问题；内置服务跟随 AMMDS 的代理设置。
- 令牌属于凭据，不要粘贴到截图或 Issue 中；怀疑泄露时在远程服务端重新生成。

## 相关页面

[插件总览](/docs/integration/overview) · [TMDB](/docs/integration/metadata/tmdb) · [刮削任务](/docs/task/scrape) · [影视](/docs/media/movie) · [常见问题](/docs/faq)
