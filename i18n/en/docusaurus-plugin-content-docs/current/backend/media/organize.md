---
title: Series, studios and tags
sidebar_label: Series & Tags
description: How to group films into a series, let studios claim films automatically, and maintain the site-wide tag library — plus what each delete does and doesn't affect.
sidebar_position: 3
---

# Series, studios and tags

None of these three pages store the films themselves; they classify them. A series groups several works into one browsable whole. A studio gathers films by their publisher. The tag library is the shared source of words used across the site. This page follows what you want to do: how to create one, how to put films in, and which changes do or do not affect films already in the library.

## Before you start

> **ID number / identification code（番号 / 识别码）**: a film's identification number, usually in the filename. Both the series library and the studio library look films up by it.

> **Metadata**: a film's descriptive info — cover, description, cast, tags. Studio names, series names and tags are all written into it.

> **NFO**: a small info file kept beside the video, holding the film's metadata; media servers read it too.

> **Scraping**: the app looks up a film's cover, description and cast on a data site and fills them in.

> **Alias**: another way of writing the same thing. A studio may be named differently across data sources; aliases cover those variants.

> **Multi-value input**: one box that takes several values; press Enter to add each one, e.g. aliases or tags.

> **Soft link**: the two sides are connected only by "the names match", not a hard binding. So if a name is written differently, those films may vanish from the counts.

> **Regular expression**: a rule written with symbols that describes "strings matching a certain pattern", used to match ID numbers in bulk. If you're unsure, use the other two rule types first.

> **Weight / references**: a number in the tag library showing how often a tag is used, to sort common tags first — not an exact count of works.

## Series: grouping several works into one whole

### Find and create a series

Go to 媒体管理 → 系列库（Media management → Series library）:

| Area | Content |
| --- | --- |
| Series search | Keyword (series name / description), work ID number |
| Quick actions | 新建系列（New series）; ticking rows reveals 删除（Delete） |
| Table | Series, Actions |

The 系列（Series）column is the main info. A cover sits on the left, then the series name (click it to open details) and the description. A 「N 部作品（N works）」 label sits on the right. The 操作（Actions）column offers **详情（Details）, 分享（Share）, 编辑（Edit）, 删除（Delete）**. The 作品识别码（work ID number）field in the search box looks up series in reverse: enter an ID number to find the series containing that work.

New and edit share one dialog with only three fields:

| Field | Notes |
| --- | --- |
| Cover | Click or drag to upload an image; can delete and re-upload |
| Series name | Required |
| Series description | Optional |

:::note[Cover spec]
Covers accept images only, up to 10 MB; after upload they show as a portrait thumbnail.
:::

### Put works into a series

Click 详情（Details）on a list row, or the series name, to open the detail page. The top shows the series name and 「N 部作品（N works）」, with **编辑（Edit）** and **分享（Share）** on the right. The left has the cover and description. The right has the works toolbar and table: **添加作品（Add works）**, **批量导入（Bulk import）**, **移出系列（Remove from series）** (appears after ticking) and a 「按作品名称筛选（Filter by work name）」 search box. Each row shows an index, the work (cover + title + ID number + release date) and actions (view, remove). 查看（View）jumps to that film's advanced edit page.

**Add works** (pick from the existing film library):

1. Click 添加作品（Add works）to open the dialog.
2. In the 「搜索媒体库作品（Search library works）」 box, search the film library by title.
3. Tick one or more works, click 添加选中（N）（Add selected (N)）.
4. When done, a message reports how many were added.

**Bulk import** (organise a whole series by ID numbers at once):

1. Paste ID numbers into the text box; comma, newline, space or semicolon separators work, for example:

   ```
   SSIS-001, IPX-002
   MIDE-003
   ABP-004
   ```

2. Click 开始导入（Start import）.
3. Works already in the library are added to the series directly; ones not in the library are attempted via an online search.
4. The result lists the success count; failures give an 「识别码（ID number）」 and a 「失败原因（failure reason）」.

:::warning[What online import depends on]
The "not in the library → search online" step in bulk import depends on enabled data sources. If a data source isn't set up or is unreachable, those ID numbers come back with a failure reason — set up the data source in Integrations first.
:::

**Remove from series**: for one row, use its inline delete button. For several, tick them and use 移出系列（Remove from series）. Both ask for confirmation. Removing only breaks the link between work and series; it does not delete the film entry.

### Don't confuse it with the film's "Series" field

The film advanced edit page also has a 「系列信息（Series info）」 group. It records which series that work belongs to and its description within it. That belongs to **film metadata**, and it is separate from the series in the series library:

| Data | Where it's kept | Purpose |
| --- | --- | --- |
| Film's series field | Film library → Advanced edit → Series info | Written into that one film's metadata and NFO |
| Series entity | Series library → Series details | Groups works, builds series pages and series shares |

So putting a work into the series library needs an explicit 添加作品（Add works）or 批量导入（Bulk import）. Filling a series name into film metadata does not make it a member automatically.

## Studios: letting films be gathered by publisher

### Find and create a studio

Go to 媒体管理 → 厂牌库（Media management → Studio library）:

| Area | Content |
| --- | --- |
| Toolbar | Left: 创建厂牌（Create studio）, 识别码归属测试（ID ownership test）; right: 搜索厂牌名称或别名（Search studio name or alias） |
| Cards | One card per studio; click a card to open details |

Typing in the search box filters immediately; clearing it restores the full list. The list is sorted by total work count, highest first, so studios with more works come first.

Card info:

| Element | Notes |
| --- | --- |
| Image | Hovering shows 更换图像（Change image）, click to swap it |
| Name | Studio name; a star on the right means it's marked 重点关注（Priority） |
| Type label | Producer / Distributor / Agency / Other |
| Tags | Up to the first 2 shown, the rest folded into 「+N」 |
| Stats | 「N 部影视 · N 部剧集（N films · N series）」, plus 「N 条规则（N rules）」 when rules exist |
| Delete | A delete button on the card |

Click 创建厂牌（Create studio）and fill in:

| Field | Notes |
| --- | --- |
| Studio name | Required, must match the production company name in film metadata, up to 100 characters |
| Studio type | Producer / Distributor / Agency / Other |
| Founding year | Integer 1800–2200 |
| Country / region | e.g. 「日本（Japan）」 |
| Website | Starts with `https://`; clickable on the detail page |
| Aliases | Multi-value, press Enter after typing |
| Tags | Multi-value, press Enter after typing |
| Description | A studio blurb, up to 500 characters |
| Studio image | Uploaded on the dialog's right; click to change |

:::tip[The name must match metadata]
Studios and works are linked softly by name, so 厂牌名称（Studio name）must exactly match the production company name in film metadata, or those films won't appear in the counts. When data sources write it differently, use 别名（Aliases）to cover the variants.
:::

:::warning[What deleting a studio does]
Deleting removes the studio's rules and exclusions too, but **does not change any film or series metadata** — studio names already written into works stay.
:::

### Claim works automatically with ID rules

A studio's works come from two paths: **manual add** and **automatic gathering by ID rules**. Aliases are for matching, rules for deciding ownership automatically.

Maintain them in Studio details → 识别码规则（ID rules）tab:

| Field | Notes |
| --- | --- |
| Rule type | ID prefix / exact ID / regular expression |
| Match expression | Fill in per the chosen type, up to 200 characters |
| Write on hit | Production company / Distribution company / Production + Distribution |
| Priority | -9999 to 9999; sorts when several rules hit at once |
| Enabled | Off, the rule takes no part in decisions |
| Note | Why the rule exists, e.g. "this studio holds distribution rights for the SSIS series" |
| After saving | Optionally tick 立即按规则收纳作品到影视元数据（Gather works into film metadata by rules now） |

预览命中数量（Preview hit count）shows how many works a rule would match without writing anything, so you can decide before saving.

How ownership and gathering work, in order:

1. When a film entry is saved, the app writes the studio into production / distribution company automatically using **enabled** rules.
2. You can also click 立即收纳作品（Gather works now）on the studio detail page (called 立即收纳（Gather now）on the rules tab) to trigger it manually.
3. Works gathered by a rule are tagged with the matching rule name on their card, so you can trace which rule brought them in.
4. When you remove a work, the app records an **exclusion** so the next automatic gathering won't pull it back in.

:::note[Deleting a rule doesn't roll back]
Deleting an ID rule only affects later decisions; studio names already written into film metadata are not rolled back.
:::

The top 识别码归属测试（ID ownership test）does the same as the test box on the rules tab. Enter an ID number (e.g. `SSIS-001`) and it returns the matching studio and expression. With no match it says 「未命中任何厂牌规则（No studio rule matched）」. Use it to check a rule before saving; that is faster than saving and looking at the result.

### What else you can change on the studio detail page

Clicking a card opens a detail drawer. The header holds the image, name, type, priority star, country, founding year, website, description, tags and aliases. It also shows three stats: **film count, series count, ID rule count**. Below are three tabs:

- **作品（Works）**: a 全部 / 影视 / 剧集（All / Films / Series）radio at the top switches media type. Search by 「标题或识别码（title or ID number）」 on the right. The 添加作品（Add works）dialog searches films by title or ID, and entries already in the studio are marked 已在厂牌（Already in studio）and cannot be added. Work cards show a type badge, title, ID number, year, hit source and hit rule, with actions 查看（View）, which jumps to that film or series edit page, and 移出（Remove）. Paging is at the bottom.
- **识别码规则（ID rules）**: a table listing expression and note, an enabled switch, edit and delete; above it 添加规则（Add rule）and 立即收纳（Gather now）, and an ID ownership test at the top right.
- **资料（Profile）**: edit studio type, founding year, country / region, website, aliases, tags, description and the 重点关注（Priority）switch; saving updates the card and stats.

:::tip[Priority]
重点关注（Priority）is only a marker, showing a star on the card; it doesn't change how works are gathered.
:::

## Tags: the site-wide source of words

### Three layers

The tag library is the single source of the candidates you can pick in the edit pages of five content types: films, series, actors, comics and novels.

| Layer | Meaning | Count |
| --- | --- | --- |
| Media type | Broad content categories, five fixed | 5 |
| Category | A group of tags under each media type; system defaults + user-created | 5 + N |
| Tag | A concrete word, with alias, colour and weight | unlimited |

The five system default categories:

| Card title | Media type | Tag type |
| --- | --- | --- |
| 影视标签（Film tags） | Film | `tag_movie` |
| 剧集标签（Series tags） | Series | `tag_tv` |
| 演员标签（Actor tags） | Actor | `tag_actor` |
| 漫画标签（Comic tags） | Comic | `tag_comic` |
| 小说标签（Novel tags） | Novel | `tag_novel` |

User-created categories must sit under a media type, so they share the same media-type filter as system categories.

### Page and cards

Go to 媒体管理 → 标签库（Media management → Tag library）:

| Area | Content |
| --- | --- |
| Toolbar | Left: 创建分类（Create category）; right: type filter dropdown and 搜索标签或别名（Search tag or alias） |
| Cards | One card per category, up to 4 per row |

The top type filter keeps only cards of that media type; the search box filters by tag name or alias.

A card's title is the category name. System categories are named 「media type + 标签（tags）」 (e.g. 影视标签（Film tags）). A badge beside the title says 系统（System）or 用户（User）. The top right shows 「共 N 个（N in total）」, the number of tags in the category. User-created categories can be deleted; after deletion their tags **fall back to the system default category**, so no tags are lost. Inside the card is a tag table: tag name (coloured as set), a 「引用（References）」 value, and edit / delete actions.

### Create categories, add and edit tags

Click 创建分类（Create category）, fill in a name (up to 30 characters) and pick a media type. Categories only organise tags; they take no part in content search logic.

Click 添加（Add）on the card toolbar's right, or the edit icon on a tag row:

| Field | Notes |
| --- | --- |
| Name | Required, up to 50 characters. When organising, written into the NFO as the **primary name** |
| Aliases | Multi-value, press Enter after typing, several allowed |
| Colour | 10 preset colours in the palette, or a HEX value directly (default `#165dff`) |

:::note[What aliases do]
Different data sources may write the same concept differently (Chinese / English / Japanese, simplified / traditional, abbreviations). Put those variants in 别名（Aliases）; matching recognises them, but the NFO is still written with the primary name.
:::

:::warning[The boundary of deleting a tag]
Deleting a tag only removes the word from the tag library, **it doesn't affect saved metadata**: type and tag text already written into films, actors and other entries stays; you just can't pick it from the candidates anymore.
:::

### Weight and "References"

Each tag has a weight, shown in the card table as the 引用（References）column:

- Every time a tag is hit, its weight goes up by 1;
- The system decays it periodically, by at most 10% each time (rounded down), and **never below 1**;
- So it's a popularity measure — think "approximate number of times referenced", not an exact work count.

Sorting and display use it to put common tags first, so edit pages can hit them quickly.

### Where you use it day to day

The tag library itself offers two searches: filter cards by media type, and search by tag name or alias. The more common entry is the tag dropdown in each content edit page:

| Edit page | Tag type searched |
| --- | --- |
| Film advanced edit → Type / Tags | Film tags |
| Series edit → Type / Tags | Series tags |
| Actor details → Tags / Style / Features | Actor tags |
| Comic, novel edit | Each one's tag type |

These dropdowns all search the tag library (both system and user-created categories are visible) and accept new words typed directly: a value not in the library is submitted as a new tag.

:::tip[Why maintaining it centrally helps]
A tag created in any edit page returns to its category in the tag library, so it can be picked on any entry next time; to tidy up synonyms in bulk, editing the alias list here covers every reference at once.
:::

## Settings explained

| Setting | What to enter | If blank / wrong |
| --- | --- | --- |
| Series name | Required | Blank means the series can't be created |
| Series cover | Image, up to 10 MB | Non-image or oversized won't upload; shown as a portrait thumbnail |
| Work ID number (series search) | One ID number | Used to find the series containing that work in reverse |
| Bulk import ID numbers | Paste several, separated by comma, newline, space or semicolon | Not in library and data source missing → returned with a 「失败原因（failure reason）」 |
| Studio name | Required, up to 100 characters, must exactly match the production company name in film metadata | A different spelling won't show in the counts; use 别名（Aliases）to cover it |
| Studio type | Producer / Distributor / Agency / Other | Just a category label |
| Founding year | Integer 1800–2200 | Out of range won't be accepted |
| Website | Starts with `https://` | Without it, the detail page link won't open |
| Aliases / Tags (studio) | Multi-value, press Enter to add each | Without Enter the value isn't added |
| Description (studio) | A studio blurb, up to 500 characters | Over the limit won't be accepted |
| Rule type | ID prefix / exact ID / regular expression | The wrong type matches nothing or matches too much |
| Match expression | Fill in per the chosen type, up to 200 characters | Wrong, no works match; verify with 预览命中数量（Preview hit count）or 识别码归属测试（ID ownership test）first |
| Write on hit | Production company / Distribution company / Production + Distribution | Wrong, it's written into the wrong field |
| Priority | -9999 to 9999 | Sorts when several rules hit at once; set wrong and the wrong studio wins |
| Enabled (rule) | A switch | Off, the rule takes no part in decisions |
| ID ownership test | One ID number, e.g. `SSIS-001` | With no match it says 「未命中任何厂牌规则（No studio rule matched）」 |
| Category name | Up to 30 characters, plus one media type | Categories only organise tags, no part in search logic |
| Tag name | Required, up to 50 characters, written into NFO as primary name | Blank means the tag can't be created; the primary name decides the NFO text |
| Tag aliases | Multi-value, press Enter to add each | Blank means only the primary name matches; other spellings of the same concept aren't recognised |
| Tag colour | 10 presets, or a HEX value (default `#165dff`) | Only affects the colour on the card |
| Type / tag dropdown input | Pick a candidate, or type a new word | A value not in the library is submitted as a new tag |

## Troubleshooting

- **A work put in the series library doesn't appear on the series page**: a series name in film metadata doesn't make it a member; use 添加作品（Add works）or 批量导入（Bulk import）explicitly.
- **Bulk import returns lots of failures**: check the 「失败原因（failure reason）」 first — most are a data source not enabled or unreachable. Set it up in Integrations and retry.
- **Some films are missing from studio counts**: studios link softly by name, so 厂牌名称（Studio name）must exactly match the production company name in film metadata; for different spellings, add them to 别名（Aliases）.
- **A gathered work can't be removed / gets pulled back**: removing records an exclusion so the next automatic gathering won't pull it back; deleting a rule only affects later decisions, studio names already in metadata aren't rolled back.
- **Rules aren't accurate**: use 预览命中数量（Preview hit count）to see how many would match, or 识别码归属测试（ID ownership test）with one ID number to see the result, then decide whether to save.
- **Worried a deleted tag / category / studio lost data**: deleting a tag removes only the word, deleting a user category makes its tags fall back to the system default, deleting a studio changes no film or series metadata — written text stays, you just can't pick it from candidates anymore.
- **"References" doesn't match the work count**: it's a decaying popularity measure, not an exact count; common tags sorting first is only to help edit pages hit them quickly.

For film, series and actor upkeep see [Films, series and actors](./library.md); for comics and novels see [Comics and novels](./comic.md).

## Next

- [Films, series and actors](./library.md)
- [Comics and novels](./comic.md)
