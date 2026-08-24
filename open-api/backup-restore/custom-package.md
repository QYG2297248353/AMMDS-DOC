---
sidebar_position: 3
title: "自制备份包"
description: "脱离平台导出，手动构造合规 AMMDS 备份包的完整流程，包括 data.json、manifest.json、images 目录的编写与打包校验。"
keywords: [AMMDS, 自制备份包, 手动构造, zip, manifest, 校验]
tags: [backup]
---

# 自制备份包

本文介绍如何脱离 AMMDS 平台导出功能，手动构造一个符合格式标准的备份包，适用于从第三方系统迁移数据、批量入库或脚本化生成等场景。

{/* truncate */}

## 适用场景

- 从其他媒体库（如 Emby / Jellyfin / Stash 等）迁移数据到 AMMDS
- 持有结构化数据（CSV / JSON / 数据库导出），需批量入库
- 需要脚本化、自动化生成备份包进行定期同步
- 仅想导入元数据，不携带本地图片文件

> 备份包的完整字段定义见 [包结构](./package-structure.md)。本文聚焦「如何制作」。

## 制作流程总览

制作一个合规备份包需完成以下步骤：

```
1. 准备 data.json        ── 编写元数据数组（影视或演员）
2. 准备 images/（可选）  ── 收集本地图片文件
3. 生成 manifest.json    ── 登记格式信息与图片映射
4. 打包为 zip            ── 根目录放 manifest.json + data.json + images/
5. 校验                  ─── 检查格式、版本、路径穿越等
```

## 第一步：编写 data.json

`data.json` 是一个 JSON 数组，每个元素对应一条记录。**影视与演员不能混装**，需分两个包制作。

### 影视示例

```json
[
  {
    "originalTitle": "Sample Movie",
    "titleCn": "示例影片",
    "plot": "这是一部示例影片的剧情简介。",
    "plotCn": "这是一部示例影片的剧情简介（中文）。",
    "rating": 8.5,
    "premiered": "2026-08-01",
    "runtime": 120,
    "mpaa": "R18+",
    "language": "ja",
    "country": "日本",
    "mosaic": "有码",
    "uniqueid": ["ABC-123"],
    "genre": ["动作", "剧情"],
    "tag": ["热门"],
    "studio": ["Sample Studio"],
    "director": ["导演A"],
    "actors": [
      { "name": "演员A", "role": "女优" }
    ],
    "poster": ["https://example.com/poster.jpg"],
    "fanart": ["https://example.com/fanart.jpg"],
    "thumb": [],
    "extrafanart": [],
    "sets": [{ "name": "示例系列", "overview": null }],
    "sourceLinks": [{ "platform": "示例平台", "link": "https://example.com" }],
    "extend": [{ "extendKey": "mosaic", "extendValue": "有码" }],
    "platform": [{ "platform": "metatube", "link": "https://metatube.example.com" }],
    "dataSource": "user",
    "shared": false
  }
]
```

### 演员示例

```json
[
  {
    "name": "演员A",
    "aliases": ["别名A"],
    "gender": "female",
    "heightCm": 165,
    "weightKg": 50,
    "birthDate": "2000-01-01",
    "nationality": "日本",
    "bloodType": "O",
    "bustChestCm": 88,
    "waistCm": 58,
    "hipsCm": 86,
    "cupSize": "D",
    "debutDate": "2020-01-01",
    "agency": ["示例经纪公司"],
    "tag": ["新人"],
    "score": 9.0,
    "retired": false,
    "deceased": false,
    "poster": "https://example.com/actor.jpg",
    "thumb": ["https://example.com/actor-thumb.jpg"],
    "bio": "演员简介。",
    "dataSource": "user",
    "shared": false
  }
]
```

### 编写要点

| 要点 | 说明 |
|------|------|
| 类型选择 | 整个 `data.json` 只能是影视或演员**之一**，与 `manifest.json.type` 保持一致 |
| 日期格式 | 统一 `yyyy-MM-dd` 字符串，如 `2026-08-01` |
| 枚举值 | 存 `code` 而非中文名（如 `dataSource` 用 `user`，`gender` 用 `female`） |
| 必填字段 | 影视无强制必填；演员 `name` 必填（导入匹配依据） |
| 匹配依据 | 影视按 `uniqueid` 交集匹配，演员按 `name` 完全一致匹配 |
| 图片字段 | 可填 `http` 外链或 `data` 本地路径，二者可共存 |

> 完整字段清单见 [包结构 - data.json 字段](./package-structure.md#datajson-影视条目movie)。

## 第二步：处理图片（可选）

### 选择图片引用方式

| 方式 | 值形式 | 是否需要进包 | 适用场景 |
|------|--------|-------------|---------|
| http 外链 | `https://example.com/img.jpg` | 否 | 图片已托管在可访问的站点 |
| data 本地路径 | `data/images/media/2026/08/xxx.jpg` | 是（需进包） | 需携带图片文件，迁移后落盘 |

### 不携带图片（推荐用于快速入库）

将 `includeImages` 设为 `false`，`imageFiles` 设为空数组，`images/` 目录不创建。图片字段可全部使用 `http` 外链：

```json
"poster": ["https://example.com/poster.jpg"]
```

导入后这些 `http` 引用原样保留，前端通过代理展示。

### 携带图片（需落盘）

1. 在包内创建 `images/` 目录，放入图片文件（建议保留原文件名或按索引重命名）：

   ```
   images/
   ├── poster1.jpg
   ├── fanart1.jpg
   └── actor1.jpg
   ```

2. 在 `data.json` 的图片字段中填写 `data` 本地路径作为 `ref`。`ref` 需与导入后期望的路径形式一致，但**实际落盘路径由系统按 SHA-512 命名后回写**，因此 `ref` 主要用于与 `imageFiles` 映射对应：

   ```json
   "poster": ["data/images/media/2026/08/poster1.jpg"]
   ```

3. 为每个图片文件计算 SHA-256 摘要，登记到 `manifest.json.imageFiles`。

#### 计算 SHA-256

**Python：**

```python
import hashlib
with open("images/poster1.jpg", "rb") as f:
    sha256 = hashlib.sha256(f.read()).hexdigest()
print(sha256)
```

**命令行（PowerShell）：**

```powershell
(Get-FileHash images\poster1.jpg -Algorithm SHA256).Hash.ToLower()
```

**命令行（Linux/macOS）：**

```bash
shasum -a 256 images/poster1.jpg
```

## 第三步：生成 manifest.json

根据 `data.json` 条目数与图片情况填写清单：

### 不含图片

```json
{
  "format": "ammds-backup",
  "formatVersion": 1,
  "type": "movie",
  "generatedAt": "2026-08-24T10:30:00+08:00",
  "appVersion": "1.0.0",
  "includeImages": false,
  "count": 1,
  "imageFiles": []
}
```

### 含图片

```json
{
  "format": "ammds-backup",
  "formatVersion": 1,
  "type": "movie",
  "generatedAt": "2026-08-24T10:30:00+08:00",
  "appVersion": "1.0.0",
  "includeImages": true,
  "count": 1,
  "imageFiles": [
    {
      "ref": "data/images/media/2026/08/poster1.jpg",
      "path": "images/poster1.jpg",
      "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    },
    {
      "ref": "data/images/media/2026/08/fanart1.jpg",
      "path": "images/fanart1.jpg",
      "sha256": "另一文件的sha256摘要"
    }
  ]
}
```

### 字段说明

| 字段 | 值 | 说明 |
|------|-----|------|
| `format` | `"ammds-backup"` | 固定值，否则导入被拒 |
| `formatVersion` | `1` | 当前版本，否则导入被拒 |
| `type` | `"movie"` / `"actor"` | 与 `data.json` 类型一致 |
| `generatedAt` | ISO-8601 时间 | 生成时间 |
| `appVersion` | 版本号字符串 | 生成方版本，便于追溯 |
| `includeImages` | boolean | 是否含 `images/` 目录 |
| `count` | int | `data.json` 条目数 |
| `imageFiles` | array | 图片映射；不含图片时为 `[]` |

## 第四步：打包为 zip

将 `manifest.json`、`data.json`（及 `images/`）放在压缩包**根目录**打包：

```
backup.zip
├── manifest.json
├── data.json
└── images/          # 仅 includeImages=true 时
    ├── poster1.jpg
    └── fanart1.jpg
```

**命令行打包：**

```bash
# 进入包含三个文件/目录的文件夹
zip -r backup.zip manifest.json data.json images/
```

```powershell
# PowerShell
Compress-Archive -Path manifest.json, data.json, images -DestinationPath backup.zip
```

> **关键**：`manifest.json` 与 `data.json` 必须在 zip 根目录，不能嵌套在子文件夹中，否则导入会因「缺少必要文件」被拒。

## 第五步：校验

打包后逐项核对下表，避免导入被拒：

| 检查项 | 要求 | 不符合的后果 |
|--------|------|-------------|
| `format` | 等于 `"ammds-backup"` | 拒绝导入 |
| `formatVersion` | 等于 `1`（不高于当前支持版本） | 拒绝导入 |
| `type` | `"movie"` 或 `"actor"` | 拒绝导入 |
| 必需文件 | `manifest.json` + `data.json` 在根目录 | 拒绝导入 |
| `count` | 等于 `data.json` 数组长度 | 建议核对一致 |
| 路径穿越 | `images/` 内文件名不含 `../`、绝对路径 | 拒绝导入 |
| 图片引用一致性 | `imageFiles` 中每个 `ref` 在 `data.json` 中有对应引用 | 落盘后回写失败 |
| `sha256` | 与包内实际文件摘要一致 | 完整性校验异常 |

### 路径穿越规避

`images/` 内文件名必须为**纯文件名或相对路径**，禁止以下形式：

- `../escape.jpg`（逃逸解压目录）
- `/etc/passwd`（绝对路径）
- `C:\windows\system32\evil.jpg`（Windows 绝对路径）

建议统一用纯文件名（如 `poster1.jpg`）或仅一级子目录（如 `media/poster1.jpg`）。

## 完整示例脚本

以下 Python 脚本演示从结构化数据生成一个**不含图片**的影视备份包：

```python
import json
import zipfile
from datetime import datetime, timezone, timedelta

# 1. 准备元数据
movies = [
    {
        "originalTitle": "Sample Movie",
        "titleCn": "示例影片",
        "uniqueid": ["ABC-123"],
        "rating": 8.5,
        "premiered": "2026-08-01",
        "runtime": 120,
        "mosaic": "有码",
        "genre": ["动作"],
        "poster": ["https://example.com/poster.jpg"],
        "dataSource": "user",
        "shared": False,
    }
]

data_json = json.dumps(movies, ensure_ascii=False, indent=2)

# 2. 生成 manifest
tz = timezone(timedelta(hours=8))
manifest = {
    "format": "ammds-backup",
    "formatVersion": 1,
    "type": "movie",
    "generatedAt": datetime.now(tz).isoformat(),
    "appVersion": "1.0.0",
    "includeImages": False,
    "count": len(movies),
    "imageFiles": [],
}
manifest_json = json.dumps(manifest, ensure_ascii=False, indent=2)

# 3. 打包 zip（文件放在根目录）
with zipfile.ZipFile("backup.zip", "w", zipfile.ZIP_DEFLATED) as z:
    z.writestr("manifest.json", manifest_json)
    z.writestr("data.json", data_json)

print("backup.zip 生成完成")
```

## 常见问题

**Q: 自制包能否只导入元数据，图片后续再刮削？**

A: 可以。将图片字段留空或填 `http` 外链，`includeImages` 设为 `false`。导入后可通过 AMMDS 刮削功能补充本地图片。

**Q: 同一图片被多个字段引用，`imageFiles` 如何登记？**

A: 同一文件只打包一份，`imageFiles` 中可登记多条映射（`ref` 不同、`path` 相同）。

**Q: `data` 路径里的日期子目录重要吗？**

A: 不重要。`ref` 主要用于与 `imageFiles` 映射对应，导入后系统按 SHA-512 命名落盘并回写新路径。`ref` 的日期子目录可随意填写，但建议保持 `data/images/media/` 或 `data/images/actor/` 前缀以符合约定。

**Q: 自制包导入后图片显示不出来？**

A: 检查：① `includeImages=true` 时 `images/` 是否存在且文件齐全；② `imageFiles` 中 `sha256` 是否与实际文件一致；③ `ref` 是否与 `data.json` 中的引用对应；④ 避免使用 `http` 引用进包（外链不进包）。
