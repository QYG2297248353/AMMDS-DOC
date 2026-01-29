---
sidebar_position: 4
sidebar_label: "Prowlarr"
---

# Prowlarr

Prowlarrは.NET/React技術スタックをベースに構築された、メディア自動化のために特別に設計された強力なインデクサーマネージャーとプロキシツールです。中央集権的なハブとして機能し、数百のTorrentトラッカーとUsenetインデクサーを一元管理し、Sonarr、Radarr、Lidarr、Readarrなどのアプリケーションとシームレスに同期します。

公式サイト：[https://prowlarr.com/](https://prowlarr.com/)

<!-- truncate -->

## プラグイン設定

![Prowlarrプラグイン設定](/img/plugin/prowlarr-01.png)

### 基本設定

- **有効状態**：プラグインの有効化を制御します。
- **サービスアドレス**：Prowlarrサービスのアクセスアドレス。
- **認証キー**：Prowlarrサービスの認証キーで、身分証明に使用されます。

## 自己展開

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