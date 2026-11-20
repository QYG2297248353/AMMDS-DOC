---
slug: ffmpeg-transcoding-basics
title: "FFmpeg and Hardware Transcoding: The Most Demanding Part of a Media Server"
authors: [studio]
tags: [ammds, feature, plugin]
date: 2024-08-16
---

If you've used a media server, you've likely seen the "transcoding required for playback" prompt. Transcoding is the most resource-hungry part of a media library, and FFmpeg is the engine behind it. This article explains what transcoding really is and why hardware acceleration is worth paying attention to.

{/* truncate */}

## First, distinguish: transcoding vs remuxing

Many people confuse the two:

- **Remuxing**: simply moves the video stream from one container to another (e.g. MKV to MP4), without re-encoding the data itself — nearly instant and with no quality loss;
- **Transcoding**: actually re-encodes the video — for example, compressing a high-bitrate 4K source into something a phone can play smoothly. This step consumes the most CPU and is the most likely to lose quality.

Media servers need to transcode because client capabilities vary enormously: a format a TV can decode in hardware may not be supported by a phone browser. The server can only transcode a compatible version on the fly.

## Software encoding and hardware encoding

FFmpeg uses software encoders by default (such as `libx264`), all computed on the CPU. Quality is the best, but it's slow for a server — under heavy concurrent transcoding, the CPU quickly becomes a bottleneck.

Hardware encoding hands this work to dedicated circuitry in a discrete GPU or integrated graphics, and is much faster. Common options include:

| Solution | Corresponding hardware | FFmpeg encoder |
| :--- | :--- | :--- |
| NVENC | NVIDIA GPUs | `h264_nvenc` / `hevc_nvenc` |
| QSV | Intel integrated graphics | `h264_qsv` / `hevc_qsv` |
| VAAPI | Common Linux interface | Depends on the driver |
| AMF | AMD GPUs | `h264_amf` |

Which one to use depends on your hardware. `ffmpeg -hwaccels` lists available acceleration methods, and `ffmpeg -encoders` shows the supported encoders. A typical hardware transcoding command looks like this:

```bash
ffmpeg -i input.mkv -c:v h264_nvenc -preset p4 -c:a aac output.mp4
```

## A trade-off you must know

Hardware encoding aims for **speed**, not maximum compression efficiency. At the same quality, it typically needs a higher bitrate — a slightly larger file in exchange for much faster processing. That's a good trade: transcoding is about "playable right now", not "squeezing out the last 10% of size".

For batch processing, the difference is even clearer. Software encoding may take hours, while hardware encoding can finish in tens of minutes.

## FFmpeg's release cadence

It's worth noting that starting with version 6.0 (codename "Von Neumann", released in February 2023), FFmpeg established a cadence of **one major release per year**, bumping the ABI and removing APIs deprecated for more than three versions at each major release. Version 6.0 also added AV1 encoding support for QSV and NVENC. For ordinary users, this means new features arrive more regularly — but it also reminds us to watch for ABI changes when upgrading.

## The relationship with AMMDS

AMMDS processes media files through a built-in FFmpeg toolchain — whether for video preprocessing or related automated workflows, it relies on FFmpeg underneath. Understanding the difference between software and hardware encoding helps you decide what hardware to give your server: for organizing and light loads, a CPU is enough; for heavy concurrent transcoding, a GPU with NVENC or integrated graphics with QSV makes things noticeably easier.

> Note: The commands and parameters in this article are compiled from FFmpeg's official documentation; actual availability depends on your FFmpeg build and hardware drivers.

---

## Keep reading

- [Tech stack decision: why we ended up with Java SpringBoot + Vue3](/blog/tech-stack-decision)
- [Docs: Integrating media servers](/docs/integration/media-server)
- [Docs: Backend feature overview](/docs/backend/dashboard/overview)
