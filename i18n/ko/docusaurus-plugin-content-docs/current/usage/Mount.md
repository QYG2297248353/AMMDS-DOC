---
sidebar_position: 1
sidebar_label: "마운트 관계"
---

# 마운트 관계 상세 설명

본 문서에서는 AMMDS 관련 마운트 관계에 대해 자세히 설명합니다. 배포 시의 마운트 로직과 미디어 정리의 마운트 로직을 포함하여 전체 시스템의 디렉토리 구조와 데이터 흐름을 이해하는 데 도움이 됩니다.

:::tip
첫 번째로 AMMDS를 사용하는 경우, 시스템의 마운트 관계를 이해하기 위해 먼저 이 문서를 읽는 것이 좋습니다. 이를 통해 배포 및 사용 과정에서 데이터 손실이나 구성 오류를 방지할 수 있습니다.
:::

## 1. 배포 시의 마운트 로직

### 1. 기본 마운트 설정

Docker Compose를 사용하여 AMMDS를 배포할 때는 `docker-compose.yml` 파일에서 마운트 디렉토리를 설정해야 합니다.

```yaml
volumes:
  - ./data:/ammds/data  # 현재 디렉토리의 data 폴더를 컨테이너의 /ammds/data에 마운트
  - ./db:/ammds/db  # 현재 디렉토리의 db 폴더를 컨테이너의 /ammds/db에 마운트
  - ./download:/data/download  # 현재 디렉토리의 download 폴더를 컨테이너의 /data/download에 마운트
  - ./media:/data/media  # 현재 디렉토리의 media 폴더를 컨테이너의 /data/media에 마운트
```

### 2. 디렉토리 설명

| 호스트 머신 디렉토리 | 컨테이너 디렉토리 | 용도 |
| ------------------ | ---------------- | ---- |
| `./data` | `/ammds/data` | AMMDS의 구성 파일 및 임시 데이터 저장 |
| `./db` | `/ammds/db` | AMMDS의 데이터베이스 파일 저장 |
| `./download` | `/data/download` | 정리되지 않은 영화 파일 저장 |
| `./media` | `/data/media` | Jellyfin 등의 미디어 서버에서 액세스하기 위한 정리된 영화 파일 저장 |

### 3. 배포 마운트 다이어그램

```mermaid
flowchart TD
    %% 호스트 머신 디렉토리
    subgraph HOST["호스트 머신"]
        H_DATA["./data"]
        H_DB["./db"]
        H_DOWNLOAD["./download"]
        H_MEDIA["./media"]
    end

    %% AMMDS 컨테이너
    subgraph AMMDS["AMMDS 컨테이너"]
        A_DATA["/ammds/data"]
        A_DB["/ammds/db"]
        A_DOWNLOAD["/data/download"]
        A_MEDIA["/data/media"]
    end

    %% 마운트 관계
    H_DATA -->|"- ./data:/ammds/data"| A_DATA
    H_DB -->|"- ./db:/ammds/db"| A_DB
    H_DOWNLOAD -->|"- ./download:/data/download"| A_DOWNLOAD
    H_MEDIA -->|"- ./media:/data/media"| A_MEDIA

    %% 설명
    A_DATA -->|"구성 파일 및 임시 데이터 저장"| CONFIG["구성 파일"]
    A_DB -->|"데이터베이스 파일 저장"| DATABASE["데이터베이스"]
    A_DOWNLOAD -->|"정리되지 않은 영화 파일 저장"| RAW_MEDIA["정리되지 않은 영화"]
    A_MEDIA -->|"정리된 영화 파일 저장"| PROCESSED_MEDIA["정리된 영화"]
```

## 2. 미디어 정리의 마운트 로직

### 1. 전체 아키텍처

```mermaid
flowchart LR
    %% =========================
    %% 호스트 머신 (사실만 유지)
    %% =========================
    subgraph HOST["호스트 머신 (실제 디스크)"]
        D1["/data/download<br/>다운로드한 영화 (정리되지 않은)"]
        D2["/data/media<br/>다운로드한 영화 (정리된)"]
    end

    %% =========================
    %% ammds
    %% =========================
    subgraph AMMDS["ammds (미디어 스크레이핑 / 정리)"]
        A1["/data/download<br/>데이터 소스 디렉토리"]
        A2["/data/media<br/>정리 대상 디렉토리"]
    end

    %% =========================
    %% jellyfin
    %% =========================
    subgraph JELLYFIN["Jellyfin (미디어 라이브러리)"]
        J["/data/media<br/>미디어 라이브러리 경로"]
    end

    %% =========================
    %% 마운트 관계 (필요한 것만)
    %% =========================
    D1 -->|"volume 마운트 /data/download"| A1
    D2 -->|"volume 마운트 /data/media"| A2
    D2 -->|"volume 마운트 /data/media"| J

```

### 2. 호스트 머신과 AMMDS의 관계

호스트 머신의 `/data/download` 디렉토리 (정리되지 않은 영화 파일 저장)는 Docker 볼륨을 통해 AMMDS 컨테이너의 `/data/download` 디렉토리에 마운트됩니다. 이를 통해 AMMDS는 호스트 머신의 정리되지 않은 영화 파일에 액세스하여 스크레이핑 및 정리 작업을 수행할 수 있습니다.

구체적으로:
- 호스트 머신의 `/data/download` 디렉토리는 AMMDS 컨테이너 내의 `/data/download` 디렉토리에 해당합니다
- AMMDS는 `/data/download` 디렉토리의 영화 파일을 스캔합니다
- 스크레이핑 및 정리 후, AMMDS는 정리된 영화 파일을 `/data/media` 디렉토리에 저장합니다

:::tip
**왜 이렇게 마운트하나요?**

- AMMDS는 스크레이핑 및 정리를 위해 정리되지 않은 영화 파일에 액세스해야 하므로 `/data/download` 디렉토리를 마운트해야 합니다
- AMMDS는 정리된 영화 파일을 Jellyfin이 액세스할 수 있는 위치에 저장해야 하므로 `/data/media` 디렉토리를 마운트해야 합니다
- 이 마운트 방식을 통해 AMMDS와 Jellyfin이 동일한 미디어 라이브러리 디렉토리를 공유할 수 있어 데이터 중복 저장을 방지할 수 있습니다
- 동일한 경로를 사용하면 사용자의 혼란을 줄이고 이해와 관리가 쉬워집니다
:::

### 3. 호스트 머신과 Jellyfin의 관계

호스트 머신의 `/data/media` 디렉토리 (정리된 영화 파일 저장)는 Docker 볼륨을 통해 Jellyfin 컨테이너의 `/data/media` 디렉토리에 마운트됩니다. 이를 통해 Jellyfin은 정리된 영화 파일에 액세스하여 미디어 라이브러리를 구축하고 스트리밍 서비스를 제공할 수 있습니다.

구체적으로:
- 호스트 머신의 `/data/media` 디렉토리는 Jellyfin 컨테이너 내의 `/data/media` 디렉토리에 해당합니다
- Jellyfin은 `/data/media` 디렉토리의 영화 파일을 스캔합니다
- 파일 구조와 메타데이터에 기초하여 Jellyfin은 미디어 라이브러리를 구축하고 분류, 검색, 재생 기능을 제공합니다

:::tip
**왜 Jellyfin은 `/data/media` 디렉토리만 마운트하면 되나요?**

- 미디어 서버로서 Jellyfin은 정리된 영화 파일에만 액세스하면 되며, 정리되지 않은 영화 파일에는 액세스할 필요가 없습니다
- 정리된 영화 파일에는 이미 완전한 메타데이터와 표준화된 파일 구조가 포함되어 있어 Jellyfin이 직접 인식하고 사용할 수 있습니다
- 이 마운트 방식을 통해 Jellyfin의 구성이 단순화되고 시스템 보안이 향상됩니다
:::

### 4. AMMDS와 영화 파일의 관계

AMMDS는 영화 파일을 처리할 때 다음 프로세스를 거칩니다:

1. **스캔 단계**：AMMDS는 `/data/download` 디렉토리의 정리되지 않은 영화 파일을 스캔합니다
2. **스크레이핑 단계**：파일 이름이나 파일 내용에 기초하여 AMMDS는 인터넷에서 영화 파일의 메타데이터 (제목, 포스터, 줄거리 등)를 가져옵니다
3. **정리 단계**：스크레이핑한 메타데이터에 기초하여 AMMDS는 영화 파일의 이름을 변경하고 일정한 디렉토리 구조에 따라 `/data/media` 디렉토리에 정리합니다
4. **갱신 단계**：정리가 완료되면 영화 파일은 Jellyfin 등의 미디어 서버에서 인식되고 사용할 수 있게 됩니다

### 5. 데이터 흐름

```mermaid
flowchart TD
    %% 데이터 흐름 다이어그램
    HOST_DOWNLOAD["호스트 머신<br/>/data/download"] -->|"마운트"| AMMDS_DOWNLOAD["AMMDS<br/>/data/download"]
    AMMDS_DOWNLOAD -->|"스크레이핑 및 정리"| AMMDS_MEDIA["AMMDS<br/>/data/media"]
    AMMDS_MEDIA -->|"쓰기"| HOST_MEDIA["호스트 머신<br/>/data/media"]
    HOST_MEDIA -->|"마운트"| JELLYFIN_MEDIA["Jellyfin<br/>/data/media"]
    JELLYFIN_MEDIA -->|"미디어 라이브러리 구축"| JELLYFIN_SERVER["Jellyfin<br/>미디어 서버"]
```

### 6. 미디어 정리 프로세스 다이어그램

```mermaid
flowchart TD
    %% 시작
    START["시작"] --> DOWNLOAD["영화 파일 다운로드"]
    
    %% 다운로드 단계
    DOWNLOAD --> SAVE_RAW["호스트 머신에 저장<br/>/data/download"]
    
    %% AMMDS 처리 단계
    SAVE_RAW --> MOUNT_TO_AMMDS["AMMDS에 마운트<br/>/data/download"]
    MOUNT_TO_AMMDS --> SCAN["AMMDS가 영화 파일 스캔"]
    SCAN --> SCRAPE["AMMDS가 메타데이터 스크레이핑"]
    SCRAPE --> ORGANIZE["AMMDS가 파일 구조 정리"]
    ORGANIZE --> SAVE_PROCESSED["AMMDS에 저장<br/>/data/media"]
    
    %% 호스트 머신 동기화 단계
    SAVE_PROCESSED --> SYNC_TO_HOST["호스트 머신에 동기화<br/>/data/media"]
    
    %% Jellyfin 처리 단계
    SYNC_TO_HOST --> MOUNT_TO_JELLYFIN["Jellyfin에 마운트<br/>/data/media"]
    MOUNT_TO_JELLYFIN --> JELLYFIN_SCAN["Jellyfin이 미디어 라이브러리 스캔"]
    JELLYFIN_SCAN --> BUILD_LIBRARY["Jellyfin이 미디어 라이브러리 구축"]
    BUILD_LIBRARY --> PROVIDE_STREAM["Jellyfin이 스트리밍 서비스 제공"]
    
    %% 끝
    PROVIDE_STREAM --> END["끝"]
    
    %% 프로세스 설명
    DOWNLOAD -->|"다운로드 도구를 통해 영화 파일 획득"| DOWNLOAD_TOOL["다운로드 도구"]
    SCAN -->|"정기적 또는 수동 스캔"| SCAN_MODE["스캔 모드"]
    SCRAPE -->|"TMDB 등의 웹사이트에서 메타데이터 획득"| METADATA["메타데이터"]
    ORGANIZE -->|"영화 카테고리별 분류"| CATEGORIZE["분류"]
    PROVIDE_STREAM -->|"사용자가 브라우저 또는 클라이언트를 통해 액세스"| USER_ACCESS["사용자 액세스"]
```

### 7. 상세 디렉토리 구조

#### 호스트 머신 디렉토리 구조

```
/data/
├── download/           # 정리되지 않은 영화 파일
│   ├── movie1.mp4      # 영화 파일
│   └── ...
└── media/              # 정리된 영화 파일
    ├── Movies/         # 영화 디렉토리
    │   ├── Movie 1 (2023)/
    │   │   ├── Movie 1 (2023).mp4
    │   │   └── poster.jpg
    │   └── ...
    └── ...
```

#### AMMDS 컨테이너 디렉토리 구조

```
/ammds/
├── data/               # 호스트 머신의 /data에서 매핑
│   ├── config.json     # 구성 파일
│   └── ...
├── db/                 # 호스트 머신의 /data/db에서 매핑
│   ├── ammds.db        # 데이터베이스 파일
│   └── ...
├── download/           # 호스트 머신의 /data/download에서 매핑
│   ├── movie1.mp4
│   └── ...
/media/                  # 호스트 머신의 /data/media에서 매핑
├── Movies/
└── ...
```

#### Jellyfin 컨테이너 디렉토리 구조

```
/data/
└── media/              # 호스트 머신의 /data/media에서 매핑
    ├── Movies/
    └── ...
```

## 3. 완전한 마운트 관계 다이어그램

```mermaid
flowchart LR
    %% =========================
    %% 호스트 머신
    %% =========================
    subgraph HOST["호스트 머신"]
        H_DOWNLOAD["/data/download<br/>정리되지 않은 영화"]
        H_MEDIA["/data/media<br/>정리된 영화"]
        H_CONFIG["/data<br/>구성 파일"]
        H_DB["/data/db<br/>데이터베이스 파일"]
    end

    %% =========================
    %% AMMDS
    %% =========================
    subgraph AMMDS["AMMDS 컨테이너"]
        A_DATA["/ammds/data<br/>구성 및 임시 데이터"]
        A_DB["/ammds/db<br/>데이터베이스"]
        A_DOWNLOAD["/data/download<br/>정리되지 않은 영화"]
        A_MEDIA["/data/media<br/>정리된 영화"]
    end

    %% =========================
    %% Jellyfin
    %% =========================
    subgraph JELLYFIN["Jellyfin 컨테이너"]
        J_MEDIA["/data/media<br/>미디어 라이브러리"]
    end

    %% =========================
    %% 마운트 관계
    %% =========================
    H_DOWNLOAD -->|"- /data/download:/data/download"| A_DOWNLOAD
    H_MEDIA -->|"- /data/media:/data/media"| A_MEDIA
    H_CONFIG -->|"- /data:/ammds/data"| A_DATA
    H_DB -->|"- /data/db:/ammds/db"| A_DB
    H_MEDIA -->|"- /data/media:/data/media"| J_MEDIA

    %% =========================
    %% 데이터 흐름
    %% =========================
    A_DOWNLOAD -->|"스크레이핑 및 정리"| A_MEDIA
    A_MEDIA -->|"쓰기"| H_MEDIA
    H_MEDIA -->|"읽기"| J_MEDIA

    %% =========================
    %% 기능 설명
    %% =========================
    A_DOWNLOAD -.->|"스캔"| SCAN["영화 스캔"]
    SCAN -.->|"스크레이핑"| SCRAPE["메타데이터 스크레이핑"]
    SCRAPE -.->|"정리"| ORGANIZE["파일 정리"]
    ORGANIZE -.->|"저장"| A_MEDIA
    J_MEDIA -.->|"구축"| LIBRARY["영화 미디어 라이브러리"]
    LIBRARY -.->|"제공"| STREAM["스트리밍 서비스"]
```

## 4. 자주 묻는 질문

### 1. 마운트에 실패했을 때 어떻게 해야 하나요?

- **경로가 올바른지 확인**：호스트 머신 디렉토리가 존재하고 경로 형식이 올바른지 확인하세요
- **권한이 충분한지 확인**：호스트 머신 디렉토리에 읽기 및 쓰기 권한이 있는지 확인하세요
- **Docker 서비스가 실행 중인지 확인**：Docker 서비스가 정상적으로 실행되고 있는지 확인하세요
- **마운트 구문이 올바른지 확인**：docker-compose.yml의 마운트 구문이 올바른지 확인하세요. 형식은 `- 호스트 경로:컨테이너 경로`입니다

### 2. 정리 후의 영화 파일이 Jellyfin에서 보이지 않을 때 어떻게 해야 하나요?

- **마운트가 올바른지 확인**：Jellyfin 컨테이너가 `/data/media` 디렉토리를 올바르게 마운트했는지 확인하세요
- **미디어 라이브러리 구성 확인**：Jellyfin에 올바른 미디어 라이브러리 경로가 추가되었는지 확인하세요
- **미디어 라이브러리 수동 스캔**：Jellyfin에서 미디어 라이브러리를 수동으로 스캔하여 미디어 라이브러리 내용을 업데이트하세요
- **파일 권한 확인**：영화 파일에 읽기 권한이 있는지 확인하세요

### 3. 정리 후의 영화 파일 크기가 변했을 때 어떻게 해야 하나요?

- **압축이 활성화되어 있는지 확인**：AMMDS는 기본적으로 영화 파일을 압축하지 않습니다. 다른 도구가 파일을 압축하고 있지 않은지 확인하세요
- **파일 형식 확인**：정리 과정에서 파일 형식이 변경되지 않았는지 확인하세요
- **메타데이터 크기 확인**：정리 과정에서 메타데이터 파일 (nfo 파일, 포스터 등)이 추가되므로 총 크기가 증가할 수 있습니다

### 4. 마운트된 디렉토리를 백업하려면 어떻게 해야 하나요?

- **정기적 백업**：호스트 머신의 `/data/download` 및 `/data/media` 디렉토리를 정기적으로 백업하세요
- **데이터베이스 백업**：동시에 `/data/db` 디렉토리도 백업하여 AMMDS의 구성 및 스크레이핑 기록을 저장하세요
- **백업 테스트**：백업이 정상적으로 복원할 수 있는지 정기적으로 테스트하세요

:::warning
**중요한 알림**

- 컨테이너가 실행 중일 때 마운트된 디렉토리의 권한을 직접 변경하지 마세요. 컨테이너가 정상적으로 액세스할 수 없게 될 수 있습니다
- 정리되지 않은 영화 파일을 정기적으로 정리하여 과도한 저장 공간 점유를 방지하세요
- 호스트 머신에 충분한 저장 공간이 있는지 확인하여 공간 부족으로 인한 정리 실패를 방지하세요
:::
