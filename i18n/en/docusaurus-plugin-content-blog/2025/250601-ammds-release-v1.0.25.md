---
slug: ammds-release-v1.0.25
title: Release AMMDS v1.0.25 — Built-in Translation and Spoiler Mode
authors: [ms]
tags: [ammds, release, feature]
date: 2025-06-01
---

# Release AMMDS v1.0.25 — Built-in Translation and Spoiler Mode

AMMDS v1.0.25 brings two practical new features: a built-in translation engine and spoiler mode. It also fixes several key issues reported by the community and improves overall stability.

{/* truncate */}

## Built-in Translation Engine

In v1.0.25, AMMDS integrates localized translation capabilities, allowing users to process metadata in multiple languages without relying on external translation services:

- **Baidu Translate integration**: uses the Baidu Translate API for translation between Chinese, English and other languages, ideal for batch-translating film and TV titles and descriptions
- **Microsoft Translator integration**: also supports the Azure Translator service, giving users more options and the flexibility to switch based on network conditions and personal preference
- **Translation cache**: translated content is cached locally to avoid repeated requests and save API quota

These two translation engines are mainly used in the Metatube scraping workflow, ensuring that scraped foreign-language metadata is automatically converted into the language the user is accustomed to.

## Spoiler Mode

A new **spoiler mode** has been added, enabled by default. It lets users add spoiler markers to film and TV content:

- On film and TV detail pages, content marked as a spoiler is blurred
- Users must click manually to expand and view the specific content
- This is very useful for users organizing newly released films or popular series, effectively preventing accidental exposure to key plot information

## Bug Fixes

- **Fixed Metatube translation issue**: resolved missing metadata caused by translation engine call failures during Metatube scraping
- **Fixed film and TV subscription failures**: resolved an issue reported by some users where subscription tasks were interrupted due to network fluctuations or abnormal site responses
- **Scraping log improvements**: restructured the output format of scraping logs and added structured fields to make it easier to diagnose scraping failures
- **Actor scraping logic improvements**: optimized the scraping workflow for actor information, reducing duplicate requests and improving scraping efficiency and accuracy

## Other Improvements

- Optimized concurrency control for translation engines to avoid rate limiting from overly fast requests
- Improved compatibility between spoiler mode and existing UI components
- Improved the interaction experience of the settings page

---

## Keep reading

- [Release AMMDS v1.0.28 — Western Films and TV Scraping Support](../2025/250720-ammds-release-v1.0.28.md)
