---
sidebar_position: 2
sidebar_label: "ThePornDB"
---

# ThePornDB

ThePornDB 是一款专业的成人视频元数据管理工具，主要用于重命名视频文件，确保 Plex、Jellyfin 等媒体服务器插件和 Stash 脚本能够自动匹配元数据，无需用户手动干预。该工具支持服务器模式和命令行模式运行，为媒体库管理提供高效解决方案。

官网：[https://theporndb.net/](https://theporndb.net/)

<!-- truncate -->

## 核心特性

- 🎯 **自动匹配**：智能识别视频文件，自动匹配对应元数据
- 🔧 **多模式运行**：支持服务器模式和命令行模式
- 🌍 **多平台兼容**：与 Plex、Jellyfin 等主流媒体服务器无缝集成
- 📦 **丰富数据源**：提供全面的视频元数据信息
- 🔗 **Stash-Box 支持**：兼容 Stash-Box 元数据管理系统

# Stash-Box

Stash-Box 是一个基于 Go 语言开发的自托管元数据管理系统，专为组织和提供多样化的内容集合而设计，同时满足 SFW（安全内容）和 NSFW（成人内容）的管理需求。

官网：[https://docs.stashapp.cc/](https://docs.stashapp.cc/)

## 插件配置

### 前置条件

在配置插件前，需完成以下准备工作：

#### ThePornDB

##### 账户注册

访问 ThePornDB 官方注册页面完成账户创建：

- 注册地址：[https://theporndb.net/register](https://theporndb.net/register)

![ThePornDB 账户注册](/img/plugin/theporndb-04.png)

##### API 密钥获取

注册完成后，登录账户并获取 API 密钥：

- API 密钥获取地址：[https://theporndb.net/user/api-tokens](https://theporndb.net/user/api-tokens)

#### Stash-Box

Stash-Box 是 Stash 项目的元数据管理组件，提供标准化的元数据存储和检索服务：

##### 官方实例

访问 Stash-Box 官方文档，查看支持的公共实例：

- 实例列表：[https://docs.stashapp.cc/metadata-sources/stash-box-instances/](https://docs.stashapp.cc/metadata-sources/stash-box-instances/)

:::info 实例说明
在该页面可以看到 Stash-Box 支持的公共站点，包括 ThePornDB。你也可以根据官方文档自行部署私有 Stash-Box 实例。
:::

:::tip 兼容性提示
ThePornDB 同时支持作为 Stash-Box 客户端使用，提供更丰富的元数据获取能力。
:::

![Stash-Box 配置](/img/plugin/theporndb-05.png)

##### API 密钥获取

登录选定的 Stash-Box 实例，在用户设置中生成并获取 API 密钥，用于后续客户端配置。

### 配置信息

在 AMMDS 管理界面中，通过「集成应用」→「元数据」→「ThePornDB」进入配置页面。

![ThePornDB 插件配置](/img/plugin/theporndb-01.png)

#### 基本配置参数

| 参数 | 说明 | 默认值 | 建议 |
|------|------|--------|------|
| 启动状态 | 控制是否启用 ThePornDB 插件 | 关闭 | 根据实际需求开启 |
| 服务地址 | ThePornDB 服务的访问地址 | `https://theporndb.net` | 官方地址稳定可靠，无需修改 |
| 密钥 | ThePornDB API 密钥，用于服务鉴权 | - | 填写从官方站点获取的 API 密钥 |

![ThePornDB 高级配置](/img/plugin/theporndb-02.png)

#### 高级配置参数

| 参数 | 说明 | 默认值 | 建议 |
|------|------|--------|------|
| 感知哈希计算 | 是否启用视频感知哈希计算功能 | 开启 | 依赖原始视频文件，非常规视频文件建议关闭 |
| 模糊匹配 | 是否通过文件名进行模糊匹配 | 关闭 | 感知哈希计算关闭时建议开启 |

:::info 配置说明
- 感知哈希计算可提高识别准确率，但会增加系统资源消耗
- 模糊匹配适用于文件名规范但视频文件特殊的场景
:::

### Stash 客户端

通过配置 Stash-Box 客户端，可以获取更丰富的元数据信息：

#### 添加客户端

点击「添加客户端」按钮，进入 Stash-Box 客户端配置界面：

![Stash-Box 客户端配置](/img/plugin/theporndb-03.png)

#### 配置参数

| 参数 | 说明 | 配置建议 |
|------|------|----------|
| 是否启用 | 控制该 Stash-Box 客户端是否生效 | 根据实际需求开启 |
| 客户端名称 | 自定义客户端标识名称 | 建议使用站点名称，便于识别 |
| GraphQL 地址 | Stash-Box 站点的 API 访问地址 | 下拉选择或手动输入完整 URL |
| API 密钥 | Stash-Box 站点的访问密钥 | 填写从对应站点获取的 API 密钥 |

#### 配置方法

1. **选择预设站点**：在客户端名称下拉列表中选择官方预设的 Stash-Box 站点，系统会自动填充 GraphQL 地址
2. **手动配置**：如需添加自定义 Stash-Box 实例，可手动输入以下信息：
   - GraphQL 地址：通常为 `https://{site}/graphql` 格式
   - API 密钥：在对应 Stash-Box 站点的用户设置中生成

:::tip 配置建议
- 建议添加多个 Stash-Box 客户端以获取更全面的元数据
- 优先级顺序会影响元数据获取顺序，可根据需求调整
:::

### 测试模块

测试模块提供以下功能，用于验证插件配置和服务状态：

#### 测试功能

| 功能 | 说明 | 作用 |
|------|------|------|
| 测试连接 | 验证 ThePornDB 服务地址的网络连通性 | 确认网络连接正常，服务地址可达 |
| 获取用户信息 | 尝试获取并展示 ThePornDB 账户信息 | 验证 API 密钥是否正确，服务授权是否成功 |

#### 使用建议

- **配置前测试**：在保存配置前，建议先测试连接状态，确保服务地址正确
- **API 密钥验证**：通过获取用户信息功能，验证 API 密钥的有效性
- **故障排查**：当元数据获取失败时，可通过测试功能快速定位问题

:::info 测试说明
- 测试连接仅验证网络连通性，不保证服务状态正常
- 获取用户信息需要有效的 API 密钥和网络连接
:::

## 常见问题

### 服务连接失败

**可能原因**：
- 网络连接问题
- 服务地址配置错误
- API 密钥无效

**解决方案**：
- 检查网络连接是否正常
- 验证服务地址格式是否正确
- 确认 API 密钥是否过期或错误
- 尝试使用官方默认服务地址

### 元数据获取失败

**可能原因**：
- 视频文件命名不规范
- 感知哈希计算失败
- 数据源站点暂时不可用

**解决方案**：
- 启用模糊匹配功能
- 检查视频文件格式是否支持
- 尝试更换 Stash-Box 客户端
- 稍后重试获取操作

### Stash-Box 客户端配置错误

**可能原因**：
- GraphQL 地址格式错误
- API 密钥权限不足
- 站点访问限制

**解决方案**：
- 验证 GraphQL 地址是否包含完整路径
- 确保 API 密钥具有足够权限
- 检查网络环境是否支持访问该站点
- 尝试使用其他 Stash-Box 实例

### 性能问题

**可能原因**：
- 感知哈希计算占用系统资源
- 多客户端同时请求
- 网络延迟较高

**解决方案**：
- 对于性能受限的设备，考虑关闭感知哈希计算
- 合理配置客户端优先级，避免同时请求
- 选择网络延迟较低的 Stash-Box 实例

:::tip 最佳实践
- 定期更新 API 密钥，确保安全性
- 仅添加必要的 Stash-Box 客户端，避免资源浪费
- 结合使用 ThePornDB 和 Stash-Box，获取更全面的元数据
:::