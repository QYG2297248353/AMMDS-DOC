---
slug: nfo-files-explained
title: 一个 NFO 文件到底是什么
authors: [studio]
tags: [ammds, feature, guide]
date: 2023-11-12
---

如果你玩过 Kodi 或 Jellyfin，一定见过影片目录里那些和视频同名的 `.nfo` 文件。它看起来平平无奇，却是整个自托管媒体库生态里最关键的一块"通用语言"。

{/* truncate */}

## 名字与本质

NFO 是 "Info"（信息）的缩写。它不是一种专有格式，本质就是一个 **XML 文本文件**——里面用一对对的标签，写着这部片子的标题、简介、演员、发行年份等信息。

文件本身不"做"任何事，它只是存放信息。但正因为它是纯文本、有统一结构，不同软件都能读懂它。Kodi 的官方 Wiki 把它定义为"把元数据导入资料库的方式之一"：扫描时，如果媒体目录里有命名正确的 NFO 文件，Kodi 就优先读它，而不是去联网抓取。

## 三种 NFO

很多人以为 NFO 只有一种，其实按内容可以分成三类：

| 类型 | 里面装的是什么 | 用途 |
| :--- | :--- | :--- |
| 元数据 NFO | 完整的影片信息标签 | 最常见，直接导入元数据 |
| 解析 NFO | 只有一个指向资料库的网址 | 告诉刮削器"我要的其实是这部，别认错" |
| 混合 NFO | 网址 + 部分覆盖字段 | 先按网址抓取，再覆盖标题、时长等少数字段 |

解析 NFO 特别有用。比如一部片子在同一站点里有几十个同名版本，自动匹配总认错——这时放一个只含正确网址的 NFO，就能强制指定。这也是我们做[手动匹配](/blog/nfo-compatibility)功能时要处理的同类问题。

## 几个容易踩的细节

- **编码**：NFO 文件统一用 UTF-8 保存。Windows 记事本默认可能存成 ANSI，非英文字符就会乱码。
- **命名**：通常要和视频文件同名（如 `Jumanji.mp4` 对应 `Jumanji.nfo`）；剧集用 `tvshow.nfo`，专辑用 `album.nfo`。
- **改了要刷新**：资料库扫描一次之后，NFO 就退居备份角色。你改了文件内容，需要手动刷新那条记录才会重新读入。
- **通用性**：不止 Kodi，Plex、Emby、Jellyfin、TinyMediaManager 等都能识别 Kodi 格式的 NFO。这正是它的价值——一份文件，多处通用。

## 为什么 AMMDS 重视它

我们做 NFO 兼容，就是看中了这种"可携带性"：用户用 AMMDS 整理好的资料，哪天想换播放器，或者想重装系统，只要 NFO 文件还在，数据就不会丢。这和我们坚持[自托管](/blog/why-self-hosted)、[标准备份包](/docs/backend/system/backup-restore)是同一个思路——**数据要能带走**。

> 说明：本文关于 NFO 的定义与分类依据 Kodi 官方 Wiki 整理，具体标签与命名规则以 Kodi 文档为准。

---

## 接着看

- [NFO 兼容 Kodi、Jellyfin 与 Emby 的那些坑](/blog/nfo-compatibility)
- [三款主流媒体服务器的故事：Plex、Emby 与 Jellyfin](/blog/media-server-landscape)
- [文档站：媒体库整理](/docs/backend/media/organize)
