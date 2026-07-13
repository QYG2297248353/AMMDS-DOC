---
sidebar_position: 2
sidebar_label: "Docker Compose"
---

# Docker Compose

Docker Compose は「ワンクリック起動ツール」です。複数のコンテナを連携して動かす必要があるときに、たくさんのコマンドを手打ちするのは面倒ですよね。Compose を使えば、すべての設定を 1 つのファイルに書いておくだけで、あとは 1 行のコマンドを打つだけで全部をセットアップできます。

<!-- truncate -->

## サービスの作成

### アプリケーションディレクトリの作成

まず、`ammds` という名前のフォルダを作成して、関連ファイルをまとめます：

```bash
mkdir ammds && cd ammds
```

### 設定ファイルの作成

`ammds` フォルダ内に `docker-compose.yml` ファイルを作成し、以下の内容をコピー＆ペーストしてください：

```yaml
services:
  ammds:
    image: qyg2297248353/ammds:latest  # AMMDS の「インストールパッケージ」のアドレス
    container_name: AMMDS  # コンテナに名前を付ける
    ports:
      - "8080:80"  # サーバーの 8080 ポートを AMMDS（80 ポート）に「接続」。アクセス時は 8080 を使う
    volumes:
      - ./data:/ammds/data  # ./data フォルダを AMMDS に共有。データ保存用
      - ./db:/ammds/db  # ./db フォルダを AMMDS に共有。データベース保存用
      - ./download:/ammds/download  # ./download フォルダを AMMDS に共有。ダウンロードファイル保存用
      - ./media:/media  # ./media フォルダを AMMDS に共有。映画ファイル保管用
    restart: always  # エラー時は自動再起動。面倒なし
    environment:
      - TZ=Asia/Shanghai  # タイムゾーンを東8区（北京時間）に設定
    networks:
      - ammds-network  # カスタムネットワークに参加

networks:
  ammds-network:  # カスタムネットワーク。複数コンテナ間の通信を可能に
    driver: bridge  # Docker デフォルトのネットワークモード
```

:::note
ローカルのメディアディレクトリはご自身でコンテナにマウントしてください。データ損失を防ぐため、メディアのマウントディレクトリのプレフィックスに `/ammds` は使わないでください。

**例：** ホストのディレクトリが `/mnt/movie` の場合、推奨するマウント形式は `- /mnt/movie:/mnt/movie` です。
:::

## クラウドストレージユーザー向けの特別設定

CloudDrive などのクラウドストレージを使っている場合は、設定ファイルを少し変更します：

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

### クラウドストレージユーザー向けの補足説明

- `:rw,rshared`：読み書きだけでなく、複数のコンテナ間でフォルダを「共有」できます
- `cap_add: - SYS_ADMIN`：コンテナにシステム管理権限を付与し、クラウドストレージを正常に動作させます
- `devices: - "/dev/fuse:/dev/fuse"`：コンテナが FUSE デバイスにアクセスできるようにします（クラウドストレージが使う「橋渡し」）
- `security_opt: - apparmor:unconfined`：セキュリティ制限を解除し、クラウドストレージのマウントがエラーにならないようにします

:::warning
この構成では「クラウドストレージマウント ＋ ディレクトリ監視」機能は使えません。「定期スキャン」に切り替えてください。
:::

## サービスの起動

`ammds` フォルダ内で以下のコマンドを実行すれば、すべてのサービスが起動します：

```bash
docker compose up -d
```

## サービスの停止

サービスを停止して削除するには、以下のコマンドを使います：

```bash
docker compose down
```

## サービスへのアクセス

ブラウザを開いて以下のアドレスを入力します：

```
http://127.0.0.1:8080
```

サーバーにデプロイしている場合は、`127.0.0.1` をサーバーの IP アドレスに置き換えてください。

## デフォルトのアカウントとパスワード

- **ユーザー名**：`ammds`
- **パスワード**：`ammds`

:::tip
文字が見づらい場合は、ライトモードに切り替えてください。
:::
