---
sidebar_position: 2
sidebar_label: "Docker Compose"
---

# Docker Compose 

Docker Compose는 "원클릭 실행 도구"입니다. 여러 컨테이너를 함께 실행해야 할 때, 매번 명령어를 입력하는 번거로움을 없애줍니다. Compose를 사용하면 모든 설정을 하나의 파일에 작성하고, 앞으로는 한 줄의 명령어로 모든 것을 처리할 수 있습니다.

## 서비스 생성

### 애플리케이션 디렉터리 생성

먼저 `ammds`라는 폴더를 만들어서 관련 파일을 저장하세요:

```bash
mkdir ammds && cd ammds
```

### 설정 파일 생성

`ammds` 폴더에 `docker-compose.yml` 파일을 만들고, 다음 내용을 복사하여 붙여넣으세요:

```yaml
services:
  ammds:
    image: qyg2297248353/ammds:latest  # AMMDS의 "설치 패키지" 주소
    container_name: AMMDS  # 컨테이너 이름
    ports:
      - "8080:80"  # 서버의 8080 포트를 AMMDS(80 포트)에 "연결", 접속 시 8080 사용
    volumes:
      - ./data:/ammds/data  # ./data 폴더를 AMMDS와 공유하여 데이터 저장
      - ./db:/ammds/db  # ./db 폴더를 AMMDS와 공유하여 데이터베이스 저장
      - ./download:/ammds/download  # ./download 폴더를 공유하여 다운로드 파일 저장
      - ./media:/media  # ./media 폴더를 공유하여 영화 파일 저장
    restart: always  # 오류 발생 시 자동 재시작
    environment:
      - TZ=Asia/Shanghai  # 시간대를 동8구(베이징 시간)로 설정
    networks:
      - ammds-network  # 사용자 정의 네트워크에 연결

networks:
  ammds-network:  # 사용자 정의 네트워크, 여러 컨테이너가 통신할 수 있도록 함
    driver: bridge  # Docker 기본 네트워크 모드 사용
```

:::note
로컬 미디어 디렉터리를 컨테이너에 마운트하세요. 데이터 손실을 방지하려면 `/ammds`를 미디어 마운트 디렉터리 접두사로 사용하지 마세요.

**예시:** 호스트 디렉터리가 `/mnt/movie`인 경우 권장 마운트 형식은 `- /mnt/movie:/mnt/movie`입니다.
:::

## 클라우드 드라이브 사용자를 위한 특별 설정

CloudDrive와 같은 클라우드 드라이브 마운트를 사용하는 경우 설정 파일을 약간 수정해야 합니다:

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

- `:rw,rshared`: 읽기/쓰기뿐만 아니라 여러 컨테이너 간에 폴더를 "공유"할 수 있습니다
- `cap_add: - SYS_ADMIN`: 컨테이너에 일부 시스템 관리 권한을 부여하여 클라우드 드라이브가 정상 작동하도록 합니다
- `devices: - "/dev/fuse:/dev/fuse"`: 컨테이너가 FUSE 장치(클라우드 드라이브 마운트에 필요한 "브리지")에 접근할 수 있도록 허용
- `security_opt: - apparmor:unconfined`: 보안 제한을 해제하여 클라우드 드라이브 마운트 오류 방지

:::warning
이 방식은 "클라우드 드라이브 마운트 + 디렉터리 모니터링" 기능을 사용할 수 없습니다. "정기 스캔"을 대신 사용하세요.
:::

## 서비스 시작

`ammds` 폴더에서 다음 명령어를 실행하면 모든 서비스가 시작됩니다:

```bash
docker compose up -d
```

## 서비스 중지

서비스를 중지하고 제거하려면 다음 명령어를 사용하세요:

```bash
docker compose down
```

## 서비스 접속

브라우저를 열고 다음 주소를 입력하세요:

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
