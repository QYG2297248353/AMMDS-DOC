---
sidebar_position: 4
sidebar_label: "Prowlarr"
---

# Prowlarr

Prowlarr은 .NET/React 기술 스택을 기반으로 구축된 미디어 자동화를 위해 특별히 설계된 강력한 인덱서 관리자 및 프록시 도구입니다. 중앙 집중식 허브 역할을 하여 수백 개의 Torrent 추적기와 Usenet 인덱서를 통합 관리하고 Sonarr, Radarr, Lidarr, Readarr 등의 애플리케이션과 원활하게 동기화됩니다.

공식 웹사이트: [https://prowlarr.com/](https://prowlarr.com/)

<!-- truncate -->

## 플러그인 설정

![Prowlarr 플러그인 설정](./img/plugin/prowlarr-01.png)

활성화 상태: 플러그인 활성화 여부를 제어합니다.

서비스 주소: Prowlarr 서비스의 액세스 주소입니다.

인증 키: Prowlarr 서비스의 인증 키로, 신원 확인에 사용됩니다.

## 자체 배포

### Docker-Cli

```bash
docker run -d \
  --name=prowlarr \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -p 9696:9696 \
  -v /path/to/prowlarr/data:/config \
  --restart unless-stopped \
  lscr.io/linuxserver/prowlarr:latest
```

### Docker-Compose

```yaml
---
services:
  prowlarr:
    image: lscr.io/linuxserver/prowlarr:latest
    container_name: prowlarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
    volumes:
      - /path/to/prowlarr/data:/config
    ports:
      - 9696:9696
    restart: unless-stopped
```