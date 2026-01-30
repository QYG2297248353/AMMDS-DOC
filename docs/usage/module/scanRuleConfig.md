---
sidebar_position: 1
sidebar_label: "Scan Rule Configuration"
---

# Scan Rule Configuration

Scan rule configuration is used to set the rules for scanning media files, including file format filtering, directory exclusion, and other settings, helping you accurately scan the media files you need.

<!-- truncate -->

## Access Scan Rule Configuration

You can access the scan rule configuration page through the following path:

**Task Management >> Scan Rules**

## Configuration Interface

![Scan Rules](/img/usage/module/scan-rule-01.png)

## Function Description

### Scan Rules

**Function Description**: By creating scan rules, you can specify which files to scan and which files to exclude, improving the efficiency and accuracy of scanning.

**Applicable Scenarios**:
- When you only want to scan specific types of media files
- When you want to exclude certain directories or files
- When you want to set specific scanning conditions

## Configuration Method

### Create Scan Rules

1. On the **Scan Rules** page, click the **Create** button
2. Fill in the rule name and configuration parameters
3. Save the rule

### Rule Parameters

#### File Formats

**Function Description**: Set the file formats to be scanned.

**Configuration Suggestion**: Select the media file formats you want to scan, such as MP4, MKV, AVI, etc.

#### Exclude Directories

**Function Description**: Set directories that do not need to be scanned.

**Configuration Suggestion**: Add directories that do not contain media files, such as system directories, temporary directories, etc.

#### Exclude Files

**Function Description**: Set files that do not need to be scanned.

**Configuration Suggestion**: Add files that are not media files, such as text files, image files, etc.

#### Minimum File Size

**Function Description**: Set the minimum size of files to be scanned.

**Configuration Suggestion**: Set an appropriate value to exclude small files that are not media files.

## Configuration Examples

Here are several examples of scan rules:

| Rule Name | File Formats | Exclude Directories | Exclude Files | Minimum File Size |
|-----------|-------------|---------------------|---------------|-------------------|
| Video Files | MP4, MKV, AVI | temp, system | *.txt, *.jpg | 100MB |
| High Quality Videos | MP4, MKV | downloads/incomplete | *.sample.* | 500MB |
| All Media | MP4, MKV, AVI, MOV, WMV | - | - | 50MB |

## Common Questions

### Q: What is the purpose of scan rules?

**A**: Scan rules are used to filter and identify media files during the scanning process, helping the system accurately find the media files you need to process, improving scanning efficiency and reducing unnecessary processing.

### Q: How to set up effective scan rules?

**A**: You can set up effective scan rules through the following methods:
1. Clearly define the file formats you want to scan
2. Reasonably set exclude directories to avoid scanning unnecessary directories
3. Set an appropriate minimum file size to exclude non-media files
4. Regularly update and optimize scan rules based on actual usage

### Q: Can I create multiple scan rules?

**A**: Yes, you can create multiple scan rules for different scenarios, and select the appropriate scan rule when creating a scanning task.

### Q: What happens if no scan rule is selected?

**A**: If no scan rule is selected, the system will use the default scan rule, which usually scans common media file formats and does not exclude any directories or files.

### Q: How to test if the scan rule is effective?

**A**: You can test through the following methods:
1. Configure scan rules
2. Create a scanning task and select the scan rule
3. Run the scanning task
4. Check if the scanning results meet your expectations

## Best Practices

- **Clear rule naming**: Use descriptive rule names for easy subsequent management
- **Reasonable file format settings**: Only select the media file formats you actually need
- **Effective directory exclusion**: Add directories that definitely do not contain media files to improve scanning speed
- **Appropriate file size setting**: Set a reasonable minimum file size to filter out non-media files
- **Regular rule maintenance**: Regularly review and update scan rules based on actual usage
