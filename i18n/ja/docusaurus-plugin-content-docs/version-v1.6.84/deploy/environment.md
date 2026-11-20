---
sidebar_position: 99
sidebar_label: "環境変数"
title: "環境変数"
description: "AMMDS がサポートする環境変数設定について紹介します。ポート、ユーザー権限、実行モード、プラグインアドレスなどのパラメータを説明します。"
keywords: [AMMDS, 環境変数, 設定, Docker, パラメータ設定]
tags: [deploy, environment]
---

# 環境変数

**環境変数**は、AMMDS に渡す「メモ書き」のようなものです。
コンテナ起動時に一緒に渡すことで、「どのポートを使うか」「タイムゾーンは何時」「管理者パスワードはいくつか」といった設定情報を伝えられます。
Web 画面で設定する必要はなく、起動時に一度で全部設定できます。

## サポートされている設定

以下の環境変数を使って AMMDS をカスタマイズできます：

| 変数名 | デフォルト値 | 説明 |
|---------|--------|------|
| `NGINX_PORT` | `80` | Nginx サービスポート（Host ネットワークモード時のみ有効） |
| `PUID` | `0` | AMMDS のユーザー ID（ファイル権限の制御用） |
| `PGID` | `0` | AMMDS のユーザーグループ ID（デフォルトはユーザー ID と同じ） |
| `UMASK` | `022` | 新規ファイルのパーミッションマスク（022 の場合、ファイルに読み書き権限あり） |
| `AMMDS_SERVER_PORT` | `8080` | AMMDS サービスポート（Host ネットワークモード時のみ有効） |
| `ADMIN_USER` | `ammds` | 管理者ユーザー名（**変更不可**） |
| `ADMIN_PASS` | `ammds` | 管理者パスワード（初回インストール時のみ有効。以降は変更しても反映されません） |
| `AMMDS_SYSTEM_MODE` | `full` | 実行モード：`full`（全部入り）、`backend`（バックエンドのみ）、`api`（API のみ） |
| `AMMDS_SERVICE_ADDRESS` | (デフォルトなし) | AMMDS の実際のアクセスアドレス（例：`http://あなたのIP:8080`） |
| `AMMDS_SCHEDULER_ENABLE` | `true` | 定期タスクを有効にする（例：新しい映画の定期スキャン） |
| `AMMDS_MONITOR_ENABLE` | `true` | ディレクトリ監視を有効にする（フォルダ内の新規ファイルをリアルタイム監視） |
| `AMMDS_NETWORK_TIMEOUT` | `60` | ネットワークリクエストのタイムアウト時間（単位：秒） |
| `AMMDS_MAX_FILE_SIZE` | `10MB` | 1回のアップロードファイルのサイズ制限（KB、MB、GB で指定可） |
| `AMMDS_MAX_REQUEST_SIZE` | `100MB` | 1回のリクエスト全体のサイズ制限（複数ファイルを含む場合に使用） |
| `AMMDS_IYUU_TOKEN` | (デフォルトなし) | [プラグイン] IYUU の認証コード |
| `AMMDS_METATUBE_URL` | (デフォルトなし) | [プラグイン] MetaTube プラグインのサービスアドレス |
| `AMMDS_METATUBE_TOKEN` | (デフォルトなし) | [プラグイン] MetaTube の認証コード |
| `AMMDS_PROWLARR_URL` | (デフォルトなし) | [プラグイン] Prowlarr のサービスアドレス |
| `AMMDS_PROWLARR_TOKEN` | (デフォルトなし) | [プラグイン] Prowlarr の認証コード |
| `AMMDS_QBITTORRENT_URL` | (デフォルトなし) | [プラグイン] qBittorrent ダウンロードツールのサービスアドレス |
| `AMMDS_QBITTORRENT_USERNAME` | (デフォルトなし) | [プラグイン] qBittorrent のユーザー名 |
| `AMMDS_QBITTORRENT_PASSWORD` | (デフォルトなし) | [プラグイン] qBittorrent のパスワード |
| `AMMDS_TELEGRAM_BOT_TOKEN` | (デフォルトなし) | [プラグイン] Telegram ボットの認証コード |
| `AMMDS_TELEGRAM_CHAT_ID` | (デフォルトなし) | [プラグイン] Telegram のチャット ID |

:::warning
- **URL の末尾に `/` を付けない**でください。`http://192.168.1.100:8080` は OK ですが、`http://192.168.1.100:8080/` は NG です。
- **環境変数は Web 画面の設定より優先**されます。同じ項目を両方で設定した場合、環境変数の値が Web 画面の設定を上書きします。
:::
