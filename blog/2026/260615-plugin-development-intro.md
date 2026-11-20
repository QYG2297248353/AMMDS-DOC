---
slug: plugin-development-intro
title: AMMDS 插件开发入门指南
authors: [ms]
tags: [plugin, tutorial, guide]
date: 2026-06-15
---

## 插件体系架构概述

AMMDS 的插件体系是整个平台的核心扩展机制。通过插件，AMMDS 可以对接各种数据源、媒体服务器和通知服务，实现功能的无限扩展。

插件系统采用 **SPI（Service Provider Interface）机制** 实现，插件以独立的 JAR 包形式存在，通过明确定义的接口与 AMMDS 核心通信。每个插件都是一个独立的模块，可以单独开发、测试、部署和更新。

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

```java
public interface ScraperPlugin {
    // 插件基本信息
    PluginInfo getInfo();
    
    // 根据关键词搜索资源
    List<SearchResult> search(SearchQuery query);
    
    // 获取资源详情
    Metadata scrape(SearchResult result);
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

1. **JDK 17 或更高版本**（推荐 GraalVM JDK 21）
2. **Apache Maven 3.8+** 或 Gradle 8+
3. **AMMDS 插件 SDK**：从 Maven 中央仓库获取
4. **IDE 或文本编辑器**：推荐 IntelliJ IDEA 或 VS Code + Java 扩展

**初始化 Maven 项目结构**：

通过 Maven Archetype 快速创建插件项目：

```bash
mvn archetype:generate \
    -DarchetypeGroupId=com.ammds \
    -DarchetypeArtifactId=ammds-plugin-archetype \
    -DarchetypeVersion=1.0.0 \
    -DgroupId=com.example \
    -DartifactId=my-scraper-plugin \
    -Dversion=1.0.0
```

或在 `pom.xml` 中手动引入 AMMDS SDK：

```xml
<dependency>
    <groupId>com.ammds</groupId>
    <artifactId>ammds-plugin-sdk</artifactId>
    <version>1.0.0</version>
</dependency>
```

## 编写一个简单的刮削插件

下面我们通过一个完整的示例，演示如何编写一个刮削插件。这个插件将从自定义数据源中获取影视资源的元数据。

### 第一步：定义插件结构

```java
package com.example;

import com.ammds.sdk.scraper.*;
import java.net.http.HttpClient;

public class MyScraper implements ScraperPlugin {
    private final HttpClient client;
    private final Config config;
    
    public MyScraper(Config config) {
        this.client = HttpClient.newHttpClient();
        this.config = config;
    }
    
    // 插件配置类
    public static class Config {
        private String baseUrl;
        private String apiKey;
        
        // getters and setters
        public String getBaseUrl() { return baseUrl; }
        public void setBaseUrl(String baseUrl) { this.baseUrl = baseUrl; }
        public String getApiKey() { return apiKey; }
        public void setApiKey(String apiKey) { this.apiKey = apiKey; }
    }
}
```

### 第二步：实现插件接口

```java
// 插件信息
@Override
public PluginInfo getInfo() {
    PluginInfo info = new PluginInfo();
    info.setName("My Custom Scraper");
    info.setVersion("1.0.0");
    info.setDescription("从自定义数据源获取元数据");
    info.setAuthor("Your Name");
    info.setPluginType(PluginType.SCRAPER);
    return info;
}

// 搜索资源
@Override
public List<SearchResult> search(SearchQuery query) {
    String url = config.getBaseUrl() + "/api/search?keyword=" 
        + query.getKeyword() + "&type=" + query.getMediaType();
    
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .header("Authorization", "Bearer " + config.getApiKey())
        .GET()
        .build();
    
    try {
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        // 使用 Jackson 或 Gson 解析 JSON 响应
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(response.body(), 
            new TypeReference<List<SearchResult>>() {});
    } catch (Exception e) {
        throw new RuntimeException("搜索请求失败: " + e.getMessage(), e);
    }
}

// 获取详情
@Override
public Metadata scrape(SearchResult result) {
    String url = config.getBaseUrl() + "/api/detail/" + result.getId();
    
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .header("Authorization", "Bearer " + config.getApiKey())
        .GET()
        .build();
    
    try {
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(response.body(), Metadata.class);
    } catch (Exception e) {
        throw new RuntimeException("获取详情失败", e);
    }
}
```

### 第三步：插件初始化工厂

每个插件都需要提供一个工厂类，AMMDS 插件管理器会通过 SPI 机制加载它：

```java
package com.example;

import com.ammds.sdk.spi.PluginFactory;
import com.ammds.sdk.scraper.ScraperPlugin;

public class MyScraperFactory implements PluginFactory<ScraperPlugin> {
    
    @Override
    public ScraperPlugin create(Map<String, String> config) {
        MyScraper.Config cfg = new MyScraper.Config();
        cfg.setBaseUrl(config.getOrDefault("base_url", "https://api.example.com"));
        cfg.setApiKey(config.get("api_key"));
        return new MyScraper(cfg);
    }
    
    @Override
    public String getPluginType() {
        return "scraper";
    }
}
```

然后在 `META-INF/services/com.ammds.sdk.spi.PluginFactory` 文件中注册：

```
com.example.MyScraperFactory
```

### 第四步：编译插件

```bash
# 使用 Maven 打包为 JAR
mvn clean package
```

编译完成后，将生成的 `target/my-scraper-plugin-1.0.0.jar` 文件放置到 AMMDS 的插件目录中，即可在管理界面中启用。

## 测试和调试

### 单元测试

使用 AMMDS SDK 提供的测试工具包进行单元测试：

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.List;

public class MyScraperTest {
    
    @Test
    void testSearch() {
        // 创建测试配置
        MyScraper.Config config = new MyScraper.Config();
        config.setBaseUrl("https://api.example.com");
        config.setApiKey("test-key");
        
        // 创建插件实例
        MyScraper scraper = new MyScraper(config);
        
        // 执行搜索
        SearchQuery query = new SearchQuery();
        query.setKeyword("test");
        List<SearchResult> results = scraper.search(query);
        
        // 验证结果
        assertNotNull(results);
    }
}
```

### 本地调试

AMMDS 提供了开发者模式，可以在本地加载未编译的插件进行调试：

```bash
# 启动 AMMDS 并加载本地插件目录
ammds --dev --plugin-dir ./my-scraper-plugin/target
```

在开发者模式下，AMMDS 会输出详细的插件加载日志和调试信息，方便排查问题。

### 日志调试

在插件代码中使用标准日志输出：

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyScraper implements ScraperPlugin {
    private static final Logger log = LoggerFactory.getLogger(MyScraper.class);
    
    @Override
    public List<SearchResult> search(SearchQuery query) {
        log.info("[MyScraper] 搜索关键词: {}", query.getKeyword());
        // ... 业务逻辑
    }
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
