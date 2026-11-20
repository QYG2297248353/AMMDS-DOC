---
sidebar_position: 2
sidebar_label: "NexusPHP"
title: "NexusPHP"
description: "The NexusPHP plugin provides PT site search and management, supporting search functionality, user info sync, and alert notifications."
keywords: [NexusPHP, PT, site search, private tracker]
tags: [plugin, site-search]
---

# NexusPHP

NexusPHP is an open-source PT (Private Tracker — a type of BT download) software developed by the Nexus team at Zhejiang University. It focuses on user reputation and knowledge sharing, helping people build organized resource-sharing communities.

:::info Private Site Note
This site requires registration by invitation and has certain thresholds.
:::

## Plugin Configuration

![Plugin Configuration](/img/plugin/nexusphp-01.png)

### Basic Configuration

- **Enable Status**: Controls whether to enable the NexusPHP plugin.
- **Search Function**: Whether to enable NexusPHP's search function, default is disabled.
- **Sync User Info**: Whether to enable user info sync, default is disabled. User info is used for site ranking display.
- **Alert Notification**: Whether to enable alert notifications, default is disabled.

![Alert Notification](/img/plugin/nexusphp-02.png)

## NexusPHP Site Module

Click the "Add Site" button in the top-right to add a site.

:::warning Version Requirement
NexusPHP site version must be 1.9.0 or higher.

**How to check**: At the bottom of the NexusPHP site page, find `Powered by NexusPHP` and click "NexusPHP" to see the version number.
:::

![Add Site](/img/plugin/nexusphp-03.png)

### Site Config Items

- **Enable**: Whether to enable this site, default is disabled.
- **Site Name**: The site name, shown in the plugin. Besides typing it manually, you can select common names from the dropdown, and the system will auto-fill the site address.
- **Site Address**: The site address for access, default is empty.

![Site Token](/img/plugin/nexusphp-04.png)

- **Site Token**: Created by clicking the "Create" button in "Control Panel >> Settings Home >> Access Token."

:::info Permission Requirements
**Default permissions**: Get torrent list, view torrent details, post torrents, view basic user info.

**Minimum required**: Get torrent list, view torrent details, view basic user info.

**Insufficient permissions**: If permissions are lacking, the system will show `Insufficient permissions` and won't be able to add the site.
:::

- **Site Logo**: The site's icon, shown in the plugin, default is empty.
