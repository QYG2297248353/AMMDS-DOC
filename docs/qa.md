---
sidebar_position: 99
sidebar_label: "常见问题"
---

# 常见问题

这里汇总了使用 AMMDS 时常见的问题和解决办法。

## 🚀 部署问题

<details>
  <summary>🔍 日志显示 CPU 不支持 x86-64-v2？</summary>
  
  你设备的 CPU 太老了。可以选择带 `ol8` 标签的镜像来用。
</details>

<details>
  <summary>⌛ 首次部署后为什么没反应？</summary>
  
  第一次部署时，系统要下载和初始化必要的资源文件，需要等一会儿。等几分钟后如果还是没反应，试试刷新页面。
</details>

<details>
  <summary>⏬ 下载资源太慢？</summary>
  
  资源文件比较大，下载慢是正常的。可以试试下面的方法加速：
  - 换个网络环境，比如配置 HTTP_PROXY 和 HTTPS_PROXY 环境变量来加速
  - 手动下载资源，然后重启应用
</details>

<details>
  <summary>📁 监控目录注册失败（系统监控文件夹出问题了），启动后马上退出？</summary>
  
  这通常是配置文件或环境变量没设对导致的。请检查配置文件和环境变量是否正确。
  
  如果你看到下面这些日志：
  ```
  Error creating bean with name 'directoryWatcherService': Instantiation of supplied bean failed
  User limit of inotify instances reached or too many open files
  User limit of inotify watches reached
  ```
  
  试试增加系统的 inotify 限制：
  ```bash
  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
  echo fs.inotify.max_user_instances=524288 | sudo tee -a /etc/sysctl.conf
  sudo sysctl -p
  ```
</details>

---

## 💡 使用问题

<details>
  <summary>🖱️ 点了菜单没反应？</summary>
  
  可能是页面卡住了，或者资源没加载完。先试试刷新页面。如果还是不行，看看浏览器控制台有没有报错。
</details>

<details>
  <summary>⚪ 打开后是白屏？</summary>
  
  通常是网络资源没加载完全导致的。试试刷新页面。如果还是不行，检查浏览器控制台有没有报错。建议保持网络稳定，别让网络波动太大。
</details>

<details>
  <summary>☁️ 怎么挂载云盘上的 .strm 文件？</summary>
  
  云盘用户可以先通过 Alist、alist-strm、NetMount 等工具把云盘文件挂载成本地的 .strm 文件，然后再挂载到应用中。
  
  在扫描配置里，把媒体识别类型设为 `strm`，就能扫描本地的 .strm 文件了。
</details>

<details>
  <summary>🌍 时区不对，系统时间错了？</summary>
  
  这通常是应用的时区和服务器时区没对上导致的。请检查时区设置是否正确。
  
  - 如果配了 TZ 环境变量，确保设的是正确的时区
  - 如果用网络代理，确保代理服务器的时区跟服务器一致
  - 如果用 Docker 部署，确保容器时区设置正确
  
  注意，你的网络得能访问互联网，不然没法自动检测时区。
  
  如果用代理网络，避免使用 suning.com、taobao.com、meituan.com 这类国内域名。
</details>

<details>
  <summary>🔌 [Metatube] 404（未找到）</summary>
  
  检查 MetaTube 插件的服务器地址有没有配对。如果用自定义域名，确保域名解析正确。如果用反向代理，确保代理配置没问题。再看看 MetaTube 容器日志是否正常，有没有报错。
  
  参考 [MetaTube 插件配置文档](https://ammds.lifebus.top/guide/plugins/metatube/)。
</details>
