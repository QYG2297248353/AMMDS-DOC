---
sidebar_position: 3
sidebar_label: "麻豆传媒映画"
---

# 麻豆传媒映画

麻豆传媒映画 is a media company focused on adult content production and distribution, registered in California, USA, with server infrastructure deployed within the United States. This plugin provides AMMDS with the ability to collect video and actor metadata from 麻豆传媒映画.

<!-- truncate -->

## Plugin Configuration

![Plugin Configuration](/img/plugin/madou-01.png)

### Basic Configuration

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| Enable Status | Controls whether to enable the Madou Media plugin | Disabled |
| Service Address | Madou Media API service endpoint | `https://api.modelmediaasia.com` |
| Video Collection | Controls whether to collect Madou Media's video metadata (using advance caching mechanism) | Disabled |
| Actor Collection | Controls whether to collect Madou Media's actor metadata (using advance caching mechanism) | Disabled |

### Configuration Notes

- **Service Address**: Defaults to the official API endpoint. Can be modified here if using a proxy or self-hosted service
- **Metadata Collection**: Uses advance caching mechanism to ensure data retrieval speed and stability
- **Data Synchronization**: When collection is enabled, the system will regularly synchronize the latest video and actor information

## Notes

:::note Data Collection Mechanism
Currently, the plugin uses advance metadata caching to ensure complete metadata service even in unstable network environments.
:::

:::info Service Availability
Since the service is deployed in the United States, it is recommended to ensure stable network connection and configure proxy if necessary to optimize access speed.
:::


