---
title: Comics and novels
sidebar_label: Comics & Novels
description: How to create a comic or novel, add images or chapter text, organise them into files, and where reading progress is kept.
sidebar_position: 2
---

# Comics and novels

The comic library holds comics and photo albums. The novel library holds novels. Both are "one book + several chapters". The difference is that a comic chapter is a set of images, while a novel chapter is a block of text. This page follows what you want to do: create a book, put content in, get the order right, export files, and see where reading progress lives. The two libraries look alike, so they are covered together, with differences called out.

## Before you start

> **Metadata**: descriptive info about a book or chapter — title, author, chapter order. Comics keep it in a file named `ComicInfo.xml`.

> **Placeholder**: a marker like `${title}` inside a naming format; when organising, it's replaced by real content — `${title}` becomes the book title, `${chapter}` the chapter name.

> **Book source**: a website that supplies novel text. It only fetches the table of contents and chapter text; which sources are enabled and how they work is managed in Integrations.

> **Organising**: exporting what's in the library into folders or single files, following the folder and filename rules you set.

> **EPUB / PDF**: two common e-book formats. EPUB suits reader apps, PDF is a page-by-page document.

> **CBZ / CBR / CB7 / archive**: formats that pack one chapter's images into a single file; they differ only in how they compress. CBR needs an extra tool on the server to generate.

## Create a book

Both libraries sit under 媒体管理（Media management）and look alike: create on the left, sorting and search on the right, cards in the middle.

### Comic library

Go to 媒体管理 → 漫画库（Media management → Comic library）:

| Area | Content |
| --- | --- |
| Left | 创建漫画（Create comic） |
| Right | Sort dropdown, 搜索我的漫画（Search my comics） |
| Cards | Up to 4 cards per row, paging at the bottom |

Sorting offers **newest created, oldest created, title ascending, title descending**; switching returns to page one and queries again.

A card shows the cover, a category label, title, series, author, tags and description. The subtitle next to the title has two forms. With 全章节（whole-book mode）on, it shows 全集（Complete）. Otherwise it shows 第 N 季（Season N）.

Hovering the card's top right reveals three actions: **编辑（Edit）** (opens the edit page), **分享（Share）**, and **删除（Delete）** (deletes after a confirmation). Clicking the card body, not those buttons, opens the chapter page and carries the 全章节 flag over.

### Novel library

Go to 媒体管理 → 小说库（Media management → Novel library）:

| Area | Content |
| --- | --- |
| Left | 创建小说（Create novel）, 搜索小说（Search novels）, 导入 EPUB（Import EPUB） |
| Right | Sort dropdown, 搜索我的小说（Search my novels） |
| Cards | Up to 4 cards per row, paging at the bottom |

Sorting is the same **newest created, oldest created, title ascending, title descending**. Each page holds 12 entries by default, matching the four-column grid.

The card has a cover on the left and a fixed **status** label at the top right (完结 / 连载 / 草稿 / 待续 / 创作中 — Completed / Ongoing / Draft / To be continued / Writing). On the right it shows type, title, author, series, source and tags; the description is capped at three lines.

Hovering the card's top right reveals action icons:

| Icon | Action | Note |
| --- | --- | --- |
| Download | Fetch chapter text not yet downloaded | Only shown for books from a book source |
| Edit | Open the edit page | |
| Share | Create a share link | |
| Delete | Delete the whole novel after a confirmation | |

:::tip[Opening the chapter page]
Click the card body to open the chapter page — the same entry point for comics and novels, and not the same as those top-right buttons.
:::

### Fields when creating

Comics use 创建漫画（Create comic）, novels use 创建小说（Create novel）. Fields below.

Comics:

| Field | Notes |
| --- | --- |
| Title | Required |
| Author | Required |
| Series | Name of the series it belongs to |
| Type | Comic / Album |
| Description | Multi-line text |
| Whole-book mode | A switch. On, the book has no chapters and shows as one whole |
| Season count | An integer from `1` to `999`, picked from a dropdown or typed; disabled when whole-book mode is on |
| Cover | Click or drag to upload, 9:16 recommended, images only, up to 10 MB |

An invalid season count shows a prompt and reverts to the last valid value.

Novels:

| Field | Notes |
| --- | --- |
| Title | Required |
| Author | |
| Type | Candidates include Fantasy, Urban, Sci-fi, Mystery, Wuxia, Romance, History, Gaming, Light novel; you can also type a custom type |
| Series | Name of the series it belongs to |
| Status | Completed / Ongoing / Draft / To be continued / Writing |
| Description | Multi-line text |
| Cover | Click or drag to upload, 2:3 recommended |

## Add the content

### Comics: import from your computer or the server

The middle of the chapter page has three import entries:

1. **Images**: click or drag to upload; JPG, PNG, BMP, GIF. You can drag in a whole folder at once; the app sorts by name automatically.
2. **PDF / EPUB**: click or drag to upload; PDF and EPUB are supported, uploaded one by one with progress shown.
3. **CBZ / Metadata**: the CBZ entry lets you pick a `.cbz` file. This version, however, says 「暂未支持 CBZ 文件上传（CBZ upload not supported yet）」; it only checks format and size, then skips the file. The metadata entry accepts only `ComicInfo.xml`, which writes chapter metadata.

There is also 漫画导入（Comic import）, which reads a server folder. Pick a folder containing comic images in the dialog. The app imports in natural filename order and moves images recognised as front or back cover to the start and end.

:::warning[Archives on import]
On the upload side, only PDF / EPUB are actually stored; CBZ is a placeholder entry. Archive features live on the **output side**: 手动整理（Manual organise）can turn a chapter into CBZ, CBR or CB7.
:::

### Novels: EPUB and book sources

- **EPUB import**: click 导入 EPUB（Import EPUB）and pick an `.epub` file; the app parses the table of contents and chapters and stores them, showing a loading state. This is the fastest way to move existing e-books into the library.
- **Book source import**: click 搜索小说（Search novels）to open the source search dialog. Type a title keyword and search across enabled book sources, then pick a book from the results to import. Imported books are marked with their source on the card, and the chapter page shows a 「来源书源: 书源名（Source: name）」 label. Book sources only fetch the contents and text; enabling sources and their rules is managed in Integrations.

## Chapters and their order

Clicking a card opens a page titled 「章节管理 · 书名（Chapter management · Book title）」, with actions split left and right.

Comics:

| Side | Action | Notes |
| --- | --- | --- |
| Left | Chapter dropdown | Switch the current chapter |
| Left | New chapter | Fill in a chapter title and description to create; disabled in whole-book mode |
| Left | Comic import | Import images from a server folder; disabled when no chapter is selected |
| Right | Edit | Back to the comic edit page |
| Right | Organise now | Submit an organise task using the task settings directly |
| Right | Manual organise | Set the target folder, folder format and file format, then submit |
| Right | Delete chapter | Disabled in whole-book mode |

Novels:

| Side | Action | Notes |
| --- | --- | --- |
| Left | Chapter dropdown | Lists all chapters by index + title |
| Left | New chapter | Just fill in a chapter title |
| Left | Source label | Only for books imported from a book source |
| Left | N chapters not fetched | A red label shown when some chapters lack text |
| Right | Update text | Only for book-source books with a chapter selected |
| Right | Download all | Only for book-source books; runs as a background task |
| Right | Edit / Organise now / Manual organise | Submit organise tasks |
| Right | Delete chapter | Requires a chapter to be selected |

**Comic chapter images**: with a chapter selected, images show as a grid. Each image has three actions at its top right. **Move forward** and **move back** change the order; the first cannot move forward, and the last cannot move back. **Delete** removes the image. Click an image to flip through a large preview. Paging at the bottom can change rows per page (12, 24, 48, 60, 120, 240, 480, 1000).

**Novel chapter text**: selecting a chapter opens the edit area:

- At the top are a **chapter title** box and a 保存正文（Save text）button.
- The body is a plain multi-line text box. Blank lines separate paragraphs. HTML tags show as plain text and are not rendered.
- Chapters from a book source fetch their text automatically when opened. A loading overlay covers the edit area during the fetch, so you do not see half the content.
- Until you click 保存正文（Save text）, changes exist only in the browser.

**Download all** (book-source novels only) hands the fetch to the background:

1. After submitting, a 「正在后台下载全本（Downloading all in background）」 progress bar appears at the top.
2. Progress comes from the task log, with a note on the current stage.
3. Click 查看任务日志（View task log）to jump to the log page and diagnose failures.

## Organise into files

Organise now（立即整理）uses the folder and format from the task settings. It reports 「提交整理任务成功（Organise task submitted）」. Manual organise（手动整理）can override them for this task.

Manual organise for comics:

| Field | Notes |
| --- | --- |
| Target folder | Required, picked from the server folder tree |
| Folder format | Supports tags like `${title}` `${author}` `${date}` `${year}` `${month}` `${day}` `${chapter}` `${index}`; leave blank to use the task settings |
| File format | Folder, CBZ, CBR, CB7, PDF, EPUB |

Folder, PDF and EPUB are generated directly. CBZ and CB7 are built in. CBR (RAR) needs the `rar` tool installed on the server, or `AMMDS_RAR_TOOL` pointing to its executable.

Manual organise for novels (Organise now submits using 「小说整理配置（Novel arrange settings）」):

| Field | Notes |
| --- | --- |
| Target folder | Leave blank to use the folder in 小说整理配置（Novel arrange settings） |
| Folder naming rule | Supports tags like `${title}` `${author}` `${category}` `${date}` `${year}` `${month}` `${day}` `${chapter}` `${index}` |
| File naming rule | When exporting the whole book, `${chapter}` uses the novel title; when exporting by chapter, it uses the chapter title |
| Format | **EPUB** (default) or **TXT** |
| Generate per chapter | On, one file per chapter; off, one file for the whole book (EPUB contains all chapters) |

EPUB builds its table of contents in chapter order, ready to hand to a reader app.

The two default settings live under 「任务配置（Task settings）」 in the Task management section. Find them by name. **漫画整理配置（Comic arrange settings）** covers format, default target folder, folder and file naming rules, per-chapter generation, and front/back cover and contents keywords. **小说整理配置（Novel arrange settings）** covers format, default target folder, folder and file naming rules, and per-chapter generation. These two serve comic and novel intake only, not film scanning tasks. Changes affect only tasks created or run afterwards, not content already in the library.

## Where reading progress is kept

The chapter page only maintains content — **reading progress is not shown here**; the frontend reader records it:

- Comics save progress by "chapter + page" and write it out as soon as you leave or switch away. Reopening the same comic shows 「已恢复到上次阅读位置 第 N 页（Restored to last position, page N）」. The frontend detail page offers 继续阅读（Continue reading）and 从头阅读（Start over）based on it.
- Novels record by "chapter + position". With progress, the frontend detail page's main button is 继续阅读（Continue reading）and shows which chapter you reached. The reader offers a chapter list, page-flip or scroll modes, and theme and font-size controls. With no progress, or when the chapter it points to was deleted, it falls back to 从头阅读（Start over）.

## Settings explained

| Setting | What to enter | If blank / wrong |
| --- | --- | --- |
| Title | Required for both comics and novels | Blank means the book can't be created |
| Author | Required for comics; optional for novels | Blank means a comic can't be created |
| Type | Comics: Comic / Album; novels: pick a candidate or type a custom type | Only affects grouping; doesn't affect import |
| Whole-book mode (comics) | A switch; on, the book has no chapters | On, season count, new chapter and delete chapter are all disabled |
| Season count (comics) | Integer `1`–`999`, dropdown or typed | An invalid value prompts and reverts to the last valid one |
| Cover | Click or drag to upload; comics 9:16, novels 2:3; comics images only, up to 10 MB | Wrong format or size won't upload |
| Status (novels) | Completed / Ongoing / Draft / To be continued / Writing | Just a label at the card's top right |
| Chapter dropdown | Select a chapter before importing | With none selected, Comic import is disabled |
| Image upload | JPG, PNG, BMP, GIF; a whole folder can be dragged in | Sorted by name automatically; wrong order needs manual move forward / back |
| `ComicInfo.xml` | The metadata entry accepts only this filename | Other filenames won't write chapter metadata |
| CBZ upload | Pick a `.cbz` file | This version says 「暂未支持 CBZ 文件上传（CBZ upload not supported yet）」 and skips after checks; only PDF / EPUB are stored on upload |
| Save text | Click 保存正文（Save text）after editing | Without it, changes stay in the browser and are lost on close |
| Target folder (manual organise) | Comics: required, from the server folder tree; novels: blank uses 小说整理配置（Novel arrange settings） | Comics can't be submitted without it |
| Folder format / naming rule | Tags like `${title}` `${author}` `${chapter}` `${index}` | Blank uses the task settings; a wrong tag produces a wrong folder name |
| File format / Format | Comics: Folder / CBZ / CBR / CB7 / PDF / EPUB; novels: EPUB (default) or TXT | CBR needs `rar` on the server or `AMMDS_RAR_TOOL` set, or it won't generate |
| Generate per chapter (novels) | On, one file per chapter; off, one file for the whole book | Off puts all chapters inside a single EPUB |
| File naming rule (novels) | Whole-book export: `${chapter}` uses the novel title; per-chapter export: chapter title | Wrong, the filename won't match its content |

## Troubleshooting

- **Chapters came in out of order**: images are sorted by filename, and Comic import also moves front/back cover images to the ends; if still wrong, use move forward / back on each image — the first can't move forward, the last can't move back.
- **CBZ won't upload**: this version doesn't support `.cbz` on the upload side; it's skipped after format and size checks with 「暂未支持 CBZ 文件上传（CBZ upload not supported yet）」. For archives, use Manual organise to export chapters as CBZ / CBR / CB7.
- **CBR won't generate**: CBR needs the `rar` tool on the server, or `AMMDS_RAR_TOOL` pointing to its executable; without it, use CBZ or CB7.
- **Novel text edits not saved**: text needs 保存正文（Save text）to be stored; book-source chapters fetch text on open, with a loading overlay during the fetch — wait for it before editing.
- **Download all is stuck or failed**: progress comes from the task log; click 查看任务日志（View task log）to see which stage it stopped at. Only book-source books have Download all.
- **Organising didn't produce what you expected**: Organise now uses the default folder and format from 任务配置（Task settings）in Task management; to change just this run use Manual organise, to change the default edit the task settings.
- **No "Continue reading" button**: reading progress lives in the frontend reader, not the chapter page; if the chapter it points to was deleted it falls back to Start over.

For film, series and actor upkeep see [Films, series and actors](./library.md); for series, studios and tags see [Series, studios and tags](./organize.md).

## Next

- [Films, series and actors](./library.md)
- [Series, studios and tags](./organize.md)
