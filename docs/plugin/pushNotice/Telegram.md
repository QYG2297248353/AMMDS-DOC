---
sidebar_position: 1
sidebar_label: "Telegram"
---

# Telegram

Telegram 是一款基于云端的即时通讯软件，可以发文字、语音、视频、图片等多种消息。这个插件让 AMMDS 能通过 Telegram 给你发推送通知，系统有什么动静都能实时通知你。

## 插件配置

![插件配置](/img/plugin/telegram-01.png)

### 基本配置

| 参数 | 说明 | 默认值 |
|------|------|--------|
| 启用状态 | 控制是否启用 Telegram 推送插件 | 关闭 |
| 服务地址 | Telegram API 服务地址 | `https://api.telegram.org` |
| Bot Token | Telegram 机器人的认证令牌 | - |
| Chat ID | Telegram 目标聊天的唯一编号 | - |
| Webhook URL | (可选) Telegram 机器人的 Webhook 回调地址 | - |
| 剧透模式 | 控制是否给推送的图片加蒙版处理 | 关闭 |

![插件配置](/img/plugin/telegram-02.png)

### 配置说明

- **服务地址**：默认是官方 API 地址，如果想用代理或者自建服务，可以在这里改
- **Bot Token**：可以在 Telegram 里找 `@BotFather` 机器人获取
- **Chat ID**：可以在 Telegram 里找 `@RawDataBot` 机器人获取
- **Webhook URL**：建议只有用公网部署的人才配，不是公网环境可能收不到消息
- **剧透模式**：开启后会给推送的图片加蒙版，保护隐私

### 获取认证信息

1. **获取 Bot Token**：
   - 在 Telegram 里搜索并打开 `@BotFather`
   - 按提示创建一个新机器人，就能拿到 Token

2. **获取 Chat ID**：
   - 在 Telegram 里搜索并打开 `@RawDataBot`
   - 随便发一条消息，机器人会返回一条包含 Chat ID 的信息

## 测试模块

### 推送测试

- **功能**：测试 Telegram 推送配置是否正确
- **操作**：点测试按钮，系统会往配好的 Chat ID 发一条测试消息
- **验证**：成功的话，目标聊天里会收到测试消息

## 功能特性

- **多格式支持**：支持文字、图片等多种消息格式
- **实时推送**：系统事件实时推送到 Telegram
- **剧透保护**：图片内容可以加蒙版保护
- **灵活配置**：支持自定义服务地址和 Webhook

## 注意事项

:::warning Webhook 配置
不是公网部署的话，不建议配 Webhook URL，否则可能收不到消息。
:::

:::info 服务稳定性
Telegram 服务有网络特性，建议保证服务器网络能稳定访问 Telegram API。
:::

:::tip 安全建议
Bot Token 是敏感信息，请保管好，别泄露给不相关的人。
:::
