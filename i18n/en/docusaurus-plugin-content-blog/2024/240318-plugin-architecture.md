---
slug: plugin-architecture
title: How the Plugin Architecture Was Designed
authors: [studio]
tags: [ammds, plugin, feature]
date: 2024-03-18
---

Early in AMMDS's design, we established a core principle: the plugin architecture. This article explains how that decision came about and why it proved to be right.

{/* truncate */}

## The problem: there is never just one site

When building the prototype, we only needed to connect to one site. But it was clear that real-world media library users face a fragmented ecosystem:

- Different PT sites have their own page structures, authentication methods and data formats;
- Some use static pages, some render dynamically with JavaScript, some open an API directly;
- New sites and new metadata sources appear almost every month.

If we wrote each site's parsing logic into the core code, the result is easy to imagine: the code grows ever more bloated, every new site requires changes to the main trunk, and the community can't get involved. We needed a way to make "supporting a new site" a localized affair.

## The decision: extract what varies into plugins

The architecture we settled on made three parts pluggable:

| Layer | Responsibility | Why pluggable |
| :--- | :--- | :--- |
| Scraping engine | Schedule tasks, merge results | Stable core, but replaceable strategies |
| Site adapter | Parse a given site's pages/API | Changes most often, must be isolated |
| Data processing pipeline | Convert metadata to NFO | Different users have different preferences |

In this way, the core code only handles "scheduling and orchestration", while the specifics of "how to fetch data and how to parse it" are left to plugins. Users install what they need, and the community can contribute third-party plugins without touching the main trunk at all.

## The priority rule engine

Plugins brought a new problem: when the same film gets different metadata from multiple sources, whose do you trust?

We designed a **priority rule engine**. Users can customize the priority of different sources, and the system automatically merges and deduplicates according to the rules. This preserves the richness of multiple sources while returning the final say to the user — in keeping with our consistent principle of "leaving the choice to the user".

## Verified in hindsight

This decision proved worthwhile again and again in later development:

- **Fast adaptation**: AMMDS was able to support multiple PT sites and metadata sources one after another without changing core code — thanks to the plugin architecture;
- **Community involvement**: third-party plugins let the ecosystem grow, instead of everything resting on the studio's shoulders;
- **Fault isolation**: when a single site changes its layout, usually only one plugin needs fixing, without affecting the whole system.

From the hardcoded parsing script in the prototype to today's pluggable architecture — this was the best technical investment we ever made.

---

## Keep reading

- [Three Lessons from the Open Source Community](/blog/lessons-from-open-source)
- [The First Prototype: From a Single Scraping Script to Something That Runs](/blog/first-prototype)
- [AMMDS: From Concept to Reality — The Birth of a Product](/blog/ammds-concept-to-reality)
- [Docs: Plugins](/docs/integration/overview)
