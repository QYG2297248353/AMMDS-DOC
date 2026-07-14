---
sidebar_position: 1
sidebar_label: "Docker"
---

# Docker

Docker는 "가벼운 가상 머신"과 같습니다. 필요한 소프트웨어와 그 실행 환경을 "컨테이너"로 패키징하여, 어느 머신에서든 바로 사용할 수 있게 해줍니다. 복잡한 환경 설정이 필요 없습니다.

## 한 번에 실행

```bash
docker run -itd \
  --name AMMDS \
  -p 8080:80 \
  -v $(pwd)/data:/ammds/data \
  -v $(pwd)/db:/ammds/db \
  -v $(pwd)/download:/ammds/download \
  -v $(pwd)/media:/media \
  --restart always \
  qyg2297248353/ammds:latest
```

:::note
로컬 미디어 디렉터리를 컨테이너에 마운트하세요. 데이터 손실을 방지하려면 `/ammds`를 미디어 마운트 디렉터리 접두사로 사용하지 마세요.

**예시:** 호스트 디렉터리가 `/mnt/movie`인 경우 권장 마운트 형식은 `-v /mnt/movie:/mnt/movie`입니다.
:::

## 매개변수 설명

| 매개변수 | 설명 | 쉽게 풀어서 |
|------|------|-----------|
| `-itd` | 조합 옵션: `-i`(입력 채널 유지) + `-t`(터미널 할당) + `-d`(백그라운드 실행) | 컨테이너를 백그라운드에서 조용히 실행합니다 |
| `--name AMMDS` | 컨테이너 이름을 AMMDS로 지정 | 컨테이너에 이름을 붙여서 관리(시작/중지)할 때 편리하게 사용 |
| `-p 8080:80` | 호스트의 8080 포트를 컨테이너의 80 포트에 매핑 | 서버의 8080 포트를 AMMDS에 "연결"합니다. 브라우저에서 `http://서버IP:8080`으로 접속 |
| `-v $(pwd)/data:/ammds/data` | 로컬 폴더를 컨테이너에 마운트 | 서버의 `./data` 폴더를 AMMDS와 "공유"하여 데이터 유지 |
| `-v $(pwd)/db:/ammds/db` | 로컬 폴더를 컨테이너에 마운트 | 서버의 `./db` 폴더를 AMMDS와 공유하여 데이터베이스 저장 |
| `-v $(pwd)/download:/ammds/download` | 로컬 폴더를 컨테이너에 마운트 | 서버의 `./download` 폴더를 공유하여 다운로드 파일 저장 |
| `-v $(pwd)/media:/media` | 로컬 폴더를 컨테이너에 마운트 | 영화 파일이 있는 폴더를 공유, 미디어 디렉터리 마운트에 적합 |
| `--restart always` | 컨테이너 종료 시 자동 재시작 | 컨테이너에 오류가 발생하거나 서버가 재부팅되어도 AMMDS가 자동으로 다시 실행 |
| `qyg2297248353/ammds:latest` | Docker 이미지 이름과 태그 | AMMDS의 "설치 패키지", `latest`는 최신 버전을 의미 |

## 클라우드 드라이브 사용자

CloudDrive와 같은 클라우드 드라이브 마운트를 사용하는 경우 다음 명령어를 사용하세요:

```bash
docker run -itd \
  --name AMMDS \
  -p 8080:80 \
  -v $(pwd)/data:/ammds/data \
  -v $(pwd)/db:/ammds/db \
  -v $(pwd)/download:/ammds/download \
  -v /media:/media:rw,rshared \
  --cap-add=SYS_ADMIN \
  --device /dev/fuse \
  --security-opt apparmor:unconfined \
  --restart always \
  qyg2297248353/ammds:latest
```

### 클라우드 드라이브 사용자 특별 설명

- `:rw,rshared`: 읽기/쓰기뿐만 아니라 여러 컨테이너 간에 폴더를 "공유"할 수 있습니다
- `--cap-add=SYS_ADMIN`: 컨테이너에 일부 시스템 관리 권한을 부여하여 클라우드 드라이브가 정상 작동하도록 합니다
- `--device /dev/fuse`: 컨테이너가 FUSE 장치(클라우드 드라이브 마운트에 필요한 "브리지")에 접근할 수 있도록 허용
- `--security-opt apparmor:unconfined`: 보안 제한을 해제하여 클라우드 드라이브 마운트 오류 방지

:::warning
이 방식은 "클라우드 드라이브 마운트 + 디렉터리 모니터링" 기능을 사용할 수 없습니다. "정기 스캔"을 대신 사용하세요.
:::

## 서비스 접속

브라우저를 열고 다음 주소를 입력하면 사용할 수 있습니다:

```
http://127.0.0.1:8080
```

서버에 배포한 경우 `127.0.0.1`을 서버의 IP 주소로 바꾸면 됩니다.

## 기본 계정 정보

- **사용자 이름**: `ammds`
- **비밀번호**: `ammds`

:::tip
글자가 잘 보이지 않으면 라이트 모드로 전환하세요.
:::
