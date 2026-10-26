---
title: Bangumi
description: 配置 Bangumi 的授权地址、API 地址与令牌，完成 OAuth 授权，并检索条目、章节、角色声优与制作人员后导入剧集库。
keywords: [Bangumi, 番剧, 剧集, OAuth, 元数据]
tags: []
sidebar_position: 4
---

# Bangumi

Bangumi（bgm.tv）是番组计划数据库，适合为动画、番剧补充条目标题、简介、章节、角色声优与制作人员。读接口无需授权即可使用，涉及账号的接口则需要 OAuth 令牌。

{/* truncate */}

## 打开方式

进入 **集成应用 → 元数据 → Bangumi**。页面包含「配置信息」「连接测试」「条目检索」，以及授权状态与详情区域。

## 配置项

| 配置键 | 界面名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `bangumi_enabled` | 启用状态 | 布尔 | `false` | 插件总开关 |
| `bangumi_auth_url` | 授权地址 | 字符串 | `https://bgm.tv` | OAuth 授权页与令牌接口的基地址 |
| `bangumi_api_url` | API 地址 | 字符串 | `https://api.bgm.tv` | 业务接口基地址 |
| `bangumi_access_token` | 授权 Token | 字符串 | 空 | OAuth 授权成功后自动写入 |
| `bangumi_refresh_token` | 刷新 Token | 字符串 | 空 | 用于自动续期 |
| `bangumi_refresh_token_expires_in` | 刷新有效期 (秒) | 数字 | `604800` | 刷新令牌有效期，默认 7 天 |
| `bangumi_tv_search` | 剧集搜索 | 布尔 | `false` | 控制是否参与剧集 / 动漫检索扇出 |
| `bangumi_request_interval_ms` | 请求间隔 (毫秒) | 数字 | `1000` | 全进程共用的最小请求间隔 |
| `bangumi_language` | 语言 | 字符串 | `zh-CN` | 返回条目文本的语言偏好 |
| `bangumi_access_token_expires_at` | 授权有效期 (秒) | 数字 | `0` | 存 Access Token 的绝对过期时刻（epoch 秒），0 表示未知 |

:::note[为什么看不到客户端 ID / 密钥 / 回调地址 / User-Agent]
应用凭据已内置在后端，回调地址由回调接口的实际访问地址推导，User-Agent 也由后端固定。这四项不再暴露给用户，避免填错导致授权失败。
:::

## 获取授权

1. 在「连接测试」或授权区域点击 **获取授权**。
2. 浏览器打开 Bangumi 授权窗口，登录并同意授权。
3. 授权完成后跳回本站固定回调页 `/admin/integration/bangumi/callback`，后端用授权码换取令牌并写入配置。
4. 页面自动刷新「授权状态」，可看到绑定状态、授权账号、是否支持自动刷新、过期时间与 Token 尾号。

:::tip[读接口不需要令牌]
检索条目、查看详情与章节都走免鉴权接口，未授权也能做检索测试。只有需要以你的账号调用鉴权接口（例如同步收藏进度）时才必须完成授权。
:::

:::warning[更换授权只能覆盖]
后端未提供撤销或清除令牌的接口。需要更换账号时，重新点击「获取授权」即可，新令牌会覆盖现有配置。
:::

## 连接测试

| 按钮 | 检查内容 |
| --- | --- |
| 测试连通性 | 请求 `GET /v0/me`，收到任意 HTTP 响应即视为可达 |
| 校验 Token | 用当前令牌调用 `GET /v0/me`，成功时返回账户信息 |

未配置令牌时，连通性测试仍可能通过，但校验 Token 会失败；这属于预期行为。

## 条目检索

- 输入番剧 / 剧集关键词后点「检索」，结果表格展示封面、条目名、放送日期、平台、集数、评分，点「查看」加载详情。
- 也可以使用「按 ID 查询」，直接输入 Bangumi 条目 ID（如 `400602`）。
- 条目详情包含标签、简介与信息框，并分开展示章节列表、角色与声优、制作人员、关联条目。

:::note[章节的 ep 与 sort]
`ep` 是本篇真实集号，特别篇 / OP / ED 恒为 0（表示无集号）；`sort` 只是组内排序号，会出现重号。取集号请用 `ep`，不要用 `sort`。
:::

## 导入剧集库

在条目详情底部选择季号（`0` 表示特别篇）后点「导入剧集库」；可先点「映射预览」查看归一化后的剧集草稿。导入走剧集域的统一入库出口，按唯一 ID 合并，不会重复创建同一条剧集。

## 相关页面

[插件总览](/docs/integration/overview) · [TMDB](/docs/integration/metadata/tmdb) · [TheTVDB](/docs/integration/metadata/tvdb) · [刮削任务](/docs/task/scrape) · [常见问题](/docs/faq)
