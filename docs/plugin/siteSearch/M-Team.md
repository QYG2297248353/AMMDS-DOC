---
title: M-Team
description: M-Team 是一个综合讨论区插件，提供各种讨论版块和群组功能，支持 API 集成和账户保护通知。
keywords: [M-Team, 站点搜索, 讨论区, PT, API]
tags: [plugin, site-search]
sidebar_position: 1
sidebar_label: "M-Team"
---

# M-Team

M-Team 是一个综合讨论区，有各种讨论版块和群组，大家可以在这里聊时事和各种资讯。

:::info[私有站点说明]
这个站需要邀请才能注册，有一定门槛。
:::

## 插件配置

![插件配置](/img/plugin/m-team-01.png)

### 基本配置

- **启用状态**：控制是否启用 M-Team 插件。
- **服务地址**：M-Team API 服务地址。默认是 `https://api.m-team.io/api`，可以根据实际情况改。
  
  目前 M-Team 有三个 API 服务地址：
  - https://api.m-team.cc/api
  - https://api.m-team.io/api
  - https://api2.m-team.cc/api
- **密钥（Passkey）**：用来验证身份的密钥，可以在「控制台 >> 設置 >> 主頁 >> 密匙 >> 发送至邮箱」获取，然后去邮箱查看。默认是空的。
- **存取令牌（Token）**：用来访问 API 的令牌，可以在「控制台 >> 設置 >> 實驗室 >> 存取令牌 >> 建立存取令牌」创建。默认是空的。

![存取令牌](/img/plugin/m-team-02.png)

- **账户保护通知**：如果账户超过 14 天没有重新登录，系统会发通知提醒你。你需要重新登录，避免账户被注销。
