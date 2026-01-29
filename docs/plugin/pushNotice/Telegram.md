---
sidebar_position: 1
sidebar_label: "Telegram"
---

# Telegram

Telegram is a cloud-based instant messaging platform that supports sending and receiving various message formats including text, voice, video, and images. This plugin provides Telegram message push capabilities for AMMDS, enabling real-time notification of system events.

<!-- truncate -->

## Plugin Configuration

![Plugin Configuration](/img/plugin/telegram-01.png)

### Basic Configuration

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| Enable Status | Controls whether to enable the Telegram push plugin | Disabled |
| Service Address | Telegram API service endpoint | `https://api.telegram.org` |
| Bot Token | Telegram bot authentication token | - |
| Chat ID | Unique identifier for the target Telegram chat | - |
| Webhook URL | (Optional) Telegram bot webhook callback address | - |
| Spoiler Mode | Controls whether to add blur effect to pushed images | Disabled |

![Plugin Configuration](/img/plugin/telegram-02.png)

### Configuration Notes

- **Service Address**: Defaults to the official API endpoint. Can be modified here if using a proxy or self-hosted service
- **Bot Token**: Can be obtained through the `@BotFather` bot in Telegram
- **Chat ID**: Can be obtained through the `@RawDataBot` bot in Telegram
- **Webhook URL**: Only recommended for users with public network deployment. Non-public network environments may cause message reception failures
- **Spoiler Mode**: When enabled, adds blur effect to pushed images to protect privacy content

### Obtaining Authentication Information

1. **Obtaining Bot Token**:
   - Search for and start `@BotFather` in Telegram
   - Follow the instructions to create a new bot and obtain the Token

2. **Obtaining Chat ID**:
   - Search for and start `@RawDataBot` in Telegram
   - Send any message, and the bot will return information containing the Chat ID

## Test Module

### Push Test

- **Function**: Test if Telegram push configuration is correct
- **Operation**: After clicking the test button, the system will send a test message to the configured Chat ID
- **Verification**: A test message will be received in the target chat upon success

## Features

- **Multi-format Support**: Supports multiple message formats including text and images
- **Real-time Push**: System events are pushed to Telegram in real-time
- **Spoiler Protection**: Image content can optionally have blur protection added
- **Flexible Configuration**: Supports custom service address and Webhook

## Notes

:::warning Webhook Configuration
Users with non-public network deployment are not recommended to configure Webhook URL, as this may result in inability to receive messages.
:::

:::info Service Stability
Due to the network characteristics of Telegram services, it is recommended to ensure that the server network environment can stably access the Telegram API.
:::

:::tip Security Advice
Bot Token is sensitive information, please keep it secure and avoid disclosing it to unauthorized personnel.
:::
