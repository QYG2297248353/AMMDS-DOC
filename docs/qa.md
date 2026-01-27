---
sidebar_position: 99
sidebar_label: "Q&A"
---

# Q&A

Problems frequently encountered during use.

<!-- truncate -->

## 🚀 Deployment Issues

<details>
  <summary>🔍 Log shows CPU does not support x86-64-v2?</summary>
  
  Your device's CPU is too old. You can choose images with the `ol8` tag.
</details>

<details>
  <summary>⌛ Why is there no response after the first deployment?</summary>
  
  During the first deployment, the system needs to download and initialize necessary resource files, which takes some time. Please wait a few minutes. If there's still no response, try refreshing the page.
</details>

<details>
  <summary>⏬ Resource download is very slow?</summary>
  
  Due to the large size of resource files, the download speed may be slow. You can try the following methods to speed it up:
  - Change network environment, such as configuring HTTP_PROXY and HTTPS_PROXY environment variables to accelerate the network
  - Manually download resources and restart the application
</details>

<details>
  <summary>📁 Monitoring directory registration failed, and the startup exits immediately?</summary>
  
  This usually happens due to incorrect configuration files or environment variables. Please check if the application's configuration files are correct and ensure environment variables are set properly.
  
  If you see the following logs:
  ```
  Error creating bean with name 'directoryWatcherService': Instantiation of supplied bean failed
  User limit of inotify instances reached or too many open files
  User limit of inotify watches reached
  ```
  
  Please try increasing the system's inotify instance limits:
  ```bash
  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
  echo fs.inotify.max_user_instances=524288 | sudo tee -a /etc/sysctl.conf
  sudo sysctl -p
  ```
</details>

---

## 💡 Usage Issues

<details>
  <summary>🖱️ Why is there no response when clicking the menu?</summary>
  
  This usually happens because the page is temporarily stuck or resources are not fully loaded. Try refreshing the page. If the problem persists, check the browser console for error messages.
</details>

<details>
  <summary>⚪ Why is it a white screen after opening?</summary>
  
  This is usually caused by incomplete loading of web resources. Try refreshing the page. If the problem persists, check the browser console for error messages. It is recommended to keep the network connection stable to avoid network fluctuations.
</details>

<details>
  <summary>☁️ How to mount cloud disk .strm files?</summary>
  
  Cloud disk users can first mount cloud disk files locally (.strm) through Alist, alist-strm, NetMount, etc., and then mount them to the application.
  
  In the scan configuration, add the media recognition type as `strm` to scan local .strm files.
</details>

<details>
  <summary>🌍 Timezone error, system time is incorrect?</summary>
  
  This usually happens because the application's timezone is inconsistent with the server's timezone. Please check if the application's timezone settings are correct and ensure they are consistent with the server's timezone.
  
  - If you have configured the TZ environment variable, set it to the correct timezone
  - If you are using a network proxy, ensure the proxy server's timezone is consistent with the server's timezone
  - If you are using Docker deployment, ensure the Docker container's timezone is set correctly
  
  Please note that your network should be able to access the internet, otherwise automatic timezone detection cannot be performed.
  
  For proxy networks, please avoid: suning.com, taobao.com, meituan.com and other domestic proxy domains.
</details>

<details>
  <summary>🔌 [Metatube] 404 (Not Found)</summary>
  
  Check if the MetaTube plugin's server address is configured correctly. If you are using a custom domain, ensure the domain resolution is correct. If you are using a reverse proxy, ensure the reverse proxy configuration is correct. Check if the MetaTube container logs are normal and ensure there are no error messages. 
  
  Please refer to the [MetaTube plugin configuration documentation](https://ammds.lifebus.top/guide/plugins/metatube/).
</details>