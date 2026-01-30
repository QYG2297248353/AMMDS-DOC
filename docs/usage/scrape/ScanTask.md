---
sidebar_position: 1
sidebar_label: "Create Scan Task"
---

# Create Scan Task

Scan tasks are the first step in the scraping process, used to scan files in target directories according to scan rules, generate scan result files. Through scan tasks, you can selectively scrape files, improve scraping efficiency, and avoid scraping garbage files.

<!-- truncate -->

## Access Task List

You can access the task list page through the following path:

**Task Management >> Task Configuration >> Task List**

On the task list page, click the **Create Task** button to create a scan task.

## Multi-Task Management

You can configure multiple different scan tasks according to your needs. Each task can have different scan directories and output directories.

**Advantages of multi-task management**:
- Helps classify and manage video files
- Can set different processing rules for different types of video files
- Improves overall processing efficiency

**Examples**:
- Create a scan task specifically for scanning Japanese video files and output them to a specified directory
- Create another scan task specifically for scanning Western video files and output them to another directory

## Create Scan Task

![Create Scan Task](/img/usage/scrape/task-scan-01.png)

### Task Name

**Function Description**: Set the name of the scan task.

**Configuration Suggestion**: Use descriptive names for easy subsequent management and identification, such as: "Japanese Video Scan", "Western Video Scan", etc.

### Media Type

**Function Description**: Set the media type of the scan task.

**Effect**: Assists the system in identifying numbers, improving number recognition rate.

**Configuration Suggestion**: If it is a mixed type of video files, select "All".

### Organization Mode

**Function Description**: Set the way files are organized.

**Optional Modes**:

#### In-place Organization
- **Function**: During organization, no operation is performed on the parent directory, and organization is directly performed in the original file directory
- **Applicable Scenario**: Hope to keep the file location unchanged, only rename files or organize metadata

#### Move Mode
- **Function**: During organization, move files to the target directory
- **Target Directory**: Format configured in scraping configuration
- **Applicable Scenario**: Hope to centrally manage files to a specified directory

#### Copy Mode
- **Function**: During organization, copy files to the target directory
- **Target Directory**: Format configured in scraping configuration
- **Applicable Scenario**: Hope to retain original files while creating organized copies in the specified directory

#### Soft Link Mode
- **Function**: During organization, create soft links of files to the target directory
- **Target Directory**: Format configured in scraping configuration
- **Features**:
  - Does not occupy additional disk space
  - Soft link files are pointers to original files
  - If the original file is deleted or moved, the soft link file will become invalid
- **Applicable Scenario**: Hope to create file access entries in the specified directory without occupying additional space

#### Hard Link Mode
- **Function**: During organization, create hard links of files to the target directory
- **Target Directory**: Format configured in scraping configuration
- **Features**:
  - Will occupy additional disk space
  - Hard link files are pointers to original files
  - If the original file is deleted or moved, the hard link file will remain valid
  - Hard link files can only be created in the same file system
- **Applicable Scenario**: Hope to create multiple references to files in the same file system to ensure file security
- **Note**: The hard conditions are very high, generally not recommended

:::info Tip
Except for the in-place organization mode, other organization modes require specifying a target directory.
:::

### Scan Directory

**Function Description**: Set the target directory for the scan task.

**Effect**: The system will recursively scan all files in this directory.

**Configuration Suggestion**: Select the directory containing the video files you need to process.

### Organization Directory

**Function Description**: Set the target directory for file organization.

**Applicable Scenario**: Except for the in-place organization mode, other organization modes need to specify this directory.

**Configuration Suggestion**: Select a directory with sufficient storage space for storing organized files.

### Rename Rule

**Function Description**: Set the way files are renamed.

**Optional Rules**:

#### Original File Name
- **Function**: Keep the original file name unchanged during organization
- **Applicable Scenario**: Hope to retain the original naming of files

#### Standardized File Name
- **Function**: During organization, standardize file names according to the file name format configured in scraping configuration
- **Naming Basis**: Depends on the file name format configured in scraping configuration
- **Applicable Scenario**: Hope to unify file naming format and improve the standardization of file management

### Duplicate File Handling

**Function Description**: Set the processing method for cases where target files already exist.

**Configuration Suggestion**: Select the appropriate processing method according to your needs, such as: skip, overwrite, rename, etc.

### Directory Monitoring

**Function Description**: When enabled, after the initial initialization of the scan task, the system will monitor this directory, and when new files appear, it will automatically scan and add them to the scan result file.

**Applicable Scenario**: Hope the system automatically processes newly added files without manual triggering of scanning

### Add to Favorites

**Function Description**: When enabled, it will automatically favorite this video metadata after organization.

**Applicable Scenario**: Hope to quickly mark and access important video resources

### Scheduled Task

**Function Description**: Set the automatic execution time of the scan task.

**Note**: This conflicts with directory monitoring, only one can be selected.

**Configuration Format**: Use Spring-style cron expressions

**Example**: Execute the scan task every hour, fill in `0 0 * * * ?`

## Execute Scan Task

After creation, click the **Scan Now** button to execute the scan task.

![Execute Scan Task](/img/usage/scrape/task-scan-02.png)

### Task Management Operations

- **Edit**: Click the **Edit** button to modify the configuration of the scan task
- **Records**: Click the **Records** button to view the execution history records of the scan task
- **Delete**: Click the **Delete** button to delete unnecessary scan tasks

### View Scan Results

![View Scan Results](/img/usage/scrape/task-scan-03.png)

After scanning is completed, newly added scrapable files can be viewed and processed in **Task Management >> Scrape and Storage**.

## Scheduled Tasks

The project uses Spring-style cron expressions to specify the execution time of scheduled tasks.

### Common Expressions

| Expression | Description |
|------------|-------------|
| `0 0 * * * ?` | Execute once every hour |
| `0 0 0 * * ?` | Execute once every day at midnight |
| `0 0 0 * * 1` | Execute once every Monday at midnight |
| `0 0 0 1 * ?` | Execute once every month on the 1st at midnight |

## Configuration Example

Here is a typical scan task configuration example:

| Configuration Item | Setting Value |
|--------------------|---------------|
| Task Name | Japanese Video Scan |
| Media Type | Japanese |
| Organization Mode | Move Mode |
| Scan Directory | `D:\Downloads\NewMovies` |
| Organization Directory | `E:\Media\Movies\Japanese` |
| Rename Rule | Standardized File Name |
| Duplicate File Handling | Skip |
| Directory Monitoring | Enabled |
| Add to Favorites | Disabled |
| Scheduled Task | - |

## Common Questions

### Q: What to do if the scan task execution fails?

**A**: Possible reasons include:
- The scan directory does not exist or has no access permission
- The organization directory does not exist or has no write permission
- Configuration errors
- Insufficient system resources

**Solutions**:
- Check directory paths and permissions
- Check configuration parameters
- Ensure the system has sufficient resources
- View execution records to understand specific error information

### Q: What is the difference between directory monitoring and scheduled tasks?

**A**:
- **Directory monitoring**: Real-time monitoring of directory changes, immediate processing when new files are added
- **Scheduled tasks**: Regular execution of scans at preset time intervals

### Q: What is the difference between soft links and hard links?

**A**:
- **Soft links**: Equivalent to Windows shortcuts, do not occupy additional space, but depend on the original file
- **Hard links**: Equivalent to multiple references to files, occupy additional space, but do not depend on the original file (still usable after original file deletion)

### Q: Why are some files not displayed in the scan results?

**A**: Possible reasons include:
- The file format is not in the format restriction list of scan rules
- The file directory is added to the ignore directory
- The file name contains ignored strings
- The file size is smaller than the set minimum video size threshold

### Q: How to improve scan efficiency?

**A**: You can try the following methods:
- Reasonably set ignore directories and ignore files
- Create specialized scan tasks for different types of files
- Use directory monitoring function to avoid repeated scanning
- Appropriately adjust system resource allocation

## Best Practices

- **Task classification**: Create different scan tasks according to video types to improve processing efficiency
- **Reasonable naming**: Use descriptive task names for easy subsequent management
- **Regular maintenance**: Regularly check and clean up unnecessary scan tasks
- **Backup configuration**: Record the current configuration before modifying important configurations, so that it can be restored if problems occur
- **Monitor execution**: Regularly view the execution records of scan tasks, discover and solve problems in time
