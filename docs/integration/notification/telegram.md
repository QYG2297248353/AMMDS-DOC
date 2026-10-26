---
title: Telegram
description: 用 Telegram 机器人接收 AMMDS 通知并反向控制：配置 Bot Token 与 Chat ID，注册指令与 Webhook，理解推送与夜间免打扰规则。
keywords: [Telegram, Bot, 通知推送, Chat ID, Webhook]
tags: []
sidebar_position: 1
---

# Telegram

Telegram 是 AMMDS 的主力通知渠道，也是唯一支持**反向控制**的渠道：除了收通知，还能用指令检索、订阅、跑任务。

{/* truncate */}

## 渠道定位

| 项目 | 说明 |
| --- | --- |
| 页面入口 | **集成应用 → 推送通知 → Telegram** |
| 集成版本 | 页面顶部标注 `5.13.1+`，类型为「消息推送」 |
| 消息形态 | 文本 + 图片，图片可开启剧透蒙版 |
| 双向能力 | 推送通知 + Bot 指令控制 |

## 配置项

| 配置键 | 界面名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `telegram_enabled` | 启用状态 | 布尔 | `false` | 关闭后所有 Telegram 接口返回「请启用 Telegram 插件」 |
| `telegram_server_url` | 服务地址 | 字符串 | `https://api.telegram.org` | Bot API 地址，可改为自建反向代理 |
| `telegram_bot_token` | Bot Token | 字符串 | 空 | BotFather 创建机器人后签发的令牌；系统检查中的必填项 |
| `telegram_chat_id` | Chat ID | 字符串 | 空 | 接收消息的私聊、群组或频道 ID |
| `telegram_webhook_url` | Webhook URL | 字符串 | 空 | 回调地址，留空表示不注册回调 |
| `telegram_spoiler_mode` | 剧透模式 | 布尔 | `false` | 消息含图片时是否加剧透蒙版 |

## 获取凭据

1. 在 Telegram 搜索 `@BotFather`，按提示创建机器人。
2. 复制返回的 Token，填入「Bot Token」。
3. 保存配置后点「获取 Chat ID」：先给机器人发一条消息，系统会读取最近一次会话并回填。
4. 保存后再点「推送测试」验证链路。

:::tip[Chat ID 的三种形态]
私聊 ID 是正数，群组与频道通常是负数。群组里需要先把机器人拉进群，否则收不到消息。
:::

## 注册指令与 Webhook

| 按钮 | 作用 | 前置条件 |
| --- | --- | --- |
| 获取 Chat ID | 读取机器人最近一次会话的 Chat ID | 已填 Bot Token，且已给机器人发过消息 |
| 注册指令 | 向 Bot API 注册指令菜单 | 已填服务地址与 Bot Token |
| 注册 Webhook | 把回调地址注册到 Telegram | 系统配置中已完成**域名绑定** |
| 推送测试 | 用测试模板发一条消息 | 已填 Bot Token 与 Chat ID |
| 测试连接 | 探测 Bot API 地址可达性 | 无 |

注册指令是幂等的：若必需的几条指令（`ammds`、`movie`、`actor`、`resource`、`deepseek`、`system`）已存在，就不会重复提交，避免覆盖你自行添加的指令。

可用指令包括：`/start`、`/stop`、`/help`、`/version`、`/movie`、`/actor`、`/resource`、`/magnet`、`/search`、`/deepseek`、`/system`、`/subscribe`、`/unsubscribe`、`/favorite`、`/unfavorite`、`/scan`、`/scrape`、`/media_sync`、`/restart`。

:::warning[Webhook 需要公网可达]
注册 Webhook 前必须在系统配置中完成域名绑定，否则接口直接拒绝。家庭内网部署建议不注册 Webhook，改用默认轮询方式接收指令。
:::

## 通知触发场景

| 分类 | 触发场景 |
| --- | --- |
| 系统消息 | 服务启动 / 关闭、磁盘空间不足、账户长期未登录提醒 |
| 订阅消息 | 订阅命中资源、订阅失败 |
| 下载消息 | 已推送下载、下载完成 |
| 入库消息 | 影片入库完成 |
| 认证消息 | 站点认证结果 |
| 影片刮削 | 刮削成功 |
| 演员刮削 | 演员刮削成功 |
| 测试消息 | 手动推送测试 |

## 系统级开关

通知是否真的发出去，还要过三道系统级开关（**系统配置 → 通知**）：

| 配置键 | 界面名称 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `system_notice_enable` | 启用通知推送 | `true` | 总开关，关闭后所有渠道都不推送 |
| `system_notice_type` | 消息类型 | 见说明 | 分类白名单，多选、以英文逗号分隔；未勾选的分类不推送 |
| `system_notice_night_free` | 夜间免打扰 | `false` | 开启后 22:00 至次日 08:00 不推送 |

`system_notice_type` 的默认值为 `system,subscription,download,library,certification,vip,scrape,actor_scrape`。分类按代码匹配，若某类通知收不到，先检查该分类是否在列表里，必要时手动补选。

:::note[被开关跳过不算失败]
夜间免打扰或分类未勾选时，系统按「无需推送」处理并记录日志，不会报错，也不会补发。
:::

## 常见问题

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| 推送测试成功但收不到消息 | Chat ID 属于别的会话，或机器人被踢出群 | 重新「获取 Chat ID」并核对 |
| 获取 Chat ID 失败 | 还没给机器人发过消息 | 先私聊机器人发一条，再点按钮 |
| 注册 Webhook 被拒绝 | 未完成域名绑定 | 在系统配置中绑定域名后重试 |
| 通知全部不来 | 总开关关闭，或当前处于夜间免打扰 | 检查系统配置中的通知开关 |
| 指令菜单是旧的 | 之前已注册过部分指令 | 先删除再重新注册 |

## 相关页面

- [插件集成总览](/docs/integration/overview)
- [Bark](/docs/integration/notification/bark)｜[WebHook](/docs/integration/notification/webhook)
- [系统配置](/docs/system/config)｜[网络与连通性](/docs/dashboard/network)
- [订阅检索](/docs/subscribe/search)｜[常见问题](/docs/faq)
