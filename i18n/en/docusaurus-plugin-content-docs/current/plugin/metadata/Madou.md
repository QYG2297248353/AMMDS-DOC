---
sidebar_position: 99
sidebar_label: "Madou Media"
title: "Madou Media"
description: "The Madou Media plugin lets AMMDS collect Madou Media's video and actor information, supporting a metadata caching mechanism."
keywords: [Madou Media, metadata, actor info, video collection, plugin]
tags: [plugin, metadata]
---

# Madou Media

Madou Media (麻豆传媒映画) is a company focused on adult content production and distribution, registered in California, USA, with servers also in the US. This plugin lets AMMDS collect Madou Media's video and actor information.

## Plugin Configuration

![Plugin Configuration](/img/plugin/madou-01.png)

### Basic Configuration

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| Enable Status | Controls whether to enable the Madou Media plugin | Disabled |
| Service Address | Madou Media API service address | `https://api.modelmediaasia.com` |
| Video Collection | Controls whether to collect Madou Media's video info (uses advance caching) | Disabled |
| Actor Collection | Controls whether to collect Madou Media's actor info (uses advance caching) | Disabled |

### Configuration Notes

- **Service Address**: Defaults to the official API address. You can change it here if you want to use a proxy or self-hosted service.
- **Metadata Collection**: Uses advance caching for faster and more stable data retrieval.
- **Data Sync**: When collection is enabled, the system will regularly sync the latest video and actor information.

## Notes

:::note Data Collection Mechanism
The plugin caches metadata in advance, so even if the network is a bit unstable, things still work fine.
:::

:::info Service Availability
Since the servers are in the US, make sure your network connection is stable. If it's slow, consider setting up a proxy to speed things up.
:::
