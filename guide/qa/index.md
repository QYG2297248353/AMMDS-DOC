---
outline: deep
---

# 常见问题

遇到问题，请优先查看运行日志。

## 部署相关

::: details 日志提示 `CPU does not support x86-64-v2` ？
说明您设备的 `CPU` 版本过于陈旧。您可以选择标签中带有 `ol8` 字样的镜像。
:::

::: details 为什么首次部署后，页面没有任何反应？
首次部署时，系统需要下载并初始化必要的资源文件，这个过程需要一定时间。请耐心等待几分钟，如果仍然没有响应，可以尝试刷新页面。
:::

::: details 下载资源特别慢？
由于资源文件较大，下载速度可能会比较慢。您可以尝试以下方法来加快下载速度：
- 更换网络环境，例如配置环境变量 HTTP_PROXY 与 HTTPS_PROXY 加速网络。
- 通过手动下载资源后，重启应用。
:::

::: details 监控目录注册失败，启动一半立即退出？
这种情况通常是由于应用的配置文件或环境变量错误导致的。请检查应用的配置文件是否正确，并确保环境变量设置正确。

如果您有在运行日志中看到以下日志：
+ `Error creating bean with name 'directoryWatcherService': Instantiation of supplied bean failed`
+ `ser limit of inotify instances reached or too many open files`
+ `User limit of inotify watches reached`

请尝试增加系统的 inotify 实例限制。
```bash
# 增加 inotify 实例限制
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
echo fs.inotify.max_user_instances=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```


:::

## 使用相关

::: details 为什么点击菜单，没有任何反应？
这种情况通常是由于页面暂时卡住或者资源加载不完整导致的。请尝试刷新页面，如果问题仍然存在，可以检查浏览器控制台是否有错误信息。
:::

::: details 为什么打开后是白屏
这种情况通常是由于网页资源加载不完整导致的。请尝试刷新页面，如果问题仍然存在，可以检查浏览器控制台是否有错误信息。
建议保持网络畅通，避免网络波动导致的问题。
:::

::: details 如何挂载云盘 .strm 文件
云盘用户可以通过 Alist、alist-strm、NetMount 等方式，先将云盘文件挂载至本地(.strm)，再将其挂载至应用中来。
在扫描配置中，添加媒体识别类型为 strm，即可扫描到本地的.strm 文件。
:::

::: details 提示时区错误，提示系统时间不正确
这种情况通常是由于应用的时区与服务器的时区不一致导致的。请检查应用的时区设置是否正确，并确保与服务器的时区一致。
1. 如果您配置了环境变量 TZ，则需要将其设置为正确的时区。
2. 如果您配置网络代理，请确保代理服务器的时区与服务器的时区一致。
3. 如果您使用的是 Docker 部署，请确保 Docker 容器的时区设置正确。
请注意您的网络可以访问互联网，否则无法进行时区的自动检测。
代理网络请注意避开：`suning.com`, `taobao.com`, `meituan.com` 等国内代理域名。
:::


::: details [Metatube] 404 (Not Found)
检查 MetaTube 插件的服务器地址是否配置正确。

如果您使用了自定义域名，请确保域名解析正确。

如果您使用了反向代理，请确保反向代理配置正确。

请检查 MetaTube 容器的日志是否正常，确保没有错误信息。

请查看 [MetaTube 插件配置](/guide/usage/integration/MetaTube) 文档。
:::
