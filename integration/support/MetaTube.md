# Meattube

元数据插件，影视元数据均由该插件提供支持。

开放功能：<a-space><a-tag color="blue">刮削</a-tag><a-tag color="blue">影视检索</a-tag><a-tag color="blue">演员检索</a-tag></a-space> 

<a-link href="https://metatube-community.github.io/" icon target="_blank">MetaTube 官网</a-link>

## 安装应用

```sh [docker-cli]
docker run -d -p 8080:8080 --name metatube metatube/metatube-server:latest
```

服务启动后，将配置信息写入集成应用中即可。


## 推荐安装

建议通过 `Koyeb 快速部署` 直接部署至 `美国/日本` 节点，以便解决网络问题。

然后通过 `Cloudflare` 进行反向代理，避免由网络原因造成的刮削失败。