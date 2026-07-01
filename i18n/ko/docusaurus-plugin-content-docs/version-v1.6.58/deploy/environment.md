---
sidebar_position: 99
sidebar_label: "环境变量"
---

# 환경 변수

배포 시 환경 변수를 사용하여 빠르게 배포할 수 있습니다.

<!-- truncate -->

## 지원되는 구성

다음 환경 변수를 사용하여 AMMDS 배포를 사용자 정의할 수 있습니다:

| 변수 이름 | 기본값 | 설명 |
|---------|--------|------|
| `NGINX_PORT` | `80` | Nginx 서비스 포트（Host 네트워크에适用） |
| `AMMDS_SERVER_PORT` | `8080` | AMMDS 서버 포트（Host 네트워크에适用） |
| `ADMIN_USER` | `ammds` | 관리자 사용자 이름（수정 금지） |
| `ADMIN_PASS` | `ammds` | 관리자 비밀번호（최초 설치 시에만生效） |
| `AMMDS_SYSTEM_MODE` | `full` | 시스템 실행 모드：완전 모드 (`full`)，백엔드 전용 모드 (`backend`)，API 모드 (`api`) |
| `AMMDS_SERVICE_ADDRESS` | (기본값 없음) | 시스템의 실제 접근 주소 |
| `AMMDS_SCHEDULER_ENABLE` | `true` | 정기 작업 활성화 |
| `AMMDS_MONITOR_ENABLE` | `true` | 디렉터리 모니터링 활성화 |
| `AMMDS_NETWORK_TIMEOUT` | `60` | 네트워크 요청 타임아웃 시간（단위：초） |
| `AMMDS_MAX_FILE_SIZE` | `10MB` | 단일 요청의 최대 파일 크기 |
| `AMMDS_MAX_REQUEST_SIZE` | `100MB` | 최대 요청 본문 크기 |
| `AMMDS_IYUU_TOKEN` | (기본값 없음) | [플러그인] IYUU 인증 코드 |
| `AMMDS_METATUBE_URL` | (기본값 없음) | [플러그인] MetaTube 플러그인 서비스 주소 |
| `AMMDS_METATUBE_TOKEN` | (기본값 없음) | [플러그인] MetaTube 인증 코드 |
| `AMMDS_PROWLARR_URL` | (기본값 없음) | [플러그인] Prowlarr 플러그인 서비스 주소 |
| `AMMDS_PROWLARR_TOKEN` | (기본값 없음) | [플러그인] Prowlarr 인증 코드 |
| `AMMDS_QBITTORRENT_URL` | (기본값 없음) | [플러그인] qBittorrent 플러그인 서비스 주소 |
| `AMMDS_QBITTORRENT_USERNAME` | (기본값 없음) | [플러그인] qBittorrent 사용자 이름 |
| `AMMDS_QBITTORRENT_PASSWORD` | (기본값 없음) | [플러그인] qBittorrent 비밀번호 |
| `AMMDS_TELEGRAM_BOT_TOKEN` | (기본값 없음) | [플러그인] Telegram Bot 인증 코드 |
| `AMMDS_TELEGRAM_CHAT_ID` | (기본값 없음) | [플러그인] Telegram Chat ID |

:::warning
URL 구성에 대해 끝에 `/`를 종료 기호로 사용하지 마십시오.

환경 변수의 우선 순위가 WebUI 구성보다 높습니다.
:::