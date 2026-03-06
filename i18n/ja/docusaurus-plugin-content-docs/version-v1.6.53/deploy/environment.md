---
sidebar_position: 99
sidebar_label: "環境変数"
---

# 環境変数

デプロイ時に環境変数を使用して迅速にデプロイすることができます。

<!-- truncate -->

## サポートされている設定

以下の環境変数を使用して、AMMDS デプロイをカスタマイズすることができます：

| 変数名 | デフォルト値 | 説明 |
|---------|--------|------|
| `NGINX_PORT` | `80` | Nginx サービスポート（Host ネットワークに適用） |
| `AMMDS_SERVER_PORT` | `8080` | AMMDS サーバーポート（Host ネットワークに適用） |
| `ADMIN_USER` | `ammds` | 管理者ユーザー名（変更禁止） |
| `ADMIN_PASS` | `ammds` | 管理者パスワード（初回インストール時のみ有効） |
| `AMMDS_SYSTEM_MODE` | `full` | システム実行モード：フルモード (`full`)、バックエンドのみモード (`backend`)、API モード (`api`) |
| `AMMDS_SERVICE_ADDRESS` | (デフォルトなし) | システムの実際のアクセスアドレス |
| `AMMDS_SCHEDULER_ENABLE` | `true` | 定期タスクを有効にする |
| `AMMDS_MONITOR_ENABLE` | `true` | ディレクトリ監視を有効にする |
| `AMMDS_NETWORK_TIMEOUT` | `60` | ネットワークリクエストのタイムアウト時間（単位：秒） |
| `AMMDS_MAX_FILE_SIZE` | `10MB` | 単一リクエストの最大ファイルサイズ |
| `AMMDS_MAX_REQUEST_SIZE` | `100MB` | 最大リクエストボディサイズ |
| `AMMDS_IYUU_TOKEN` | (デフォルトなし) | [プラグイン] IYUU 認証コード |
| `AMMDS_METATUBE_URL` | (デフォルトなし) | [プラグイン] MetaTube プラグインサービスアドレス |
| `AMMDS_METATUBE_TOKEN` | (デフォルトなし) | [プラグイン] MetaTube 認証コード |
| `AMMDS_PROWLARR_URL` | (デフォルトなし) | [プラグイン] Prowlarr プラグインサービスアドレス |
| `AMMDS_PROWLARR_TOKEN` | (デフォルトなし) | [プラグイン] Prowlarr 認証コード |
| `AMMDS_QBITTORRENT_URL` | (デフォルトなし) | [プラグイン] qBittorrent プラグインサービスアドレス |
| `AMMDS_QBITTORRENT_USERNAME` | (デフォルトなし) | [プラグイン] qBittorrent ユーザー名 |
| `AMMDS_QBITTORRENT_PASSWORD` | (デフォルトなし) | [プラグイン] qBittorrent パスワード |
| `AMMDS_TELEGRAM_BOT_TOKEN` | (デフォルトなし) | [プラグイン] Telegram Bot 認証コード |
| `AMMDS_TELEGRAM_CHAT_ID` | (デフォルトなし) | [プラグイン] Telegram Chat ID |

:::warning
URL 設定については、終了記号として `/` を末尾に付けないでください。

環境変数の優先度は WebUI 設定よりも高くなります。
:::