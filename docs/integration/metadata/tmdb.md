---
title: TMDB
description: 配置 TMDB 的 API 地址、授权码、账户与图片参数，完成 OAuth 授权，并通过连通性校验、影视/演员/剧集检索测试接入。
keywords: [TMDB, 元数据, OAuth, API Token, 剧集]
tags: []
sidebar_position: 2
---

# TMDB

TMDB（The Movie Database）提供电影、剧集与演员元数据，接口需要授权码或 OAuth 授权。接入后 TMDB 可参与影视、演员与剧集（TV）的检索与导入。

{/* truncate */}

## 打开方式

进入 **集成应用 → 元数据 → TMDB**。页面包含「配置信息」「连接测试」「资源检索」三个卡片。

## 配置项

| 配置键 | 界面名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tmdb_enabled` | 启用状态 | 布尔 | `false` | 插件总开关 |
| `tmdb_service_url` | 服务地址 | 字符串 | `https://api.themoviedb.org` | API 基地址，一般无需修改 |
| `tmdb_token` | 授权码 | 字符串 | 空 | API Read Access Token，以 `Authorization: Bearer` 形式发送 |
| `tmdb_account_id` | 账户ID | 字符串 | 空 | 用于「获取账户信息」，OAuth 授权成功后自动写入 |
| `tmdb_movie_search` | 影视搜索 | 布尔 | `true` | 关闭后 TMDB 不参与影视元数据检索 |
| `tmdb_tv_search` | 剧集搜索 | 布尔 | `false` | 关闭后不参与剧集检索，但按 ID 取详情 / 季 / 集仍可用 |
| `tmdb_actor_search` | 演员搜索 | 布尔 | `true` | 关闭后不参与演员检索 |
| `tmdb_image_base_url` | 图像地址 | 字符串 | `https://image.tmdb.org/t/p/` | 留空时由 `/3/configuration` 自动获取 |
| `tmdb_image_size` | 图像尺寸 | 字符串 | `original` | 与图像地址拼接，如 `/t/p/original/xxx.jpg` |
| `tmdb_language` | 检索语言 | 字符串 | `zh-CN` | 检索与详情接口的 `language` 参数 |

:::note[授权码从哪来]
在 TMDB 开发者站点创建应用后获取 API Read Access Token。授权码是凭据，不要使用可公开的 API Key 代替；填入后先点「校验密钥」确认有效。
:::

## 获取授权

除了手工填写授权码，也可以通过 OAuth 让页面自动写入：

1. 点击「连接测试」卡片右上角的 **获取授权**。
2. 浏览器打开 TMDB 授权页，登录并同意授权。
3. TMDB 跳回本站回调页 `/admin/integration/tmdb/callback`，页面凭 `status` 值完成验证。
4. 成功后 `tmdb_token` 与 `tmdb_account_id` 自动写入配置；后端只回传账户 ID 与令牌末 4 位掩码，不返回明文。

:::tip[回调地址]
回调地址由后端按当前访问来源拼装，不需要手工配置。通过反向代理访问时，请确保外部访问地址与代理头正确，否则 TMDB 会跳回错误的主机。
:::

## 连接测试

| 按钮 | 检查内容 |
| --- | --- |
| 测试连通性 | 请求 TMDB 鉴权接口，判断服务是否可达 |
| 校验密钥 | 调用 `GET /3/authentication`，确认授权码有效 |
| 获取账户信息 | 调用 `GET /3/account/{account_id}`，展示头像与账户资料 |

账户信息依赖 `tmdb_account_id`。如果校验密钥成功但账户信息失败，先检查账户 ID 是否填写，或重新走一次 OAuth 授权。

## 资源检索

页面提供三个标签页，均用于验证集成是否正常：

| 标签页 | 输入 | 可执行操作 |
| --- | --- | --- |
| TMDB 影视 | 关键词 | 点击结果查看详情、剧照与演职员，点「导入」写入影视库 |
| TMDB 演员 | 演员名 | 点击结果查看演员资料，点「导入」写入演员库 |
| TMDB 剧集 | 剧名、首播年份 | 查看剧集详情、季列表与单集，按「导入全部季」或「导入本季」写入剧集库，也可先看「导入预览」 |

- **剧集搜索**受 `tmdb_tv_search` 控制，默认关闭。未开启时后端固定返回「未检索到相关剧集」。
- 「导入预览」只把 TMDB 响应映射为剧集草稿供核对，不写库；真正入库由「导入全部季 / 导入本季」完成。
- 季号 `0` 表示特别篇。

:::warning[搜索开关与详情接口是两回事]
`tmdb_tv_search` 只控制「是否参与剧集检索」。已经拿到剧集 ID 时，详情、季、集接口仍然可用；因此关闭剧集搜索不会影响按 ID 查看或导入单部剧集。
:::

## 常见问题

| 现象 | 处理 |
| --- | --- |
| 校验密钥返回 401 | 授权码错误或已失效，重新获取 OAuth 授权或更换 Token |
| 图像 404 | 检查图像地址与尺寸；留空图像地址让后端自动获取基础地址 |
| 剧集检索始终为空 | 打开「剧集搜索」并保存 |
| 账户信息获取失败 | 检查账户 ID，或重新授权让页面自动写入 |

## 相关页面

[插件总览](/docs/integration/overview) · [TheTVDB](/docs/integration/metadata/tvdb) · [刮削任务](/docs/backend/task/scrape) · [影视](/docs/backend/media/movie) · [常见问题](/docs/faq)
