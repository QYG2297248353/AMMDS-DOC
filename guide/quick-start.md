---
outline: deep
---

# 快速开始

在已安装Docker的终端中执行

```sh [docker-cli]
docker run -itd \
  --name AMMDS \
  -p 8080:80 \
  -v $(pwd)/data:/ammds/data \
  -v $(pwd)/db:/ammds/db \
  -v $(pwd)/download:/ammds/download \
  -v $(pwd)/media:/media \
  --restart always \
  qyg2297248353/ammds-docker:latest
```

通过浏览器，访问 http://127.0.0.1:8080 即可开始。