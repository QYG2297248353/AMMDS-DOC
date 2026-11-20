---
slug: project-inception
title: "Before the Project Began: What Problem Were We Really Trying to Solve"
authors: [studio]
tags: [studio, ammds]
date: 2023-07-05
---

The question every product gets asked most often is "what problem are you actually solving?" AMMDS's answer wasn't thought up in a meeting room — it was gradually hammered out of the toolchain we use every day.

{/* truncate */}

## Where it started: we were all tormented by tools

The members of Mengsen Studio are all seasoned self-hosted users. On our drives lie media files accumulated over many years, with our own rules for everything from naming to categorization. We're also heavy users of PT sites (private trackers), managing site resources day to day with IYUUPlus.

Precisely because we used them so deeply, we felt the pain of that "fragmentation" all the more.

## A fragmented toolchain

To turn a batch of media files into a library you could watch and search, the tool ecosystem at the time required you to:

- Use TinyMediaManager to scrape movie metadata;
- Use MediaElch to handle TV series information;
- Use a separate tool to manage site resources;
- And use yet another tool to keep NFO file formatting consistent.

Each tool had its own data format and operational logic. As data flowed between tools, information was frequently lost — the cast details you'd carefully filled in in tool A might vanish in tool B; a naming scheme you'd finally unified would be rewritten by tool C.

## Two problems nobody had seriously addressed

Through day-to-day use, we noticed two recurring pain points:

**First, there was no unified dashboard.** You couldn't see the metadata status of all your media files in one place. Which ones had been fully scraped, which were missing covers, which had wrong cast information — to answer these questions, you had to switch back and forth between several tools.

**Second, you couldn't correct errors in bulk.** When a scraping result was wrong, you had to fix it manually one by one. For power users with media libraries of tens of terabytes, the maintenance cost of this repetitive work was staggering.

## The judgment that launched the project

We realized what was missing wasn't yet another "better single-purpose tool", but something that could tie this whole chain together:

> In one place, complete the entire workflow from metadata scraping and site resource management to building a media library.

This judgment became the starting point for AMMDS. It shaped many of the product's later features — a unified web dashboard, batch-processing capabilities and multi-source data merging — all pointing to the same goal: users no longer having to move data between tools.

Of course, between "what problem to solve" and "how to solve it" lay a whole process of technology selection. That's the subject of the next post.

---

## Keep reading

- [Technology Choices: Why We Ended Up with Java SpringBoot + Vue3](/blog/tech-stack-decision)
- [Why We Insist on Self-Hosting: Keeping Your Data in Your Own Hands](/blog/why-self-hosted)
- [AMMDS: From Concept to Reality — The Birth of a Product](/blog/ammds-concept-to-reality)
