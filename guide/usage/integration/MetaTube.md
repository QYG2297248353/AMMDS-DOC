---
outline: deep
---

# MetaTube

MetaTube 插件是一个媒体服务器插件，主要用于 Emby 和 Jellyfin 媒体服务器。它从互联网上抓取内容并响应 JSON 数据，然后通过预安装的 MetaTube 插件请求服务器并下载相应的元数据，以与 Jellyfin/Emby 服务器配合使用。

<a-image style="border-radius: 12px" src="/images/usage/integration-metatube-001.png" />

## 配置说明

::: tip 提示
记得及时保存修改的配置哦！

关于 URL 配置，末尾均不要携带 / 作为结束符号。
:::

### 基本配置
- **启用**：是否启用 MetaTube 插件。
- **服务器地址**：MetaTube 插件的服务器地址，以实际部署地址为主。
- **开启鉴权** ：是否开启鉴权。
- **API 密钥**：用于访问 MetaTube 插件的 API 密钥。

### 高级配置
- **优先级**：设置 MetaTube 插件对站点的优先级，已排展示排列顺序为主。
- **自动翻译**：是否自动翻译元数据。
- **翻译服务**：选择翻译服务，如 DeepL、百度翻译等。

| 翻译服务 | 特点 | 支持语言 | 使用说明 |
|---------|------|----------|----------|
| GoogleFree | 免费，无需API密钥 | 多语言支持 | 直接选择即可使用，但可能存在访问限制 |
| Google | 稳定性好，翻译质量高 | 100+种语言 | 需要配置Google API密钥 |
| OpenAI | AI驱动，上下文理解能力强 | 主流语言 | 需要OpenAI API密钥，支持GPT模型 |
| DeepL | 专业翻译质量，适合正式场合 | 29种语言 | 需要DeepL API密钥，有免费和专业版 |
| Baidu | 中文翻译优化，响应快 | 200+种语言 | 需要百度翻译API密钥和应用ID |
| Microsoft | 免费，无需API密钥 | 100+种语言 | 公共服务，可能存在访问限制 |
