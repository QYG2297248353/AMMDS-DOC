---
title: Choose an install method
sidebar_label: Installation Options
description: AMMDS ships to users in only two forms — a Docker image and a binary you run directly — both packaged with GraalVM Native Image and needing no Java. This page helps you pick one and explains the shared rules for ports and data directories.
sidebar_position: 1
---

# Choose an install method

AMMDS comes in only **two** forms, and both run the same program:

1. **Docker image** — a container package with the runtime already set up.
2. **Binary program** — an executable file you can run directly.

Both use GraalVM Native Image. The program is built into one standalone file before release. So **you don't install Java, and there are no JAR or WAR files**. What you download is either one program file or a Docker image that contains it. Then you just run it.

> **GraalVM Native Image**: a packaging tool. It builds the program into one standalone file ahead of time, so you don't install a runtime. Double-click it or run it from the command line. You don't need to understand how it works; just remember two things: **no Java install** and **no JAR files**.

> **Binary program**: also called an executable. On Windows it's usually a file ending in `.exe`; on Linux it's a file with no extension. In an AMMDS release package this program is called `ammds` (`ammds.exe` on Windows). The exact name follows the package you downloaded.

So ignore tutorials about "which Java version to install" or "where to put the JAR". Those steps belong to building the program from source, not to installing AMMDS.

Still undecided? Answer one question first: **does your device have Docker?** If yes, use Docker. If not, download the binary program and run it directly.

## Three prerequisites before you start

| Item | Notes |
| --- | --- |
| System | A 64-bit system is required. System check flags 32-bit systems as a warning and notes that dependencies such as FFmpeg may not work |
| Runtime | Neither form needs you to install Java or any other runtime. The program brings what it needs |
| Match the binary to your system | Executables are compiled per system, one for Windows and one for Linux; check which one you need before downloading |
| Network | Filling in information, finding resources and sending notifications all need internet access. A purely internal network can only use data you already have |

> **Docker**: a way of packing software with the environment it needs. Install Docker, pull a package, and it runs. You don't install the pieces one by one.

> **Image**: the packaged software file, like an installer disc. It looks like `qyg2297248353/ammds:latest`; the part after the colon is the version tag.

> **Container**: the running copy made from an image.

## Comparing the two methods

| Method | How it runs | Who it suits | How you upgrade |
| --- | --- | --- | --- |
| Docker image | Web server and backend in one container, on a single port | Linux servers and NAS devices that already have Docker | Pull the new image and recreate the container. Data stays in the mounted directories |
| Binary program | Runs one executable directly. It serves both pages and API | Windows or Linux hosts without Docker, or anyone who wants one process to manage | Replace the executable and restart |

### How to choose

| Your situation | Recommendation |
| --- | --- |
| Docker is already installed, or you want ports, folders and autostart managed in one place | Docker — see [Install with Docker](./docker.md) |
| It's a FnOS or QNAP device and you're used to managing software in the app centre | NAS app package — see [Install on a NAS](./nas.md) |
| Windows / Linux host without Docker, and you want to run one program directly | Binary program — see [Run it directly on Windows or Linux](./native.md) |
| You want to host a single program with a system service and start it at boot | Binary program — see [Run it directly on Windows or Linux](./native.md) |

:::note[The NAS app package isn't a third program]
The "app package" on FnOS and QNAP is just an entry point. The device uses it to install and manage the program for you. What's inside is the same program described above. It isn't a third form; it just saves you typing commands by hand.
:::

## Ports: the address you'll use after installing

| Method | Port in the browser | Notes |
| --- | --- | --- |
| Docker | `80` inside the container; the host port is yours to map | Map `8080:80` and browse to `http://host:8080` |
| Binary program | `8080` | Changeable with the "access port" setting |
| NAS app package | The one you set during install | Use `http://NAS_IP:port` afterwards |

The Docker image also starts a backend on `8080`. Only the web server inside the container forwards it, so you don't map it to the host.

:::note[Want phones or clients to find the service automatically?]
The desktop client can find AMMDS on the same local network over two UDP ports: `47823` for probing and `47824` for announcements. UDP is the protocol used for these short broadcasts. Docker only forwards TCP, so automatic discovery needs both UDP ports mapped separately. If you don't need it, type the service address manually in the client.
:::

## Data directories: know where they live first

Whichever form you use, the program reads relative paths from **the folder it was started in**. Create a fixed folder first and start there.

| Directory | What's inside |
| --- | --- |
| `data/` | Images, cache, subtitles, logs, the recovery key, and downloaded dependencies such as FFmpeg |
| `db/` | The database file holding films, tasks, settings — all your business data |
| `download/` | A directory reserved by the image, usually shared with the downloader so downloads can be scanned straight away |
| `data/logs/` | Run logs; system check and the run log page read them here |

:::tip[What to back up first]
`db/` and `data/` are the two you must back up: the first is all your business data, the second holds images and the recovery key. Back up your media files however you like.
:::

## Settings you decide here

These are the few things you decide during installation. Read what happens if you get them wrong before filling them in.

| Setting | What it controls | If you leave it out | Restart needed |
| --- | --- | --- | --- |
| Server port (`AMMDS_SERVER_PORT`) | The port you browse to | The built-in default (`8080`) is used | Yes |
| Media directory path | Tells the app where to look for your files | Nothing to scan; a wrong path means nothing is found and it looks like files vanished | No, change any time |
| Data directories (`data/`, `db/`) | Where images, logs, the recovery key and the database live | Not mounting them (Docker) loses everything when the container is deleted | Yes |
| Time zone (`TZ`) | Which zone log times and scheduled tasks use | The default zone applies and task times may not match your day | Yes |
| Run-as user (`PUID` / `PGID`) | Which user reads and writes files (Docker) | Runs as the default user; if that doesn't own the host directory you get "write failed" or "permission denied" | Yes |

:::warning[Keep media out of the program directory]
With Docker, mount the host media directory into the container at the **same path** (e.g. `/mnt/media:/mnt/media`) and never under `/ammds`, so it can't be mixed up with program data and deleted during cleanup.
:::

## After installing

1. Open the address in a browser and sign in with your admin account. See [First launch: sign in and basic setup](./first-login.md).
2. To change startup settings like the port or upload limits, see [Change the port or upload limit](./settings.md).
3. To see results immediately, walk through [Organise your first films in ten minutes](./first-library.md).

## If something goes wrong

- **Not sure which to pick**: use Docker if you have it. Otherwise download the binary program and run it directly. You can switch later, as long as your data directories are backed up.
- **Double-clicking the binary does nothing, or says it can't be executed**: you probably downloaded the release package for a different system (Windows and Linux aren't interchangeable). On Linux you also need to give it execute permission first. See [Run it directly on Windows or Linux](./native.md).
- **Page won't open**: first check that the access port is the one you mapped, then check the firewall. First start also waits for dependencies to download, so watch whether the log keeps producing output.
- **Data "disappeared"**: you almost certainly started from a different folder, so the app created fresh `data/` and `db/` elsewhere. Start again from your original folder.
- **Startup exits immediately**: look for `inotify` or CPU instruction set messages in the log. Both are covered in [Common questions](../faq.md).

## Next

- [Install with Docker](./docker.md)
- [Run it directly on Windows or Linux](./native.md)
- [Install on a NAS](./nas.md)
