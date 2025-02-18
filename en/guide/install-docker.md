---
outline: deep
---

# Docker

**Docker** is an open-source platform designed for automating the deployment, scaling, and management of applications. It enables developers to package an application along with its dependencies into a standalone container, ensuring that the application runs consistently in any environment. Containers are lightweight and portable, making them ideal for microservices architectures and continuous integration/continuous delivery (CI/CD) processes.

## One-Click Run

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

::: details Command Explanation
| Parameter                                | Explanation                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-itd` or `--interactive --tty --detach` | A combination option:<ul><li>`-i` or `--interactive`: Keeps STDIN open even if not attached, maintaining the standard input of the container open.</li><li>`-t` or `--tty`: Allocates a pseudo-TTY (terminal), simulating a physical TTY so you can interact with the container as if it were a local terminal.</li><li>`-d` or `--detach`: Runs the container in the background, starting it as a daemon.</li></ul> |
| `--name AMMDS`                           | Specifies the name of the container as `AMMDS`.                                                                                                                                                                                                                                                                                                                                                                      |
| `-p 8080:80`                             | Maps port 8080 on the host to port 80 in the container, formatted as `-p <host-port>:<container-port>`.                                                                                                                                                                                                                                                                                                              |
| `-v $(pwd)/data:/ammds/data`             | Mounts the `./data` folder from the current working directory to `/ammds/data` inside the container, achieving data persistence.                                                                                                                                                                                                                                                                                     |
| `-v $(pwd)/db:/ammds/db`                 | Mounts the `./db` folder from the current working directory to `/ammds/db` inside the container for storing database files.                                                                                                                                                                                                                                                                                          |
| `-v $(pwd)/download:/ammds/download`     | Mounts the `./download` folder from the current working directory to `/ammds/download` inside the container, used for storing downloaded content.                                                                                                                                                                                                                                                                    |
| `-v $(pwd)/media:/media`                 | Mounts the `./media` folder from the current working directory to `/media` inside the container, suitable for mounting media directories; users should choose their own mount paths as needed.                                                                                                                                                                                                                       |
| `--restart always`                       | Configures the container to always restart automatically, ensuring it starts up under all circumstances, including system restarts.                                                                                                                                                                                                                                                                                  |
| `qyg2297248353/ammds:latest`             | The Docker image name and tag used, specifying which image to run.                                                                                                                                                                                                                                                                                                                                                   |
:::

## Start Enjoying

Access `<HostIP>:8080` through your browser to start enjoying your AMMDS application🥳~

For example, if running locally, you can view the application by visiting `http://localhost:8080`.

🎉 Now you can begin enjoying the features provided by AMMDS!

<!--@include: ../snippets/copyright.md-->