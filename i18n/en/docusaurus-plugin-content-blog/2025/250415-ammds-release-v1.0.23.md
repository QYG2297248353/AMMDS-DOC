---
slug: ammds-release-v1.0.23
title: Release AMMDS v1.0.23 — Comic Scraping Arrives
authors: [ms]
tags: [ammds, release, feature]
date: 2025-04-15
---

# Release AMMDS v1.0.23 — Comic Scraping Arrives

AMMDS v1.0.23 is officially released! This update brings the long-awaited comic scraping feature, marking another important expansion of AMMDS in the field of multimedia content management.

{/* truncate */}

## Comic Scraping — A Breakthrough from Zero to One

The highlight of v1.0.23 is the **first-ever comic scraping feature**. This is the first time AMMDS has supported comic content management, enabling comic scraping through Jellyfin's Bookshelf plugin. Specifically:

- **Jellyfin Bookshelf integration**: by connecting to Jellyfin's Bookshelf component, AMMDS can automatically identify and organize comic resources and extract metadata.
- **Automatic metadata filling**: during scraping, core information such as the comic's title, author, publisher, ISBN, release date and category tags is fetched automatically, greatly reducing the manual work of organizing.
- **Cover and thumbnail support**: comic covers are downloaded and linked automatically, ensuring an intuitive and attractive presentation in the media library.

## Bug Fixes

In addition to the new feature, this release fixes several issues reported by the community:

- Fixed an issue where abnormal metadata caching caused repeated scraping in some scenarios
- Fixed an issue where file recognition failed for paths containing special characters
- Optimized log output to reduce unnecessary warnings
- Improved the stability of the scraping task queue to prevent task loss under high concurrency

## What's Next

The launch of comic scraping is just the first step. We plan to keep improving the accuracy and coverage of comic scraping in later versions and gradually add support for more comic sources. We welcome everyone to share their experience in the community to help us do better!

---

## Keep reading

- [Release AMMDS v1.0.24 — Site Authentication and Resource Search Open](../2025/250510-ammds-release-v1.0.24.md): the immediately following release, in which comic scraping was further optimized;
- [Complete Guide to Deploying AMMDS with Docker](../2025/251001-docker-deploy-ammds.md): if you want to run AMMDS yourself, start here.
