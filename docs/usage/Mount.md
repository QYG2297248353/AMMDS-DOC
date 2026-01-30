---
sidebar_position: 1
sidebar_label: "Mount Relationships"
---

# Detailed Explanation of Mount Relationships

This document details the mount relationships related to AMMDS, including the mounting logic during deployment and media organization, helping you understand the entire system's directory structure and data flow.

:::tip
If you are using AMMDS for the first time, it is recommended that you read this document first to understand the system's mount relationships, which can avoid data loss or configuration errors during deployment and use.
:::

## 1. Mounting Logic During Deployment

### 1. Basic Mount Configuration

When deploying AMMDS using Docker Compose, you need to configure mount directories in the `docker-compose.yml` file:

```yaml
volumes:
  - ./data:/ammds/data  # Mount the current directory's data folder to the container's /ammds/data
  - ./db:/ammds/db  # Mount the current directory's db folder to the container's /ammds/db
  - ./download:/data/download  # Mount the current directory's download folder to the container's /data/download
  - ./media:/data/media  # Mount the current directory's media folder to the container's /data/media
```

### 2. Directory Description

| Host Directory | Container Directory | Purpose |
| -------------- | ------------------- | ------- |
| `./data` | `/ammds/data` | Store AMMDS configuration files and temporary data |
| `./db` | `/ammds/db` | Store AMMDS database files |
| `./download` | `/data/download` | Store unorganized movie files |
| `./media` | `/data/media` | Store organized movie files for access by media servers like Jellyfin |

### 3. Deployment Mount Diagram

```mermaid
flowchart TD
    %% Host directories
    subgraph HOST["Host Machine"]
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

    %% Mount relationships
    H_DATA -->|"- ./data:/ammds/data"| A_DATA
    H_DB -->|"- ./db:/ammds/db"| A_DB
    H_DOWNLOAD -->|"- ./download:/data/download"| A_DOWNLOAD
    H_MEDIA -->|"- ./media:/data/media"| A_MEDIA

    %% Description
    A_DATA -->|"Store configuration files and temporary data"| CONFIG["Configuration Files"]
    A_DB -->|"Store database files"| DATABASE["Database"]
    A_DOWNLOAD -->|"Store unorganized movie files"| RAW_MEDIA["Unorganized Movies"]
    A_MEDIA -->|"Store organized movie files"| PROCESSED_MEDIA["Organized Movies"]
```

## 2. Mounting Logic for Media Organization

### 1. Overall Architecture

```mermaid
flowchart LR
    %% =========================
    %% Host machine (only keep facts)
    %% =========================
    subgraph HOST["Host Machine (Real Disk)"]
        D1["/data/download<br/>Downloaded movies (unorganized)"]
        D2["/data/media<br/>Downloaded movies (organized)"]
    end

    %% =========================
    %% ammds
    %% =========================
    subgraph AMMDS["ammds (Media Scraping / Organization)"]
        A1["/data/download<br/>Data source directory"]
        A2["/data/media<br/>Organization target directory"]
    end

    %% =========================
    %% jellyfin
    %% =========================
    subgraph JELLYFIN["Jellyfin (Media Library)"]
        J["/data/media<br/>Media library path"]
    end

    %% =========================
    %% Mount relationships (only necessary ones)
    %% =========================
    D1 -->|"volume mount /data/download"| A1
    D2 -->|"volume mount /data/media"| A2
    D2 -->|"volume mount /data/media"| J

```

### 2. Relationship Between Host and AMMDS

The host's `/data/download` directory (storing unorganized movie files) is mounted to the AMMDS container's `/data/download` directory via Docker volume. This allows AMMDS to access the unorganized movie files on the host for scraping and organization operations.

Specifically:
- The `/data/download` directory on the host corresponds to the `/data/download` directory inside the AMMDS container
- AMMDS will scan movie files in the `/data/download` directory
- After scraping and organization, AMMDS will save the organized movie files to the `/data/media` directory

:::tip
**Why mount this way?**

- AMMDS needs to access unorganized movie files for scraping and organization, so it needs to mount the `/data/download` directory
- AMMDS needs to save organized movie files to a location accessible by Jellyfin, so it needs to mount the `/data/media` directory
- This mounting method ensures that AMMDS and Jellyfin can share the same media library directory, avoiding duplicate data storage
- Using the same path reduces user confusion and makes it easier for users to understand and manage
:::

### 3. Relationship Between Host and Jellyfin

The host's `/data/media` directory (storing organized movie files) is mounted to the Jellyfin container's `/data/media` directory via Docker volume. This allows Jellyfin to access the organized movie files, build a media library, and provide streaming services.

Specifically:
- The `/data/media` directory on the host corresponds to the `/data/media` directory inside the Jellyfin container
- Jellyfin will scan movie files in the `/data/media` directory
- Based on the file structure and metadata, Jellyfin will build a media library, providing classification, search, and playback functions

:::tip
**Why does Jellyfin only need to mount the `/data/media` directory?**

- As a media server, Jellyfin only needs to access organized movie files, not unorganized ones
- Organized movie files already contain complete metadata and standardized file structures, which Jellyfin can directly recognize and use
- This mounting method simplifies Jellyfin's configuration and improves system security
:::

### 4. Relationship Between AMMDS and Movie Files

When processing movie files, AMMDS goes through the following process:

1. **Scanning Phase**: AMMDS scans unorganized movie files in the `/data/download` directory
2. **Scraping Phase**: Based on file names or file content, AMMDS retrieves metadata for movie files from the internet (such as title, poster, synopsis, etc.)
3. **Organization Phase**: Based on the scraped metadata, AMMDS renames movie files and organizes them into the `/data/media` directory according to a certain directory structure
4. **Update Phase**: After organization is complete, movie files can be recognized and used by media servers like Jellyfin

### 5. Data Flow

```mermaid
flowchart TD
    %% Data flow diagram
    HOST_DOWNLOAD["Host Machine<br/>/data/download"] -->|"Mount"| AMMDS_DOWNLOAD["AMMDS<br/>/data/download"]
    AMMDS_DOWNLOAD -->|"Scrape and Organize"| AMMDS_MEDIA["AMMDS<br/>/data/media"]
    AMMDS_MEDIA -->|"Write"| HOST_MEDIA["Host Machine<br/>/data/media"]
    HOST_MEDIA -->|"Mount"| JELLYFIN_MEDIA["Jellyfin<br/>/data/media"]
    JELLYFIN_MEDIA -->|"Build Media Library"| JELLYFIN_SERVER["Jellyfin<br/>Media Server"]
```

### 6. Media Organization Process Diagram

```mermaid
flowchart TD
    %% Start
    START["Start"] --> DOWNLOAD["Download Movie Files"]
    
    %% Download phase
    DOWNLOAD --> SAVE_RAW["Save to Host Machine<br/>/data/download"]
    
    %% AMMDS processing phase
    SAVE_RAW --> MOUNT_TO_AMMDS["Mount to AMMDS<br/>/data/download"]
    MOUNT_TO_AMMDS --> SCAN["AMMDS Scans Movie Files"]
    SCAN --> SCRAPE["AMMDS Scrapes Metadata"]
    SCRAPE --> ORGANIZE["AMMDS Organizes File Structure"]
    ORGANIZE --> SAVE_PROCESSED["Save to AMMDS<br/>/data/media"]
    
    %% Host machine synchronization phase
    SAVE_PROCESSED --> SYNC_TO_HOST["Sync to Host Machine<br/>/data/media"]
    
    %% Jellyfin processing phase
    SYNC_TO_HOST --> MOUNT_TO_JELLYFIN["Mount to Jellyfin<br/>/data/media"]
    MOUNT_TO_JELLYFIN --> JELLYFIN_SCAN["Jellyfin Scans Media Library"]
    JELLYFIN_SCAN --> BUILD_LIBRARY["Jellyfin Builds Media Library"]
    BUILD_LIBRARY --> PROVIDE_STREAM["Jellyfin Provides Streaming Services"]
    
    %% End
    PROVIDE_STREAM --> END["End"]
    
    %% Process description
    DOWNLOAD -->|"Obtain movie files through download tools"| DOWNLOAD_TOOL["Download Tools"]
    SCAN -->|"Regular or manual scanning"| SCAN_MODE["Scanning Mode"]
    SCRAPE -->|"Obtain metadata from websites like TMDB"| METADATA["Metadata"]
    ORGANIZE -->|"Classify by movie category"| CATEGORIZE["Categorization"]
    PROVIDE_STREAM -->|"Users access through browser or client"| USER_ACCESS["User Access"]
```

### 7. Detailed Directory Structure

#### Host Machine Directory Structure

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

## 3. Complete Mount Relationship Diagram

```mermaid
flowchart LR
    %% =========================
    %% Host machine
    %% =========================
    subgraph HOST["Host Machine"]
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
    %% Mount relationships
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
    %% Function description
    %% =========================
    A_DOWNLOAD -.->|"Scan"| SCAN["Movie Scanning"]
    SCAN -.->|"Scrape"| SCRAPE["Metadata Scraping"]
    SCRAPE -.->|"Organize"| ORGANIZE["File Organization"]
    ORGANIZE -.->|"Save"| A_MEDIA
    J_MEDIA -.->|"Build"| LIBRARY["Movie Media Library"]
    LIBRARY -.->|"Provide"| STREAM["Streaming Services"]
```

## 4. Frequently Asked Questions

### 1. What to do if mounting fails?

- **Check if the path is correct**: Ensure the host directory exists and the path format is correct
- **Check if permissions are sufficient**: Ensure the host directory has read and write permissions
- **Check if Docker service is running**: Ensure the Docker service is running normally
- **Check if the mounting syntax is correct**: Ensure the mounting syntax in docker-compose.yml is correct, in the format `- host path:container path`

### 2. What to do if organized movie files are not visible in Jellyfin?

- **Check if mounting is correct**: Ensure the Jellyfin container correctly mounts the `/data/media` directory
- **Check media library configuration**: Ensure the correct media library path is added in Jellyfin
- **Manually scan the media library**: Manually scan the media library in Jellyfin to update the media library content
- **Check file permissions**: Ensure movie files have readable permissions

### 3. What to do if the size of organized movie files changes?

- **Check if compression is enabled**: AMMDS does not compress movie files by default, check if other tools are compressing files
- **Check file format**: Ensure the file format is not changed during the organization process
- **Check metadata size**: Metadata files (such as nfo files, posters, etc.) are added during the organization process, which will increase the total size

### 4. How to back up mounted directories?

- **Regular backup**: Regularly back up the `/data/download` and `/data/media` directories on the host machine
- **Backup database**: Also back up the `/data/db` directory to save AMMDS configuration and scraping records
- **Test backup**: Regularly test if backups can be restored normally

:::warning
**Important Reminder**

- Do not directly modify the permissions of mounted directories while containers are running, as this may cause containers to be unable to access them normally
- Regularly clean up unorganized movie files to avoid occupying too much storage space
- Ensure the host machine has sufficient storage space to avoid organization failure due to insufficient space
:::
