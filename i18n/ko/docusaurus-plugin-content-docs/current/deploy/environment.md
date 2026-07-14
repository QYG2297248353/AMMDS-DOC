---
sidebar_position: 99
sidebar_label: "환경 변수"
---

# 환경 변수

**환경 변수**는 AMMDS에 전달하는 "쪽지"와 같습니다. 컨테이너를 시작할 때 함께 건네주면서 "어떤 포트를 쓸지", "시간대는 어떻게 설정할지", "관리자 비밀번호는 무엇인지" 등의 설정 정보를 알려줍니다. 웹 페이지에서 설정할 필요 없이, 시작할 때 한 번에 모두 설정할 수 있습니다.

## 지원되는 설정

다음 환경 변수를 사용하여 AMMDS 배포를 사용자 정의할 수 있습니다:

| 변수 이름 | 기본값 | 설명 |
|---------|--------|------|
| `NGINX_PORT` | `80` | Nginx 서비스 포트 (Host 네트워크 모드에서 적용) |
| `PUID` | `0` | AMMDS의 사용자 ID (파일 권한 제어용) |
| `PGID` | `0` | AMMDS의 사용자 그룹 ID (기본값은 사용자 ID와 동일) |
| `UMASK` | `022` | 새 파일의 권한 마스크 (기본 022는 파일에 읽기/쓰기 권한이 있음을 의미) |
| `AMMDS_SERVER_PORT` | `8080` | AMMDS 서비스 포트 (Host 네트워크 모드에서 적용) |
| `ADMIN_USER` | `ammds` | 관리자 사용자 이름 (**수정 불가**) |
| `ADMIN_PASS` | `ammds` | 관리자 비밀번호 (처음 설치할 때만 적용, 이후에는 변경无效) |
| `AMMDS_SYSTEM_MODE` | `full` | 실행 모드: `full` (전체 모드, 모든 기능 사용 가능), `backend` (백엔드 전용), `api` (API 전용) |
| `AMMDS_SERVICE_ADDRESS` | (기본값 없음) | AMMDS의 실제 접근 주소 (예: `http://IP:8080`) |
| `AMMDS_SCHEDULER_ENABLE` | `true` | 정기 작업 활성화 여부 (예: 정기적으로 새 영화 스캔) |
| `AMMDS_MONITOR_ENABLE` | `true` | 디렉터리 모니터링 활성화 여부 (실시간으로 새 파일 감시) |
| `AMMDS_NETWORK_TIMEOUT` | `60` | 네트워크 요청 제한 시간 (단위: 초, 시간 초과 시 포기) |
| `AMMDS_MAX_FILE_SIZE` | `10MB` | 단일 업로드 파일 크기 제한 (KB, MB, GB 단위 가능) |
| `AMMDS_MAX_REQUEST_SIZE` | `100MB` | 단일 요청 크기 제한 (여러 파일을 포함하는 경우) |
| `AMMDS_IYUU_TOKEN` | (기본값 없음) | [플러그인] IYUU 인증 코드 |
| `AMMDS_METATUBE_URL` | (기본값 없음) | [플러그인] MetaTube 플러그인 서비스 주소 |
| `AMMDS_METATUBE_TOKEN` | (기본값 없음) | [플러그인] MetaTube 인증 코드 |
| `AMMDS_PROWLARR_URL` | (기본값 없음) | [플러그인] Prowlarr 서비스 주소 |
| `AMMDS_PROWLARR_TOKEN` | (기본값 없음) | [플러그인] Prowlarr 인증 코드 |
| `AMMDS_QBITTORRENT_URL` | (기본값 없음) | [플러그인] qBittorrent 다운로드 도구 서비스 주소 |
| `AMMDS_QBITTORRENT_USERNAME` | (기본값 없음) | [플러그인] qBittorrent 사용자 이름 |
| `AMMDS_QBITTORRENT_PASSWORD` | (기본값 없음) | [플러그인] qBittorrent 비밀번호 |
| `AMMDS_TELEGRAM_BOT_TOKEN` | (기본값 없음) | [플러그인] Telegram 봇 인증 코드 |
| `AMMDS_TELEGRAM_CHAT_ID` | (기본값 없음) | [플러그인] Telegram 채팅 ID |

:::warning
- **URL 끝에 `/`를 붙이지 마세요**. 예: `http://192.168.1.100:8080`은 올바르지만 `http://192.168.1.100:8080/`은 안 됩니다
- **환경 변수가 웹 설정보다 우선**합니다. 즉, 환경 변수와 웹 페이지에서 동일한 항목을 설정한 경우 환경 변수의 값이 적용됩니다
:::
