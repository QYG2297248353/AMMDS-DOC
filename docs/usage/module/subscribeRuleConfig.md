---
sidebar_position: 4
sidebar_label: "Subscription Rule Configuration"
---

# Subscription Rule Configuration

Subscription rule configuration is used to set subscription preferences and download parameters for movie content before task execution, ensuring the system can automatically obtain and manage movie resources according to your needs.

<!-- truncate -->

## Access Subscription Rule Configuration

You can access the subscription rule configuration page through the following path:

**Task Management >> Subscription Rules**

## Configuration Interface

![Subscription Rule Configuration](/img/usage/module/subscribe-config-01.png)

## Configuration Item Description

### Chinese Priority

**Function Description**: After enabling this option, the system will prioritize searching for and downloading movie versions with Chinese subtitles or Chinese dubbing.

**Applicable Scenario**: If you prefer watching Chinese content, you can enable this option to increase the probability of obtaining Chinese versions.

### Search Order

**Function Description**: Set the priority order of search sources. The system will sequentially obtain movie resources from each search source according to the order you specify.

**Configuration Suggestion**: Place search sources with higher resource quality and faster update speed at the front to improve the efficiency of obtaining high-quality resources.

### Download Directory

**Function Description**: Specify the download directory path for the downloader.

**Important Tips**:

:::warning Notes
- This path has no direct relationship with the AMMDS system itself and needs to be set according to the configuration of the downloader you use
- Please ensure the specified directory exists and has write permissions
- It is recommended to use absolute paths to avoid path resolution errors caused by relative paths
:::

## Configuration Example

The following is a typical subscription rule configuration example:

1. **Chinese Priority**: Enabled
2. **Search Order**: Search Source A → Search Source B → Search Source C
3. **Download Directory**: `D:\Downloads\Movies`

## Common Questions

### Q: Why is a non-Chinese version still downloaded even when Chinese priority is set?

**A**: It may be because the Chinese version of the current movie resource has not been released yet. The system will download other versions when no Chinese version is available to ensure you can obtain the resource in a timely manner.

### Q: What problems can be caused by incorrect download directory settings?

**A**: If the download directory is set incorrectly, it may cause the following problems:
- The downloader cannot save files normally
- The system cannot find downloaded files
- Download failure due to insufficient storage space

Please ensure the correct download directory path is set.