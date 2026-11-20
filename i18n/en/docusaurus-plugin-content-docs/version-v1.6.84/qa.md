---
sidebar_position: 99
sidebar_label: "Q&A"
title: "FAQ"
description: "A collection of common deployment and usage questions and solutions when using AMMDS, including Docker deployment, system configuration, and plugin integration troubleshooting."
keywords: [AMMDS, FAQ, troubleshooting, deployment issues, Q&A]
tags: [faq]
---

# Q&A

Here's a collection of common questions and solutions when using AMMDS.

## 🚀 Deployment Issues

<details>
  <summary>🔍 Log shows CPU does not support x86-64-v2?</summary>
  
  Your device's CPU is too old. You can use images with the `ol8` tag instead.
</details>

<details>
  <summary>⌛ No response after the first deployment?</summary>
  
  On the first deployment, the system needs to download and initialize necessary resource files. Please wait a few minutes. If there's still no response after a while, try refreshing the page.
</details>

<details>
  <summary>⏬ Resource download is very slow?</summary>
  
  The resource files are quite large, so slow downloads are normal. Here are some ways to speed it up:
  - Change your network environment, e.g., configure HTTP_PROXY and HTTPS_PROXY environment variables to speed things up
  - Manually download the resources and restart the app
</details>

<details>
  <summary>📁 Directory monitoring registration failed, and the app exits right after starting?</summary>
  
  This is usually caused by incorrect configuration files or environment variables. Please check if your configuration files and environment variables are set correctly.
  
  If you see the following logs:
  ```
  Error creating bean with name 'directoryWatcherService': Instantiation of supplied bean failed
  User limit of inotify instances reached or too many open files
  User limit of inotify watches reached
  ```
  
  Try increasing the system's inotify limits:
  ```bash
  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
  echo fs.inotify.max_user_instances=524288 | sudo tee -a /etc/sysctl.conf
  sudo sysctl -p
  ```
</details>

---

## 💡 Usage Issues

<details>
  <summary>🖱️ Clicking the menu does nothing?</summary>
  
  The page might be stuck, or the resources haven't finished loading. Try refreshing the page first. If it still doesn't work, check the browser console for error messages.
</details>

<details>
  <summary>⚪ White screen after opening?</summary>
  
  This is usually caused by incomplete loading of web resources. Try refreshing the page. If the problem persists, check the browser console for errors. It's recommended to keep a stable network connection.
</details>

<details>
  <summary>☁️ How to mount .strm files from cloud drives?</summary>
  
  Cloud drive users can first mount cloud drive files locally as .strm files using tools like Alist, alist-strm, or NetMount, and then mount them to the app.
  
  In the scan configuration, set the media recognition type to `strm`, and it will scan local .strm files.
</details>

<details>
  <summary>🌍 Wrong timezone, system time is incorrect?</summary>
  
  This usually happens because the app's timezone doesn't match the server's timezone. Please check if the timezone settings are correct.
  
  - If you configured a TZ environment variable, make sure it's set to the correct timezone
  - If using a network proxy, ensure the proxy server's timezone matches the server's timezone
  - If using Docker deployment, make sure the container's timezone is set correctly
  
  Note that your network needs to be able to access the internet, otherwise automatic timezone detection won't work.
  
  If using a proxy network, avoid domestic proxy domains like suning.com, taobao.com, meituan.com.
</details>

<details>
  <summary>🔌 [Metatube] 404 (Not Found)</summary>
  
  Check if the MetaTube plugin's server address is configured correctly. If using a custom domain, make sure domain resolution is correct. If using a reverse proxy, ensure the proxy configuration is correct. Check the MetaTube container logs for any errors.
  
  Refer to the [MetaTube plugin configuration docs](https://ammds.lifebus.top/guide/plugins/metatube/).
</details>
