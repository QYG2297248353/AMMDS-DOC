---
sidebar_position: 1
sidebar_label: "Docker"
---

# Docker

Docker は、アプリケーションのデプロイ、スケーリング、管理を自動化するためのオープンソースプラットフォームです。コンテナ化技術を使用して、アプリケーションとその依存関係を独立したコンテナにパッケージ化し、どの環境でも一貫して実行されるようにします。コンテナは軽量で移植性があり、マイクロサービスアーキテクチャや CI/CD ワークフローに非常に適しています。

<!-- truncate -->

## ワンクリック実行

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
ローカルのメディアディレクトリをコンテナにマウントしてください。データ損失を避けるために、メディアマウントディレクトリのプレフィックスとして `/ammds` を使用しないでください。

**例：** ホストディレクトリが `/mnt/movie` の場合、推奨されるマウント形式は `-v /mnt/movie:/mnt/movie` です。
:::

## パラメータの説明

| パラメータ | 説明 |
|------|------|
| `-itd` または `--interactive --tty --detach` | オプションの組み合わせ：<br />- `-i` または `--interactive`：接続されていなくても STDIN を開いたままにする<br />- `-t` または `--tty`：コンテナのインタラクション用に疑似端末を割り当てる<br />- `-d` または `--detach`：バックグラウンドでデーモンとしてコンテナを実行する |
| `--name AMMDS` | コンテナの名前を AMMDS に指定する |
| `-p 8080:80` | ホストの 8080 ポートをコンテナの 80 ポートにマッピングする、形式：`-p <ホストポート>:<コンテナポート>` |
| `-v $(pwd)/data:/ammds/data` | 現在のディレクトリの `./data` フォルダをコンテナの `/ammds/data` にマウントし、データの永続化に使用する |
| `-v $(pwd)/db:/ammds/db` | 現在のディレクトリの `./db` フォルダをコンテナの `/ammds/db` にマウントし、データベースファイルの保存に使用する |
| `-v $(pwd)/download:/ammds/download` | 現在のディレクトリの `./download` フォルダをコンテナの `/ammds/download` にマウントし、ダウンロードの保存に使用する |
| `-v $(pwd)/media:/media` | 現在のディレクトリの `./media` フォルダをコンテナの `/media` にマウントし、メディアディレクトリのマウントに適している |
| `--restart always` | コンテナが常に自動的に再起動するように設定し、あらゆる状況（システムの再起動を含む）で自動的に起動することを保証する |
| `qyg2297248353/ammds:latest` | Docker イメージ名とタグ、実行するイメージを指定する |

## クラウドストレージユーザー

CloudDrive などのクラウドストレージマウントを使用している場合は、以下のコマンドを使用してください：

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

### クラウドストレージユーザー向けの特別な説明

- `:rw,rshared`：基本的な読み書き権限に加えて、`rshared` はコンテナ間で共有の伝播を維持します
- `--cap-add=SYS_ADMIN`：コンテナにシステムリソースへのアクセスを許可します
- `--device /dev/fuse`：コンテナに FUSE デバイスへのアクセスを許可します
- `--security-opt apparmor:unconfined`：コンテナに制限のない AppArmor 設定の使用を許可します

:::warning
このデプロイ方法は、「クラウドストレージマウント + ディレクトリ監視」の方法には適用されません。「ディレクトリ監視」の代わりに「定期スキャン」を使用してください。
:::

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