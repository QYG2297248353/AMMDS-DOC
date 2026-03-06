---
sidebar_position: 1
sidebar_label: "Telegram"
---

# Telegram

Telegram 是一款基于云架构的即时通讯应用平台，支持文本、语音、视频、图像等多种消息格式的发送与接收。该插件为 AMMDS 提供 Telegram 消息推送能力，实现系统事件的实时通知。

## 插件配置

![插件配置](/img/plugin/telegram-01.png)

### 基本配置

| 参数 | 说明 | 默认值 |
|------|------|--------|
| 启用状态 | 控制是否启用 Telegram 推送插件 | 关闭 |
| 服务地址 | Telegram API 服务端点 | `https://api.telegram.org` |
| Bot Token | Telegram 机器人的认证令牌 | - |
| Chat ID | Telegram 目标聊天的唯一标识 | - |
| Webhook URL | (可选) Telegram 机器人的 Webhook 回调地址 | - |
| 剧透模式 | 控制是否对推送的图像添加蒙版处理 | 关闭 |

![插件配置](/img/plugin/telegram-02.png)

### 配置说明

- **服务地址**：默认指向官方 API 端点，如需使用代理或自建服务，可在此处修改
- **Bot Token**：可通过 Telegram 中的 `@BotFather` 机器人获取
- **Chat ID**：可通过 Telegram 中的 `@RawDataBot` 机器人获取
- **Webhook URL**：仅建议公网部署的用户配置，非公网环境可能导致消息接收失败
- **剧透模式**：开启后会对推送的图像添加蒙版，保护隐私内容

### 获取认证信息

1. **获取 Bot Token**：
   - 在 Telegram 中搜索并启动 `@BotFather`
   - 按照指引创建新机器人并获取 Token

2. **获取 Chat ID**：
   - 在 Telegram 中搜索并启动 `@RawDataBot`
   - 发送任意消息后，机器人会返回包含 Chat ID 的信息

## 测试模块

### 推送测试

- **功能**：测试 Telegram 推送配置是否正确
- **操作**：点击测试按钮后，系统会向配置的 Chat ID 发送测试消息
- **验证**：成功后会在目标聊天中收到测试消息

## 功能特性

- **多格式支持**：支持文本、图像等多种消息格式
- **实时推送**：系统事件实时推送到 Telegram
- **剧透保护**：图像内容可选择添加蒙版保护
- **灵活配置**：支持自定义服务地址和 Webhook

## 注意事项

:::warning Webhook 配置
非公网部署的用户不建议配置 Webhook URL，否则可能导致无法接收消息。
:::

:::info 服务稳定性
由于 Telegram 服务的网络特性，建议确保服务器网络环境能够稳定访问 Telegram API。
:::

:::tip 安全建议
Bot Token 属于敏感信息，请妥善保管，避免泄露给未授权人员。
:::
