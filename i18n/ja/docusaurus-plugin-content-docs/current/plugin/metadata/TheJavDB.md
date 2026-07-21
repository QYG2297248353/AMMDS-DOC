---
title: "TheJavDB"
description: "TheJavDB は JAV（日本成人動画）メタデータデータベースで、包括的な動画情報検索とメタデータスクレイピング機能を提供します。"
keywords: [TheJavDB, JavDB, メタデータ, スクレイピング, JAV, 動画検索]
tags: [plugin, metadata]
sidebar_position: 4
sidebar_label: "TheJavDB"
---

# TheJavDB

TheJavDB は JAV（日本成人動画）メタデータデータベースで、包括的な動画情報検索機能を提供します。TheJavDB プラグインを通じて、AMMDS は動画のタイトル、出演者、発売日、メーカー、カテゴリなどのメタデータを自動取得し、メディアライブラリ情報を迅速に構築できます。

公式サイト：[https://thejavdb.net/](https://thejavdb.net/)

## プラグイン設定

AMMDS 管理画面で、「統合アプリ」→「メタデータ」→「TheJavDB」から設定ページにアクセスします。

![基本設定](/img/plugin/thejavdb-01.png)

### 基本設定

| パラメータ | 説明 | デフォルト値 |
|------|------|--------|
| 有効化状態 | TheJavDB プラグインの有効/無効を制御 | オフ |
| サービスアドレス | TheJavDB サービスのアクセスアドレス | `https://api.thejavdb.net` |
| 動画検索 | 動画番号によるメタデータ検索機能の有効/無効を制御 | オフ |
