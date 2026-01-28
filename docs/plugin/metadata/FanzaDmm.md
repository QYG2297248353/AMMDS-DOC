---
sidebar_position: 4
sidebar_label: "Fanza DMM"
---

# Fanza DMM

FANZA is Japan's leading adult content platform, offering online DVD sales, video rental, and streaming services. The platform has established partnerships with multiple well-known studios, launched exclusive channel services, and provides a subscription-based "見放題 ch" (all-you-can-watch) service covering most video content on the platform.

## Plugin Configuration

![Plugin Configuration](/img/plugin/fanzadmm-01.png)

### Basic Configuration

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| Enable Status | Controls whether to enable the Fanza DMM plugin | Disabled |
| Ranking Data | Controls whether to collect FANZA's ranking data | Disabled |
| Video Search | Controls whether to enable FANZA's video content search functionality | Disabled |

### Configuration Notes

- **Ranking Data Collection**: When enabled, it will regularly synchronize ranking data from various FANZA categories, providing reference for popular content in the media library
- **Video Search**: When enabled, video content can be searched through FANZA data sources, improving metadata matching accuracy
- **Data Update Frequency**: The system will automatically adjust the data update cycle based on configuration to ensure data timeliness

## Features

- **Multi-dimensional Data**: Covers multiple dimensions of data including videos, actors, and rankings
- **Real-time Synchronization**: Supports regular synchronization of the latest platform data
- **Precise Matching**: High-precision metadata matching based on official FANZA data

## Notes

:::info Regional Restrictions
FANZA services may have regional access restrictions. It is recommended to consider network environment factors during deployment
:::

:::note Data Source
Plugin data comes from FANZA's official API, ensuring data legality and accuracy
:::