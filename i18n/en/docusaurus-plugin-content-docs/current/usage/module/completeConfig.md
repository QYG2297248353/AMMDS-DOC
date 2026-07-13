---
sidebar_position: 3
sidebar_label: "Number Completion Configuration"
---

# Number Completion Configuration

Number completion configuration is an auxiliary number recognition function used to complete numbers in recognition results during organization, improving the accuracy and completeness of number recognition.

<!-- truncate -->

## Access Number Completion Configuration

You can access the number completion rule configuration page through the following path:

**Task Management >> Number Completion Rules**

## Configuration Interface

![Number Completion Rules](/img/usage/module/number-complete-01.png)

## Function Description

### Number Completion Rules

**Function Description**: By creating number completion rules, the system can automatically complete missing parts when recognizing numbers, improving the accuracy of number recognition.

**Applicable Scenario**:
- Incomplete numbers in file names
- Non-standard number formats
- Numbers using abbreviations or variants

## Configuration Method

### Create Number Completion Rules

1. On the **Number Completion Rules** page, click the **Create** button
2. Fill in the rule name and completion rule
3. Save the rule

### Rule Format

Number completion rules usually consist of two parts:
- **Matching Pattern**: Used to identify numbers that need completion
- **Completion Pattern**: Used to specify how to complete numbers

## Configuration Examples

The following are several examples of number completion rules:

| Rule Name | Matching Pattern | Completion Pattern | Description |
|-----------|-----------------|-------------------|-------------|
| Complete Prefix | `^([0-9]+)$` | `ABC-$1` | Complete pure digital numbers to ABC-number format |
| Complete Suffix | `^(XYZ)([0-9]+)$` | `$1-$2` | Complete XYZ123 format numbers to XYZ-123 format |
| Replace Separator | `^([A-Z]+)_([0-9]+)$` | `$1-$2` | Replace underscore-separated numbers with hyphen-separated |

## Common Questions

### Q: What is number completion?

**A**: Number completion is an auxiliary function used to automatically complete or correct incomplete, non-standard numbers during number recognition, improving the accuracy of number recognition.

### Q: When do I need to use number completion rules?

**A**: When the number formats in your movie file names are inconsistent, incomplete, or use special formats, using number completion rules can help the system more accurately recognize numbers.

### Q: How to determine if number completion rules are effective?

**A**: You can verify through the following methods:
1. Configure number completion rules
2. Run a scan task
3. Check the number recognition status in the scan results
4. Verify if the numbers were corrected according to the completion rules

### Q: Can multiple number completion rules be created?

**A**: Yes, you can create multiple different number completion rules, and the system will apply them in order of priority.

### Q: What is the matching order of number completion rules?

**A**: The system will apply rules in the order they were created, with earlier created rules being applied first.

## Best Practices

- **Rule Names**: Use descriptive names for easier subsequent management
- **Matching Patterns**: When using regular expressions, ensure the pattern accurately matches the target number format
- **Completion Patterns**: Ensure the completed number format conforms to the standard format
- **Rule Quantity**: Avoid creating too many rules to prevent conflicts between rules
- **Regular Maintenance**: Regularly adjust and optimize rules based on actual usage