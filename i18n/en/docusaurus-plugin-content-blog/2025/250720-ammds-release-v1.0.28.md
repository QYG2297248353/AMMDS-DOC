---
slug: ammds-release-v1.0.28
title: Release AMMDS v1.0.28 — Western Films and TV Scraping Support
authors: [ms]
tags: [ammds, release, feature]
date: 2025-07-20
---

# Release AMMDS v1.0.28 — Western Films and TV Scraping Support

AMMDS v1.0.28 is officially released! The most important breakthrough of this update is the addition of Western film and TV scraping. After supporting Japanese film scraping, this is the first time AMMDS has extended its scraping capabilities to Western films and TV.

{/* truncate */}

## Western Film and TV Scraping

Before v1.0.28, AMMDS's film and TV scraping capabilities were focused mainly on Japanese content (Jav). This update formally extends the scraping scope to Western films and TV, specifically:

- **Multiple data sources**: connects to several Western film and TV data sources to ensure rich and accurate metadata
- **Title and alias recognition**: automatically identifies original titles, English titles and regional aliases of films and TV works
- **Actor information scraping**: supports automatic retrieval of Western actor information, including actor photos, profiles and more
- **Production companies and producers**: scrapes production-related information such as production companies and distributors
- **Ratings and tags**: automatically fetches content ratings (such as R, PG-13) and category tags

## Scraping Engine Improvements

To better support the scraping of Western film and TV content, we made low-level improvements to the scraping engine:

- Enhanced the data source adapter layer to support more types of metadata formats
- Optimized the perceptual hash (Perceptual Hash/pHash) algorithm to improve image matching accuracy
- Improved the failure retry mechanism, automatically retrying failed scraping tasks a limited number of times

## Bug Fixes

- Fixed scraping tasks getting stuck in some scenarios
- Fixed data inconsistency caused by inaccurate metadata cache expiry detection
- Fixed abnormal display of multilingual titles
- Fixed scraping failures caused by filenames with certain encoding formats

## Outlook

The launch of Western film and TV scraping fills a gap in AMMDS's Western content management capabilities. Next, we will keep improving scraping quality and plan to add more features specific to Western films and TV in later versions.

---

## Keep reading

- [Release AMMDS v1.0.30 — Plugin Assistant and Multi-Part Organization](../2025/250815-ammds-release-v1.0.30.md)
