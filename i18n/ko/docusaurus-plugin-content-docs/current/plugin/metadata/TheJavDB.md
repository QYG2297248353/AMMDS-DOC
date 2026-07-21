---
sidebar_position: 4
sidebar_label: "TheJavDB"
title: "TheJavDB"
description: "TheJavDB는 JAV(일본 성인 비디오) 메타데이터 데이터베이스로, 포괄적인 영화 정보 검색 및 메타데이터 스크래핑 기능을 제공합니다."
keywords: [TheJavDB, JavDB, 메타데이터, 스크래핑, JAV, 영화 검색]
tags: [plugin, metadata]
---

# TheJavDB

TheJavDB 是一个 JAV（日本成人视频）元数据数据库，提供全面的影片信息检索功能。通过 TheJavDB 插件，AMMDS 可以自动获取影片的标题、演员、发行日期、片商、类别等元数据，帮你快速构建完整的媒体库信息。

官网：[https://thejavdb.net/](https://thejavdb.net/)

## 插件配置

在 AMMDS 管理界面，通过「集成应用」→「元数据」→「TheJavDB」进入配置页面。

![基本配置](/img/plugin/thejavdb-01.png)

### 基本配置

| 参数 | 说明 | 默认值 |
|------|------|--------|
| 启用状态 | 控制是否启用 TheJavDB 插件 | 关闭 |
| 服务地址 | TheJavDB 服务的访问地址 | `https://api.thejavdb.net` |
| 影视检索 | 控制是否开启通过影片编号检索元数据的功能 | 关闭 |
