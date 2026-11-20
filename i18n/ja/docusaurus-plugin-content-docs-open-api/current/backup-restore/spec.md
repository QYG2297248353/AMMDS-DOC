---
title: バックアップパッケージ仕様
sidebar_label: バックアップパッケージ仕様
description: バックアップパッケージの完全な形式仕様。zip 構成、manifest.json と data.json の項目定義、5種類のデータの項目表、画像対応、検証と取り込み照合の規則。手書きスクリプトやAI生成の際に対照してください。
sidebar_position: 2
---

# バックアップパッケージ仕様

このページはバックアップパッケージの**完全な形式仕様**です。自分でスクリプトを書く人、AIにクロールデータをパッケージにさせる人が照合します。パッケージの中身を知りたいだけなら先に[バックアップパッケージの構造](./overview.md)を、AIに作らせたいなら[AI 作成ガイド](./ai-guide.md)を見てください。

許される書き方は一通りだけで、この仕様どおりに作ったパッケージだけが AMMDS の「解析プレビュー」で**検証通過**となり、正常に取り込めます。末尾に権威ある実装とテンプレートリポジトリへのリンクがあります。

## 1. 十の鉄則

| # | 規則 |
| --- | --- |
| 1 | zip の**ルート**に `manifest.json` と `data.json` が必要。どちらかが欠けると書庫全体が拒否される |
| 2 | `format` は常に `ammds-backup`、`formatVersion` は常に `1` |
| 3 | `type` は `movie` / `actor` / `comic` / `novel` / `tv` のいずれかで、内容構造と一致しなければならない |
| 4 | `count` は `data.json` 配列の要素数と**厳密に一致**しなければならない |
| 5 | `images/` 配下の全ファイルを `manifest.imageFiles` に `{ref, path, sha256}` で登録する |
| 6 | `imageFiles[].path` は `images/` で始まり、zip 内の項目名と**1文字まで一致**しなければならない |
| 7 | `data.json` の画像フィールド値は対応する `imageFiles[].ref` と**完全一致**（大小文字を区別） |
| 8 | `http(s)://` の外部リンクは `data.json` に**だけ**書き、`imageFiles` には登録**しない** |
| 9 | 項目名は空、`/` 始まり、`\`、`:`、`..` のパス segment を含めてはならない |
| 10 | 日付は `yyyy-MM-dd`、列挙は code のみ、**整数項目は整数で**（`120` は可、`120.0` はその項目の取り込み失敗） |

## 2. zip の構成

```
ammds-backup-movie-20260911153000.zip
├── manifest.json              # 必須、ルート
├── data.json                  # 必須、ルート、JSON 配列
└── images/                    # 任意：画像を詰める場合のみ
    └── <項目キー>/            # 項目ごとに1ディレクトリ、識別子を安全化したもの
        ├── poster_0.jpg       # 平場の画像：<フィールド>_<連番>.<拡張子>
        ├── fanart_0.jpg
        └── pages/             # 漫画のみ：章ページ画像
            ├── page00001.jpg
            └── page00002.jpg
```

- 画像が一切ない場合は `images/` を**作らない**、`includeImages` は `false`、`imageFiles` は `[]`。
- zip 項目名は UTF-8。`imageFiles[].path` は可能な限り ASCII にして跨平台の文字化けを避ける。
- 1パッケージにつき1種類の `type`。映画と演者を混在させない。

## 3. manifest.json の項目

| 項目 | 型 | 必須 | 値 / 説明 |
| --- | --- | --- | --- |
| `format` | string | 是 | 常に `ammds-backup` |
| `formatVersion` | int | 是 | 常に `1`。サポート範囲より高いと拒否 |
| `type` | string | 是 | `movie` / `actor` / `comic` / `novel` / `tv` |
| `generatedAt` | string | 推奨 | タイムゾーン付き ISO-8601、例 `2026-09-11T15:30:00+08:00`。欠けても警告のみ |
| `appVersion` | string | 推奨 | パッケージを作成した AMMDS のバージョン。欠けても警告のみ |
| `includeImages` | boolean | 是 | 画像を詰めたか。`images/` の有無と一致しなければならない |
| `count` | int | 是 | `data.json` 配列の長さ。一致が必要 |
| `imageFiles` | array | 是 | 画像対応の配列。なければ `[]` |

`imageFiles[]` の各項目：

| 項目 | 型 | 説明 |
| --- | --- | --- |
| `ref` | string | 画像参照キー。`data.json` の値と**1文字まで同一**。ローカル画像は `data` で始める慣例 |
| `path` | string | zip 内の相対パス。`images/` で始まり、実在しなければならない |
| `sha256` | string | ファイル字节の SHA-256（64桁小文字16進数）。現在は書き込むだけで取り込み時に検証されないが、正しい値を書くこと |

例：

```json
{
  "format": "ammds-backup",
  "formatVersion": 1,
  "type": "movie",
  "generatedAt": "2026-09-11T15:30:00+08:00",
  "appVersion": "1.6.80",
  "includeImages": true,
  "count": 1,
  "imageFiles": [
    {
      "ref": "data/images/media/2026/09/ai-001-poster.jpg",
      "path": "images/AI-001/poster_0.jpg",
      "sha256": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
    }
  ]
}
```

## 4. data.json の一般規則

1. トップレベルは **JSON 配列** `[ {...}, {...} ]`、1要素が1件のデータ。
2. フィールド名は**キャメルケース**、例 `originalTitle`、`imagePath`、`fullChapter`。
3. 取得できないフィールドは**省略**（または `null`）。`"未知"`、`"-"`、`"N/A"` などのプレースホルダーを書かない。
4. 取り込み側は**未知のフィールドを無視**する。そのため綴り違いはデータ損失を意味する。表どおりに書く。
5. 数値は厳密：整数項目は整数（`runtime`、`pageCount`、`season`、`episode`、`sequence`、`sort`、`fileSizeByte`、`resolutionWidth`）、評価・身長・体重などは小数（`8.5`）。
6. 日付は `yyyy-MM-dd` 文字列。不正な形式は空にされる。
7. 列挙は code のみ（第7節）。中文名はフォールバックまたは空になる。
8. 配列か単値か——最も多い間違い：

| フィールド | 種別 | 形 |
| --- | --- | --- |
| `poster` | movie | 配列 `["data/...jpg"]` |
| `poster` | actor | 単値 `"data/...jpg"` |
| `thumb` | actor | 配列 |
| `cover` / `backCover` | comic / novel | 単値 |
| `posterHd` / `fanartHd` / `thumbHd` | movie / tv | 単値 |
| `poster` / `fanart` / `thumb` / `logo` / `banner` | tv ドラマ級 | 配列 |
| `still` | tv エピソード級 | 単値 |

> 取り込み側は配列期待箇所に単値を渡しても受け付けるが、常に表どおりに書くこと。

9. `id`、`createdTime`、`updatedTime`、`version` は書かない。取り込み時に無視され、主キーは作り直される。

## 5. 5種類のデータの項目表

記号：`S` 文字列、`S[]` 文字列配列、`I` 整数、`N` 数値、`B` 真偽、`O[]` オブジェクト配列。`★`＝書かないと照合・取り込みに失敗、`·`＝任意。

### 5.1 movie（映画）

| 項目 | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `uniqueid` | S[] | ★ | 識別子 / 番号。**照合の主根拠**、1つ以上（大小文字無視） |
| `originalTitle` | S | ★ | 原題。ID が一致しなかった場合の `merge` フォールバック |
| `titleCn` | S | · | 中国語タイトル |
| `plot` / `plotCn` | S | · | あらすじ / 中国語あらすじ |
| `tagline` / `outline` | S | · | タグライン / 概要 |
| `rating` | N | · | 評価（10点満点） |
| `premiered` | S | · | 公開日 `yyyy-MM-dd` |
| `runtime` | I | · | 上映時間（分） |
| `mpaa` / `language` / `country` | S | · | レーティング / 言語 / 国 |
| `mosaic` | S | · | モザイク有無 |
| `genre` / `tag` / `studio` / `issueStudio` / `director` | S[] | · | ジャンル / タグ / 制作 / 発行 / 監督 |
| `actors` | O[] | · | `[{"name":"名前","role":"役"}]` |
| `sets` | O[] | · | `[{"name":"シリーズ","overview":"説明"}]` |
| `sourceLinks` / `platform` | O[] | · | `[{"platform":"サイト","link":"https://..."}]` |
| `extend` | O[] | · | `[{"key":"k","value":"v"}]` |
| `magnet` | O[] | · | `[{"name":"n","link":"magnet:?...","size":123,"hash":"...","date":1754006400000}]`、`date` は**ミリ秒エポック整数** |
| `subtitle` | O[] | · | `[{"sid":"..","name":"..","link":"..","language":"zh","extension":"srt","duration":0,"path":""}]` |
| `poster` / `fanart` / `thumb` / `extrafanart` | S[] | · | ポスター / 背景 / サムネ / 劇中写真（配列） |
| `posterHd` / `fanartHd` / `thumbHd` | S | · | 高解像度画像（単値） |
| `trailer` / `dataSource` | S | · | 予告 URL / データソース code |
| `shared` | B | · | 共有状態 |
| `pHash` / `osHash` / `filePath` | S[] | · | 指紋 / パス一覧 |
| `resolutionWidth` / `resolutionHeight` / `fileSizeByte` | I | · | 解像度 / サイズ（クロール時は通常書かない） |

### 5.2 actor（演者）

| 項目 | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `name` | S | ★ | 芸名。**照合根拠**、空にできない |
| `aliases` / `agency` / `tag` / `style` / `specialFeatures` | S[] | · | 別名 / 事務所 / タグ / スタイル / 特徴 |
| `gender` | S | · | `male` / `female` / `shemale` |
| `heightCm` / `weightKg` | N | · | 身長 / 体重 |
| `birthDate` / `debutDate` | S | · | 生年月日 / デビュー日 `yyyy-MM-dd` |
| `nationality` / `bloodType` / `cupSize` | S | · | 国籍 / 血液型 / カップ |
| `bustChestCm` / `waistCm` / `hipsCm` / `penisCm` | N | · | 身体データ |
| `score` | N | · | 評価（10点満点） |
| `socialLinks` | O[] | · | `[{"platform":"Twitter","link":"https://..."}]` |
| `retired` / `deceased` / `shared` | B | · | 引退 / 逝去 / 共有 |
| `poster` | S | · | ポートレート（単値） |
| `thumb` | S[] | · | ポスター（配列） |
| `bio` | S | · | 経歴 |
| `extend` / `platform` | O[] | · | movie と同じ |
| `dataSource` | S | · | データソース code |

### 5.3 comic（漫画 / アルバム）

| 項目 | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `title` | S | ★ | アルバム名、空にできない |
| `isbn` | S | · | ISBN。**照合の優先根拠**、あれば書く |
| `type` | S | · | `comic`（既定）/ `album` |
| `cover` / `backCover` | S | · | 表紙 / 裏表紙（単値） |
| `description` / `notes` / `web` | S | · | 説明 / 備考 / リンク |
| `season` | I | · | シーズン、既定 `1` |
| `fullChapter` / `arrange` / `blackAndWhite` | B | · | 全話モード / 整理済み / モノクロ |
| `publishDate` | S | · | 出版日 `yyyy-MM-dd` |
| `publisher` / `imprint` / `series` / `genre` | S | · | 出版情報 |
| `tags` / `characters` / `teams` / `locations` | S[] | · | タグ / キャラ / チーム / 場所 |
| `language` | S | · | 既定 `zh` |
| `format` | S | · | `Digital`（既定）/ `Print` |
| `manga` | S | · | `Yes`（既定）/ `No` / `Unknown` / `YesAndRightToLeft` |
| `ageRating` | S | · | 年齢区分 code、既定 `Adults Only 18+` |
| `communityRating` | N | · | コミュニティ評価 0.0–5.0 |
| `writer` `penciller` `inker` `colorist` `letterer` `coverArtist` `editor` `translator` | S | · | 制作者 |
| `chapters` | O[] | ★ | 章配列、下記参照 |

`chapters[]`：`title`（章名）、`episode`（章番号 I）、`description`、`pages`（ページ配列 O[]）。
`chapters[].pages[]`：`imagePath`（画像参照、詰める時は `data/...` キー、外鏈時は `http(s)://`）、`sequence`（ページ順 I）。ページは配列順に 1..N へ再構築され、`imagePath` が空のページはスキップされる。

> `pageCount`、`episodeCount` は派生項目。書かないこと（書いても再計算される）。

### 5.4 novel（小説）

| 項目 | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| `title` | S | ★ | 書名。空の項目はスキップされる |
| `isbn` | S | · | タイトルと共に照合根拠 |
| `subtitle` / `author` / `genre` / `publisher` / `publishYear` / `series` | S | · | 書誌情報 |
| `tags` / `category` | S[] | · | タグ / 分類 |
| `rating` | N | · | 評価 0–10 |
| `description` | S | · | あらすじ |
| `language` | S | · | 既定 `zh` |
| `pageCount` | I | · | ページ数 |
| `cover` / `backCover` | S | · | 表紙 / 裏表紙（単値） |
| `status` | S | · | 状態 code、既定 `continue` |
| `chapters` | O[] | ★ | `[{"title":"第一章","content":"本文","sort":1}]` |

`title` が空の章はスキップ。`content` はプレーンテキストまたは HTML 断片、改行は `\n` を使い、`\r\n` を混在させない。

### 5.5 tv（ドラマ）

> 1項目＝**1作品**で、1話ではない。シーズン・エピソード・エピソードファイルは入れ子配列。ファイル情報はトップレベルに平置きしない（トップの `filePath` は未知項目として無視される）。

作品項目：`libraryType` は固定 `"tv"`（★）；`title` メインタイトル（★）；`tmdbId` / `bgmId` / `tvdbId` / `imdbId` サイト ID（照合の第一根拠、記述を強く推奨）；`originalTitle` / `titleCn` / `sortTitle` / `showTitle` タイトル；`tvMediaType` 区分 code；`plot` / `plotCn` / `outline` / `tagline` あらすじ；`status` は `Continuing` / `Ended` のみ；`premiered` 初回放送日 `yyyy-MM-dd`；`year`（I）；`runtime`（I）；`rating`（N）/ `votes`（I）；`mpaa` / `language` / `country`；`genre` / `tag` / `studio` / `countries` / `director` / `credit`（S[]）；`poster` / `fanart` / `thumb` / `logo` / `banner`（作品級画像、S[]）；`posterHd` / `fanartHd` / `thumbHd`（単値）。

入れ子配列：`uniqueIds`（`{type, value}`）、`actors`（`{name, role, order, thumb}`）、`namedSeasons`（`{number, name}`）、`seasonPlots`（`{number, plot}`）、`seasons`（`{seasonNumber, name, overview, poster, airDate, episodeCount, dataSource, bgmSubjectId, tmdbSeasonId}`、`seasonNumber` が業務キー、0 はスペシャル）、`episodes`（`{seasonNumber, episodeNumber, title, titleCn, plot, airDate, runtime, rating, still, tmdbEpisodeId, ...}`、シーズン番号＋話数が業務キー）、`episodeFiles`（`{seasonNumber, episodeNumber, filePath, fileName, partIndex, available, durationSeconds, resolution, width, height, fileSize, ...}`、`fileName` 必須、欠けるとそのファイルはスキップ）、`seasonBindings`（`{seasonNumber, dataSource, sourceSubjectId, bindMode, episodeOffset, episodeCount}`）。

> `lastCheckedAt`、`durationSeconds`、`fileSize` は整数。`durationSeconds` の単位は秒で、ミリ秒ではない。

## 6. 画像対応

- 画像フィールドは**元の参照**を保持：`http(s)://` 始まりは外部リンク、`data` 始まりの相対パスはローカル画像。
- 書き出し時に詰めるのは `data` 始まりで実在する参照のみ。拡張子がない場合は `.jpg` として扱う。
- 書庫内パス：平場のフィールドは `images/<安全化キー>/<フィールド>_<連番>.<ext>`（例 `images/AI-001/poster_0.jpg`）、漫画ページは `images/<安全化キー>/pages/page00001.jpg`。安全化は `[a-zA-Z0-9_-]` 以外を `_` に置換し、空なら `item_<連番>`。
- 詰めた画像はすべて `imageFiles` に登録し、`ref` は `data.json` の値と一致、`sha256` はファイル字节の SHA-256 を書く。
- 外部リンクは詰めず書き換えもしない。ローカル画像は取り込み時に新しい `data` パスへ書き戻され、内容ごとに重複排除される。

## 7. 日付と列挙

- 日付：`yyyy-MM-dd` 文字列、例 `premiered`、`birthDate`、`debutDate`、`publishDate`、`airDate`。なお `movie.magnet[].date` と `episodeFiles[].lastCheckedAt` は**ミリ秒エポック整数**。
- 列挙は code のみ：`dataSource` は `official` / `metatube` / `theporndb` / `stashbox` / `fanza_dmm` / `m_team_dmm` / `r18dev` / `thejavdb` / `plugin` / `user` / `local`；`gender` は `male` / `female` / `shemale`；`bloodType` は `A` / `B` / `AB` / `O` / `RH+` / `RH-`；漫画 `type` は `comic` / `album`；`ageRating` は区分 code（空白を含むことがありそのまま書く）；小説 `status` は状態 code；ドラマの `dataSource` は `tmdb_tv` / `bangumi` / `tvdb` / `local` / `plugin` / `user`（映画ドメインと共有しない）；`tvMediaType` は `anime` / `jp_drama` / `kr_drama` / `cn_drama` / `western_tv` / `documentary` / `variety` / `other`。
- 未知の列挙はフォールバックまたは空になる。項目は取り込まれるがデータは失われる。

## 8. 検証：何が拒否されるか

以下いずれかで取り込み全体が拒否され、**既存データは一切変更されない**：

- `format` が `ammds-backup` でない。
- `formatVersion` が 1 未満、またはサポート版（現在 1）より高い。
- `type` が空または許可値以外。1パッケージに複数種類が混在。
- `manifest.json` または `data.json` が欠けている。
- `count` と `data.json` の実項目数が一致しない。
- `imageFiles[].ref` が空。`path` が空・不正・`images/` で始まらない・書庫内に存在しない。
- 項目名が空、`/` 始まり、`\`、`:`、`..` のパス segment を含む。
- `includeImages` が真なのに `imageFiles` が空で、かつ `images/` ファイルが存在する。

警告のみ：`generatedAt` / `appVersion` の欠落、`imageFiles` の `ref` が `data.json` に出てこない、`path` の重複、未登録の画像、未認識の項目。

## 9. 照合と競合策略

| 種類 | 同一と判定する根拠 |
| --- | --- |
| movie | `uniqueid` の共通（全角→半角、小文字、区切り除去、tmdb/tvdb/imdb/bgm/douban 接頭辞の認識を含む正規化あり） |
| actor | `name` が完全一致、その後空白折り畳み正規化。`Iron Man` と `Ironman` は**統合しない** |
| comic | `isbn` があれば優先、なければ `title` の大小文字無視 |
| novel | `title` + `isbn` |
| tv | `tmdbId` → `bgmId` → `tvdbId` → `imdbId`。サイト ID が全て無い場合 `merge` はタイトルにフォールバック |

| 策略 | 動作 |
| --- | --- |
| `skip` | 既存はそのまま、新規だけ追加。一致項目は画像解析も書き込みもしない |
| `overwrite` | 一致項目を書庫版で丸ごと更新し、無いものは新規作成 |
| `merge` | 一致項目の空欄だけを埋め、列表は重複排除して和集合。movie は ID 不一致時にタイトルへフォールバック |

不一致は常に新規作成。1件の失敗は件数と理由を記録するだけで、**書庫全体は中断されない**。取り込み後のファイル名にはタイムスタンプが付き `ammds-backup-<type>-<ミリ秒>.zip` となる。

## 10. 権威ある実装とテンプレート

- **権威ある仕様と参考実装**（ソースリポジトリ `docs/备份恢复规则/`）：https://github.com/QYG2297248353/AMMDS-Docker/tree/master/docs/备份恢复规则 — ゼロ依存の生成スクリプト `ammds_backup_pack.py` も同フォルダにある。
- **テンプレートリポジトリ**（ここから始めることを推奨）：https://github.com/QYG2297248353/AMMDS-BackupPackage.git — 4つ空欄を埋めて一言言うだけで、テンプレートの `Rule/AI备份包生成规范.md` とスクリプトが項目対応・梱包・自己検証を行う。

:::note[ソースコードが権威]
このページは現在の実装に基づく。ソースリポジトリの説明文には実装との歴史的な差異（例：`extend` のキー名、一部のタイムスタンプ項目の型）が残っている。パッケージ生成時はこのページの項目表とテンプレートの `Rule/` 規則を信頼してください。
:::

## 次に見る

- [バックアップパッケージの構造](./overview.md)
- [AI 作成ガイド](./ai-guide.md)
- [ガイド：バックアップと復元](/docs/backend/system/backup-restore)
