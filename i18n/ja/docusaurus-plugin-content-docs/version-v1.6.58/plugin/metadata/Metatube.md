---
sidebar_position: 1
sidebar_label: "Metatube"
---

# Metatube

MetaTube は Jellyfin、Emby、Plex 向けに設計されたオープンソースのメディアメタデータスクレイピングプラグインバックエンドで、主に動画情報（ポスター、あらすじ、俳優、制作スタジオ、評価など）を自動的に取得するために使用されます。このプラグインは、中国語リソースの認識率が低い問題を効果的に解決し、独自の API を通じて高精度なメディアライブラリの「ポスターウォール」管理を実現します。

<!-- truncate -->

## 特性

MetaTube プラグインには以下のコア特性があります：

- 🎯 **高精度認識**：中国語リソース向けに最適化された認識アルゴリズムにより、認識成功率が大幅に向上
- 🌍 **マルチプラットフォームサポート**：Jellyfin、Emby、Plex などの主要メディアサーバーと互換性があります
- 📦 **デュアルサービスモード**：リモートデプロイと組み込みサービスの 2 つの実行モードをサポート
- 🔐 **セキュア認証**：TOKEN メカニズムを通じてサービスアクセスの安全性を確保
- 🌐 **複数のデプロイオプション**：Docker ローカルデプロイと Koyeb クラウドサービスデプロイをサポート
- 📝 **自動翻訳**：複数の翻訳サービスを内蔵し、メタデータの自動翻訳をサポート
- 🎭 **豊富なデータソース**：複数の俳優と動画データプロバイダーを統合

## デプロイオプション

MetaTube は複数のデプロイ方法をサポートしています。実際の要件に応じて最適なオプションを選択できます：

### 自己デプロイオプション

:::info 公式ドキュメント
詳細なデプロイドキュメントは [MetaTube 公式ドキュメント](https://metatube-community.github.io/) を参照してください
:::

#### Docker デプロイ

**デプロイコマンド**：

```bash
docker run -d -p 8080:8080 -v $PWD/config:/config --name metatube ghcr.io/metatube-community/metatube-server:latest -dsn /config/metatube.db
```

**アップグレード操作**：

```bash
docker stop metatube
docker rm metatube
docker run -d -p 8080:8080 -v $PWD/config:/config --name metatube ghcr.io/metatube-community/metatube-server:latest -dsn /config/metatube.db
```

#### Docker Compose デプロイ

**設定ファイルの作成**：

```bash
vi docker-compose.yml
```

**設定内容**：

```yaml
services:
  metatube-server:
    image: ghcr.io/metatube-community/metatube-server:latest
    container_name: metatube
    restart: always
    network_mode: bridge
    ports:
      - 8080:8080
    environment:
      - HTTP_PROXY=${HTTP_PROXY:-}
      - HTTPS_PROXY=${HTTPS_PROXY:-}
      - DB_AUTO_MIGRATE=true
      - PORT=8080
```

**サービスの起動**：

```bash
docker-compose up -d
```

**サービスのアップグレード**：

```bash
docker-compose up -d --force-recreate
```

#### アクセストークンの設定

デプロイが完了したら、後続の設定に使用する以下の情報を記録してください：

- **アクセスアドレス**：通常はデプロイホストの IP アドレスに 8080 ポートを加えたもので、例：`http://192.168.1.100:8080`
- **TOKEN**：サービス認証に使用される 32 文字の文字列。ランダムに生成することを推奨します

**ランダム TOKEN の生成**：

```bash
openssl rand -hex 16
```

**TOKEN の設定**：

#### Docker コマンド設定

```bash
docker run -d -p 8080:8080 -v $PWD/config:/config --name metatube -e TOKEN=your_token ghcr.io/metatube-community/metatube-server:latest -dsn /config/metatube.db
```

#### Docker Compose 設定

```yaml
services:
  metatube-server:
    environment:
      - TOKEN=your_token
```

### Koyeb デプロイオプション

Koyeb は、サーバーレス環境のユーザーに適した便利なクラウドサービスデプロイオプションを提供します：

:::info アカウントの準備
デプロイ前に Koyeb アカウントを登録する必要があります。無料アカウントで基本的な要件を満たすことができます。
:::

#### クイックデプロイ

以下のボタンをクリックしてクイックデプロイを開始します：

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=metatube-ms&type=docker&image=ghcr.io/metatube-community/metatube-server:latest&instance_type=free&regions=was&instances_min=0&autoscaling_sleep_idle_delay=300&env[MT_PROVIDER_MADOUQU__PRIORITY]=1000&env[MT_PROVIDER_MODELMEDIAASIA__PRIORITY]=1000&env[PORT]=3000&ports=3000;http;/&hc_protocol[3000]=tcp&hc_grace_period[3000]=5&hc_interval[3000]=30&hc_restart_limit[3000]=3&hc_timeout[3000]=5&hc_path[3000]=/)

**デプロイ手順**：
1. Koyeb アカウントにログイン
2. 上記ボタンをクリックしてアプリを作成
3. 環境変数設定で `TOKEN` を追加（ランダムに生成された 32 文字の文字列を使用することを推奨）
4. 「Deploy」ボタンをクリックし、デプロイが完了するのを待ちます

#### 手動デプロイ

**ステップ 1：サービスの作成**

![Create service](/img/plugin/metatube-koyeb-01.png)

- Koyeb コンソールにログインし、左側の「Create service」ボタンをクリックします
- サービスタイプを「Web service」に選択
- デプロイ方法を「Docker」に選択

**ステップ 2：イメージの設定**

![Create service](/img/plugin/metatube-koyeb-02.png)

- イメージアドレス：`ghcr.io/metatube-community/metatube-server:latest`

**ステップ 3：リージョンの選択**

![Create service](/img/plugin/metatube-koyeb-03.png)

- 無料アカウントは Washington, DC リージョンのみをサポート
- より良いアクセスエクスペリエンスを得るには、日本または米国のリージョンを選択することを推奨（有料アカウントが必要）

**ステップ 4：環境変数の設定**

![Create service](/img/plugin/metatube-koyeb-04.png)

- `PORT` を `3000` に設定
- 未承認アクセスを防ぐために、`TOKEN` を認証キーとして設定

**ステップ 5：ポートマッピングの設定**

![Create service](/img/plugin/metatube-koyeb-05.png)

- ポート入力：`3000`（環境変数 `PORT` と一致させる）
- プロトコル選択：`http`
- 「Public HTTPS access」にチェックを入れ、パスを `/` に設定

**ステップ 6：ヘルスチェックの設定**

![Create service](/img/plugin/metatube-koyeb-06.png)

- プロトコル選択：`tcp`
- ポート入力：`3000`（環境変数 `PORT` と一致させる）
- その他のパラメータはデフォルト値のままにします

**ステップ 7：デプロイの完了**
「Deploy」ボタンをクリックし、アプリのデプロイが完了するのを待ちます。

#### デプロイの完了

![Create service](/img/plugin/metatube-koyeb-07.png)

- Koyeb コンソールの「Overview」ページでアプリのアクセスアドレスを確認できます

![Create service](/img/plugin/metatube-koyeb-08.png)

- このアドレスにアクセスして、Metatube サービスが正常に応答しているかどうかを確認できます
- サービスアクセスアドレス形式：`https://xxxx-xxx-xxx.koyeb.app/`（xxxx-xxx-xxx は Koyeb が割り当てたアプリ名）

:::tip 重要情報
後続の AMMDS プラグイン設定に使用するため、アクセスアドレスと TOKEN を記録してください。
:::

## プラグイン設定

AMMDS 管理インターフェースで、「統合アプリ」→「メタデータ」→「Metatube」に進んで設定ページに入ります。

### サービスモード

MetaTube プラグインは 2 つのサービスモードをサポートしています：

- **リモートサービス**：外部にデプロイされた MetaTube サービスを使用
- **組み込みサービス**：AMMDS に組み込まれた MetaTube サービスを使用

:::note 優先度の説明
同一時間には 1 つのサービスモードのみが有効です。組み込みサービスの優先度はリモートサービスより高いです。
:::

### クイック操作

![Metatube プラグイン設定](/img/plugin/metatube-01.png)

設定ページの右上隅には以下のクイック操作があります：

- **サービスの起動**：組み込み Metatube サービスを起動
- **サービスの停止**：組み込み Metatube サービスを停止
- **サービスの再起動**：組み込み Metatube サービスを再起動
- **設定の更新**：設定項目を更新
- **設定の保存**：現在の設定を保存（すべての設定変更はこのボタンをクリックして有効にします）

### 設定パラメータ

![Metatube プラグイン設定](/img/plugin/metatube-02.png)

#### 基本設定

| パラメータ | 説明 | デフォルト値 |
|------|------|--------|
| 有効化状態 | Metatube プラグインを有効にするかどうかを制御 | オフ |
| 起動時自動開始 | AMMDS の起動時に組み込み Metatube サービスを自動的に起動するかどうかを制御 | オフ |
| リモートサービスアドレス | Metatube サービスのアクセスアドレス | - |

**リモートサービスアドレスの例**：
- `https://xxxx-xxx-xxx.koyeb.app`
- `http://192.168.1.100:3000`

:::info 注意事項
- リモートサービスアドレスは `/` で終了しないようにしてください。そうしないと、アクセスパスが間違ってしまいます。
:::

#### 認証設定

| パラメータ | 説明 | デフォルト値 |
|------|------|--------|
| 認証の有効化 | Metatube サービス認証を有効にするかどうか | オフ |
| トークン | Metatube サービスのアクセストークン | - |

:::warning 認証の説明
Metatube サービスのデプロイ時に TOKEN を設定した場合は、必ずこのオプションを有効にし、正しいトークンを入力してください。
:::

#### データソース設定

- **優先度**：データソースの優先順位を設定します。順位の高いデータソースが優先的に使用されます

#### 翻訳設定

![Metatube プラグイン設定](/img/plugin/metatube-03.png)

| パラメータ | 説明 | デフォルト値 |
|------|------|--------|
| 自動翻訳 | 自動翻訳サービスを有効にするかどうか | オフ |
| 翻訳サービス | 翻訳サービスプロバイダーを選択 | - |
| API キー | 一部の翻訳サービスで必要な API キー | - |

:::info 翻訳の説明
自動翻訳を有効にすると、タイトル、説明などのフィールドが自動的に翻訳され、他のプラグインのデータソースにも同様に適用されます。
:::

### テストモジュール

![Metatube プラグインテスト](/img/plugin/metatube-04.png)

**クイック操作**：

- **接続テスト**：リモートサービスアドレスが到達可能かどうかをテストします（ネットワーク接続性のみを検証し、サービス状態は保証しません）
- **組み込みアプリ情報**：組み込み Metatube サービスのアプリ情報（バージョン番号、設定など）を表示
- **リモートアプリ情報**：リモート Metatube サービスのアプリ情報（バージョン番号、設定など）を表示

![Metatube プラグインテスト](/img/plugin/metatube-05.png)

**アプリ情報の表示**：

- **基本情報**：バージョン番号、データベースバージョンなどを含みます
- **俳優プロバイダー**：俳優データ（アバター、基本情報など）を提供するデータソース
- **動画プロバイダー**：動画メタデータ（タイトル、説明、俳優、監督、公開日など）を提供するデータソース

### 注意事項

#### 地域制限

一部のプロバイダーサイト（DMM など）はアクセス地域に厳しい制限があり、データ取得の失敗を引き起こす可能性があります。

:::tip 推奨
最適なアクセス効果を得るには、日本または米国のリージョンにデプロイしてください。
:::

#### プロキシ設定

- **組み込みサービス**：AMMDS のプロキシ設定を自動的に同期します
- **リモートサービス**：ネットワークアクセスの問題を自ら解決する必要があります。サービスがプロバイダーサイトに正常にリクエストできることを確認してください

:::note プロキシの有効化
プロxyが有効にならない場合は、プロキシを設定した後に AMMDS サービスを再起動することを推奨します。
:::

## よくある質問

### サービスにアクセスできない

**トラブルシューティング手順**：
1. サービスが正常に実行されているかどうかを確認します
2. ネットワーク接続が正常かどうかを確認します
3. ファイアウォールが対応するポートへのアクセスを許可しているかどうかを確認します
4. TOKEN 設定が正しいかどうかを確認します

### データ取得に失敗する

**考えられる原因**：
- ネットワーク環境の制限（地域制限など）
- データソースサイトの一時的な利用不可
- サービス設定のエラー

**解決策**：
- デプロイリージョンの変更を試みます
- ネットワークプロキシ設定を確認します
- データソース設定が正しいかどうかを検証します

### 翻訳サービスが機能しない

**トラブルシューティング手順**：
1. 自動翻訳機能が有効になっていることを確認します
2. 翻訳サービスの API キーが正しいかどうかを確認します
3. ネットワーク接続が正常かどうかを確認します
4. 翻訳サービスプロバイダーの変更を試みます
