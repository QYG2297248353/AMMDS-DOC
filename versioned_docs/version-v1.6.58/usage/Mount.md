---
sidebar_position: 1
sidebar_label: "Mounting Relationships"
---

# Mounting Relationships Explained

This document details the mounting relationships related to AMMDS, including mounting logic during deployment and media organization, helping you understand the system's directory structure and data flow.

:::tip
If you're using AMMDS for the first time, we recommend reading this document to understand the system's mounting relationships, which can help avoid data loss or configuration errors during deployment and use.
:::

## I. Mounting Logic During Deployment

### 1. Basic Mounting Configuration

When deploying AMMDS using Docker Compose, you need to configure mount directories in the `docker-compose.yml` file:

```yaml
volumes:
  - ./data:/ammds/data  # Mount the current directory's data folder to the container's /ammds/data
  - ./db:/ammds/db  # Mount the current directory's db folder to the container's /ammds/db
  - ./download:/data/download  # Mount the current directory's download folder to the container's /data/download
  - ./media:/data/media  # Mount the current directory's media folder to the container's /data/media
```

### 2. Directory Explanation

| Host Directory | Container Directory | Purpose |
| ------------- | ------------------ | ------- |
| `./data` | `/ammds/data` | Store AMMDS configuration files and temporary data |
| `./db` | `/ammds/db` | Store AMMDS database files |
| `./download` | `/data/download` | Store downloaded unorganized movie files |
| `./media` | `/data/media` | Store organized movie files for access by media servers like Jellyfin |

### 3. Deployment Mounting Diagram

```mermaid
flowchart TD
    %% Host directories
    subgraph HOST["Host"]
        H_DATA["./data"]
        H_DB["./db"]
        H_DOWNLOAD["./download"]
        H_MEDIA["./media"]
    end

    %% AMMDS container
    subgraph AMMDS["AMMDS Container"]
        A_DATA["/ammds/data"]
        A_DB["/ammds/db"]
        A_DOWNLOAD["/data/download"]
        A_MEDIA["/data/media"]
    end

    %% Mounting relationships
    H_DATA -->|"- ./data:/ammds/data"| A_DATA
    H_DB -->|"- ./db:/ammds/db"| A_DB
    H_DOWNLOAD -->|"- ./download:/data/download"| A_DOWNLOAD
    H_MEDIA -->|"- ./media:/data/media"| A_MEDIA

    %% Explanation
    A_DATA -->|"Store configuration files and temporary data"| CONFIG["Configuration Files"]
    A_DB -->|"Store database files"| DATABASE["Database"]
    A_DOWNLOAD -->|"Store unorganized movie files"| RAW_MEDIA["Unorganized Movies"]
    A_MEDIA -->|"Store organized movie files"| PROCESSED_MEDIA["Organized Movies"]
```

## II. Media Organization Mounting Logic

### 1. Overall Architecture

```mermaid
flowchart LR
    %% =========================
    %% Host (only facts retained)
    %% =========================
    subgraph HOST["Host (Real Disk)"]
        D1["/data/download<br/>Downloaded Movies (Unorganized)"]
        D2["/data/media<br/>Downloaded Movies (Organized)"]
    end

    %% =========================
    %% AMMDS
    %% =========================
    subgraph AMMDS["AMMDS (Media Scrapping / Organization)"]
        A1["/data/download<br/>Data Source Directory"]
        A2["/data/media<br/>Organization Target Directory"]
    end

    %% =========================
    %% Jellyfin
    %% =========================
    subgraph JELLYFIN["Jellyfin (Media Library)"]
        J["/data/media<br/>Media Library Path"]
    end

    %% =========================
    %% Mounting relationships (only necessary ones)
    %% =========================
    D1 -->|"volume mount /data/download"| A1
    D2 -->|"volume mount /data/media"| A2
    D2 -->|"volume mount /data/media"| J

```

### 2. Host and AMMDS Relationship

The host's `/data/download` directory (storing unorganized movie files) is mounted to the AMMDS container's `/data/download` directory via Docker volume. This allows AMMDS to access unorganized movie files on the host for scraping and organization operations.

Specifically:
- The `/data/download` directory on the host corresponds to the `/data/download` directory in the AMMDS container
- AMMDS scans movie files in the `/data/download` directory
- After scraping and organization, AMMDS saves the organized movie files to the `/data/media` directory

:::tip
**Why mount this way?**

- AMMDS needs to access unorganized movie files for scraping and organization, so it needs to mount the `/data/download` directory
- AMMDS needs to save organized movie files to a location accessible by Jellyfin, so it needs to mount the `/data/media` directory
- This mounting method ensures AMMDS and Jellyfin can share the same media library directory, avoiding duplicate data storage
- Using the same path reduces user confusion and makes the system easier to understand and manage
:::

### 3. Host and Jellyfin Relationship

The host's `/data/media` directory (storing organized movie files) is mounted to the Jellyfin container's `/data/media` directory via Docker volume. This allows Jellyfin to access organized movie files to build a media library and provide streaming services.

Specifically:
- The `/data/media` directory on the host corresponds to the `/data/media` directory in the Jellyfin container
- Jellyfin scans movie files in the `/data/media` directory
- Based on the file structure and metadata, Jellyfin builds a media library, providing classification, search, and playback functions

:::tip
**Why does Jellyfin only need to mount the `/data/media` directory?**

- As a media server, Jellyfin only needs to access organized movie files, not unorganized ones
- Organized movie files already contain complete metadata and a standardized file structure that Jellyfin can directly recognize and use
- This mounting method simplifies Jellyfin configuration and improves system security
:::

### 4. AMMDS and Movie Files Relationship

When processing movie files, AMMDS goes through the following流程:

1. **Scanning Phase**: AMMDS scans unorganized movie files in the `/data/download` directory
2. **Scraping Phase**: Based on file names or file content, AMMDS retrieves movie metadata from the internet (such as titles, posters, descriptions, etc.)
3. **Organization Phase**: Based on the scraped metadata, AMMDS renames movie files and organizes them into a directory structure in the `/data/media` directory
4. **Update Phase**: After organization, movie files can be recognized and used by media servers like Jellyfin

### 5. Data Flow

```mermaid
flowchart TD
    %% Data flow diagram
    HOST_DOWNLOAD["Host<br/>/data/download"] -->|"Mount"| AMMDS_DOWNLOAD["AMMDS<br/>/data/download"]
    AMMDS_DOWNLOAD -->|"Scrape and Organize"| AMMDS_MEDIA["AMMDS<br/>/data/media"]
    AMMDS_MEDIA -->|"Write"| HOST_MEDIA["Host<br/>/data/media"]
    HOST_MEDIA -->|"Mount"| JELLYFIN_MEDIA["Jellyfin<br/>/data/media"]
    JELLYFIN_MEDIA -->|"Build Media Library"| JELLYFIN_SERVER["Jellyfin<br/>Media Server"]
```

### 6. Media Organization Process Diagram

```mermaid
flowchart TD
    %% Start
    START["Start"] --> DOWNLOAD["Download Movie Files"]
    
    %% Download phase
    DOWNLOAD --> SAVE_RAW["Save to Host<br/>/data/download"]
    
    %% AMMDS processing phase
    SAVE_RAW --> MOUNT_TO_AMMDS["Mount to AMMDS<br/>/data/download"]
    MOUNT_TO_AMMDS --> SCAN["AMMDS Scan Movie Files"]
    SCAN --> SCRAPE["AMMDS Scrape Metadata"]
    SCRAPE --> ORGANIZE["AMMDS Organize File Structure"]
    ORGANIZE --> SAVE_PROCESSED["Save to AMMDS<br/>/data/media"]
    
    %% Host synchronization phase
    SAVE_PROCESSED --> SYNC_TO_HOST["Sync to Host<br/>/data/media"]
    
    %% Jellyfin processing phase
    SYNC_TO_HOST --> MOUNT_TO_JELLYFIN["Mount to Jellyfin<br/>/data/media"]
    MOUNT_TO_JELLYFIN --> JELLYFIN_SCAN["Jellyfin Scan Media Library"]
    JELLYFIN_SCAN --> BUILD_LIBRARY["Jellyfin Build Media Library"]
    BUILD_LIBRARY --> PROVIDE_STREAM["Jellyfin Provide Streaming Service"]
    
    %% End
    PROVIDE_STREAM --> END["End"]
    
    %% Process explanation
    DOWNLOAD -->|"Obtain movie files through download tools"| DOWNLOAD_TOOL["Download Tools"]
    SCAN -->|"Regular or manual scanning"| SCAN_MODE["Scanning Mode"]
    SCRAPE -->|"Obtain metadata from TMDB and other websites"| METADATA["Metadata"]
    ORGANIZE -->|"Classify by movie category"| CATEGORIZE["Classification and Organization"]
    PROVIDE_STREAM -->|"Users access through browser or client"| USER_ACCESS["User Access"]
```

### 7. Detailed Directory Structure

#### Host Directory Structure

```
/data/
├── download/           # Unorganized movie files
│   ├── movie1.mp4      # Movie files
│   └── ...
└── media/              # Organized movie files
    ├── Movies/         # Movie directory
    │   ├── Movie 1 (2023)/
    │   │   ├── Movie 1 (2023).mp4
    │   │   └── poster.jpg
    │   └── ...
    └── ...
```

#### AMMDS Container Directory Structure

```
/ammds/
├── data/               # Mapped from host's /data
│   ├── config.json     # Configuration files
│   └── ...
├── db/                 # Mapped from host's /data/db
│   ├── ammds.db        # Database files
│   └── ...
├── download/           # Mapped from host's /data/download
│   ├── movie1.mp4
│   └── ...
/media/                  # Mapped from host's /data/media
├── Movies/
└── ...
```

#### Jellyfin Container Directory Structure

```
/data/
└── media/              # Mapped from host's /data/media
    ├── Movies/
    └── ...
```

## III. Complete Mounting Relationship Diagram

```mermaid
flowchart LR
    %% =========================
    %% Host
    %% =========================
    subgraph HOST["Host"]
        H_DOWNLOAD["/data/download<br/>Unorganized Movies"]
        H_MEDIA["/data/media<br/>Organized Movies"]
        H_CONFIG["/data<br/>Configuration Files"]
        H_DB["/data/db<br/>Database Files"]
    end

    %% =========================
    %% AMMDS
    %% =========================
    subgraph AMMDS["AMMDS Container"]
        A_DATA["/ammds/data<br/>Configuration and Temporary Data"]
        A_DB["/ammds/db<br/>Database"]
        A_DOWNLOAD["/data/download<br/>Unorganized Movies"]
        A_MEDIA["/data/media<br/>Organized Movies"]
    end

    %% =========================
    %% Jellyfin
    %% =========================
    subgraph JELLYFIN["Jellyfin Container"]
        J_MEDIA["/data/media<br/>Media Library"]
    end

    %% =========================
    %% Mounting relationships
    %% =========================
    H_DOWNLOAD -->|"- /data/download:/data/download"| A_DOWNLOAD
    H_MEDIA -->|"- /data/media:/data/media"| A_MEDIA
    H_CONFIG -->|"- /data:/ammds/data"| A_DATA
    H_DB -->|"- /data/db:/ammds/db"| A_DB
    H_MEDIA -->|"- /data/media:/data/media"| J_MEDIA

    %% =========================
    %% Data flow
    %% =========================
    A_DOWNLOAD -->|"Scrape and Organize"| A_MEDIA
    A_MEDIA -->|"Write"| H_MEDIA
    H_MEDIA -->|"Read"| J_MEDIA

    %% =========================
    %% Function explanation
    %% =========================
    A_DOWNLOAD -.->|"Scan"| SCAN["Movie Scanning"]
    SCAN -.->|"Scrape"| SCRAPE["Metadata Scraping"]
    SCRAPE -.->|"Organize"| ORGANIZE["File Organization"]
    ORGANIZE -.->|"Save"| A_MEDIA
    J_MEDIA -.->|"Build"| LIBRARY["Movie Media Library"]
    LIBRARY -.->|"Provide"| STREAM["Streaming Service"]
```

## IV. FAQ

### 1. What to do if mounting fails?

- **Check if the path is correct**: Ensure the host directory exists and the path format is correct
- **Check if permissions are sufficient**: Ensure the host directory has read and write permissions
- **Check if Docker service is running**: Ensure the Docker service is running normally
- **Check if mounting syntax is correct**: Ensure the mounting syntax in docker-compose.yml is correct, in the format `- host path:container path`

### 2. What to do if organized movie files are not visible in Jellyfin?

- **Check if mounting is correct**: Ensure the Jellyfin container correctly mounts the `/data/media` directory
- **Check media library configuration**: Ensure the correct media library path is added in Jellyfin
- **Manually scan media library**: Manually scan the media library in Jellyfin to update the media library content
- **Check file permissions**: Ensure movie files have read permissions

### 3. What to do if the size of organized movie files changes?

- **Check if compression is enabled**: AMMDS does not compress movie files by default; check if other tools are compressing files
- **Check file format**: Ensure the file format is not changed during the organization process
- **Check metadata size**: Metadata files (such as nfo files, posters, etc.) are added during the organization process, which increases the total size

### 4. How to back up mounted directories?

- **Regular backup**: Regularly back up the `/data/download` and `/data/media` directories on the host
- **Backup database**: Also back up the `/data/db` directory to save AMMDS configuration and scraping records
- **Test backup**: Regularly test if backups can be restored normally

:::warning
**Important Reminder**

- Do not directly modify the permissions of mounted directories while containers are running, as this may cause containers to be unable to access them normally
- Regularly clean up unorganized movie files to avoid occupying too much storage space
- Ensure the host has sufficient storage space to avoid organization failure due to insufficient space
:::