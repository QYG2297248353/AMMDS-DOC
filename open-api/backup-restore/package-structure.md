---
sidebar_position: 2
title: "包结构"
description: "AMMDS 备份包的完整结构定义，包括 zip 目录布局、manifest.json 清单字段、data.json 影视与演员字段、图片映射规则与导入规则。"
keywords: [AMMDS, 备份包, manifest, data.json, 字段定义, 图片映射]
tags: [backup]
---

# 包结构

本文描述 AMMDS 备份包的目录布局、清单（manifest）结构、元数据 JSON 字段约定及导入规则。字段均与实体类 `MovieEntity`、`ActorEntity`、`FileInfoExpand` 一一对应。

{/* truncate */}

## zip 目录布局

备份文件为 **zip 压缩包**（兼容性上也可接受单个 `data.json` 文件），用于影视 / 演员元数据的导出与导入：

```
backup.zip
├── manifest.json    # 清单：格式标识、版本、类型、生成时间、条目数、图片映射
├── data.json        # 元数据数组（JSON），图片字段为原始引用（http 链接或 data 本地路径）
└── images/          # 可选：仅当导出时勾选「同时导出图像文件」才存在
```

- `manifest.json` 与 `data.json` 位于压缩包**根目录**，二者均为必需文件。
- `images/` 目录可选。未勾选「同时导出图像文件」时，导出包中不包含该目录，`manifest.json` 的 `includeImages` 为 `false`、`imageFiles` 为空数组。
- 仅当 `type` 为 `movie` / `actor` 之一时包结构才合法；其它类型或缺少必需文件一律拒绝导入（见 [导入规则](#导入规则)）。

## manifest.json 字段表

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `format` | string | 是 | 格式标识，固定为 `"ammds-backup"` |
| `formatVersion` | int | 是 | 格式版本号，当前为 `1`（见 [版本约定](#版本约定)） |
| `type` | string | 是 | 备份数据类型：`"movie"`（影视）或 `"actor"`（演员） |
| `generatedAt` | string | 是 | 生成时间，ISO-8601 格式，如 `2026-08-12T10:30:00+08:00` |
| `appVersion` | string | 是 | 生成该备份的 AMMDS 应用版本号 |
| `includeImages` | boolean | 是 | 是否包含图片文件（`images/` 目录是否存在） |
| `count` | int | 是 | `data.json` 中的元数据条目数 |
| `imageFiles` | array | 是 | 图片映射列表，元素为对象，结构见下表；`includeImages=false` 时为空数组 |

`imageFiles` 数组元素字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `ref` | string | 原始图片引用，即元数据中的 `data` 本地路径（如 `data/images/media/2026/08/xxx.jpg`） |
| `path` | string | 图片在压缩包内的相对路径（如 `images/xxx.jpg`） |
| `sha256` | string | 图片文件的 SHA-256 摘要，用于导入时完整性校验 |

## data.json 影视条目（movie）

`data.json` 为 JSON 数组，每个元素对应一条影视记录。字段与 `MovieEntity`（含父类 `FileInfoExpand`）一致，命名采用 Java 字段名的驼峰形式。

### 文件信息字段（继承自 FileInfoExpand）

| 字段 | 类型 | 说明 |
|------|------|------|
| `mediaDir` | string | 媒体目录 |
| `filePath` | string[] | 文件路径列表 |
| `originalFilePath` | string | 原始文件地址 |
| `arrangeFilePath` | string | 整理（重命名）后的文件地址 |
| `fileName` | string | 文件名（可能为空） |
| `audioCodec` | string | 音频编码 |
| `videoCodec` | string | 视频编码 |
| `resolutionWidth` | int | 帧宽度（分辨率宽） |
| `resolutionHeight` | int | 帧高度（分辨率高） |
| `fileSizeByte` | long | 文件大小（单位：字节） |

### 影视元数据字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `originalTitle` | string | 标题（原始） |
| `titleCn` | string | 标题（中文） |
| `plot` | string | 简介 |
| `plotCn` | string | 简介（中文） |
| `tagline` | string | 标语（如"首映日期：2026-08-01"） |
| `outline` | string | 大纲 |
| `rating` | number | 评分，10 分制 |
| `premiered` | string | 首映日期，`yyyy-MM-dd` 字符串（见 [日期与枚举约定](#日期与枚举约定)） |
| `poster` | string[] | 封面图（列表显示），元素为图片原始引用 |
| `fanart` | string[] | 背景图（详情背景），元素为图片原始引用 |
| `thumb` | string[] | 缩略图（播放显示），元素为图片原始引用 |
| `extrafanart` | string[] | 剧照（扩展显示），元素为图片原始引用 |
| `genre` | string[] | 类型列表 |
| `tag` | string[] | 标签列表 |
| `uniqueid` | string[] | 识别码（番号）列表，导入匹配依据（见 [导入规则](#导入规则)） |
| `studio` | string[] | 制作公司列表 |
| `issueStudio` | string[] | 发行公司列表 |
| `runtime` | int | 时长（单位：分钟） |
| `mpaa` | string | MPAA 评级（默认 `R18+`） |
| `language` | string | 语言 |
| `country` | string | 国家 |
| `mosaic` | string | 马赛克标记（`有码` / `无码`） |
| `sets` | object[] | 系列列表，结构见 [sets](#sets系列) |
| `director` | string[] | 导演列表 |
| `actors` | object[] | 演员列表，结构见 [actors](#actors演员) |
| `sourceLinks` | object[] | 影视源（平台 / 链接映射），结构见 [sourceLinks](#sourcelinks影视源) |
| `extend` | object[] | 扩展信息（用户自定义 key-value），结构见 [extend](#extend扩展信息) |
| `platform` | object[] | 平台信息，结构见 [platform](#platform平台信息) |
| `dataSource` | string | 数据源枚举 code（见 [日期与枚举约定](#日期与枚举约定)） |
| `shared` | boolean | 共享状态 |
| `pHash` | string[] | PHash 指纹列表 |
| `osHash` | string[] | OsHash 指纹列表 |
| `magnet` | object[] | 磁力信息列表，结构见 [magnet](#magnet磁力信息) |
| `subtitle` | object[] | 外挂字幕列表，结构见 [subtitle](#subtitle外挂字幕) |
| `trailer` | string | 预告片地址 |

### 嵌套对象结构

#### `sets`（系列）

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 系列名称 |
| `overview` | string | 系列描述（可能为 null） |

#### `actors`（演员）

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 演员名称 |
| `role` | string | 角色（男优 / 女优，缺省时默认"女优"） |

#### `sourceLinks`（影视源）

| 字段 | 类型 | 说明 |
|------|------|------|
| `platform` | string | 平台名称 |
| `link` | string | 平台链接 |

#### `extend`（扩展信息）

| 字段 | 类型 | 说明 |
|------|------|------|
| `extendKey` | string | 扩展键（如 `mosaic`） |
| `extendValue` | string | 扩展值 |

#### `platform`（平台信息）

| 字段 | 类型 | 说明 |
|------|------|------|
| `platform` | string | 平台名称（如数据源 Provider） |
| `link` | string | 平台链接（主页地址） |

#### `magnet`（磁力信息）

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 磁力名称 |
| `link` | string | 磁力链接（magnet: 协议） |
| `size` | long | 磁力大小（单位：字节，默认 0） |
| `hash` | string | 磁力 Hash |
| `date` | string | 分享日期，`yyyy-MM-dd` 字符串 |

#### `subtitle`（外挂字幕）

| 字段 | 类型 | 说明 |
|------|------|------|
| `sid` | string | 字幕文件 ID |
| `name` | string | 字幕文件名称 |
| `link` | string | 字幕文件链接 |
| `language` | string | 字幕语言 |
| `extension` | string | 字幕文件扩展名 |
| `duration` | long | 字幕时长（单位：毫秒） |
| `path` | string | 字幕本地文件地址（下载后落盘路径，可能为空） |

## data.json 演员条目（actor）

每个元素对应一条演员记录，字段与 `ActorEntity` 一致。

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 姓名（艺名），必填，导入匹配依据（见 [导入规则](#导入规则)） |
| `aliases` | string[] | 曾用名 / 别名列表 |
| `gender` | string | 性别枚举 code：`male` / `female` / `shemale` |
| `heightCm` | number | 身高（单位：厘米） |
| `weightKg` | number | 体重（单位：公斤） |
| `birthDate` | string | 出生日期，`yyyy-MM-dd` 字符串 |
| `age` | int | 年龄（根据出生日期自动计算，可能为 null） |
| `nationality` | string | 国籍 |
| `bloodType` | string | 血型枚举 code：`A` / `B` / `AB` / `O` / `RH+` / `RH-` |
| `bustChestCm` | number | 胸围（单位：厘米） |
| `waistCm` | number | 腰围（单位：厘米） |
| `hipsCm` | number | 臀围（单位：厘米） |
| `cupSize` | string | 罩杯大小（A-J，单个字符） |
| `penisCm` | number | 阴茎长度（单位：厘米） |
| `debutDate` | string | 出道日期，`yyyy-MM-dd` 字符串 |
| `agency` | string[] | 经纪公司列表 |
| `tag` | string[] | 标签列表 |
| `style` | string[] | 风格列表 |
| `specialFeatures` | string[] | 特征列表 |
| `score` | number | 评分，10 分制 |
| `socialLinks` | object[] | 社交平台列表，结构见 [socialLinks](#sociallinks社交平台) |
| `retired` | boolean | 是否退役 |
| `deceased` | boolean | 是否亡故 |
| `poster` | string | 大头照，图片原始引用（单值字符串） |
| `thumb` | string[] | 海报列表，元素为图片原始引用 |
| `bio` | string | 简介（人物简介） |
| `extend` | object[] | 扩展信息，结构同 [extend](#extend扩展信息)（extendKey / extendValue） |
| `platform` | object[] | 平台信息，结构同 [platform](#platform平台信息)（platform / link） |
| `dataSource` | string | 数据源枚举 code |
| `shared` | boolean | 共享状态 |

#### `socialLinks`（社交平台）

| 字段 | 类型 | 说明 |
|------|------|------|
| `platform` | string | 平台名称 |
| `link` | string | 平台链接 |

> 注：影视与演员条目均含公共基类字段 `id`、`createdTime`、`updatedTime`、`version`（`AbstractBaseEntity`）。导出时 `id` 用于去重参考，导入时以匹配规则为准重新生成 / 复用，不直接沿用包内 `id`。

## 日期与枚举约定

- **日期**：统一使用 `yyyy-MM-dd` 字符串表示（如 `2026-08-01`），对应实体中的 `Date` 字段（`premiered`、`birthDate`、`debutDate`、`magnet.date` 等）。
- **枚举**：一律存枚举的 `code` 值，不存中文名或枚举名：
  - `dataSource`（数据源）：`official` / `metatube` / `theporndb` / `stashbox` / `fanza_dmm` / `r18dev` / `thejavdb` / `plugin` / `user` / `local`
  - `gender`（性别）：`male` / `female` / `shemale`
  - `bloodType`（血型）：`A` / `B` / `AB` / `O` / `RH+` / `RH-`
- 导入时对无法识别的枚举 code 应做容错处理（置空或忽略），不因单个字段异常导致整条记录失败。

## 图片映射规则

### 图片两种存储方式

备份包中图片字段保持「原始引用」形式，按字符串前缀分为两种：

| 方式 | 值形式 | 判定 |
|------|--------|------|
| http 外链 | `http` / `https` 开头的完整 URL | `value.startsWith("http")` |
| data 本地路径 | `data` 开头的本地相对路径 | `value.startsWith("data")` |

两种方式可在同一字段列表中共存。`data` 路径基于应用数据挂载目录 `/ammds/data`，例如 `data/images/media/2026/08/xxx.jpg` 实际对应 `/ammds/data/images/media/2026/08/xxx.jpg`。

### 导出（打包）

- 仅收录**值为 `data` 本地路径且文件真实存在**的图片进包；`http` / `https` 外链引用一律**不进包**。
- 收集范围：影视的 `poster` / `fanart` / `thumb` / `extrafanart` 四个列表字段；演员的 `poster`（单值）与 `thumb`（列表）字段。
- 每个进包文件在 `manifest.json.imageFiles` 中登记一条 `{ref, path, sha256}`（三个字段含义如下）：
  - `ref` 为元数据中的原始 `data` 路径；
  - `path` 为包内相对路径（`images/` 目录下，建议保留原文件名或按索引重命名）；
  - `sha256` 为文件内容摘要。
- 同一文件被多个字段引用时，只打包一次，`imageFiles` 中可登记多条映射（ref 不同、path 相同）。

### 导入（落盘）

- 若备份包含图片（`includeImages=true`），将包内文件写入 `data/images/media`（影视）或 `data/images/actor`（演员）目录。
- 写入时按文件内容 **SHA-512** 去重：相同内容的文件只落盘一份，以摘要命名。
- 落盘后，把元数据中对应的图片字段引用（原 `ref`）**回写为新的 `data` 路径**，保证新路径下文件真实存在。
- 若导入时**不导入图片**（未勾选 / 包内无图片），则图片字段**保留原引用**（`http` 外链或原 `data` 路径原样保存）。

> **http 引用始终原样保留**：无论是否勾选导入图片，`http` / `https` 外链在导出、导入全程不被改写。

## 导入规则

### 数据匹配

| 类型 | 匹配依据 | 说明 |
|------|---------|------|
| 影视（movie） | `uniqueid` 交集 | 已有记录中任一 `uniqueid` 与导入条目 `uniqueid` 存在交集，即视为同一条记录 |
| 演员（actor） | `name` | 已有记录 `name` 与导入条目 `name` 完全一致，即视为同一条记录 |

### 冲突策略

| 策略 | 行为 |
|------|------|
| `skip` | 跳过已存在的记录（不写入、不更新），仅导入新记录 |
| `overwrite` | 对已存在记录执行覆盖更新，不存在则新建 |

### 非法文件校验

出现以下任一情形，整个导入**直接拒绝且不产生任何数据变更**（事务性回滚）：

- `format` 不是 `ammds-backup`（格式不符）；
- `formatVersion` 不被当前版本支持（高于当前支持的版本）；
- 缺少必要文件（缺少 `manifest.json` 或 `data.json`，或单文件模式缺少必需字段）；
- 包内存在**路径穿越**条目（如 `../`、绝对路径等试图逃逸解压目录的文件项）。

校验通过后，按上述匹配规则与冲突策略逐条执行写入。

## 版本约定

- 当前格式版本：`formatVersion = 1`。
- 后续升级必须**兼容旧版本**：新增字段以可选方式引入（缺省时有默认值），不允许破坏既有字段语义；导入端需支持读取所有历史版本的 `data.json`，导出端默认产出当前版本。
- `manifest.json.formatVersion` 用于导入端判断是否支持该备份；遇到高于当前支持范围的版本时拒绝导入并给出明确提示。
