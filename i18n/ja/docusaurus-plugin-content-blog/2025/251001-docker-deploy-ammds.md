---
slug: docker-deploy-ammds
title: Docker による AMMDS 導入の完全ガイド
authors: [ms]
tags: [tutorial, guide, docker, ammds]
date: 2025-10-01
---

## 概要

AMMDS（Advanced Multimedia Data Management System）は、メタデータのスクレイピング、サイト認証、リソース検索、ランキング管理などの機能を備えた強力なプライベートデータ管理プラットフォームです。本記事では、Docker を使用して AMMDS を導入する方法を、Docker Compose の設定、環境変数の説明、ディレクトリのマウントに関する推奨事項、および一般的なトラブルシューティングまで詳しく解説します。

{/* truncate */}

## 前提条件

導入を始める前に、お使いの環境に以下のソフトウェアがインストールされていることを確認してください。

- **Docker Engine**：バージョン 20.10 以上
- **Docker Compose**：バージョン 2.x 以上（または Docker Compose Plugin）
- **オペレーティングシステム**：Linux（Ubuntu 20.04+ / Debian 11+ を推奨）、Windows Server 2019+、macOS、あるいは Synology DSM / FnOS などの NAS システム
- **ハードウェア要件**：最低限、2 コア CPU、4 GB のメモリ、20 GB の空きディスク容量

環境を確認します。

```bash
docker --version
docker compose version
```

## Docker Compose による導入（推奨）

### ステップ 1：導入ディレクトリを作成する

```bash
mkdir -p /opt/ammds
cd /opt/ammds
```

### ステップ 2：docker-compose.yml を作成する

`docker-compose.yml` ファイルを作成します。

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
      - SERVER_PORT=7000        # SpringBoot アプリケーションがリッスンするポート
      - SPRING_PROFILES_ACTIVE=prod
      - AMMDS_HOME=/app/data
    networks:
      - ammds-network

networks:
  ammds-network:
    driver: bridge
```

### ステップ 3：サービスを起動する

```bash
docker compose up -d
```

イメージの取得とコンテナの起動を待ちます。初回起動には数分かかる場合があります（ネットワーク速度によります）。

### ステップ 4：導入を確認する

```bash
docker compose logs -f ammds
```

ログを確認してサービスが正常に起動したことを確かめ、その後ブラウザで `http://<サーバーIP>:7000` にアクセスします。

## 環境変数の説明

AMMDS は環境変数による設定に対応しています。主な環境変数は次のとおりです。

| 変数名 | 説明 | 既定値 | 必須かどうか |
|:-------|:-----|:-------|:---------|
| `TZ` | タイムゾーンの設定 | `Asia/Shanghai` | 設定を推奨 |
| `SERVER_PORT` | サービスがリッスンするポート | `7000` | 設定を推奨 |
| `SPRING_PROFILES_ACTIVE` | 有効な SpringBoot プロファイル | `prod` | いいえ |
| `AMMDS_HOME` | データディレクトリのパス | `/app/data` | いいえ |
| `AMMDS_LOG_LEVEL` | ログレベル | `INFO` | いいえ |
| `AMMDS_ENABLE_HTTPS` | HTTPS を有効にするかどうか | `false` | いいえ |

### 高度な設定例

```yaml
environment:
  - TZ=Asia/Shanghai
  - SERVER_PORT=7000
  - AMMDS_LOG_LEVEL=DEBUG
  - AMMDS_ENABLE_HTTPS=false
  - AMMDS_MAX_CONCURRENT_SCRAPES=5
```

## ディレクトリマウントの推奨事項

適切なディレクトリのマウントにより、データの永続化と性能の最適化を確保できます。

| コンテナ内のパス | 推奨するホスト側のパス | 説明 |
|:-----------|:--------------|:-----|
| `/app/data` | `./data` | データベースファイルとユーザーデータの永続的な保存先 |
| `/app/config` | `./config` | 設定ファイルの永続的な保存先 |
| `/media` | `/path/to/media` | メディアファイルのディレクトリ（`:ro` で読み取り専用マウントを推奨） |
| `/downloads` | `/path/to/downloads` | ダウンロードディレクトリ（自動スクレイピングの監視に使用） |

### Synology NAS のマウント例

```yaml
volumes:
  - /volume1/docker/ammds/data:/app/data
  - /volume1/docker/ammds/config:/app/config
  - /volume1/video:/media:ro
  - /volume1/downloads:/downloads:ro
```

### FnOS のマウント例

```yaml
volumes:
  - /vol1/1000/docker/ammds/data:/app/data
  - /vol1/1000/docker/ammds/config:/app/config
  - /vol1/1000/video:/media:ro
  - /vol1/1000/downloads:/downloads:ro
```

## 初回起動時の設定

### 1. 管理インターフェースにアクセスする

ブラウザを開いて `http://<サーバーIP>:7000` にアクセスすると、AMMDS のログインページが表示されます。

### 2. 管理者アカウントを作成する

初回アクセス時に、管理者アカウントの作成へと案内されます。安全なユーザー名とパスワードを設定してください。

### 3. スクレイピングプラグインを設定する

「プラグイン管理」ページに移動し、必要なデータソースのプラグインを有効にします。

- **TMDB スクレイピング**：推奨。欧米の映画・ドラマのメタデータの網羅性が最も高い
- **JavBus スクレイピング**：日本の映画・ドラマのリソースに適しています
- **Metatube スクレイピング**：追加のメタデータソースを提供します
- **FANZA DMM スクレイピング**：日本の映画向けの高品質なデータソース
- **ThePornDB スクレイピング**：R18 コンテンツ向け

各プラグインには API キーや Cookie の設定が必要になる場合があります。画面の案内に従って操作してください。

### 4. サイト認証を追加する

「サイト管理」ページに移動し、PT サイトの認証情報を追加します。

1. 「サイトを追加」をクリックします
2. サイトの種類（M-Team、KamePT、Rousi など）を選択します
3. サイトのドメインと認証情報（Cookie または Passkey）を入力します
4. 「検証」をクリックして接続に成功したことを確認します

### 5. プッシュ通知を設定する

「通知設定」でプッシュ方法を設定します。

- **Telegram Bot**：ボットを通じてスクレイピング結果とシステム通知をプッシュします
- **WebHook**：カスタムの WebHook URL で通知を受け取ります

## 一般的なトラブルシューティング

### Q1: コンテナが起動直後に終了する

**原因**：通常はデータディレクトリの権限不足、またはポートが使用中であることが原因です。

**解決策**：

```bash
# ポートの使用状況を確認
netstat -tlnp | grep 7000

# ディレクトリの権限を修正
sudo chown -R 1000:1000 ./data ./config
sudo chmod -R 755 ./data ./config
```

### Q2: 管理インターフェースにアクセスできない

**原因**：ファイアウォールの規則、または Docker のネットワーク設定に問題がある場合です。

**解決策**：

```bash
# コンテナが稼働しているか確認
docker ps | grep ammds

# コンテナのログを表示
docker compose logs ammds

# ファイアウォールを確認
sudo ufw status
# 必要であればポートを開放
sudo ufw allow 7000
```

### Q3: スクレイピング機能が正常に動作しない

**原因**：通常は API キーの設定ミス、またはネットワークアクセスが制限されていることが原因です。

**解決策**：
1. プラグイン設定の API キーが正しいか確認します
2. サーバーが外部ネットワークに正常にアクセスできることを確認します（特に TMDB、JavBus などのサイト）
3. AMMDS のログにあるスクレイピングのエラー情報を確認します

### Q4: データベース接続エラー

**原因**：SQLite のデータベースファイルが破損している、または権限の問題です。

**解決策**：

```bash
# 権限を修正
sudo chmod 644 ./data/ammds.db
sudo chown 1000:1000 ./data/ammds.db

# バックアップ後にデータベースを再構築
docker compose down
mv ./data/ammds.db ./data/ammds.db.bak
docker compose up -d
```

### Q5: AMMDS を更新するには

```bash
# 最新のイメージを取得
docker compose pull

# コンテナを再作成
docker compose up -d

# 古いイメージを削除（任意）
docker image prune
```

### Q6: データをバックアップするには

```bash
# データディレクトリをバックアップ
tar -czf ammds-backup-$(date +%Y%m%d).tar.gz ./data ./config

# バックアップを復元
tar -xzf ammds-backup-20250101.tar.gz
docker compose restart
```

## リバースプロキシの設定

### Nginx の設定例

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

データ転送の安全を確保するため、Certbot や Nginx Proxy Manager と組み合わせて HTTPS 証明書を設定することをお勧めします。

## まとめ

Docker による AMMDS の導入は比較的簡単な作業であり、ポイントは適切なディレクトリのマウントと環境変数の設定です。導入が完了すると、複数サイトの認証、インテリジェントなメタデータのスクレイピング、リソース検索、リアルタイムのプッシュ通知に対応した、強力なプライベートデータ管理プラットフォームが手に入ります。

導入の過程でその他の問題に遭遇した場合は、プロジェクトのリポジトリに Issue を投稿するか、コミュニティの議論に参加して助けを求めてください。

---

## 続きを読む

- [ドキュメントサイト：クイックスタート](/docs/getting-started/overview)
- [FnOS NAS 上に AMMDS を導入する完全ガイド](/blog/fnos-integration-guide)
