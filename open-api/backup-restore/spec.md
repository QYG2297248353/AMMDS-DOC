---
title: 备份包规范
sidebar_label: 备份包规范
description: 备份包的完整格式规范：zip 目录布局、manifest.json 与 data.json 的字段定义、五类数据的字段表、图片映射、校验与导入匹配规则。供手写脚本或让 AI 生成备份包时对照。
sidebar_position: 2
---

# 备份包规范

这一页是备份包的**完整格式规范**，给要自己写脚本、或让 AI 把爬取的数据做成备份包的人对照。只想看懂一个包里有什么，先看[备份包结构](./overview.md)；想让 AI 帮你把数据做成包，直接看[AI 制作规范](./ai-guide.md)。

规范只允许一种写法，按它生成的包才能被 AMMDS「解析预览」判定为**校验通过**并成功导入。文末给出源仓库里的权威实现与模板仓库。

## 一、先看这十条铁律

| # | 规则 |
| --- | --- |
| 1 | zip **根目录**必须有 `manifest.json` 和 `data.json`，缺一个整包被拒收 |
| 2 | `format` 固定 `ammds-backup`，`formatVersion` 固定 `1` |
| 3 | `type` 填 `movie` / `actor` / `comic` / `novel` / `tv` 之一，且必须和内容结构一致 |
| 4 | `count` 必须**严格等于** `data.json` 数组的元素个数 |
| 5 | `images/` 下每个文件都要在 `manifest.imageFiles` 里登记 `{ref, path, sha256}` |
| 6 | `imageFiles[].path` 必须以 `images/` 开头，且与 zip 里的条目名**逐字符一致** |
| 7 | `data.json` 里图片字段的值必须和对应的 `imageFiles[].ref` **完全一致**（区分大小写） |
| 8 | `http(s)://` 外链图片**只**写在 `data.json`，**不要**登记进 `imageFiles` |
| 9 | 条目名不能为空、不能以 `/` 开头，不能含 `\`、`:` 或 `..` 路径段 |
| 10 | 日期写 `yyyy-MM-dd`；枚举只写 code；**整数字段必须写整数**（`120` 可以，`120.0` 会让该条导入失败） |

## 二、zip 目录布局

```
ammds-backup-movie-20260911153000.zip
├── manifest.json              # 必需，根目录
├── data.json                  # 必需，根目录，JSON 数组
└── images/                    # 可选：仅当有图片要打包时才有
    └── <条目key>/             # 每个条目一个目录，key 由标识安全化得到
        ├── poster_0.jpg       # 平铺图片字段：<字段名>_<序号>.<扩展名>
        ├── fanart_0.jpg
        └── pages/             # 仅漫画：章节页图片
            ├── page00001.jpg
            └── page00002.jpg
```

- 没有任何图片时**不要**创建 `images/` 目录，`includeImages` 写 `false`、`imageFiles` 写 `[]`。
- zip 条目名统一用 UTF-8；`imageFiles[].path` 建议只用 ASCII，避开跨平台编码差异。
- 一个包只装一种 `type` 的数据，影视和演员不能混装。

## 三、manifest.json 字段

| 字段 | 类型 | 必填 | 取值 / 说明 |
| --- | --- | --- | --- |
| `format` | string | 是 | 固定 `ammds-backup` |
| `formatVersion` | int | 是 | 固定 `1`，高于支持范围会被拒收 |
| `type` | string | 是 | `movie` / `actor` / `comic` / `novel` / `tv` |
| `generatedAt` | string | 建议 | ISO-8601 带时区，如 `2026-09-11T15:30:00+08:00`；缺失只是提示 |
| `appVersion` | string | 建议 | 生成包的 AMMDS 版本；缺失只是提示 |
| `includeImages` | boolean | 是 | 是否打包图片；必须和包里有没有 `images/` 文件一致 |
| `count` | int | 是 | `data.json` 数组长度，必须相等 |
| `imageFiles` | array | 是 | 图片映射数组，无图片写 `[]` |

`imageFiles[]` 每一项：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `ref` | string | 图片引用键，必须和 `data.json` 里该图片字段的值**逐字符相同**；本地图片约定以 `data` 开头 |
| `path` | string | zip 内相对路径，必须以 `images/` 开头，且 zip 中确实存在该条目 |
| `sha256` | string | 文件字节的 SHA-256（64 位小写十六进制）；当前导入端**只写不校验**，但必须填正确值 |

示例：

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

## 四、data.json 通用约定

1. 顶层是 **JSON 数组** `[ {...}, {...} ]`，一条元素对应一条资料。
2. 字段名用**驼峰**，例如 `originalTitle`、`imagePath`、`fullChapter`。
3. 取不到的字段**直接省略**（或写 `null`），不要写 `"未知"`、`"-"`、`"N/A"` 之类占位符。
4. 导入端**忽略未知字段**；但字段名拼错等于数据丢失，务必按表书写。
5. 数值类型严格：整数字段写整数（`runtime`、`pageCount`、`season`、`episode`、`sequence`、`sort`、`fileSizeByte`、`resolutionWidth` 等）；评分、身高、体重等写数字（`8.5`）。
6. 日期统一 `yyyy-MM-dd` 字符串；格式非法会被置空。
7. 枚举只写 code（见第七节），写中文名会被容错回退或置空。
8. 数组还是单值，按字段区别写，最容易错：

| 字段 | 类型 | 形态 |
| --- | --- | --- |
| `poster` | movie | 数组 `["data/...jpg"]` |
| `poster` | actor | 单值 `"data/...jpg"` |
| `thumb` | actor | 数组 |
| `cover` / `backCover` | comic / novel | 单值 |
| `posterHd` / `fanartHd` / `thumbHd` | movie / tv | 单值 |
| `poster` / `fanart` / `thumb` / `logo` / `banner` | tv 剧级 | 数组 |
| `still` | tv 集级 | 单值 |

> 导入端允许把单个值当数组处理，但请一律按上表写。

9. 不要写 `id`、`createdTime`、`updatedTime`、`version`：导入时一律忽略，主键由 AMMDS 重新生成。

## 五、五类数据的字段表

类型标记：`S` 字符串、`S[]` 字符串数组、`I` 整数、`N` 数字、`B` 布尔、`O[]` 对象数组。必填列 `★` 表示不写会导致该条无法匹配或导入失败；`·` 表示可选。

### 5.1 movie（影视）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `uniqueid` | S[] | ★ | 识别码 / 番号，**导入匹配主依据**，至少写一个（大小写不敏感） |
| `originalTitle` | S | ★ | 原始标题，`merge` 策略下识别码没命中时按标题匹配 |
| `titleCn` | S | · | 中文标题 |
| `plot` / `plotCn` | S | · | 简介 / 中文简介 |
| `tagline` / `outline` | S | · | 标语 / 大纲 |
| `rating` | N | · | 评分（10 分制） |
| `premiered` | S | · | 首映日期 `yyyy-MM-dd` |
| `runtime` | I | · | 时长（分钟） |
| `mpaa` / `language` / `country` | S | · | 分级 / 语言 / 国家 |
| `mosaic` | S | · | `有码` / `无码` |
| `genre` / `tag` / `studio` / `issueStudio` / `director` | S[] | · | 类型 / 标签 / 制作 / 发行 / 导演 |
| `actors` | O[] | · | `[{"name":"姓名","role":"女优"}]` |
| `sets` | O[] | · | `[{"name":"系列名","overview":"描述"}]` |
| `sourceLinks` / `platform` | O[] | · | `[{"platform":"站点","link":"https://..."}]` |
| `extend` | O[] | · | `[{"key":"k","value":"v"}]` |
| `magnet` | O[] | · | `[{"name":"n","link":"magnet:?...","size":123,"hash":"...","date":1754006400000}]`，`date` 是**毫秒时间戳**（整数） |
| `subtitle` | O[] | · | `[{"sid":"..","name":"..","link":"..","language":"zh","extension":"srt","duration":0,"path":""}]` |
| `poster` / `fanart` / `thumb` / `extrafanart` | S[] | · | 封面 / 背景 / 缩略图 / 剧照（数组） |
| `posterHd` / `fanartHd` / `thumbHd` | S | · | 高清图（单值） |
| `trailer` / `dataSource` | S | · | 预告片地址 / 数据源 code |
| `shared` | B | · | 共享状态 |
| `pHash` / `osHash` / `filePath` | S[] | · | 指纹 / 路径列表 |
| `resolutionWidth` / `resolutionHeight` / `fileSizeByte` | I | · | 分辨率 / 文件大小（抓取场景通常不写文件信息） |

### 5.2 actor（演员）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | S | ★ | 姓名 / 艺名，**导入匹配依据**，不可为空 |
| `aliases` / `agency` / `tag` / `style` / `specialFeatures` | S[] | · | 别名 / 经纪公司 / 标签 / 风格 / 特征 |
| `gender` | S | · | `male` / `female` / `shemale` |
| `heightCm` / `weightKg` | N | · | 身高 / 体重 |
| `birthDate` / `debutDate` | S | · | 出生 / 出道日期 `yyyy-MM-dd` |
| `nationality` / `bloodType` / `cupSize` | S | · | 国籍 / 血型 / 罩杯 |
| `bustChestCm` / `waistCm` / `hipsCm` / `penisCm` | N | · | 身体数据 |
| `score` | N | · | 评分（10 分制） |
| `socialLinks` | O[] | · | `[{"platform":"Twitter","link":"https://..."}]` |
| `retired` / `deceased` / `shared` | B | · | 退役 / 亡故 / 共享 |
| `poster` | S | · | 大头照（单值） |
| `thumb` | S[] | · | 海报（数组） |
| `bio` | S | · | 简介 |
| `extend` / `platform` | O[] | · | 同 movie |
| `dataSource` | S | · | 数据源 code |

### 5.3 comic（漫画 / 相册）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | S | ★ | 相册名称，不可为空 |
| `isbn` | S | · | ISBN，**匹配优先依据**，有就写 |
| `type` | S | · | `comic`（默认）/ `album` |
| `cover` / `backCover` | S | · | 封面 / 封底（单值） |
| `description` / `notes` / `web` | S | · | 描述 / 备注 / 链接 |
| `season` | I | · | 季，默认 `1` |
| `fullChapter` / `arrange` / `blackAndWhite` | B | · | 全集模式 / 已整理 / 黑白 |
| `publishDate` | S | · | 出版日期 `yyyy-MM-dd` |
| `publisher` / `imprint` / `series` / `genre` | S | · | 出版信息 |
| `tags` / `characters` / `teams` / `locations` | S[] | · | 标签 / 角色 / 团队 / 地点 |
| `language` | S | · | 默认 `zh` |
| `format` | S | · | `Digital`（默认）/ `Print` |
| `manga` | S | · | `Yes`（默认）/ `No` / `Unknown` / `YesAndRightToLeft` |
| `ageRating` | S | · | 年龄分级 code，默认 `Adults Only 18+` |
| `communityRating` | N | · | 社区评分 0.0–5.0 |
| `writer` `penciller` `inker` `colorist` `letterer` `coverArtist` `editor` `translator` | S | · | 创作者 |
| `chapters` | O[] | ★ | 章节数组，结构见下 |

`chapters[]`：`title`（章节名）、`episode`（章节序号 I）、`description`、`pages`（页数组 O[]）。
`chapters[].pages[]`：`imagePath`（页图片引用，打包时 `data/...` 键、外链时 `http(s)://`）、`sequence`（页序 I）。页按数组顺序重建为 1..N，`imagePath` 为空的页会跳过。

> `pageCount`、`episodeCount` 是派生字段，不要写，写了也会被重算。

### 5.4 novel（小说）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | S | ★ | 书名，为空的条目会被跳过 |
| `isbn` | S | · | 与标题一起作为匹配依据 |
| `subtitle` / `author` / `genre` / `publisher` / `publishYear` / `series` | S | · | 书目信息 |
| `tags` / `category` | S[] | · | 标签 / 分类 |
| `rating` | N | · | 评分 0–10 |
| `description` | S | · | 简介 |
| `language` | S | · | 默认 `zh` |
| `pageCount` | I | · | 页数 |
| `cover` / `backCover` | S | · | 封面 / 封底（单值） |
| `status` | S | · | 状态 code，默认 `continue` |
| `chapters` | O[] | ★ | `[{"title":"第一章","content":"正文","sort":1}]` |

章节 `title` 为空会被跳过；`content` 是纯文本或 HTML 片段，换行用 `\n`，不要混用 `\r\n`。

### 5.5 tv（剧集）

> 一个条目 = **一部剧**，不是一集。季、集、集文件都是嵌套数组，文件信息不能写在顶层（顶层写 `filePath` 会被当未知字段忽略）。

剧级字段：`libraryType` 固定 `"tv"`（★）；`title` 主标题（★）；`tmdbId` / `bgmId` / `tvdbId` / `imdbId` 站点 ID（匹配第一依据，强烈建议写）；`originalTitle` / `titleCn` / `sortTitle` / `showTitle` 标题；`tvMediaType` 分区 code；`plot` / `plotCn` / `outline` / `tagline` 简介；`status` 只写 `Continuing` / `Ended`；`premiered` 首播 `yyyy-MM-dd`；`year`（I）；`runtime`（I）；`rating`（N）/ `votes`（I）；`mpaa` / `language` / `country`；`genre` / `tag` / `studio` / `countries` / `director` / `credit`（S[]）；`poster` / `fanart` / `thumb` / `logo` / `banner`（剧级图片，S[]）；`posterHd` / `fanartHd` / `thumbHd`（单值）。

嵌套数组：`uniqueIds`（`{type, value}`）、`actors`（`{name, role, order, thumb}`）、`namedSeasons`（`{number, name}`）、`seasonPlots`（`{number, plot}`）、`seasons`（`{seasonNumber, name, overview, poster, airDate, episodeCount, dataSource, bgmSubjectId, tmdbSeasonId}`，`seasonNumber` 是季业务键、0 表示特别篇）、`episodes`（`{seasonNumber, episodeNumber, title, titleCn, plot, airDate, runtime, rating, still, tmdbEpisodeId, ...}`，季号 + 集号共同构成集业务键）、`episodeFiles`（`{seasonNumber, episodeNumber, filePath, fileName, partIndex, available, durationSeconds, resolution, width, height, fileSize, ...}`，`fileName` 必填，否则该集文件被跳过）、`seasonBindings`（`{seasonNumber, dataSource, sourceSubjectId, bindMode, episodeOffset, episodeCount}`）。

> `lastCheckedAt`、`durationSeconds`、`fileSize` 用整数；`durationSeconds` 单位是秒，不是毫秒。

## 六、图片映射规则

- 图片字段保留**原始引用**，分两种：`http(s)://` 开头的完整网址是外链；以 `data` 开头的本地相对路径是本地图。
- 导出端只把 `data` 开头且文件真实存在的引用打进包；无扩展名时按 `.jpg` 处理。
- 包内路径格式：普通字段 `images/<安全化标识>/<字段名>_<序号>.<ext>`，例如 `images/AI-001/poster_0.jpg`；漫画页 `images/<安全化标识>/pages/page00001.jpg`。安全化把非 `[a-zA-Z0-9_-]` 换成 `_`，空则用 `item_<序号>`。
- 每张进包的图片都要在 `imageFiles` 登记，`ref` 与 `data.json` 的值逐字符相同，`sha256` 取文件字节的 SHA-256。
- 外链不进包、不改引用；本地图导入落盘后会被回写成新的 `data` 路径，并按文件内容去重。

## 七、日期与枚举

- 日期：`yyyy-MM-dd` 字符串，如 `premiered`、`birthDate`、`debutDate`、`publishDate`、`airDate`。注意 `movie.magnet[].date` 和 `episodeFiles[].lastCheckedAt` 是**毫秒时间戳**（整数）。
- 枚举只写 code：`dataSource` 用 `official` / `metatube` / `theporndb` / `stashbox` / `fanza_dmm` / `m_team_dmm` / `r18dev` / `thejavdb` / `plugin` / `user` / `local`；`gender` 用 `male` / `female` / `shemale`；`bloodType` 用 `A` / `B` / `AB` / `O` / `RH+` / `RH-`；漫画 `type` 用 `comic` / `album`；`ageRating` 用分级 code（含空格，原样写）；小说 `status` 用状态 code；剧集 `dataSource` 用 `tmdb_tv` / `bangumi` / `tvdb` / `local` / `plugin` / `user`，和影视域不共用；`tvMediaType` 用 `anime` / `jp_drama` / `kr_drama` / `cn_drama` / `western_tv` / `documentary` / `variety` / `other`。
- 无法识别的枚举会被容错回退或置空，不会让整条失败，但数据会丢。

## 八、校验：什么会被拒收

出现下面任何一种情况，整个导入被拒绝，且**不会改动任何已有数据**：

- 清单 `format` 不是 `ammds-backup`。
- `formatVersion` 小于 1 或大于当前支持版本（当前为 1）。
- `type` 为空或不是允许值；一个包混装多种类型。
- `manifest.json` 或 `data.json` 缺失。
- `count` 和 `data.json` 实际条目数不一致。
- `imageFiles[].ref` 为空；`path` 为空、不合法、不以 `images/` 开头或包里找不到该文件。
- 条目名为空、以 `/` 开头、含 `\`、`:` 或 `..` 路径段。
- `includeImages` 为真但 `imageFiles` 为空而包里却有 `images/` 文件。

只给提示、不拒收的情况：缺 `generatedAt` / `appVersion`；`imageFiles` 里的 `ref` 没在 `data.json` 出现；重复的 `path`；包里有图片但没登记；出现未识别的条目。

## 九、导入匹配与冲突策略

| 类型 | 凭什么认定是同一条 |
| --- | --- |
| movie | `uniqueid` 有交集，且有识别码归一（全角转半角、小写、去分隔符、识别 tmdb/tvdb/imdb/bgm/douban 前缀） |
| actor | `name` 完全一致；再做空白折叠归一，**不**合并 `Iron Man` 和 `Ironman` |
| comic | 有 `isbn` 先按 ISBN，否则按 `title` 忽略大小写 |
| novel | `title` + `isbn` |
| tv | `tmdbId` → `bgmId` → `tvdbId` → `imdbId`，站点 ID 全缺时 `merge` 按标题 |

| 策略 | 行为 |
| --- | --- |
| `skip` | 已有的不动，只新增没有的；命中时不解析图片、不写库 |
| `overwrite` | 已有的整条更新成包里的版本，没有的新建 |
| `merge` | 已有的只填空缺标量、列表取并集去重；movie 在识别码没命中时会再按标题兜底 |

未命中一律新增；单条失败会计入失败数并记录原因，**不会中断整包**。导入完成后文件名会带时间戳，形如 `ammds-backup-<type>-<毫秒时间戳>.zip`。

## 十、权威实现与模板

- **权威格式规范与参考实现**（源仓库 `docs/备份恢复规则/`）：
  - 格式标准 https://github.com/QYG2297248353/AMMDS-Docker/tree/master/docs/备份恢复规则
  - 生成脚本 `ammds_backup_pack.py`（零第三方依赖）也在该目录。
- **模板仓库**（推荐从这里起步）：https://github.com/QYG2297248353/AMMDS-BackupPackage.git —— 把「填 4 个空 + 说一句话」交给 AI，由模板里的 `Rule/AI备份包生成规范.md` 和脚本负责字段映射、打包与自检。

:::note[以源码为准]
本页按当前程序实现编写。源仓库里的说明文档与实现存在少量历史差异（例如 `extend` 的键名、部分时间戳字段的类型），生成包时请以本页字段表和模板仓库的 `Rule/` 规则为准。
:::

## 接着看

- [备份包结构](./overview.md)
- [AI 制作规范](./ai-guide.md)
- [后台：备份与恢复（指南）](/docs/backend/system/backup-restore)
