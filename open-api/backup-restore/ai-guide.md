---
sidebar_position: 4
title: "AI 协助制作"
description: "可直接复制粘贴给 AI 的规范说明，让 AI 依据 AMMDS 备份包格式标准产出合规的压缩包。"
keywords: [AMMDS, AI, 备份包, 提示词, 规范]
tags: [backup]
---

# AI 协助制作

本文提供一段**可直接复制粘贴给 AI** 的规范说明。AI 读完该说明后，结合你提供的源数据，即可产出符合 AMMDS 格式标准的备份包（`data.json` + `manifest.json` + 图片清单）。

{/* truncate */}

## 为什么需要喂规范

AMMDS 备份包有严格的格式约定（`format` 标识、字段命名、枚举 code、图片映射规则等）。AI 在缺乏规范时容易产出似是而非的结果：字段名拼错、枚举存中文、http 外链被打入图片目录、`manifest.json` 嵌套子目录等，导致导入被拒或数据错乱。

因此必须把规范作为 AI 生成时的**唯一依据**。

## 使用方法

1. 复制下方「粘贴给 AI 的内容」整段
2. 在末尾追加你的源数据（结构化 JSON / CSV / 自然语言描述均可）
3. 发送给 AI，获取 `data.json`、`manifest.json` 与图片清单
4. 按产出放置图片文件、计算真实 SHA-256 回填，打包为 zip 导入

## 粘贴给 AI 的内容

````md
你是 AMMDS 备份包生成助手。请严格依据下方《AMMDS 备份包格式规范》，将我提供的「源数据」转换为一个符合标准的 AMMDS 备份包。

只输出三部分：
1. `data.json` 完整内容（JSON 代码块）
2. `manifest.json` 完整内容（JSON 代码块）
3. `images/` 目录应放置的文件清单，以及每个文件需要计算的 SHA-256 摘要说明

# AMMDS 备份包格式规范

## 1. zip 目录布局

```
backup.zip
├── manifest.json    # 清单（必需，位于根目录）
├── data.json        # 元数据数组（必需，位于根目录）
└── images/          # 可选：仅当携带图片时存在
```

要求：
- `manifest.json` 与 `data.json` 必须位于 zip **根目录**，不得嵌套子目录
- 单个备份包只能承载一种类型（movie 或 actor），不可混装
- `images/` 内文件名禁止路径穿越（不得含 `../`、绝对路径、盘符）

## 2. manifest.json 字段

| 字段 | 类型 | 必填 | 值 |
|------|------|------|----|
| `format` | string | 是 | 固定 `"ammds-backup"` |
| `formatVersion` | int | 是 | 固定 `1` |
| `type` | string | 是 | `"movie"` 或 `"actor"`，与 data.json 类型一致 |
| `generatedAt` | string | 是 | ISO-8601 时间，如 `2026-08-24T10:30:00+08:00` |
| `appVersion` | string | 是 | 生成方版本号 |
| `includeImages` | boolean | 是 | 是否携带 images/ 目录 |
| `count` | int | 是 | data.json 数组长度 |
| `imageFiles` | array | 是 | 图片映射；不携带图片时为 `[]` |

`imageFiles` 元素：

| 字段 | 类型 | 说明 |
|------|------|------|
| `ref` | string | 元数据中的原始 `data` 本地路径引用 |
| `path` | string | 图片在包内相对路径，如 `images/poster1.jpg` |
| `sha256` | string | 图片文件 SHA-256 摘要（小写十六进制） |

## 3. data.json 影视条目（type=movie）

JSON 数组，每个元素字段如下（Java 驼峰命名，无法确定的字段宁可不填，不得臆造）：

| 字段 | 类型 | 说明 |
|------|------|------|
| `originalTitle` | string | 原始标题 |
| `titleCn` | string | 中文标题 |
| `plot` | string | 简介 |
| `plotCn` | string | 中文简介 |
| `tagline` | string | 标语 |
| `outline` | string | 大纲 |
| `rating` | number | 评分（10 分制） |
| `premiered` | string | 首映日期 `yyyy-MM-dd` |
| `poster` | string[] | 封面图引用列表 |
| `fanart` | string[] | 背景图引用列表 |
| `thumb` | string[] | 缩略图引用列表 |
| `extrafanart` | string[] | 剧照引用列表 |
| `genre` | string[] | 类型 |
| `tag` | string[] | 标签 |
| `uniqueid` | string[] | 番号列表（导入匹配依据） |
| `studio` | string[] | 制作公司 |
| `issueStudio` | string[] | 发行公司 |
| `runtime` | int | 时长（分钟） |
| `mpaa` | string | 评级（默认 `R18+`） |
| `language` | string | 语言 |
| `country` | string | 国家 |
| `mosaic` | string | `有码` 或 `无码` |
| `sets` | object[] | 系列，元素含 `name`、`overview` |
| `director` | string[] | 导演 |
| `actors` | object[] | 演员，元素含 `name`、`role`（缺省默认"女优"） |
| `sourceLinks` | object[] | 影视源，元素含 `platform`、`link` |
| `extend` | object[] | 扩展，元素含 `extendKey`、`extendValue` |
| `platform` | object[] | 平台，元素含 `platform`、`link` |
| `dataSource` | string | 数据源 code |
| `shared` | boolean | 共享状态 |
| `magnet` | object[] | 磁力，元素含 `name`、`link`、`size`、`hash`、`date` |
| `subtitle` | object[] | 字幕，元素含 `sid`、`name`、`link`、`language`、`extension`、`duration`、`path` |
| `trailer` | string | 预告片地址 |

文件信息字段（可选）：`mediaDir`、`filePath`、`originalFilePath`、`arrangeFilePath`、`fileName`、`audioCodec`、`videoCodec`、`resolutionWidth`、`resolutionHeight`、`fileSizeByte`。

## 4. data.json 演员条目（type=actor）

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 姓名（必填，导入匹配依据） |
| `aliases` | string[] | 别名 |
| `gender` | string | 性别 code |
| `heightCm` | number | 身高 |
| `weightKg` | number | 体重 |
| `birthDate` | string | `yyyy-MM-dd` |
| `nationality` | string | 国籍 |
| `bloodType` | string | 血型 code |
| `bustChestCm` | number | 胸围 |
| `waistCm` | number | 腰围 |
| `hipsCm` | number | 臀围 |
| `cupSize` | string | 罩杯 |
| `debutDate` | string | `yyyy-MM-dd` |
| `agency` | string[] | 经纪公司 |
| `tag` | string[] | 标签 |
| `style` | string[] | 风格 |
| `specialFeatures` | string[] | 特征 |
| `score` | number | 评分 |
| `socialLinks` | object[] | 社交，元素含 `platform`、`link` |
| `retired` | boolean | 是否退役 |
| `deceased` | boolean | 是否亡故 |
| `poster` | string | 大头照引用（单值） |
| `thumb` | string[] | 海报引用列表 |
| `bio` | string | 简介 |
| `extend` | object[] | 扩展，同影视 |
| `platform` | object[] | 平台，同影视 |
| `dataSource` | string | 数据源 code |
| `shared` | boolean | 共享状态 |

## 5. 日期与枚举约定

- 日期统一 `yyyy-MM-dd` 字符串
- 枚举一律存 code，不存中文：
  - `dataSource`: `official` / `metatube` / `theporndb` / `stashbox` / `fanza_dmm` / `r18dev` / `thejavdb` / `plugin` / `user` / `local`
  - `gender`: `male` / `female` / `shemale`
  - `bloodType`: `A` / `B` / `AB` / `O` / `RH+` / `RH-`

## 6. 图片引用规则（关键）

图片字段每个元素按字符串前缀分两种，可在同一列表共存：

| 方式 | 值形式 | 判定 | 是否进包 |
|------|--------|------|---------|
| http 外链 | `http` / `https` 开头 | `startsWith("http")` | 不进包，原样保留 |
| data 本地路径 | `data` 开头 | `startsWith("data")` | 进包，并登记到 imageFiles |

规则：
- `http` / `https` 外链**一律不进包**，在 data.json 中原样保留，导入时也不改写
- 仅 `data` 本地路径且文件真实存在时进包，在 `imageFiles` 登记 `{ref, path, sha256}`
- 收集范围：影视 `poster` / `fanart` / `thumb` / `extrafanart`；演员 `poster`、`thumb`
- 同一文件被多个字段引用只打包一次，`imageFiles` 可登记多条映射（ref 不同、path 相同）
- `includeImages=false` 时 `images/` 不存在、`imageFiles` 为 `[]`，图片字段仍保留原引用

## 7. 导入匹配规则（供你判断是否新增）

- 影视：已有记录任一 `uniqueid` 与导入条目 `uniqueid` 存在交集，视为同一记录
- 演员：已有记录 `name` 与导入条目 `name` 完全一致，视为同一记录
- 冲突策略：`skip`（跳过已存在）或 `overwrite`（覆盖已存在，不存在则新建）

## 8. 输出要求

1. `data.json` 必须是合法 JSON 数组
2. `manifest.json` 的 `count` 必须等于 data.json 数组长度
3. `format` 必须为 `"ammds-backup"`，`formatVersion` 必须为 `1`
4. 所有字段名必须与上方字段表完全一致，不得臆造
5. 枚举必须用 code，不得用中文
6. 日期必须 `yyyy-MM-dd` 格式
7. 若用户未提供图片文件，`includeImages` 设为 `false`、`imageFiles` 设为 `[]`，图片字段填用户提供的 http 外链或留空
8. 若用户提供图片文件，`includeImages` 设为 `true`，`imageFiles` 列出所有进包图片；`sha256` 字段输出占位符 `<需计算:images/xxx.jpg>`，并在第 3 部分说明如何用 Python / PowerShell / shasum 计算真实值
9. 输出后自行核对：format / formatVersion / type / count / 枚举 code / 图片前缀 / 路径穿越

# 源数据

（用户在此追加源数据：结构化 JSON / CSV / 自然语言描述的影片或演员信息）

````

## 源数据追加示例

复制上方内容后，在末尾的「源数据」下追加你的数据。例如：

````
# 源数据

影片 ABC-123，标题 Sample Movie，2026-08-01 发行，演员 A / B，海报 https://example.com/poster.jpg
影片 DEF-456，标题 Another Movie，2026-07-15 发行，演员 C
````

## 产出校验

AI 返回后，人工核对以下要点即可放心打包导入：

| 校验项 | 要求 |
|--------|------|
| `format` | `"ammds-backup"` |
| `formatVersion` | `1` |
| `type` | 与 data.json 类型一致 |
| `count` | 等于 data.json 数组长度 |
| 字段名 | 与规范字段表完全一致 |
| 枚举值 | 均为 code 而非中文 |
| 图片引用 | http 不进包，data 进包并登记 |
| `imageFiles` | `sha256` 已回填真实值（用占位符的需脚本计算后替换） |
| 文件位置 | manifest.json / data.json 在 zip 根目录 |

> 首次使用建议先用 1-2 条样本走通全流程，验证 AI 产出与 AMMDS 导入兼容后再批量生成。
