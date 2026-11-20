---
title: よく使うインターフェース早見表
sidebar_label: エンドポイント一覧
description: よく使うオープン API を一枚の表にまとめました。住所・用途・必要な引数・返るものに加え、リクエスト例と項目の説明を載せています。
sidebar_position: 2
---

# よく使うインターフェース早見表

このページは、よく使うオープン API を一枚の表にまとめたものです。住所、何に使うか、どんな引数が要るか、何が返るかを並べています。住所と引数は、現在のバージョンに実際にあるものだけです。

共通の決まり（返ってくる中身の形、ステータスコード、日時の書式）は[リクエストとレスポンスの読み方](./conventions.md)にあります。

## まず言葉を整理します

> **インターフェース / API**：AMMDS が外向けに開いている扉です。住所一つがインターフェース一つです。

> **リクエスト**：プログラムが AMMDS に送る「これが欲しい」という問いかけです。

> **レスポンス**：AMMDS が返してくる中身のかたまりです。

> **JSON**：その中身の書式で、「項目名」と「値」の組み合わせです。

## 早見表

下の住所にはすべて先頭に `http://<ホスト>:<ポート>` を付け、ヘッダーに `x-api-key` を入れてください（最初の行を除きます）。

| メソッド | 住所 | 何に使うか | 必要な引数 | 返るもの |
| --- | --- | --- | --- | --- |
| GET | `/api/v1/health/check` | サービスが動いているか確かめる | なし。鍵も不要 | `data` は常に `true` |
| POST | `/api/v1/movie/import` | 作品を取り込む。画像はファイルとして送る | フォームの項目。意味はかんたん取り込みと同じ。複数値は配列の文字列 | `data` は `true` または `false` |
| POST | `/api/v1/movie/import/quick` | かんたん取り込み。画像はリンクで指定 | `uniqueid` と `originalTitle` は必須。ほかは下の表 | `data` は `true` または `false` |
| POST | `/api/v1/movie/import/from-source` | 取得元とその ID から直接取り込む | `source` と `id` は必須、`provider` は任意 | `data` は取り込み後の作品 ID |
| GET | `/api/v1/movie/{id}` | 作品ひとつの詳細を取る | パスの `id` は作品の主キー | 完全なデータ。存在しなければ「作品がありません」 |
| GET | `/api/v1/movie/count` | 作品の件数を取る | なし | `data` は数字。例：`1286` |
| POST | `/api/v1/movie/lookup` | 番号やファイルの指紋でローカルの作品を照合 | `number`、`pHash`、`osHash` のいずれか一つ以上 | 当たれば `data` は作品 ID、外れれば `null` |
| POST | `/api/v1/movie/search` | 複数の取得元をいっせいに検索 | `keyword` は必須、`waitTime` は任意 | `data` はデータの一覧 |
| POST | `/api/v1/translate/language/identify` | 文章の言語を判定する | `text` は必須 | `data` に言語コードと名称 |
| POST | `/api/v1/translate/text` | 文章を別の言語に翻訳する | `text` と `target` は必須、`source` と `provider` は任意 | `data` に原文・訳文・使用エンジン |

:::note[漫画向けはこの表にありません]
漫画リーダー向けは `/api/mihon` で始まる別の住所で、鍵の種類も違います。そちらは「漫画リーダーで漫画を読む」で扱っています。
:::

## 健康診断

鍵は不要で、プログラムが動いているかの確認に使います。

```bash
curl -s http://127.0.0.1:8080/api/v1/health/check
```

```json
{
  "code": 200,
  "message": "success",
  "data": true,
  "timestamp": 1753958400000
}
```

これはプログラムが動いていることだけを証明し、データベース・ディスク・外部サービスは調べません。確認の間隔は 30 秒から 60 秒が目安です。

## かんたん取り込み

`POST /api/v1/movie/import/quick`。ヘッダーに `Content-Type: application/json` を付けます。

| 項目 | 必須 | 説明 |
| --- | --- | --- |
| `uniqueid` | はい | 番号。一意の識別子として使われ、二重取り込みでも二件になりません |
| `originalTitle` | はい | 元の題名 |
| `numbers` | いいえ | 同じ番号の別の書き方 |
| `titleCn` | いいえ | 中国語の題名 |
| `plot` / `plotCn` | いいえ | あらすじ / 中国語のあらすじ |
| `rating` | いいえ | 評価。10 点満点 |
| `premiered` | いいえ | 発売日。`yyyy-MM-dd` で書く |
| `runtime` | いいえ | 長さ。単位は分 |
| `language` / `country` | いいえ | 言語 / 国 |
| `mosaic` | いいえ | モザイクの有無 |
| `posterUrl` / `fanartUrl` / `thumbUrl` / `extrafanartUrl` | いいえ | 表紙 / 背景 / 縮小画像 / 場面写真のリンク |
| `genres` / `tags` | いいえ | ジャンル / タグ |
| `studio` / `issueStudio` | いいえ | 制作会社 / 発売元 |
| `director` | いいえ | 監督 |
| `favorite` / `subscribe` | いいえ | お気に入り / 購読。省略時は `false` |

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/movie/import/quick \
  -H "x-api-key: <あなたの鍵>" \
  -H "Content-Type: application/json" \
  -d '{
    "uniqueid": "ABC-123",
    "originalTitle": "示例标题",
    "titleCn": "示例标题（中文）",
    "plot": "简介",
    "rating": 8.5,
    "premiered": "2025-10-16",
    "runtime": 120,
    "posterUrl": ["https://example.com/poster.jpg"],
    "genres": ["剧情"],
    "tags": ["高清"],
    "studio": ["示例制作商"],
    "favorite": true
  }'
```

```json
{ "code": 200, "message": "success", "data": true, "timestamp": 1753958400000 }
```

取り込みに失敗すると、`code` は `500`、`message` は「导入失败」、`data` は `false` になります。

フォーム取り込み `/api/v1/movie/import` は項目の意味がまったく同じで、違いは二つだけです。画像をリンクではなく**ファイル**として送ること、複数値を配列の文字列として送ることです。手元に画像があって外部リンクに頼りたくない場合に使います。

## 取得元からの取り込み

`POST /api/v1/movie/import/from-source`。

| 項目 | 必須 | 説明 |
| --- | --- | --- |
| `source` | はい | 取得元。下の取得元の表を参照 |
| `id` | はい | その取得元の中での作品 ID |
| `provider` | いいえ | 取得元の中の区分。例：`metatube` のプロバイダ ID、`theporndb` の `jav`・`scene`・`movie` |

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/movie/import/from-source \
  -H "x-api-key: <あなたの鍵>" \
  -H "Content-Type: application/json" \
  -d '{"source":"metatube","id":"12345","provider":"jav"}'
```

```json
{ "code": 200, "message": "success", "data": "movie-uuid", "timestamp": 1753958400000 }
```

失敗時の `message` は「导入失败，请检查数据源和参数」です。

:::warning[取得元は先に有効化が必要です]
このインターフェースは対応するプラグインの機能を呼びます。取得元がプラグイン設定で有効になっていない、またはプラグイン自体に鍵がない場合は、そのまま取り込みに失敗します。
:::

## 作品の詳細と件数

`GET /api/v1/movie/{id}` は作品ひとつの完全なデータを返します。パスの `id` は作品の主キー（文字列）です。存在しない場合は「作品がありません」と出ます。

`GET /api/v1/movie/count` は件数を返します。

```json
{ "code": 200, "message": "success", "data": 1286, "timestamp": 1753958400000 }
```

`/count` は固定の住所で `/{id}` より優先されます。作品 ID として扱われることはありません。

## ローカル照合

`POST /api/v1/movie/lookup` は、番号やファイルの指紋でライブラリ内の作品を探します。

| 項目 | 説明 |
| --- | --- |
| `number` | 番号 |
| `pHash` | 画像の知覚ハッシュ |
| `osHash` | ファイルの OsHash |

三つのうち最低ひとつを入れてください。どれも入れないと即座に失敗で返ります。当たれば `data` は作品 ID、外れれば `null` です。

## 複数ソース検索

`POST /api/v1/movie/search`。

| 項目 | 必須 | 説明 |
| --- | --- | --- |
| `keyword` | はい | 番号、または題名の語 |
| `waitTime` | いいえ | 各取得元を何秒待つか。既定値 `60` |

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/movie/search \
  -H "x-api-key: <あなたの鍵>" \
  -H "Content-Type: application/json" \
  -d '{"keyword":"ABC-123","waitTime":30}'
```

返る `data` はデータの一覧で、各要素によく入る項目は次です。

| 項目 | 説明 |
| --- | --- |
| `source` / `provider` | 取得元と区分。そのまま `import/from-source` に渡せます |
| `id` | その取得元の中での作品 ID |
| `number` / `title` / `summary` | 番号・題名・あらすじ |
| `cover` / `thumb` / `previewImages` | 表紙・縮小画像・場面写真 |
| `actors` / `director` / `genres` / `tags` | 出演者・監督・ジャンル・タグ |
| `studio` / `label` / `series` | 制作会社・レーベル・シリーズ |
| `score` / `runtime` / `release` / `mosaic` | 評価・長さ・発売日・モザイクの状態 |
| `extras` | その取得元だけが持つ追加項目 |

:::note[項目は空になることがあります]
取得元によって用意できる情報は違い、用意できないものは空で返ります。空を異常として扱わないでください。
:::

## 翻訳

言語の判定：

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/translate/language/identify \
  -H "x-api-key: <あなたの鍵>" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World"}'
```

```json
{
  "code": 200,
  "message": "success",
  "data": { "code": "en", "name": "英语" },
  "timestamp": 1753958400000
}
```

判定できない場合は `code` が `unknown`、`name` も `unknown` になります。

文章の翻訳：

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/translate/text \
  -H "x-api-key: <あなたの鍵>" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World", "target": "zh"}'
```

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "originalText": "Hello World",
    "originalLanguage": "英语",
    "originalLanguageCode": "en",
    "translateText": "你好世界",
    "translateLanguage": "简体中文",
    "translateLanguageCode": "zh",
    "translateEngine": "百度翻译"
  },
  "timestamp": 1753958400000
}
```

| `data` 内の項目 | 説明 |
| --- | --- |
| `originalText` | 原文 |
| `originalLanguage` / `originalLanguageCode` | 元の言語の名称 / コード |
| `translateText` | 訳文 |
| `translateLanguage` / `translateLanguageCode` | 翻訳先の言語の名称 / コード |
| `translateEngine` | 実際に使われた翻訳エンジン |

翻訳の `text` と `target` は必須です。`source` を省けば元の言語は自動判定され、`provider` を省けばシステム設定に従って自動で選ばれます。

なお `message` や言語名はサーバーが返す中国語の文面そのままです。

## 取得元の識別子

`source` に書ける値は、有効にしているプラグインによって変わります。

| 値 | 対応プラグイン |
| --- | --- |
| `metatube` | MetaTube |
| `theporndb` | ThePornDB |
| `stashbox` | ThePornDB（StashBox モード） |
| `fanzadmm` | FANZA DMM |
| `mteamdmm` | M-Team DMM |
| `tmdb` | TMDB |
| `tvdb` | TheTVDB |

検索結果に出てくるのは**有効になっている**取得元だけです。無効のものは現れません。

## 言語コード

| コード | 言語 |
| --- | --- |
| `zh` | 簡体字中国語 |
| `zh-TW` | 繁体字中国語 |
| `en` | 英語 |
| `ja` | 日本語 |
| `ko` | 韓国語 |

実際に使える言語は翻訳エンジン次第です。対応していない場合は失敗で返り、`message` に理由が書かれます。

## 設定項目

| 設定項目 | 何を入れるか | 入れない / 間違えた場合 |
| --- | --- | --- |
| `x-api-key` | システムで作成した X-API-KEY の鍵 | なし、または間違いだと `code` が `401` |
| `Content-Type` | かんたん取り込みは `application/json`、フォーム取り込みは `multipart/form-data` | 間違えると本文を読み違えることがあります |
| `uniqueid` / `originalTitle` | かんたん取り込みで必須の二つ | どちらか欠けると取り込みに失敗します |
| `source` / `id` | 取得元からの取り込み時の取得元名と内部 ID | 取得元が無効、または ID 違いだと失敗します |
| `keyword` | 検索する番号や語 | 必須。省くと検査で弾かれます |
| `number` / `pHash` / `osHash` | ローカル照合ではどれか一つ以上 | どれも入れないと即座に失敗します |
| `text` / `target` | 翻訳する文章と翻訳先の言語コード | どちらか欠けると検査で弾かれます |

## うまくいかないときは

- **検索がいつも空**：取得元が一つも有効になっていません。プラグイン設定で一つ有効にし、接続を試してください。
- **取り込みの `data` が `false`**：たいていは必須項目の欠落か、その番号がすでに存在するかのどちらかです。`uniqueid` と `originalTitle` を確認してください。
- **詳細が「作品がありません」**：ID が違う、または作品が削除されています。先に検索か件数で ID を確認してください。
- **ローカル照合がいつも `null`**：指紋照合は取り込み時に記録された指紋に依存します。記録がなければ当たりません。`number` を試してください。
- **翻訳が「翻訳エンジンがありません」**：`provider` に存在しない ID が入っています。空にして自動選択に任せてください。

## 次に読む

- [リクエストとレスポンスの読み方](./conventions.md)
