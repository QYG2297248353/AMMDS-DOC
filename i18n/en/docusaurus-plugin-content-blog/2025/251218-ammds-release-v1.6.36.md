---
slug: ammds-release-v1.6.36
title: Release AMMDS v1.6.36 — Jav and Western Multimedia Search
authors: [ms]
tags: [ammds, release, feature]
date: 2025-12-18
---

# Release AMMDS v1.6.36 — Jav and Western Multimedia Search

AMMDS v1.6.36 adds Jav and Western multimedia search, supporting combined searches across multiple actors and greatly improving the convenience of resource discovery.

{/* truncate */}

## Jav and Western Multimedia Search

The core upgrade in v1.6.36 is the launch of the **multimedia search feature**:

- **Unified search entry**: search both Japanese (Jav) and Western film and TV content in a single search box, with no need to switch search modes
- **Cross-category matching**: the system automatically determines the category of a search keyword and intelligently matches the corresponding data source
- **Aggregated results**: results from different data sources are aggregated, deduplicated and sorted for a unified browsing experience
- **Advanced filtering**: supports secondary filtering of search results by category, year, producer and other dimensions

## Multi-Actor Search

To address the common scenario of querying multiple actors, support for **multi-actor search** has been added:

- Enter multiple actor names at once to find works in which they all appear together
- Actor names support fuzzy matching and alias recognition, so results can be found even with incomplete input
- Search results are annotated with the matched actors for easy confirmation

## General Bug Fixes

- Fixed incomplete loading of search results caused by data source timeouts
- Fixed filters being lost during multi-page searches
- Fixed search errors caused by keywords containing certain special characters
- Optimized search response speed and reduced average query time

---

## Keep reading

- [Release AMMDS v1.6.38 — ThePornDB Rankings and Stash Search](../2025/251222-ammds-release-v1.6.38.md)
