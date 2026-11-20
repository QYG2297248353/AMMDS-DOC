---
slug: dogfooding
title: "Eating Our Own Dog Food: How We Use Our Own Product"
authors: [studio]
tags: [studio, ammds]
date: 2024-02-20
---

"Eating our own dog food" (dogfooding) sounds like a joke, but it's a working practice our team genuinely sticks to: team members use AMMDS every day to manage their own media libraries. This article explains why.

{/* truncate */}

## Why we don't leave it to others

The easiest mistake for tool builders to make is "building features on assumption" — assuming users will use something a certain way, designing to that assumption, and only discovering after launch that it's nothing like reality.

The most direct way to counter this bias is to become the first user yourself. When team members use their own product every day to organize hundreds of gigabytes or even terabytes of media files:

- If some action takes five clicks to complete, we're the first to get fed up;
- If an error message is vague, we're the first to get stuck;
- If a field is always missing in real data, we're the first to notice.

Problems surface early with us, rather than waiting for users to report them.

## The feedback loop from "use" to "improvement"

Dogfooding isn't simply "using" the product — it's a closed loop:

```text
Daily use → spot what feels awkward → log it as an issue → put it in an iteration → verify with another round of use
```

There's also a more down-to-earth reason we stick with "eating our own dog food": **the team members' own media libraries are the best test set.** They have real messy naming, real missing metadata and real format inconsistencies — things no carefully constructed test data can simulate.

## How it shapes the product

Many of the designs you see today trace back to this kind of "discovered by using it ourselves" experience:

- **Batch operations**: because fixing things one by one really is exhausting;
- **Unified dashboard**: because switching between different tools really is annoying;
- **Defaults that just work**: because nobody wants to fill in a dozen settings for a simple organizing job.

These didn't come from surveys — they came from our own furrowed brows.

## The relationship with user feedback

Of course, dogfooding can't replace user feedback. Our own use cases are just one among many. So every release draws on both the team's own experience and feedback from real users — the two complement each other:

- Using it ourselves lets us quickly spot problems that are "obviously wrong";
- User feedback shows us ways of using it that "we never thought of".

For a product to stay healthy over the long term, it needs both voices.

---

## Keep reading

- [Before the Project Began: What Problem Were We Really Trying to Solve](/blog/project-inception)
- [AMMDS: From Concept to Reality — The Birth of a Product](/blog/ammds-concept-to-reality)
- [Technology Choices: Why We Ended Up with Java SpringBoot + Vue3](/blog/tech-stack-decision)
