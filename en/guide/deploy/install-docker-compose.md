---
outline: deep
---

# Docker Compose

**Docker Compose** is a tool for defining and running multi-container Docker applications. With a YAML file (`docker-compose.yml`), you configure your application's services, which can then be started with a single command. It is ideal for the rapid deployment and management of applications in development, testing, and staging environments.

## Creating Services

### Create an Application Directory

First, create a directory named `ammds` to store related files:

```bash
mkdir ammds && cd ammds
```

### Create Configuration Files

Within the `ammds` directory, create and edit a `docker-compose.yml` file. Paste the following content into the file:

```yaml
services:
  ammds:
    image: qyg2297248353/ammds:latest  # The name and tag of the image used
    container_name: AMMDS  # Name of the container
    ports:
      - "8080:80"  # Port mapping: host port 8080 to container port 80
    volumes:
      - ./data:/ammds/data  # Mount the data folder from the current directory to /ammds/data path inside the container
      - ./db:/ammds/db  # Mount the db folder from the current directory to /ammds/db path inside the container
      - ./download:/ammds/download  # Mount the download folder from the current directory to /ammds/download path inside the container
      - ./media:/media  # Mount the media folder from the current directory to /media path inside the container
    restart: always  # Always restart the container if it crashes
    environment:
      - TZ=Asia/Shanghai  # Set the timezone to Asia/Shanghai
    networks:
      - ammds-network  # Use a custom network

networks:
  ammds-network:  # Custom network configuration
    driver: bridge  # Use Docker's default bridge network driver
```

## Starting Services

Use the following command to start the services. This will run the AMMDS container in the background and apply all configurations from `docker-compose.yml`:

```bash
docker compose up -d
```

## Stopping Services

If you need to stop and remove the services, use the following command:

```bash
docker compose down
```

## Start Enjoying

Access `<HostIP>:8080` through your browser to start enjoying your AMMDS application🥳~

For example, if running locally, you can view the application by visiting `http://localhost:8080`.

🎉 Now you can begin enjoying the features provided by AMMDS!


<!--@include: ../snippets/copyright.md-->