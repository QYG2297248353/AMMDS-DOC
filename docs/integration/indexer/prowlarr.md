---
title: Prowlarr
description: 把 Prowlarr 的索引器聚合能力接入 AMMDS：配置服务地址与鉴权密钥，用一条检索接口覆盖多个站点，并了解它在订阅排序中的位置。
keywords: [Prowlarr, 索引器, 索引聚合, API Key, 订阅检索]
tags: []
sidebar_position: 6
---

# Prowlarr

Prowlarr 是索引器与代理管理工具，把多个站点的检索能力聚合成一套 API。接入 AMMDS 后，订阅检索可以只问 Prowlarr 一家，由它去分发给背后的索引器。

{/* truncate */}

## 站点定位

| 项目 | 说明 |
| --- | --- |
| 页面入口 | **集成应用 → 站点资源 → Prowlarr** |
| 集成版本 | 页面顶部标注 `1.28.2+`，类型为「索引器」 |
| 部署形态 | 自建服务，Ammds 只需能访问其地址 |
| 主要用途 | 站点资源索引、订阅检索 |
| 与直连站点的区别 | 直连插件只搜一个站；Prowlarr 一次请求覆盖它配置的全部索引器 |

## 配置项

| 配置键 | 界面名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `prowlarr_enabled` | 启用状态 | 布尔 | `false` | 关闭后不参与检索 |
| `prowlarr_service_url` | 服务地址 | 字符串 | 空 | Prowlarr 访问地址，需带协议，例如 `http://127.0.0.1:9696` |
| `prowlarr_api_key` | 鉴权密钥 | 字符串 | 空 | Prowlarr 的 API Key，随请求头 `X-Api-Key` 提交 |

## 获取鉴权密钥

1. 打开 Prowlarr 管理界面，进入 **Settings → General**。
2. 在「API Key」处复制密钥。
3. 回到 AMMDS 配置页，填到「鉴权密钥」并保存。

:::warning[两个必填项]
「服务地址」和「鉴权密钥」缺一不可。任一为空时检索会直接返回空结果，日志提示「索引器配置不完整」，不会报错打断流程。
:::

## 连接测试

配置页「连接测试」只校验「服务地址」是否可达：能拿到任意 HTTP 响应就算连通。鉴权是否正确，需要看订阅检索能否返回结果。

| 测试 | 覆盖范围 |
| --- | --- |
| 测试连接 | 地址可达性、端口与协议 |
| 订阅检索试搜 | 鉴权与索引器配置是否正确 |

## 在订阅检索中的作用

- **检索实现**：以 `X-Api-Key` 调用 `/api/v1/search`，查询串固定为 `type=search&limit=20&offset=0&categories=6000`。
- **分类限制**：`categories=6000` 表示只取成人分类。如果你在 Prowlarr 侧没有配置支持该分类的索引器，结果会是空的。
- **排序最末**：订阅排序规则中，凡是平台标识以 `Prowlarr` 开头的结果**永远排在最后**。原因是聚合结果可能不经过站点代理，直连链接更可靠。
- **直链优先**：Prowlarr 结果自带种子直链，提交下载时不再二次换取下载地址。
- **缓存**：同一关键字的结果会缓存，重复检索直接回放。

:::tip[适合什么场景]
把 Prowlarr 当作「兜底索引」：直连站点搜不到的番号，再让 Prowlarr 去覆盖它背后的全部索引器。
:::

## 常见问题

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| 测试连接失败 | 地址写错、端口未放通或协议不符 | 确认能从服务器访问 `http://主机:9696` |
| 连接正常但检索始终为空 | API Key 错误，或索引器没有成人分类 | 核对密钥，检查 Prowlarr 索引器分类 |
| 结果总是排在最后 | 这是设计行为 | 直连站点优先，Prowlarr 仅作兜底 |
| 提示索引器配置不完整 | 服务地址或鉴权密钥为空 | 补齐后保存 |

## 相关页面

- [插件集成总览](/docs/integration/overview)
- [M-Team](/docs/integration/indexer/m-team)｜[NexusPHP](/docs/integration/indexer/nexusphp)｜[BitMagnet](/docs/integration/indexer/bitmagnet)
- [订阅检索](/docs/subscribe/search)｜[订阅下载](/docs/subscribe/downloader)
- [网络与连通性](/docs/dashboard/network)｜[常见问题](/docs/faq)
