---
title: Information library
sidebar_label: Info Library
description: Filter and bulk-delete subscription articles in the information library at the end of the media menu, or write your own with Markdown, a cover and a publish time, then see it on the public information page.
sidebar_position: 5
---

# Information library

The information library keeps every article in one place. There are only two sources:

- **Subscription**: fetched automatically by an RSS subscription. It can only be deleted, never edited.
- **Manual**: written in the admin. You can create, edit and delete it.

## Where to find it

In the admin sidebar, open 媒体管理（Media management）and choose the last item, 资讯库（Information library）.

## Reading the list

Filters sit at the top and the article table below.

| Filter | What it matches |
| --- | --- |
| Keyword | Title, summary and body; pressing Enter also searches |
| Source | All, subscription, manual |
| Category | All, article, image, video, resource, other |

Click 查询（Search）after changing a condition, or 重置（Reset）to clear them and reload.

The table:

| Column | Content |
| --- | --- |
| Article | Cover thumbnail, title and a two-line summary; click the title to open the detail dialog |
| Category | Article, image, video, resource or other |
| Author | Several authors separated by 、; shows 未署名（unattributed）when empty |
| Source | 订阅来源（subscription）or 人工创作（manual); hover a subscription tag to see the feed name |
| Published at | Like `2026-11-15 10:00:00`; shows `-` when missing |
| Status | Unread or read |
| Operations | View, edit, delete |

The list is sorted newest first by publish time. Paging starts at 20 per page; you can switch to 10, 20, 50 or 100.

## Creating and bulk deleting

- **创建资讯（Create article）** is always at the top left and opens the writing page.
- **批量删除（Batch delete）** appears only after you tick rows, and the label carries the count, for example 批量删除 (3).

## Why subscription articles can't be edited

Subscription articles are fetched copies of the original. Editing them would break the next fetch, so they are treated as read-only:

- The row actions offer 查看（View）and 删除（Delete）, but no 编辑（Edit）
- The backend refuses edits too, with 订阅来源的资讯不支持编辑，只能删除（subscription articles cannot be edited, only deleted）

If you need different wording, delete the article and write a manual one instead.

## Deleting

1. Tick one or more rows.
2. Click 批量删除（Batch delete）.
3. Confirm.

Both subscription and manual articles can be deleted, and neither can be recovered. Single-row delete sits in the row actions and also asks for confirmation.

## Writing a manual article

Click 创建资讯（Create article）. Title and body are on the left, the basic details on the right.

| Field | Notes |
| --- | --- |
| Title | Required, up to 200 characters |
| Body | Required, written in Markdown — see below |
| Cover | Optional; click or drag an image onto the dashed box to upload, then replace or remove it. Images only, up to 10 MB each |
| Author | Optional, up to 100 characters |
| Category | Optional: article, image, video, resource, other |
| Original link | Optional, the source article address, e.g. `https://example.com/article` |
| Publish time | Optional, down to the second; defaults to the current time |

Editing an existing manual article shows the same form. Subscription articles never reach the editor; you get a warning and are sent back to the list.

### The body editor

The body is Markdown. The editor has three modes: **编辑（Edit）**, **分栏（Split）** and **预览（Preview）**. Split means you write on the left and watch the result on the right.

The toolbar, left to right: bold, italic, heading, quote, code, list, horizontal rule, insert link, insert image.

You can insert an image in two ways:

- Paste an image URL
- Upload a local image

Inserting a link asks for the link address and the link text. On save the Markdown is also converted to web content; the list and the public site display the converted result.

## Where it shows up in public

- The last item in the public top navigation, 资讯（Information）, at `/home/information`
- The public list needs no login
- Opening a detail page requires login

## Common questions

| Symptom | Explanation |
| --- | --- |
| No 编辑（Edit）button | Subscription articles are read-only; delete them instead |
| The title won't save | The title is required and capped at 200 characters |
| The body won't save | The body is required |
| Images in the body don't load | Check that the address opens directly, or upload the image instead |
| A new article isn't on the public site | Check whether the publish time is in the future; the public site sorts by publish time |

## Next

- [Finding resources and subscriptions](../subscribe/search)
- [Browsing the public site](../../site/browse)
