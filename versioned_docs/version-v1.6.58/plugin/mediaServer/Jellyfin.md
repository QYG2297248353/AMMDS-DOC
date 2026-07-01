---
sidebar_position: 1
sidebar_label: "Jellyfin"
---

# Jellyfin

Jellyfin is an open-source multimedia management application suite designed for organizing, managing, and sharing digital media files. Through this plugin, AMMDS can establish deep integration with Jellyfin media server to implement advanced features such as metadata synchronization and automatic actor avatar completion.

<!-- truncate -->

## Plugin Configuration

![Plugin Configuration](/img/plugin/jellyfin-01.png)

### Basic Configuration

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| Enable Status | Controls whether to enable the Jellyfin plugin | Disabled |
| Service Address | Jellyfin server network endpoint | `http://127.0.0.1:8096` |
| API Key | Jellyfin server authentication token | - |
| Username | (Optional) Jellyfin server login username | - |
| Password | (Optional) Jellyfin server login password | - |
| Bind User | Select the Jellyfin user account to bind | - |
| Auto Completion | Controls whether to automatically complete missing actor avatars in the media library | Disabled |

![Plugin Configuration](/img/plugin/jellyfin-02.png)

### Configuration Notes

- **Service Address**: Please use the server's actual network address. Avoid using `localhost` or `127.0.0.1`, as this may cause connection failures in containerized deployments
- **API Key**: Can be generated in the Jellyfin management interface under "System" → "Advanced" → "API Keys"
- **Bind User**: You must first enter the correct service address and API key and save before you can select a user from the dropdown list
- **Auto Completion**: When enabled, the system will automatically complete missing actor avatars in the media library, provided that corresponding actor avatars have been added in AMMDS

### Connection Verification

- **Network Connectivity**: Ensure the AMMDS server can access the Jellyfin service address
- **Authentication Information**: API key must have sufficient permissions to perform required operations
- **Service Status**: Ensure the Jellyfin server is running and can properly respond to API requests

## Features

- **Metadata Synchronization**: Supports bidirectional metadata synchronization with Jellyfin media libraries
- **User Binding**: Can bind to specific Jellyfin users for personalized configuration
- **Auto Avatar Completion**: Intelligently identifies and completes missing actor avatar information
- **Status Monitoring**: Real-time monitoring of Jellyfin server running status

## Notes

:::warning Service Address Configuration
Do not use `localhost` or `127.0.0.1` as the service address, especially in containerized deployment environments, as this may cause connection failures.
:::

:::info Auto Completion Prerequisite
Before enabling the auto completion feature, ensure that corresponding actor avatar data has been added in AMMDS, otherwise the completion feature may not work properly.
:::

:::tip API Key Permissions
It is recommended to create a dedicated API key for AMMDS with appropriate permission scope to ensure system security.
:::

