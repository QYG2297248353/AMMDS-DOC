---
sidebar_position: 99
sidebar_label: "よくある質問"
---

# よくある質問

AMMDS を使っているときによくある質問とその解決方法をまとめました。

<!-- truncate -->

## 🚀 デプロイに関する質問

<details>
  <summary>🔍 ログに「CPU が x86-64-v2 をサポートしていない」と表示される</summary>
  
  お使いのデバイスの CPU が古すぎます。`ol8` タグの付いたイメージを選んでください。
</details>

<details>
  <summary>⌛ 最初のデプロイ後に反応がない</summary>
  
  初回デプロイ時は、システムが必要なリソースファイルをダウンロードして初期化する必要があるため、しばらく時間がかかります。数分待っても反応がない場合は、ページをリフレッシュしてみてください。
</details>

<details>
  <summary>⏬ リソースのダウンロードが遅すぎる</summary>
  
  リソースファイルが大きいため、ダウンロードが遅くなるのは仕方ありません。以下の方法で高速化を試せます：
  - ネットワーク環境を変える。たとえば HTTP_PROXY や HTTPS_PROXY 環境変数を設定してネットワークを高速化する
  - 手動でリソースをダウンロードしたあと、アプリを再起動する
</details>

<details>
  <summary>📁 監視ディレクトリの登録に失敗し、起動後すぐに終了する</summary>
  
  これはたいてい、設定ファイルか環境変数が正しく設定されていないことが原因です。設定ファイルや環境変数をもう一度確認してください。
  
  次のようなログが出ている場合：
  ```
  Error creating bean with name 'directoryWatcherService': Instantiation of supplied bean failed
  User limit of inotify instances reached or too many open files
  User limit of inotify watches reached
  ```
  
  システムの inotify 制限値を増やしてみてください：
  ```bash
  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
  echo fs.inotify.max_user_instances=524288 | sudo tee -a /etc/sysctl.conf
  sudo sysctl -p
  ```
</details>

---

## 💡 使用に関する質問

<details>
  <summary>🖱️ メニューをクリックしても反応がない</summary>
  
  ページが一時的にフリーズしているか、リソースが完全に読み込まれていない可能性があります。まずはページをリフレッシュしてみてください。それでも解決しない場合は、ブラウザのコンソールにエラーが出ていないか確認してください。
</details>

<details>
  <summary>⚪ 開くと白い画面になる</summary>
  
  通常はネットワークリソースが完全に読み込まれていないことが原因です。ページをリフレッシュしてみてください。それでもダメなら、ブラウザのコンソールにエラーがないか確認してください。ネットワーク接続を安定させ、大きな変動を避けることをおすすめします。
</details>

<details>
  <summary>☁️ クラウドストレージの .strm ファイルをマウントするには</summary>
  
  クラウドストレージユーザーは、Alist、alist-strm、NetMount などのツールを使って、クラウドストレージのファイルをローカルの .strm ファイルとしてマウントし、それをアプリケーションにマウントできます。
  
  スキャン設定で、メディア識別タイプを `strm` に設定すれば、ローカルの .strm ファイルをスキャンできます。
</details>

<details>
  <summary>🌍 タイムゾーンがおかしい、システム時刻が合わない</summary>
  
  これはアプリケーションのタイムゾーンとサーバーのタイムゾーンが一致していないことが原因です。タイムゾーンの設定が正しいか確認してください。
  
  - TZ 環境変数を設定している場合は、正しいタイムゾーンになっているか確認する
  - ネットワークプロキシを使っている場合は、プロキシサーバーのタイムゾーンがサーバーと合っているか確認する
  - Docker でデプロイしている場合は、コンテナのタイムゾーン設定が正しいか確認する
  
  自動タイムゾーン検出にはインターネットへのアクセスが必要なので注意してください。
  
  プロキシネットワークを使う場合は、suning.com、taobao.com、meituan.com のような国内サイトのドメインは使わないでください。
</details>

<details>
  <summary>🔌 [Metatube] 404（見つかりません）</summary>
  
  MetaTube プラグインのサーバーアドレスが正しく設定されているか確認してください。カスタムドメインを使っている場合は、ドメインの名前解決が正しいか確認してください。リバースプロキシを使っている場合は、その設定が正しいか確認してください。MetaTube コンテナのログが正常かどうか、エラーが出ていないかも確認してください。
  
  参考：[MetaTube プラグイン設定ドキュメント](https://ammds.lifebus.top/guide/plugins/metatube/)
</details>
