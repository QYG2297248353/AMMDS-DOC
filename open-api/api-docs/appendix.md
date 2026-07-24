---
sidebar_position: 5
title: "附录"
description: "AMMDS 开放 API 的补充参考信息，包括语言代码表和数据源枚举值。"
keywords: [AMMDS, 附录, 语言代码, 数据源]
tags: [api]
---

# 附录

本文提供 AMMDS 开放 API 的补充参考信息，包括语言代码表和数据源枚举值。

{/* truncate */}

## A. 语言代码表

| 代码 | 语言名称 |
|------|----------|
| `auto` | 自动检测 |
| `zh` | 简体中文 |
| `cht` | 繁体中文 |
| `en` | 英语 |
| `ja` | 日语 |
| `ko` | 韩语 |
| `ru` | 俄语 |
| `cs` | 捷克语 |

> **注意**：`auto` 仅在翻译接口的 `source` 参数留空时自动生效，不可作为显式参数值使用。

## B. 数据源枚举值

| 标识 | 数据源名称 |
|------|-----------|
| `metatube` | MetaTube |
| `theporndb` | ThePornDB |
| `stashbox` | StashBox |
| `fanzadmm` | FanzaDMM |
