---
sidebar_position: 2
sidebar_label: "Docker Compose"
---

# Docker Compose 

Docker Compose는 다중 컨테이너 Docker 애플리케이션을 정의하고 실행하기 위한 도구입니다. 단일 YAML 파일(docker-compose.yml)을 통해 애플리케이션의 모든 서비스를 구성한 다음 한 명령으로 모든 서비스를 시작할 수 있습니다. 개발, 테스트 및 스테이징 환경에서 애플리케이션을 신속하게 배포하고 관리하는 데 매우 적합합니다.

<!-- truncate -->

## 서비스 생성

### 응용 프로그램 디렉터리 생성

먼저 관련 파일을 저장할 `ammds`라는 디렉터리를 생성합니다:

```bash
mkdir ammds && cd ammds
```

### 구성 파일 생성

`ammds` 디렉터리에서 `docker-compose.yml` 파일을 생성하고 편집합니다. 다음 내용을 파일에 붙여넣습니다:

```yaml
services:
  ammds:
    image: qyg2297248353/ammds:latest  # Docker 이미지 이름 및 버전 태그
    container_name: AMMDS  # 컨테이너 이름
    ports:
      - "8080:80"  # 포트 매핑: 호스트 포트 8080을 컨테이너 포트 80에 매핑
    volumes:
      - ./data:/ammds/data  # 현재 디렉터리의 data 폴더를 컨테이너의 /ammds/data에 마운트
      - ./db:/ammds/db  # 현재 디렉터리의 db 폴더를 컨테이너의 /ammds/db에 마운트
      - ./download:/ammds/download  # 현재 디렉터리의 download 폴더를 컨테이너의 /ammds/download에 마운트
      - ./media:/media  # 현재 디렉터리의 media 폴더를 컨테이너의 /media에 마운트
    restart: always  # 컨테이너가 실패할 때 항상 자동으로 재시작하도록 설정
    environment:
      - TZ=Asia/Shanghai  # 시간대를 Asia/Shanghai로 설정
    networks:
      - ammds-network  # 사용자 정의 네트워크 사용

networks:
  ammds-network:  # 사용자 정의 네트워크 구성
    driver: bridge  # Docker의 기본 bridge 네트워크 드라이버 사용
```

:::note
로컬 미디어 디렉터리를 컨테이너에 마운트하십시오. 데이터 손실을 방지하려면 /ammds를 미디어 마운트 디렉터리 접두사로 사용하지 마십시오.

**예시:** 호스트 디렉터리가 `/mnt/movie`인 경우 권장되는 마운트 형식은 `- /mnt/movie:/mnt/movie`입니다.
:::

## 클라우드 드라이브 사용자를 위한 특별 구성

CloudDrive와 같은 클라우드 드라이브 마운트를 사용하는 경우 `docker-compose.yml` 파일에서 다음 구성을 사용하십시오:

```yaml
services:
  ammds:
    image: qyg2297248353/ammds:latest
    container_name: AMMDS
    ports:
      - "8080:80"
    volumes:
      - ./data:/ammds/data
      - ./db:/ammds/db
      - ./download:/ammds/download
      - /media:/media:rw,rshared
    restart: always
    environment:
      - TZ=Asia/Shanghai
    cap_add:
      - SYS_ADMIN
    devices:
      - "/dev/fuse:/dev/fuse"
    security_opt:
      - apparmor:unconfined
    networks:
      - ammds-network

networks:
  ammds-network:
    driver: bridge
```

### 클라우드 드라이브 사용자 특별 설명

- `:rw,rshared`：기본 읽기/쓰기 권한 외에도 `rshared`는 컨테이너 간에 공유 전파를 유지할 수 있습니다.
- `cap_add: - SYS_ADMIN`：컨테이너가 시스템 리소스에 액세스하도록 허용합니다.
- `devices: - "/dev/fuse:/dev/fuse"`：컨테이너가 FUSE 장치에 액세스하도록 허용합니다.
- `security_opt: - apparmor:unconfined`：컨테이너가 제한되지 않은 AppArmor 구성을 사용하도록 허용합니다.

:::warning
이 배포 방식은 "클라우드 드라이브 마운트 + 디렉토리 모니터링" 방식에는 적합하지 않습니다. "디렉토리 모니터링" 대신 "주기적 스캔"을 사용하십시오.
:::

## 서비스 시작

다음 명령을 사용하여 서비스를 시작합니다. 이렇게 하면 AMMDS 컨테이너가 백그라운드에서 실행되고 docker-compose.yml 파일의 모든 구성이 적용됩니다:

```bash
docker compose up -d
```

## 서비스 중지

서비스를 중지하고 제거해야 하는 경우 다음 명령을 사용하십시오:

```bash
docker compose down
```

## 서비스 액세스

브라우저를 통해 서비스에 액세스할 수 있습니다:

```
http://127.0.0.1:8080
```

액세스 URL 형식: `호스트 IP 주소 + 서비스 포트`

## 기본 자격 증명

- **사용자 이름**：`ammds`
- **비밀번호**：`ammds`

:::tip
자격 증명이 명확하게 보이지 않는 경우 밝은 모드로 전환하십시오.
:::