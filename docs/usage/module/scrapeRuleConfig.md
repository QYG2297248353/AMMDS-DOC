---
sidebar_position: 2
sidebar_label: "Scrape Rule Configuration"
---

# Scrape Rule Configuration

Scrape rule configuration is used to set the rules for scraping media metadata, including scraper selection, metadata fields, and other settings, helping you accurately obtain the metadata you need.

<!-- truncate -->

## Access Scrape Rule Configuration

You can access the scrape rule configuration page through the following path:

**Task Management >> Scrape Rules**

## Configuration Interface

![Scrape Rules](/img/usage/module/scrape-rule-01.png)

## Function Description

### Scrape Rules

**Function Description**: By creating scrape rules, you can specify which scrapers to use and how to process metadata, improving the accuracy and completeness of metadata scraping.

**Applicable Scenarios**:
- When you want to use specific scrapers for different types of media
- When you want to customize which metadata fields to obtain
- When you want to set specific scraping conditions

## Configuration Method

### Create Scrape Rules

1. On the **Scrape Rules** page, click the **Create** button
2. Fill in the rule name and configuration parameters
3. Save the rule

### Rule Parameters

#### Scraper Selection

**Function Description**: Select the scrapers to be used for metadata scraping.

**Configuration Suggestion**: Select scrapers that are suitable for the type of media you want to scrape.

#### Metadata Fields

**Function Description**: Set which metadata fields to obtain during scraping.

**Configuration Suggestion**: Select the metadata fields you need, such as title, poster, synopsis, actors, etc.

#### Scraping Priority

**Function Description**: Set the priority order of scrapers.

**Configuration Suggestion**: Arrange scrapers in order of reliability and completeness of metadata.

## Configuration Examples

Here are several examples of scrape rules:

| Rule Name | Scrapers | Metadata Fields | Scraping Priority |
|-----------|----------|----------------|-------------------|
| Japanese Media | Fanza, Metatube | Title, Poster, Synopsis, Actors | Fanza > Metatube |
| Western Media | TMDB, IMDB | Title, Poster, Synopsis, Year, Genre | TMDB > IMDB |
| All Media | TMDB, Fanza, Metatube | Title, Poster, Synopsis | TMDB > Fanza > Metatube |

## Common Questions

### Q: What is the purpose of scrape rules?

**A**: Scrape rules are used to guide the metadata scraping process, helping the system select appropriate scrapers and obtain the metadata fields you need, improving scraping efficiency and metadata quality.

### Q: How to set up effective scrape rules?

**A**: You can set up effective scrape rules through the following methods:
1. Select scrapers that are suitable for your media type
2. Reasonably set metadata fields based on your needs
3. Arrange scraper priority in a reasonable order
4. Regularly update and optimize scrape rules based on actual usage

### Q: Can I create multiple scrape rules?

**A**: Yes, you can create multiple scrape rules for different types of media, and select the appropriate scrape rule when creating a scraping task.

### Q: What happens if no scrape rule is selected?

**A**: If no scrape rule is selected, the system will use the default scrape rule, which usually uses commonly used scrapers and obtains basic metadata fields.

### Q: How to test if the scrape rule is effective?

**A**: You can test through the following methods:
1. Configure scrape rules
2. Create a scraping task and select the scrape rule
3. Run the scraping task
4. Check if the metadata obtained meets your expectations

## Best Practices

- **Clear rule naming**: Use descriptive rule names for easy subsequent management
- **Reasonable scraper selection**: Select scrapers that are suitable for your specific media type
- **Appropriate metadata field settings**: Only select the metadata fields you actually need
- **Effective scraper priority**: Arrange scrapers in order of reliability
- **Regular rule maintenance**: Regularly review and update scrape rules based on actual usage
