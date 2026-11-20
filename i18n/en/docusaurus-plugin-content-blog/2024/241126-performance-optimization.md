---
slug: performance-optimization
title: "Performance Optimization: Cutting a Full Scan from Hours to Tens of Minutes"
authors: [studio]
tags: [ammds, feature]
date: 2024-11-26
---

When a media library has only a few hundred films, performance isn't an issue. When you're faced with tens of thousands of entries and dozens of terabytes of data, scan speed and memory usage become real bottlenecks. This article explains how we tackled that.

{/* truncate */}

## Where the bottleneck was

On a large media library, the most maddening operation is the "full scan" — rechecking every file and updating metadata status.

In early versions, this operation could take hours. The reasons weren't complicated:

- Every file had to be read, parsed and compared;
- Large numbers of redundant metadata queries;
- Serial processing, with no use of concurrency.

For users, this meant a single organizing session ate up half a day, during which they didn't dare close the program.

## Three strategies in combination

We used three strategies to fundamentally improve this.

### Strategy one: incremental scanning

Instead of scanning every file from scratch each time, the system records the state of the last scan and only processes what's new or changed. In day-to-day use, newly added files are usually a tiny fraction, so this single step eliminates the vast majority of redundant work.

### Strategy two: caching

Cache metadata that's already been looked up and site responses that have already been parsed. Information about the same film doesn't need to be fetched from external sites again every time. Caching both reduces network requests and eases the load on external sites.

### Strategy three: batch processing

Combine scattered single-item operations into batches: read once, write once, commit once. Reducing the number of I/O operations is more effective than optimizing the speed of each individual one.

## Results

With all three strategies combined, full scan time dropped from **several hours to tens of minutes**. Incremental scanning is faster still in day-to-day scenarios — organizing a few newly added films is often a matter of seconds.

This improvement was significant for the project: it turned AMMDS from "usable for small libraries" into "usable for large libraries too". For users who genuinely need to manage media libraries of tens of terabytes, this wasn't a nice-to-have — it was the difference between the product being usable or not.

## A takeaway

Performance optimization can easily fall into the trap of "premature optimization". Our experience is:

> First get the feature working correctly, let real-scale data expose the bottlenecks, then go after those bottlenecks.

Our own media libraries are the best performance test cases. That's another benefit of "eating our own dog food" — you're never short of real performance pressure.

---

## Keep reading

- [Eating Our Own Dog Food: How We Use Our Own Product](/blog/dogfooding)
- [AMMDS: From Concept to Reality — The Birth of a Product](/blog/ammds-concept-to-reality)
- [Documentation: Tasks and Scanning](/docs/backend/task/scan)
