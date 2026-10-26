---
title: 翻译服务
description: 翻译服务提供内置翻译与 MetaTube 两条通道，支持机器翻译与 AI 翻译供应商、多语言与可定制提示词，用于刮削时补齐中文标题、简介与标签。
keywords: [翻译服务, AI 翻译, 机器翻译, 提示词, MetaTube, 多语言]
tags: []
sidebar_position: 2
---

# 翻译服务

翻译服务负责把刮削到的外文标题、简介与标签翻译为中文。它有两种通道：AMMDS 内置翻译（可直接管理机器翻译与 AI 翻译供应商）与 MetaTube 插件翻译；通道选择由「默认翻译方式」决定。

{/* truncate */}

## 在刮削中的位置

1. 在[刮削任务](/docs/backend/task/scrape)的刮削配置中打开「字段翻译」——该开关默认关闭。
2. 确认本插件的「启用状态」已打开。
3. 刮削完成后，若标题或剧情缺少中文，系统按「默认翻译方式」调用对应通道，失败自动重试 3 次。
4. 翻译属于辅助步骤：失败只记录日志，不影响已经完成的元数据匹配。

:::note[目标语言]
刮削链路固定把外文内容翻译为简体中文（源语言自动识别），无需在插件页单独设置目标语言。
:::

## 配置项

| 配置键 | 界面名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `translation_enabled` | 启用状态（界面显示「启用翻译」） | 布尔 | `false` | 总开关；关闭时翻译请求直接返回「翻译服务未启用」 |
| `translation_ai_priority` | AI 优先 | 布尔 | `false` | 开启后路由先试 AI 翻译，全部失败再依次试机器翻译 |
| `translation_default_method` | 默认翻译方式 | 单选 | `ammds`（候选 `ammds`、`metatube`） | `ammds` 走内置翻译，`metatube` 走 MetaTube 翻译接口 |
| `translation_prompt_title` | 标题翻译 Prompt | 文本 | 内置英文模板 | 可用 `{source_lang}`、`{target_lang}`、`{content}` |
| `translation_prompt_description` | 描述翻译 Prompt | 文本 | 内置英文模板 | 同上，用于简介 |
| `translation_prompt_tags` | 标签翻译 Prompt | 文本 | 内置英文模板 | 同上，用于标签 |
| `translation_prompt_default` | 默认翻译 Prompt | 文本 | 内置英文模板 | 未命中专用模板时使用 |

枚举登记的默认翻译方式为 `ammds,metatube`；该配置是单选，取首项生效，所以实际默认走内置翻译。

## 翻译通道

### 内置翻译（ammds）

内置翻译会读取供应商列表，先过滤不可用的供应商，再按优先级依次尝试，返回第一个成功的结果。

| 分类 | 供应商 | 需要填写 |
| --- | --- | --- |
| 机器翻译 | DeepL | 服务地址、服务端点、授权码 |
| 机器翻译 | DeepLX | 服务地址、服务端点、授权码 |
| 机器翻译 | 谷歌翻译Free | 无需配置 |
| 机器翻译 | 微软翻译Free | 无需配置 |
| 机器翻译 | 百度翻译 | 服务地址、服务端点、App ID、密钥 |
| 机器翻译 | 小牛翻译 | 服务地址、服务端点、App ID、App Key |
| 机器翻译 | 彩云翻译 | 服务地址、服务端点、Token |
| 机器翻译 | 腾讯翻译 | 服务地址、区域、项目 ID、SecretId、SecretKey |
| AI 翻译 | OpenAI 兼容 | 服务地址、服务端点、密钥、模型、温度、提示语 |
| AI 翻译 | Gemini 兼容 | 服务地址、服务端点、密钥、模型、温度、提示语 |
| AI 翻译 | Anthropic 兼容 | 服务地址、服务端点、密钥、模型、温度、提示语 |

供应商以卡片形式展示，每张卡片可查看在线/离线状态与优先级，并提供：

- 启用开关：即时切换该供应商是否参与路由
- 测试：填入待翻译文本与源/目标语言，单独验证该供应商
- 编辑 / 删除：修改配置或移除供应商

:::tip[AI 优先的实际效果]
「AI 优先」不是只把 AI 排在前面那么简单：路由会把全部 AI 供应商整体排在机器翻译之前，AI 全部失败后仍会继续尝试机器翻译，因此无需手工兜底。
:::

### MetaTube 翻译（metatube）

选择 `metatube` 时，翻译请求转发给 MetaTube 服务，使用该插件页维护的引擎与密钥：

| 配置键 | 界面名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `meta_tube_enabled_translate` | 开启翻译 | 布尔 | `false` | MetaTube 侧的翻译开关 |
| `meta_tube_translate_endpoint` | 翻译服务 | 单选 | `GoogleFree`（候选 `GoogleFree`、`Google`、`OpenAI`、`DeepL`、`Baidu`、`Microsoft`） | 实际调用的翻译引擎 |
| `meta_tube_google_api_key` | Google API Key | 文本 | 空 | 选择 Google 时必填 |
| `meta_tube_google_api_url` | Google API Url (自定义) | 文本 | 空 | 留空使用官方地址 |
| `meta_tube_deepl_api_key` | DeepL API Key | 文本 | 空 | 选择 DeepL 时必填 |
| `meta_tube_deepl_api_url` | DeepL API Url (自定义) | 文本 | 空 | 留空使用官方地址 |
| `meta_tube_openai_api_key` | OpenAI API Key | 文本 | 空 | 选择 OpenAI 时必填 |
| `meta_tube_openai_api_url` | OpenAI API Url (自定义) | 文本 | 空 | 兼容中转地址 |
| `meta_tube_openai_model` | OpenAI Model (模型) | 文本 | 空 | 翻译使用的模型名 |
| `meta_tube_openai_prompt` | OpenAI Prompt (提示词) | 文本 | 空 | 自定义翻译指令 |
| `meta_tube_baidu_app_id` | Baidu 应用 ID | 文本 | 空 | 选择 Baidu 时必填 |
| `meta_tube_baidu_secret_key` | Baidu 密钥 | 文本 | 空 | 选择 Baidu 时必填 |

MetaTube 服务地址、鉴权与数据源优先级在 [MetaTube](/docs/integration/metadata/metatube) 页面维护。

## 提示词

「提示词配置」标签页按内容类型分页：标题、描述、标签、默认，另有「帮助」页说明用法。

- 可用变量：`{content}` 待翻译内容、`{source_lang}` 源语言、`{target_lang}` 目标语言
- 每个页签提供「恢复默认」「清空」「保存」；保存后写入系统配置
- 模板按内容类型分别维护；AI 供应商实际请求时使用的是该供应商配置里的「提示语」，可在供应商编辑弹窗中调整
- MetaTube 通道使用其自身的 OpenAI Prompt 配置，不受这里的模板影响

## 语言

| 代码 | 语言 | 代码 | 语言 |
| --- | --- | --- | --- |
| `auto` | 自动检测（仅源语言） | `ko` | 韩语 |
| `zh` | 简体中文 | `ru` | 俄语 |
| `cht` | 繁体中文 | `cs` | 捷克语 |
| `en` | 英语 | `ja` | 日语 |

具体某个供应商支持哪些语言，以其接口能力为准；不支持的语言会被路由跳过。

## 翻译测试

| 字段 | 说明 |
| --- | --- |
| 测试内容 | 待翻译文本 |
| 翻译结果 | 只读输出 |
| 内容类型 | 当前仅「通用」 |
| 翻译方式 | 机器翻译 / AI 翻译 / 自动 |
| 源语言、目标语言 | 从上方语言表中选择 |

点击「开始测试」后执行一次翻译，成功时在结果下方显示实际使用的翻译引擎。

## 常见问题

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| 提示翻译服务未启用 | 总开关关闭 | 打开「启用状态」并保存 |
| 内置翻译全部失败 | 没有可用供应商，或密钥失效 | 在供应商卡片点「测试」逐个排查 |
| MetaTube 通道无结果 | 未开启其翻译开关，或服务地址不可达 | 检查 MetaTube 插件页的翻译配置与服务地址 |
| 刮削后仍无中文 | 刮削配置的「字段翻译」未开启 | 到[刮削任务](/docs/backend/task/scrape)打开该开关后重试 |
| 译名不符合预期 | 提示语过于宽松 | 调整对应 AI 供应商的「提示语」后重新刮削 |
