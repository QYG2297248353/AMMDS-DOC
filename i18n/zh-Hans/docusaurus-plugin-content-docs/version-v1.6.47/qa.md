---
sidebar_position: 99
sidebar_label: "常见问题"
---

# 常见问题

使用过程中常见的问题。

<!-- truncate -->

## 🚀 部署问题

<details>
  <summary>🔍 日志显示 CPU 不支持 x86-64-v2？</summary>
  
  您设备的 CPU 太旧了。您可以选择带有 `ol8` 标签的镜像。
</details>

<details>
  <summary>⌛ 首次部署后为什么没有响应？</summary>
  
  首次部署时，系统需要下载并初始化必要的资源文件，这需要一些时间。请等待几分钟。如果仍然没有响应，请尝试刷新页面。
</details>

<details>
  <summary>⏬ 资源下载很慢？</summary>
  
  由于资源文件较大，下载速度可能会很慢。您可以尝试以下方法来加速：
  - 更改网络环境，例如配置 HTTP_PROXY 和 HTTPS_PROXY 环境变量来加速网络
  - 手动下载资源并重启应用
</details>

<details>
  <summary>📁 监控目录注册失败，启动立即退出？</summary>
  
  这通常是由于配置文件或环境变量不正确导致的。请检查应用程序的配置文件是否正确，并确保环境变量设置正确。
  
  如果您看到以下日志：
  ```
  Error creating bean with name 'directoryWatcherService': Instantiation of supplied bean failed
  User limit of inotify instances reached or too many open files
  User limit of inotify watches reached
  ```
  
  请尝试增加系统的 inotify 实例限制：
  ```bash
  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
  echo fs.inotify.max_user_instances=524288 | sudo tee -a /etc/sysctl.conf
  sudo sysctl -p
  ```
</details>

---

## 💡 使用问题

<details>
  <summary>🖱️ 点击菜单时为什么没有响应？</summary>
  
  这通常是由于页面暂时卡住或资源未完全加载导致的。尝试刷新页面。如果问题仍然存在，请检查浏览器控制台是否有错误消息。
</details>

<details>
  <summary>⚪ 打开后为什么是白屏？</summary>
  
  这通常是由于网络资源加载不完全导致的。尝试刷新页面。如果问题仍然存在，请检查浏览器控制台是否有错误消息。建议保持网络连接稳定，避免网络波动。
</details>

<details>
  <summary>☁️ 如何挂载云盘 .strm 文件？</summary>
  
  云盘用户可以先通过 Alist、alist-strm、NetMount 等工具将云盘文件本地挂载为 .strm 文件，然后将其挂载到应用程序中。
  
  在扫描配置中，添加媒体识别类型为 `strm` 以扫描本地 .strm 文件。
</details>

<details>
  <summary>🌍 时区错误，系统时间不正确？</summary>
  
  这通常是由于应用程序的时区与服务器的时区不一致导致的。请检查应用程序的时区设置是否正确，并确保它们与服务器的时区一致。
  
  - 如果您配置了 TZ 环境变量，请将其设置为正确的时区
  - 如果您使用网络代理，请确保代理服务器的时区与服务器的时区一致
  - 如果您使用 Docker 部署，请确保 Docker 容器的时区设置正确
  
  请注意，您的网络应该能够访问互联网，否则无法执行自动时区检测。
  
  对于代理网络，请避免使用：suning.com、taobao.com、meituan.com 等国内代理域名。
</details>

<details>
  <summary>🔌 [Metatube] 404 (未找到)</summary>
  
  请检查 MetaTube 插件的服务器地址是否配置正确。如果您使用自定义域名，请确保域名解析正确。如果您使用反向代理，请确保反向代理配置正确。检查 MetaTube 容器日志是否正常，确保没有错误消息。
  
  请参考 [MetaTube 插件配置文档](https://ammds.lifebus.top/guide/plugins/metatube/)。
</details>