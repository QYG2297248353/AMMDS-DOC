---
sidebar_position: 2
sidebar_label: "Create Scrape Task"
---

# Create Scrape Task

Scrape tasks are used to scrape metadata for media files, including movie titles, posters, synopses, etc., helping you organize and manage media files more effectively.

<!-- truncate -->

## Access Scrape Task

You can access the scrape task page through the following path:

**Task Management >> Scrape and Storage**

## Scrape Process

### 1. Select Files to Scrape

![Select Files to Scrape](/img/usage/scrape/task-scrape-04.png)

On the **Scrape and Storage** page, select the files you want to scrape, then click the **Scrape** button.

### 2. Configure Scrape Parameters

![Configure Scrape Parameters](/img/usage/scrape/task-scrape-05.png)

In the scrape configuration dialog, set the following parameters:

- **Scrape Rule**: Select the appropriate scrape rule
- **Organization Mode**: Select the file organization mode
- **Rename Rule**: Select the file rename rule
- **Organization Directory**: Set the target directory for organized files

### 3. Execute Scrape Task

![Execute Scrape Task](/img/usage/scrape/task-scrape-06.png)

After configuring the parameters, click the **Start Scrape** button to execute the scrape task.

### 4. View Scrape Results

![View Scrape Results](/img/usage/scrape/task-scrape-07.png)

After scraping is completed, you can view the scrape results, including the obtained metadata and organized files.

## Scrape Modes

### Automatic Scrape

**Function Description**: The system automatically scrapes metadata based on file names or content.

**Applicable Scenario**: Suitable for files with clear naming conventions, can quickly obtain metadata.

### Manual Scrape

**Function Description**: Manually search and select metadata from scrapers.

**Applicable Scenario**: Suitable for files with unclear naming conventions, can accurately obtain the desired metadata.

## Metadata Fields

The following metadata fields can be obtained through scraping:

- **Title**: Movie title
- **Poster**: Movie poster image
- **Synopsis**: Movie synopsis
- **Actors**: Movie actors
- **Director**: Movie director
- **Year**: Release year
- **Genre**: Movie genre
- **Runtime**: Movie duration
- **Rating**: Movie rating

## Common Questions

### Q: What to do if scraping fails?

**A**: Possible reasons include:
- The file name does not contain valid number information
- The selected scraper cannot find matching metadata
- Network connection issues
- Scraper API limitations

**Solutions**:
- Try using different scrape rules
- Try manual scraping mode
- Check network connections
- Try again later

### Q: How to improve scraping accuracy?

**A**:
- Ensure file names contain clear number information
- Select appropriate scrape rules for different types of media
- Use manual scraping mode for files with unclear naming
- Regularly update scrape rules and scrapers

### Q: Can I edit metadata after scraping?

**A**: Yes, you can edit the scraped metadata in the metadata management interface to correct or supplement information.

### Q: What to do if duplicate metadata is obtained?

**A**: You can manually select the correct metadata from multiple scraping results, or set the priority of scrapers in scrape rules to avoid duplicate metadata.

### Q: How to batch process multiple files?

**A**: You can select multiple files on the **Scrape and Storage** page, then click the **Scrape** button to batch process them.

## Best Practices

- **File naming**: Ensure file names contain clear number information to improve scraping accuracy
- **Scrape rule selection**: Select appropriate scrape rules for different types of media
- **Organization planning**: Plan the directory structure in advance to facilitate subsequent management
- **Metadata review**: Regularly review and correct scraped metadata to ensure data accuracy
- **Backup**: Regularly back up metadata to prevent data loss
