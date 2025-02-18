---
outline: deep
---

# Quick start

Execute in a terminal with Docker installed

```sh [docker-cli]
docker run -itd \
  --name AMMDS \
  -p 8080:80 \
  -v $(pwd)/data:/ammds/data \
  -v $(pwd)/db:/ammds/db \
  -v $(pwd)/download:/ammds/download \
  -v $(pwd)/media:/media \
  --restart always \
  qyg2297248353/ammds:latest
```

Through the browser, access http://127.0.0.1:8080 to get started.

<!--@include: ../snippets/copyright.md-->