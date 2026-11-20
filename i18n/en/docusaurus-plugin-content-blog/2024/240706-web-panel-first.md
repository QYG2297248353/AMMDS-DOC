---
slug: web-panel-first
title: Why We Insist on a Web Panel First
authors: [studio]
tags: [ammds, feature]
date: 2024-07-06
---

When deciding the form of AMMDS's main interface, we had a serious discussion: build a desktop client, or a web panel? In the end the web panel won. This article revisits that judgment.

{/* truncate */}

## An unavoidable premise: it runs on your own device

Self-hosted software has a use case quite different from SaaS: the program is installed on a device that stays on all the time — perhaps a home NAS, a mini PC or an old computer. You're not necessarily sitting in front of it, but you need to be able to manage it at any time.

A desktop client would mean walking up to that device or setting up remote desktop. A web panel naturally solves this: as long as a browser can reach the device, you can manage your media library.

## Management from anywhere

The most direct benefit of web-first is device independence:

- **PC**: sitting at your computer, use the full panel for batch organizing;
- **Tablet / phone**: lying on the couch, casually fill in a piece of metadata or check task progress;
- **NAS**: open it directly in the browser of the NAS management interface, with no extra client to install.

For many users who install AMMDS on a NAS, "just open a browser and it works" is almost the key to whether they can get past the entry barrier.

## Mobile-first is more than a slogan

When we say "mobile-first", we don't mean shrinking the desktop interface — we mean making the layout work on small screens from the very start:

- Frequently used actions sit within thumb's reach;
- Tables automatically turn into card layouts on small screens;
- Key statuses (task progress, scan results) are visible at a glance.

These details look ordinary today, but when we made the design decisions in 2024, they were places where we genuinely spent several extra weeks polishing.

## We didn't abandon the local experience

It should be noted that web-first doesn't mean "web only". We did later release a native Windows client (Launcher) to address the scenario of "not wanting to remember an address, wanting to open with one click". But in essence it's a shell around the web panel — the real interface and logic are still the same web application.

This choice keeps maintenance costs manageable: we only maintain one interface, rather than separate desktop and web versions.

---

## Keep reading

- [The First Prototype: From a Single Scraping Script to Something That Runs](/blog/first-prototype)
- [AMMDS Launcher: The Native Windows Client Is Officially Released](/blog/ammds-launcher-windows)
- [Docs: First Open, Login and Basic Settings](/docs/getting-started/first-login)
