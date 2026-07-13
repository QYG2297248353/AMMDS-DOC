---
sidebar_position: 4
sidebar_label: "Fanza DMM"
---

# Fanza DMM

FANZA is Japan's largest adult content platform — you can buy DVDs, rent videos, and stream content online. It partners with many well-known studios, has dedicated channels, and offers a "見放題 ch" (all-you-can-watch) subscription service covering most of the platform's videos.

## Plugin Configuration

![Plugin Configuration](/img/plugin/fanzadmm-01.png)

### Basic Configuration

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| Enable Status | Controls whether to enable the Fanza DMM plugin | Disabled |
| Ranking Data | Controls whether to collect FANZA's ranking data | Disabled |
| Video Search | Controls whether to enable FANZA video content search | Disabled |

### Configuration Notes

- **Ranking Data Collection**: When enabled, it will regularly sync rankings from various FANZA categories, giving you popular content references for your media library.
- **Video Search**: When enabled, you can search for video content through FANZA's data source, improving metadata matching accuracy.
- **Data Update Frequency**: The system automatically adjusts the update cycle based on your config to keep data fresh.

## Features

- **Multi-dimensional Data**: Covers videos, actors, rankings, and more.
- **Real-time Sync**: Regularly syncs the latest platform data.
- **Accurate Matching**: High-precision metadata matching based on official FANZA data.

## Notes

:::info Regional Restrictions
FANZA services may have regional access restrictions. Keep your network environment in mind when deploying.
:::

:::note Data Source
Plugin data comes from FANZA's official API — it's legal and accurate.
:::
