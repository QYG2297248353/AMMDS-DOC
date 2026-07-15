---
slug: plugin-development-intro
title: AMMDS 插件开发入门指南
authors: [ms]
tags: [plugin, tutorial, guide]
date: 2026-06-15
---

## 插件体系架构概述

AMMDS 的插件体系是整个平台的核心扩展机制。通过插件，AMMDS 可以对接各种数据源、媒体服务器和通知服务，实现功能的无限扩展。

插件系统采用 **Go Plugin 机制** 实现，插件以独立的二进制文件或共享库形式存在，通过明确定义的接口与 AMMDS 核心通信。每个插件都是一个独立的模块，可以单独开发、测试、部署和更新。

AMMDS 的插件架构分为三层：

```
┌─────────────────────────────────────────┐
│            AMMDS Core Engine              │
│  ┌──────────┬──────────┬──────────────┐ │
│  │ 插件管理器 │ 任务调度器 │ 数据持久层   │ │
│  └─────┬────┴─────┬────┴──────┬───────┘ │
│        │          │           │         │
│  ┌─────▼──────────▼───────────▼───────┐ │
│  │        插件运行时环境 (Sandbox)      │ │
│  │  ┌──────┐ ┌──────┐ ┌──────┐      │ │
│  │  │ 插件A │ │ 插件B │ │ 插件C │ ...  │ │
│  │  └──────┘ └──────┘ └──────┘      │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

{/* truncate */}

## 插件类型

AMMDS 目前定义了四种插件类型，每种类型有独立的接口和生命周期：

### 1. 刮削插件（Scraper Plugin）

刮削插件负责从各类数据源获取影视资源的元数据。这是 AMMDS 最核心、也是开发门槛最低的插件类型。刮削插件需要实现数据的检索和详情获取两个基本功能。

**接口定义**：

```go
type ScraperPlugin interface {
    // 插件基本信息
    Info() PluginInfo
    
    // 根据关键词搜索资源
    Search(ctx context.Context, query SearchQuery) ([]SearchResult, error)
    
    // 获取资源详情
    Scrape(ctx context.Context, result SearchResult) (*Metadata, error)
}
```

### 2. 媒体服务器插件（Media Server Plugin）

媒体服务器插件负责 AMMDS 与各类媒体服务器（如 Emby、Jellyfin）之间的数据同步。这类插件通常需要实现媒体库扫描、元数据推送和状态同步等功能。

### 3. 站点检索插件（Site Search Plugin）

站点检索插件面向 PT 站点用户，为 AMMDS 提供在指定站点中检索资源的能力。这类插件通常需要处理站点认证、Cookie 管理和结果解析。

### 4. 推送通知插件（Notification Plugin）

推送通知插件是最简单的插件类型，负责将 AMMDS 的系统通知推送到用户指定的渠道（如 Telegram、WebHook 等）。

## 开发环境准备

开发 AMMDS 插件需要以下环境：

1. **Go 语言开发环境**（1.21 或更高版本）
2. **AMMDS 开发工具包**：从 GitHub 仓库获取 SDK 包
3. **Docker**（可选）：用于在隔离环境中测试插件
4. **IDE 或文本编辑器**：推荐 VS Code + Go 扩展

**初始化项目结构**：

```bash
mkdir my-scraper-plugin
cd my-scraper-plugin
go mod init github.com/yourname/my-scraper-plugin
```

**引入 AMMDS SDK**：

```bash
go get github.com/mengshou/ammds-plugin-sdk@latest
```

## 编写一个简单的刮削插件

下面我们通过一个完整的示例，演示如何编写一个刮削插件。这个插件将从自定义数据源中获取影视资源的元数据。

### 第一步：定义插件结构

```go
package main

import (
    "context"
    "encoding/json"
    "fmt"
    "net/http"
    "net/url"
    
    "github.com/mengshou/ammds-plugin-sdk/scraper"
)

// 插件实例
type MyScraper struct {
    client *http.Client
    config Config
}

// 插件配置
type Config struct {
    BaseURL string `json:"base_url"`
    APIKey  string `json:"api_key"`
}
```

### 第二步：实现插件接口

```go
// 插件信息
func (m *MyScraper) Info() scraper.PluginInfo {
    return scraper.PluginInfo{
        Name:        "My Custom Scraper",
        Version:     "1.0.0",
        Description: "从自定义数据源获取元数据",
        Author:      "Your Name",
        PluginType:  scraper.TypeScraper,
    }
}

// 搜索资源
func (m *MyScraper) Search(ctx context.Context, query scraper.SearchQuery) ([]scraper.SearchResult, error) {
    u, _ := url.Parse(m.config.BaseURL + "/api/search")
    q := u.Query()
    q.Set("keyword", query.Keyword)
    q.Set("type", string(query.MediaType))
    u.RawQuery = q.Encode()
    
    req, _ := http.NewRequestWithContext(ctx, "GET", u.String(), nil)
    req.Header.Set("Authorization", "Bearer "+m.config.APIKey)
    
    resp, err := m.client.Do(req)
    if err != nil {
        return nil, fmt.Errorf("搜索请求失败: %w", err)
    }
    defer resp.Body.Close()
    
    var results []scraper.SearchResult
    if err := json.NewDecoder(resp.Body).Decode(&results); err != nil {
        return nil, err
    }
    return results, nil
}

// 获取详情
func (m *MyScraper) Scrape(ctx context.Context, result scraper.SearchResult) (*scraper.Metadata, error) {
    u := m.config.BaseURL + "/api/detail/" + result.ID
    
    req, _ := http.NewRequestWithContext(ctx, "GET", u, nil)
    req.Header.Set("Authorization", "Bearer "+m.config.APIKey)
    
    resp, err := m.client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    var metadata scraper.Metadata
    if err := json.NewDecoder(resp.Body).Decode(&metadata); err != nil {
        return nil, err
    }
    return &metadata, nil
}
```

### 第三步：插件初始化函数

每个插件都需要提供一个 `NewPlugin` 函数，AMMDS 插件管理器会在加载插件时调用它：

```go
// 插件创建函数
func NewPlugin(config json.RawMessage) (scraper.Scraper, error) {
    var cfg Config
    if err := json.Unmarshal(config, &cfg); err != nil {
        return nil, fmt.Errorf("解析配置失败: %w", err)
    }
    
    if cfg.BaseURL == "" {
        cfg.BaseURL = "https://api.example.com"
    }
    
    return &MyScraper{
        client: &http.Client{Timeout: 30 * time.Second},
        config: cfg,
    }, nil
}
```

### 第四步：编译插件

```bash
# 编译为共享库
go build -buildmode=plugin -o my-scraper.so .
```

编译完成后，将生成的 `.so` 文件放置到 AMMDS 的插件目录中，即可在管理界面中启用。

## 测试和调试

### 单元测试

使用 AMMDS SDK 提供的测试工具包进行单元测试：

```go
func TestMyScraper_Search(t *testing.T) {
    // 创建一个模拟 HTTP 服务器
    server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        w.Write([]byte(`[{"id":"123","title":"Test Movie","year":2026}]`))
    }))
    defer server.Close()
    
    // 创建插件实例
    plugin, _ := NewPlugin(json.RawMessage(
        fmt.Sprintf(`{"base_url":"%s"}`, server.URL),
    ))
    
    results, err := plugin.Search(context.Background(), scraper.SearchQuery{
        Keyword: "test",
    })
    if err != nil {
        t.Fatalf("Search failed: %v", err)
    }
    if len(results) != 1 {
        t.Fatalf("expected 1 result, got %d", len(results))
    }
}
```

### 本地调试

AMMDS 提供了开发者模式，可以在本地加载未编译的插件进行调试：

```bash
# 启动 AMMDS 并加载本地插件
ammds --dev --plugin-dir ./my-scraper-plugin
```

在开发者模式下，AMMDS 会输出详细的插件加载日志和调试信息，方便排查问题。

### 日志调试

在插件代码中使用标准日志输出：

```go
import "log"

func (m *MyScraper) Search(ctx context.Context, query scraper.SearchQuery) ([]scraper.SearchResult, error) {
    log.Printf("[MyScraper] 搜索关键词: %s", query.Keyword)
    // ... 业务逻辑
}
```

这些日志会被 AMMDS 的日志系统捕获，并显示在管理面板的日志页面中。

## 发布流程和社区分享

当你的插件开发完成并通过测试后，可以通过以下方式发布和分享：

### 1. 提交至官方插件库

将插件代码开源，并向 [AMMDS 插件仓库](https://github.com/mengshou/ammds-plugins) 提交 Pull Request。合并后，你的插件将出现在 AMMDS 官方插件列表中，所有用户都可以直接在管理面板中安装。

**提交要求**：
- 插件必须通过单元测试
- 提供完整的 README 文档（包括配置说明、支持的资源类型等）
- 遵循 AMMDS 的插件命名规范（`scraper-xxx`、`server-xxx`、`search-xxx`、`notify-xxx`）

### 2. 社区分享

在 AMMDS 社区论坛、GitHub Discussions 或相关技术社区中分享你的插件。建议提供：
- 插件功能介绍
- 安装和使用说明
- 配置示例

### 3. 版本管理

建议使用语义化版本号（SemVer）管理插件版本。AMMDS 会自动检查插件版本更新，并在新版本可用时提示用户升级。

## 最佳实践

1. **错误处理**：所有可能出错的步骤都需要返回有意义的错误信息，方便用户排查
2. **超时控制**：使用 `context.Context` 控制请求超时，避免插件长时间阻塞 AMMDS 主进程
3. **资源释放**：确保所有 HTTP 连接、文件句柄等资源在插件卸载时正确释放
4. **配置验证**：在 `NewPlugin` 函数中对配置进行完整验证，给出清晰的配置错误提示
5. **兼容性**：插件应尽量兼容 AMMDS 的早期版本，或在文档中明确标注兼容的最低版本

## 结语

AMMDS 的插件体系为开发者提供了一个灵活、高效的扩展平台。无论是为自己定制一个特定的刮削源，还是为社区贡献一个通用的功能插件，开发过程都相当直观和便捷。

我们期待看到社区开发者的创意和贡献。如果你在开发过程中遇到问题，欢迎在 GitHub 上提交 Issue 或加入社区群聊交流。让我们一起繁荣 AMMDS 的插件生态！
