---
slug: tech-stack-decision
title: "Technology Choices: Why We Ended Up with Java SpringBoot + Vue3"
authors: [studio]
tags: [studio, ammds, feature]
date: 2023-08-26
---

Once we'd settled on "what to build", the next question was "what to build it with". We debated this question in earnest for about a month, evaluating four technology routes. This article records the trade-offs we made at the time in full.

{/* truncate */}

## Four candidate routes

| Tech stack | Advantages | What worried us |
| :--- | :--- | :--- |
| Python + Django | High development efficiency | Heavy deployment dependencies; source code hard to protect |
| Rust + Tauri | Excellent performance and security | Long development cycles; limited web ecosystem support |
| Go + Web | Fast compilation; single-binary distribution | Relatively weak generics and framework ecosystem |
| Java SpringBoot + Vue3 | Mature ecosystem; rich infrastructure | Traditionally heavy runtime |

In the end, we chose **Java SpringBoot + Vue3**. The back end uses SpringBoot 3.x to build a RESTful API, and the front end uses Vue3 to deliver the interactive experience.

## The decisive factor: GraalVM AOT

What truly tipped the scales was the AOT (Ahead-of-Time) compilation capability of GraalVM Native Image.

Traditional Java applications require users to install a JVM first. With GraalVM, however, a SpringBoot application can be compiled directly into a standalone binary executable:

- Users run it directly after downloading — **no JVM installation required**;
- The front end is bundled into the application — **no Node.js environment required**;
- An embedded database is used — **no separate configuration required**.

For a self-hosted product, this is a huge advantage. We'd already asked users to clear the hurdle of "providing their own device", so we couldn't add the further burden of "configuring their own runtime". At the same time, compiling to a native binary also effectively protects the back-end code and lowers the risk of source code leaks.

## The second factor: virtual threads

AMMDS's typical working scenario involves fetching data from multiple sites, parsing responses and writing files at the same time — a classic I/O-intensive task.

SpringBoot's virtual threads and reactive programming model are a perfect fit for this scenario: large numbers of concurrent I/O waits can be scheduled efficiently, without tying up a heavyweight system thread for every task. This makes "scraping multiple sources at once" both fast and resource-efficient.

## In hindsight

Looking back today, this choice has stood the test of time:

- The plugin-based architecture, pipeline-based data processing and virtual thread scheduling — these core designs were all built on this tech stack and remain in use today;
- Native binary distribution made "download and run" a reality, significantly lowering the installation barrier;
- The mature ecosystem let us focus our energy on product logic rather than constantly reinventing the wheel.

There's no absolutely correct answer to technology selection — only whether it suits the problem at hand. For AMMDS at that time, Java + Vue + GraalVM was right.

---

## Keep reading

- [How the Plugin-Based Architecture Was Designed](/blog/plugin-architecture)
- [The First Prototype: From a Single Scraping Script to Something That Actually Runs](/blog/first-prototype)
- [AMMDS: From Concept to Reality — The Birth of a Product](/blog/ammds-concept-to-reality)
