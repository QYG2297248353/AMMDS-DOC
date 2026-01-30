---
sidebar_position: 2
sidebar_label: "Docker Compose"
---

# Docker Compose 

Docker Compose は、マルチコンテナ Docker アプリケーションを定義して実行するためのツールです。単一の YAML ファイル（docker-compose.yml）を通じて、アプリケーションのすべてのサービスを設定し、1 つのコマンドですべてのサービスを起動することができます。開発、テスト、ステージング環境におけるアプリケーションの迅速なデプロイと管理に非常に適しています。

<!-- truncate -->

## サービスの作成

### アプリケーションディレクトリの作成

まず、関連ファイルを格納するための `ammds` という名前のディレクトリを作成します：

```bash
mkdir ammds && cd ammds
```

### 設定ファイルの作成

`ammds` ディレクトリで `docker-compose.yml` ファイルを作成して編集します。以下の内容をファイルに貼り付けます：

```yaml
services:
  ammds:
    image: qyg2297248353/ammds:latest  # Docker イメージ名とバージョンタグ
    container_name: AMMDS  # コンテナ名
    ports:
      - "8080:80"  # ポートマッピング：ホストポート 8080 をコンテナポート 80 にマッピング
    volumes:
      - ./data:/ammds/data  # 現在のディレクトリの data フォルダをコンテナの /ammds/data にマウント
      - ./db:/ammds/db  # 現在のディレクトリの db フォルダをコンテナの /ammds/db にマウント
      - ./download:/ammds/download  # 現在のディレクトリの download フォルダをコンテナの /ammds/download にマウント
      - ./media:/media  # 現在のディレクトリの media フォルダをコンテナの /media にマウント
    restart: always  # コンテナが失敗したときに常に自動的に再起動するように設定
    environment:
      - TZ=Asia/Shanghai  # タイムゾーンを Asia/Shanghai に設定
    networks:
      - ammds-network  # カスタムネットワークを使用

networks:
  ammds-network:  # カスタムネットワーク設定
    driver: bridge  # Docker のデフォルトの bridge ネットワークドライバを使用
```

:::note
ローカルのメディアディレクトリをコンテナにマウントしてください。データ損失を避けるために、メディアマウントディレクトリのプレフィックスとして `/ammds` を使用しないでください。

**例：** ホストディレクトリが `/mnt/movie` の場合、推奨されるマウント形式は `- /mnt/movie:/mnt/movie` です。
:::

## クラウドストレージユーザー向けの特別設定

CloudDrive などのクラウドストレージマウントを使用している場合は、`docker-compose.yml` ファイルで以下の設定を使用してください：

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

### クラウドストレージユーザー向けの特別な説明

- `:rw,rshared`：基本的な読み書き権限に加えて、`rshared` はコンテナ間で共有の伝播を維持します
- `cap_add: - SYS_ADMIN`：コンテナにシステムリソースへのアクセスを許可します
- `devices: - "/dev/fuse:/dev/fuse"`：コンテナに FUSE デバイスへのアクセスを許可します
- `security_opt: - apparmor:unconfined`：コンテナに制限のない AppArmor 設定の使用を許可します

:::warning
このデプロイ方法は、「クラウドストレージマウント + ディレクトリ監視」の方法には適用されません。「ディレクトリ監視」の代わりに「定期スキャン」を使用してください。
:::

## サービスの起動

以下のコマンドを使用してサービスを起動します。これにより、AMMDS コンテナがバックグラウンドで実行され、docker-compose.yml ファイルのすべての設定が適用されます：

```bash
docker compose up -d
```

## サービスの停止

サービスを停止して削除する必要がある場合は、以下のコマンドを使用します：

```bash
docker compose down
```

## サービスへのアクセス

ブラウザを使用してサービスにアクセスできます：

```
http://127.0.0.1:8080
```

アクセス URL の形式：`ホストの IP アドレス + サービスポート`

## デフォルトの認証情報

- **ユーザー名**：`ammds`
- **パスワード**：`ammds`

:::tip
認証情報がはっきり見えない場合は、ライトモードに切り替えてください。
:::