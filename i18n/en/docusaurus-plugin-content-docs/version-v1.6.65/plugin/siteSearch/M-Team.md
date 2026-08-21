---
sidebar_position: 1
sidebar_label: "M-Team"
title: "M-Team"
description: "M-Team is a comprehensive discussion forum plugin providing various discussion boards and group features, supporting API integration and account protection notifications."
keywords: [M-Team, site search, discussion forum, PT, API]
tags: [plugin, site-search]
---

# M-Team

M-Team is a comprehensive discussion forum with various discussion sections and groups, where people can chat about current events and all kinds of information.

:::info Private Site Note
This site requires registration by invitation and has certain thresholds.
:::

## Plugin Configuration

![Plugin Configuration](/img/plugin/m-team-01.png)

### Basic Configuration

- **Enable Status**: Controls whether to enable the M-Team plugin.
- **Service Address**: M-Team API service address. Default is `https://api.m-team.io/api`, can be changed as needed.
  
  There are currently three M-Team API addresses:
  - https://api.m-team.cc/api
  - https://api.m-team.io/api
  - https://api2.m-team.cc/api
- **Passkey**: Key used for authentication. Get it by clicking "Send to Email" in "Console >> Settings >> Home >> Passkey," then check your email. Default is empty.
- **Access Token**: Token for API access. Create one at "Console >> Settings >> Laboratory >> Access Token." Default is empty.

![Access Token](/img/plugin/m-team-02.png)

- **Account Protection Notification**: If the account hasn't been logged into for over 14 days, the system will send a notification reminding you to re-login and prevent the account from being deleted.
