---
sidebar_position: 1
sidebar_label: "Docker"
---

# Docker

Docker는 애플리케이션의 배포, 확장 및 관리를 자동화하기 위한 오픈 소스 플랫폼입니다. 컨테이너화 기술을 사용하여 애플리케이션과 해당 종속성을 독립적인 컨테이너에 패키징하여 어떤 환경에서도 일관되게 실행되도록 보장합니다. 컨테이너는 경량이고 이식 가능하므로 마이크로서비스 아키텍처와 CI/CD 워크플로우에 매우 적합합니다.

<!-- truncate -->

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
로컬 미디어 디렉터리를 컨테이너에 마운트하십시오. 데이터 손실을 방지하려면 /ammds를 미디어 마운트 디렉터리 접두사로 사용하지 마십시오.

**예시:** 호스트 디렉터리가 `/mnt/movie`인 경우 권장되는 마운트 형식은 `-v /mnt/movie:/mnt/movie`입니다.
:::

## 매개변수 설명

| 매개변수 | 설명 |
|------|------|
| `-itd` 또는 `--interactive --tty --detach` | 조합 옵션：<br />- `-i` 또는 `--interactive`：연결되지 않은 경우에도 STDIN을 열어 둡니다.<br />- `-t` 또는 `--tty`：컨테이너 상호 작용을 위해 가상 터미널을 할당합니다.<br />- `-d` 또는 `--detach`：백그라운드에서 데몬으로 컨테이너를 실행합니다. |
| `--name AMMDS` | 컨테이너 이름을 AMMDS로 지정합니다. |
| `-p 8080:80` | 호스트의 8080 포트를 컨테이너의 80 포트에 매핑합니다. 형식：`-p <호스트 포트>:<컨테이너 포트>` |
| `-v $(pwd)/data:/ammds/data` | 현재 디렉터리의 `./data` 폴더를 컨테이너의 `/ammds/data`에 마운트합니다. 데이터 지속성을 위해 사용됩니다. |
| `-v $(pwd)/db:/ammds/db` | 현재 디렉터리의 `./db` 폴더를 컨테이너의 `/ammds/db`에 마운트합니다. 데이터베이스 파일 저장을 위해 사용됩니다. |
| `-v $(pwd)/download:/ammds/download` | 현재 디렉터리의 `./download` 폴더를 컨테이너의 `/ammds/download`에 마운트합니다. 다운로드 저장을 위해 사용됩니다. |
| `-v $(pwd)/media:/media` | 현재 디렉터리의 `./media` 폴더를 컨테이너의 `/media`에 마운트합니다. 미디어 디렉터리 마운트에 적합합니다. |
| `--restart always` | 컨테이너가 항상 자동으로 재시작하도록 설정합니다. 어떤 상황(시스템 재시작 포함)에서도 자동으로 시작되도록 보장합니다. |
| `qyg2297248353/ammds:latest` | Docker 이미지 이름과 태그입니다. 실행할 이미지를 지정합니다. |

## 클라우드 드라이브 사용자

CloudDrive와 같은 클라우드 드라이브 마운트를 사용하는 경우 다음 명령을 사용하십시오:

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

- `:rw,rshared`：기본 읽기/쓰기 권한 외에도 `rshared`는 컨테이너 간에 공유 전파를 유지할 수 있습니다.
- `--cap-add=SYS_ADMIN`：컨테이너가 시스템 리소스에 액세스하도록 허용합니다.
- `--device /dev/fuse`：컨테이너가 FUSE 장치에 액세스하도록 허용합니다.
- `--security-opt apparmor:unconfined`：컨테이너가 제한되지 않은 AppArmor 구성을 사용하도록 허용합니다.

:::warning
이 배포 방식은 "클라우드 드라이브 마운트 + 디렉토리 모니터링" 방식에는 적합하지 않습니다. "디렉터리 모니터링" 대신 "주기적 스캔"을 사용하십시오.
:::

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