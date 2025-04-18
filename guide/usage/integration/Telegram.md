---
outline: deep
---

# Telegram

Telegram 插件是一个消息通知插件，用于将系统的重要通知通过 Telegram Bot 发送给用户。它支持自定义消息模板、消息测试和 Webhook 回调等功能。

<a-image style="border-radius: 12px" src="/images/usage/integration-telegram-001.png" />

## 配置说明

::: tip 提示
记得及时保存修改的配置哦！
:::

### 基本配置
- **启用**：是否启用 Telegram 通知插件。
- **服务地址**：Telegram API 的服务地址，默认为 `https://api.telegram.org`。如果无法访问，请注意配置网络代理。
- **Bot Token**：Telegram Bot 的访问令牌，可以从 [@BotFather](https://t.me/BotFather) 获取。
- **Chat ID**：接收消息的目标聊天 ID，可以是个人、群组或频道的 ID。
- **Webhook URL**：用于接收 Telegram 的消息回调，需要配置为可以公网访问的地址(不建议手动设置)。

#### 获取 Chat ID
1. 打开 Telegram 应用。
2. 搜索并添加 BotFather。
3. 发送 `/newbot` 命令，按照提示创建一个新的 Bot。
4. 完成 Bot 的创建后，BotFather 会提供一个 Bot Token。
5. 打开 Telegram 应用，搜索并添加刚刚创建的 Bot。
6. 发送 `/start` 命令，Bot 会向你发送一条消息。
7. 在插件配置中填写 Bot Token 打开插件开关, 后保存配置。
8. 在 Telegram 应用中，找到刚刚创建的 Bot, 发送一条消息, 任意文本即可。
9. 回到插件配置中, 点击「获取 Chat ID」按钮, 即可获取 Chat ID, 请注意核对弹窗的消息文本是否与上一步发送的文本一致。
10. 自动获取的 Chat ID 可能与上一步发送的不一致, 请手动获取。
11. 保存配置, 即可开始使用。
12. 点击「发送测试」按钮验证配置是否正确。

## 使用说明

### 配置验证
1. 确保已正确填写 Bot Token 和 Chat ID。
2. 点击「发送测试」按钮验证配置是否正确。
3. 如果配置正确，将收到一条测试消息。

### 消息测试
- 在「消息测试」区域可以发送自定义消息进行测试。
- 支持发送文本、图片等多种类型的消息。
- 可以预览消息的实际显示效果。

### 命令说明

#### 基础配置命令
- `/ammds` - 欢迎词语
- `/start` - 启用 AMMDS Bot，开始接收通知
- `/stop` - 停用 AMMDS Bot，暂停接收通知
- `/help` - 显示帮助信息，包含所有可用命令说明
- `/version` - 显示当前系统版本信息

#### 搜索订阅命令
- `/search` - 搜索媒体资源
  - 使用方法：`/search 番号ID`
  - 示例：`/search ABP-123`

- `/subscribe` - 订阅媒体资源
  - 使用方法：`/subscribe 番号ID`
  - 当有新的匹配资源时会收到通知

- `/unsubscribe` - 取消订阅
  - 使用方法：`/unsubscribe 番号ID`
  - 取消之前设置的订阅

#### 收藏管理命令
- `/favorite` - 收藏媒体资源
  - 使用方法：`/favorite 番号ID`
  - 将感兴趣的资源加入收藏列表

- `/unfavorite` - 取消收藏
  - 使用方法：`/unfavorite 番号ID`
  - 从收藏列表中移除资源

#### 系统任务命令
- `/scan` - 运行所有扫描任务
  - 扫描媒体库中的所有资源
  - 更新媒体信息和元数据

- `/scrape` - 运行一次刮削任务
  - 从网络获取媒体详细信息
  - 更新封面、简介等元数据

- `/media_sync` - 同步媒体库
  - 同步本地媒体文件与数据库
  - 清理无效的媒体记录

- `/restart` - 重启服务
  - 重启 AMMDS 系统服务
  - 请谨慎使用此命令

### 常见问题
1. 如果无法收到消息，请检查：
   - Bot Token 是否正确
   - Chat ID 是否正确
   - 网络连接是否正常
   - 代理设置是否正确

2. 如果需要在群组中使用：
   - 将机器人添加到群组
   - 获取群组的 Chat ID
   - 确保机器人有发送消息的权限
   - 不推荐在群组中使用，避免消息过于频繁

