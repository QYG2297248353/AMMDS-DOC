---
slug: ammds-concept-to-reality
title: "AMMDS: From Concept to Reality — The Birth of a Product"
authors: [studio]
tags: [studio, ammds, feature]
date: 2024-10-15
---

# AMMDS: From Concept to Reality — The Birth of a Product

Today, we want to share with you the story behind AMMDS — from a vague idea to a finished product, this development journey has been full of challenges, decisions and growth.

{/* truncate */}

## Market Need: Existing Tools Just Aren't Good Enough

The story begins with our own "pain points". The members of the Mengsen Studio team are all seasoned self-hosting users, and in our daily use of IYUUPlus for site resource management, we found a common problem:

**The toolchain for media management is fragmented.**

You need TinyMediaManager to scrape movie metadata, MediaElch to handle TV series information, a separate tool to manage site resources, and yet another tool to keep NFO file formatting consistent. Each tool has its own data format and operational logic, and information is frequently lost as data flows between tools.

More importantly, most existing tools lack a unified dashboard and automation capabilities. You can't see the metadata status of all your media files in one place, nor can you batch-correct faulty scraping results. For power users with media libraries of tens of terabytes, the maintenance cost of this fragmentation is staggering.

## Technology Choices: Why Java SpringBoot + Vue3

Once we had decided what to build, the next question was: what technology should we use to build it?

We conducted a month-long technical survey and evaluated a range of technology stacks:

- **Python + Django**: high development efficiency, but heavy deployment dependencies and difficult to protect the source code
- **Rust + Tauri**: excellent performance and security, but long development cycles and limited web ecosystem support
- **Go + Web**: fast compilation and single-binary distribution, but relatively weak generics and framework ecosystem
- **Java SpringBoot + Vue3**: a mature ecosystem, rich infrastructure, and GraalVM AOT native compilation to a binary to protect the code

In the end, we chose the **Java SpringBoot + Vue3** combination. The back end uses the SpringBoot 3.x framework to build a RESTful API, while the front end uses Vue3 to deliver a modern interactive experience. With GraalVM Native Image's AOT (Ahead-of-Time) compilation, a SpringBoot application can be compiled directly into a standalone binary executable that users can download and run without installing a JVM runtime. This is a huge advantage for self-hosting — users don't need to install a Java runtime or Node.js environment, nor configure a database.

At the same time, SpringBoot's Virtual Threads and reactive programming model are well suited to handling scraping tasks. A typical AMMDS scenario involves fetching data from multiple sites, parsing responses and writing files simultaneously — this kind of I/O-intensive task performs excellently under the virtual thread scheduling model. GraalVM native binaries also effectively protect the back-end code and prevent source code leaks.

## Key Decision Points

### First Decision: A Plugin-Based Architecture

Early in the project's design, we established a **plugin-based architecture** as a core design principle. This means AMMDS's scraping engine, site adapters and data-processing pipelines are all pluggable. Users can install different plugins as needed, and the community can contribute third-party plugins to extend functionality.

This decision proved extremely correct in later development. AMMDS can quickly adapt to multiple PT sites and metadata sources precisely because the plugin-based architecture lets us support new sites by writing plugins without modifying the core code.

### Second Decision: Web Dashboard First

Unlike traditional media management tools, we decided to make the web dashboard AMMDS's primary interface rather than a desktop client. This means users can manage their media library on any device — PC, tablet or phone, even through a browser on a NAS.

The web dashboard's design also follows a "mobile-first" philosophy, ensuring a good user experience even on phone screens.

### Third Decision: NFO Standard Compatibility

There has always been debate in the community about NFO file formats — subtle differences exist between Kodi's NFO format, Jellyfin's NFO format and Emby's NFO format. We decided to be **compatible with all major formats at once**; users can choose the target format in settings and the system adapts automatically.

## The First Prototype

At the end of 2023, the first working prototype of AMMDS was born. This version had only the most basic features:

- Scrape torrent lists from a single site
- Parse the metadata information in torrents
- Generate basic NFO files

Although rudimentary, it validated the feasibility of the core technical approach. Looking back today, much of the code in this prototype has been rewritten several times over, but the core architectural design — the plugin engine, pipeline-based data processing and the virtual-thread-based scheduling system — remains in use to this day.

## Challenges in Development

### Challenge 1: Site Compatibility

PT sites each have their own page structures, authentication methods and data formats. Some use static pages, some use dynamic JavaScript rendering, and others use API endpoints. To adapt to different sites, we developed a flexible adapter mechanism that allows separate parsing rules to be written for each site.

### Challenge 2: Data Consistency

When fetching metadata for the same film from multiple sources at once, how to merge and deduplicate is a tricky problem. We designed a **priority rule engine** that lets users customize the priority of different sources, and the system automatically merges data according to the rules.

### Challenge 3: Performance Optimization

When handling large media libraries (tens of thousands of entries), memory usage and scanning speed become bottlenecks. By introducing incremental scanning, caching mechanisms and batch-processing strategies, we reduced the time for a full scan from several hours to tens of minutes.

## Product Evolution

From the first prototype to today's AMMDS, the product has gone through countless iterations and refactorings. Every version update stems from real user feedback and the developers' own experience of using the product. We believe in "eating our own dog food" — team members use AMMDS daily to manage their own media libraries, which lets us spot problems and areas for improvement first-hand.

AMMDS is still iterating rapidly. In the future, we will introduce more intelligent metadata processing capabilities and further improve the plugin ecosystem, making self-hosted media management simpler and more efficient.

---

## Keep reading

- [AMMDS v1.0.0 Is Officially Released](../2025/250301-ammds-publish.md)
- [Complete Guide to Deploying AMMDS with Docker](../2025/251001-docker-deploy-ammds.md)
