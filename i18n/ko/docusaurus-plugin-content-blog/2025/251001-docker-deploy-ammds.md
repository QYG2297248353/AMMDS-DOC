---
slug: docker-deploy-ammds
title: Docker로 AMMDS 배포하기 — 완전 가이드
authors: [ms]
tags: [tutorial, guide, docker, ammds]
date: 2025-10-01
---

## 개요

AMMDS(Advanced Multimedia Data Management System)는 메타데이터 스크래핑, 사이트 인증, 리소스 검색, 랭킹 관리 등을 지원하는 강력한 개인 데이터 관리 플랫폼입니다. 이 글에서는 Docker로 AMMDS를 배포하는 방법을 Docker Compose 설정, 환경 변수 설명, 디렉터리 마운트 권장 사항, 자주 발생하는 문제 해결까지 자세히 알아봅니다.

{/* truncate */}

## 사전 준비 사항

배포를 시작하기 전에 다음 소프트웨어가 환경에 설치되어 있는지 확인하세요:

- **Docker Engine**: 버전 20.10 이상
- **Docker Compose**: 버전 2.x 이상(또는 Docker Compose Plugin)
- **운영체제**: Linux(Ubuntu 20.04+ / Debian 11+ 권장), Windows Server 2019+, macOS, 또는 시놀로지 DSM / FnOS 같은 NAS 시스템
- **하드웨어 요구 사항**: 최소 CPU 2코어, 메모리 4GB, 여유 디스크 공간 20GB

환경 확인:

```bash
docker --version
docker compose version
```

## Docker Compose 배포(권장)

### 1단계: 배포 디렉터리 만들기

```bash
mkdir -p /opt/ammds
cd /opt/ammds
```

### 2단계: docker-compose.yml 작성

`docker-compose.yml` 파일을 만듭니다:

```yaml
version: '3.8'

services:
  ammds:
    image: qyg2297248353/ammds:latest
    container_name: ammds
    restart: unless-stopped
    ports:
      - "7000:7000"
    volumes:
      - ./data:/app/data
      - ./config:/app/config
      - /path/to/your/media:/media:ro
      - /path/to/your/downloads:/downloads:ro
    environment:
      - TZ=Asia/Shanghai
      - SERVER_PORT=7000        # SpringBoot 애플리케이션이 수신 대기하는 포트
      - SPRING_PROFILES_ACTIVE=prod
      - AMMDS_HOME=/app/data
    networks:
      - ammds-network

networks:
  ammds-network:
    driver: bridge
```

### 3단계: 서비스 시작

```bash
docker compose up -d
```

이미지가 내려받아지고 컨테이너가 시작될 때까지 기다립니다. 첫 시작은 네트워크 속도에 따라 몇 분이 걸릴 수 있습니다.

### 4단계: 배포 확인

```bash
docker compose logs -f ammds
```

로그를 확인해 서비스가 정상적으로 시작되었는지 확인한 뒤, 브라우저에서 `http://<서버 IP>:7000`에 접속합니다.

## 환경 변수 설명

AMMDS는 환경 변수로 설정할 수 있습니다. 주요 환경 변수는 다음과 같습니다:

| 변수명 | 설명 | 기본값 | 필수 여부 |
|:-------|:-----|:-------|:---------|
| `TZ` | 시간대 설정 | `Asia/Shanghai` | 권장 |
| `SERVER_PORT` | 서비스 수신 포트 | `7000` | 권장 |
| `SPRING_PROFILES_ACTIVE` | SpringBoot 활성 프로파일 | `prod` | 아니요 |
| `AMMDS_HOME` | 데이터 디렉터리 경로 | `/app/data` | 아니요 |
| `AMMDS_LOG_LEVEL` | 로그 수준 | `INFO` | 아니요 |
| `AMMDS_ENABLE_HTTPS` | HTTPS 활성화 여부 | `false` | 아니요 |

### 고급 설정 예시

```yaml
environment:
  - TZ=Asia/Shanghai
  - SERVER_PORT=7000
  - AMMDS_LOG_LEVEL=DEBUG
  - AMMDS_ENABLE_HTTPS=false
  - AMMDS_MAX_CONCURRENT_SCRAPES=5
```

## 디렉터리 마운트 권장 사항

적절한 디렉터리 마운트는 데이터 영구 저장과 성능 최적화를 보장합니다:

| 컨테이너 내부 경로 | 권장 호스트 경로 | 설명 |
|:-----------|:--------------|:-----|
| `/app/data` | `./data` | 데이터베이스 파일과 사용자 데이터 영구 저장 |
| `/app/config` | `./config` | 설정 파일 영구 저장 |
| `/media` | `/path/to/media` | 미디어 파일 디렉터리(`:ro`로 읽기 전용 마운트 권장) |
| `/downloads` | `/path/to/downloads` | 다운로드 디렉터리(자동 스크래핑 감시용) |

### 시놀로지 NAS 마운트 예시

```yaml
volumes:
  - /volume1/docker/ammds/data:/app/data
  - /volume1/docker/ammds/config:/app/config
  - /volume1/video:/media:ro
  - /volume1/downloads:/downloads:ro
```

### FnOS 마운트 예시

```yaml
volumes:
  - /vol1/1000/docker/ammds/data:/app/data
  - /vol1/1000/docker/ammds/config:/app/config
  - /vol1/1000/video:/media:ro
  - /vol1/1000/downloads:/downloads:ro
```

## 첫 시작 설정

### 1. 관리 인터페이스 접속

브라우저를 열어 `http://<서버 IP>:7000`에 접속하면 AMMDS 로그인 페이지가 표시됩니다.

### 2. 관리자 계정 만들기

첫 접속 시 관리자 계정 생성을 안내합니다. 안전한 사용자 이름과 비밀번호를 설정하세요.

### 3. 스크래핑 플러그인 설정

'플러그인 관리' 페이지로 이동해 필요한 데이터 소스 플러그인을 활성화합니다:

- **TMDB 스크래핑**: 권장. 서양 영화·드라마 메타데이터를 가장 폭넓게 지원합니다
- **JavBus 스크래핑**: 일본 영상 리소스에 적합합니다
- **Metatube 스크래핑**: 추가 메타데이터 소스를 제공합니다
- **FANZA DMM 스크래핑**: 일본 영상물용 고품질 데이터 소스입니다
- **ThePornDB 스크래핑**: R18 콘텐츠용입니다

각 플러그인은 API 키나 쿠키 설정이 필요할 수 있으니 화면 안내에 따라 진행하세요.

### 4. 사이트 인증 추가

'사이트 관리' 페이지로 이동해 PT 사이트 인증 정보를 추가합니다:

1. '사이트 추가'를 클릭합니다
2. 사이트 유형을 선택합니다(M-Team, KamePT, Rousi 등)
3. 사이트 도메인과 인증 자격 증명(쿠키 또는 패스키)을 입력합니다
4. '확인'을 클릭해 연결이 성공했는지 확인합니다

### 5. 푸시 알림 설정

'알림 설정'에서 푸시 방식을 구성합니다:

- **Telegram Bot**: 봇을 통해 스크래핑 결과와 시스템 알림을 전송합니다
- **WebHook**: 사용자 지정 WebHook URL로 알림을 받습니다

## 자주 발생하는 문제 해결

### Q1: 컨테이너가 시작 직후 종료됩니다

**원인**: 대체로 데이터 디렉터리 권한이 부족하거나 포트가 이미 사용 중이기 때문입니다.

**해결 방법**:
```bash
# 포트 점유 여부 확인
netstat -tlnp | grep 7000

# 디렉터리 권한 수정
sudo chown -R 1000:1000 ./data ./config
sudo chmod -R 755 ./data ./config
```

### Q2: 관리 인터페이스에 접속할 수 없습니다

**원인**: 방화벽 규칙 또는 Docker 네트워크 설정 문제입니다.

**해결 방법**:

```bash
# 컨테이너 실행 여부 확인
docker ps | grep ammds

# 컨테이너 로그 확인
docker compose logs ammds

# 방화벽 확인
sudo ufw status
# 필요한 경우 포트 열기
sudo ufw allow 7000
```

### Q3: 스크래핑 기능이 정상적으로 동작하지 않습니다

**원인**: 대체로 API 키 설정이 잘못되었거나 네트워크 접근이 제한되었기 때문입니다.

**해결 방법**:
1. 플러그인 설정의 API 키가 올바른지 확인합니다
2. 서버가 외부 네트워크에 정상적으로 접근할 수 있는지 확인합니다(특히 TMDB, JavBus 등 사이트)
3. AMMDS 로그의 스크래핑 오류 메시지를 확인합니다

### Q4: 데이터베이스 연결 오류

**원인**: SQLite 데이터베이스 파일이 손상되었거나 권한 문제가 있습니다.

**해결 방법**:

```bash
# 권한 수정
sudo chmod 644 ./data/ammds.db
sudo chown 1000:1000 ./data/ammds.db

# 백업 후 데이터베이스 재구축
docker compose down
mv ./data/ammds.db ./data/ammds.db.bak
docker compose up -d
```

### Q5: AMMDS를 업데이트하는 방법

```bash
# 최신 이미지 가져오기
docker compose pull

# 컨테이너 다시 만들기
docker compose up -d

# 오래된 이미지 정리(선택 사항)
docker image prune
```

### Q6: 데이터를 백업하는 방법

```bash
# 데이터 디렉터리 백업
tar -czf ammds-backup-$(date +%Y%m%d).tar.gz ./data ./config

# 백업 복원
tar -xzf ammds-backup-20250101.tar.gz
docker compose restart
```

## 리버스 프록시 설정

### Nginx 설정 예시

```nginx
server {
    listen 80;
    server_name ammds.yourdomain.com;

    location / {
        proxy_pass http://localhost:7000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

데이터 전송 보안을 위해 Certbot이나 Nginx Proxy Manager로 HTTPS 인증서를 구성하는 것을 권장합니다.

## 요약

Docker로 AMMDS를 배포하는 과정은 비교적 간단하며, 핵심은 적절한 디렉터리 마운트와 환경 변수 설정입니다. 배포가 완료되면 다중 사이트 인증, 지능형 메타데이터 스크래핑, 리소스 검색, 실시간 푸시 알림을 갖춘 강력한 개인 데이터 관리 플랫폼을 얻게 됩니다.

배포 중 다른 문제가 발생하면 프로젝트 저장소에 이슈를 남기거나 커뮤니티 토론에 참여해 도움을 받으세요.

---

## 계속 읽기

- [문서: 빠른 시작](/docs/getting-started/overview)
- [FnOS NAS에 AMMDS 배포하기 — 완전 가이드](/blog/fnos-integration-guide)
