---
title: Bark
description: 用 Bark 把 AMMDS 通知推到 iOS 设备：配置服务地址与设备密钥，设置图标、分组与 Markdown 优先，并理解免打扰规则。
keywords: [Bark, iOS 推送, 通知推送, 设备密钥, 免打扰]
tags: []
sidebar_position: 2
---

# Bark

Bark 是 iOS 上的轻量推送工具，一个设备密钥就能收通知。对不想折腾机器人的场景，它比 Telegram 更省事：装 App、复制密钥、发一条测试消息即可。

{/* truncate */}

## 渠道定位

| 项目 | 说明 |
| --- | --- |
| 页面入口 | **集成应用 → 推送通知 → Bark** |
| 集成版本 | 页面顶部标注 `1.10.1+`，类型为「消息推送」 |
| 目标设备 | iOS（Bark App） |
| 服务形态 | 官方 `api.day.app` 或自建 Bark 服务端 |

## 配置项

| 配置键 | 界面名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `bark_enabled` | 启用状态 | 布尔 | `false` | 关闭后推送测试返回「请启用 Bark 插件」，通知也不再走该渠道 |
| `bark_server_url` | 服务地址 | 字符串 | `https://api.day.app` | 官方地址或自建服务端地址 |
| `bark_token` | 设备密钥 | 字符串 | 空 | Bark App 中显示的密钥；系统检查中的必填项 |
| `bark_logo` | 通知图标 | 字符串 | AMMDS 图标地址 | 通知左侧展示的图标 URL |
| `bark_group` | 通知分组 | 字符串 | `AMMDS` | iOS 通知中心里的分组名，便于折叠归类 |
| `bark_markdown_priority` | Markdown 优先 | 布尔 | `false` | 优先按 Markdown 渲染消息正文 |

## 获取设备密钥

1. 在 iOS 上安装 Bark App 并打开。
2. 首页会显示一条形如 `https://api.day.app/xxxxxxxx/` 的推送地址。
3. 复制其中的密钥部分（`api.day.app/` 之后那一段），填入「设备密钥」。
4. 保存后点「推送测试」。

:::tip[自建服务端]
如果用的是自建 Bark 服务端，「服务地址」要改成自建地址，密钥以自建服务端显示的为准；两者不匹配时请求会被拒绝。
:::

## 连接测试

| 按钮 | 检查内容 |
| --- | --- |
| 测试连接 | 只验证「服务地址」可达，不校验设备密钥 |
| 推送测试 | 用测试模板真实发一条推送，验证密钥与服务端 |

渠道还提供状态查询：可返回 Bark 服务端的版本、构建信息与**已注册设备数**，用于判断服务端是否正常工作。

## 通知样式

| 配置 | 效果 |
| --- | --- |
| 通知图标 | 替换通知左侧图标，默认使用 AMMDS 图标 |
| 通知分组 | 同一分组的通知在通知中心折叠在一起 |
| Markdown 优先 | 正文按 Markdown 渲染，适合带链接与列表的消息 |

:::warning[Markdown 与客户端版本]
Markdown 渲染依赖 Bark 客户端版本。老版本 App 上开启该选项可能出现排版错乱，遇到时先关闭再试。
:::

## 通知触发场景

Bark 与其它渠道共用同一套通知内容，常见场景包括：

- 系统消息：服务启动 / 关闭、磁盘空间不足、账户长期未登录提醒。
- 订阅与下载：订阅命中、订阅失败、已推送下载、下载完成。
- 入库与刮削：影片入库、影片刮削成功、演员刮削成功。
- 站点认证：认证结果。
- 测试消息：手动推送测试。

## 系统级开关

推送前会依次校验三道系统级开关（**系统配置 → 通知**）：

| 配置键 | 界面名称 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `system_notice_enable` | 启用通知推送 | `true` | 总开关，关闭后所有渠道静默 |
| `system_notice_type` | 消息类型 | 见说明 | 分类白名单，未勾选的分类不推送 |
| `system_notice_night_free` | 夜间免打扰 | `false` | 开启后 22:00 至次日 08:00 不推送 |

`system_notice_type` 默认值为 `system,subscription,download,library,certification,vip,scrape,actor_scrape`，按分类代码匹配。某类通知收不到时，先确认该分类是否在列表中。

:::note[凌晨的推送会消失]
夜间免打扰生效期间的通知按「无需推送」跳过，不会排队补发。需要夜间告警的场景请谨慎开启。
:::

## 常见问题

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| 推送测试失败 | 设备密钥错误，或服务地址与密钥不同源 | 核对 App 中显示的地址与密钥 |
| 手机收不到但接口成功 | Bark App 通知权限被关闭 | 在系统设置中允许通知 |
| 通知没有图标 | 图标地址不可访问 | 换成可公网访问的图片地址 |
| 通知不分组 | 分组名为空或被清空 | 填写分组名并保存 |
| 完全收不到通知 | 总开关关闭或处于夜间免打扰 | 检查系统配置 |

## 相关页面

- [插件集成总览](/docs/integration/overview)
- [Telegram](/docs/integration/notification/telegram)｜[WebHook](/docs/integration/notification/webhook)
- [系统配置](/docs/system/config)｜[网络与连通性](/docs/dashboard/network)
- [订阅管理](/docs/subscribe/manage)｜[常见问题](/docs/faq)
