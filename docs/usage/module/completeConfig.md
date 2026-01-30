---
sidebar_position: 3
sidebar_label: "Number Completion Configuration"
---

# Number Completion Configuration

Number completion configuration is a number identification auxiliary function used to complete numbers during organization, improving the accuracy and completeness of number identification.

<!-- truncate -->

## Access Number Completion Configuration

You can access the number completion rule configuration page through the following path:

**Task Management >> Number Completion Rules**

## Configuration Interface

![Number Completion Rules](/img/usage/module/number-complete-01.png)

## Function Description

### Number Completion Rules

**Function Description**: By creating number completion rules, the system can automatically complete missing parts when identifying numbers, improving the accuracy of number identification.

**Applicable Scenarios**:
- Incomplete numbers in file names
- Non-standard number formats
- Numbers using abbreviations or variations

## Configuration Method

### Create Number Completion Rules

1. On the **Number Completion Rules** page, click the **Create** button
2. Fill in the rule name and completion rule
3. Save the rule

### Rule Format

Number completion rules usually consist of two parts:
- **Matching pattern**: Used to identify numbers that need completion
- **Completion pattern**: Used to specify how to complete numbers

## Configuration Examples

Here are several examples of number completion rules:

| Rule Name | Matching Pattern | Completion Pattern | Description |
|-----------|------------------|--------------------|-------------|
| Complete Prefix | `^([0-9]+)$` | `ABC-$1` | Complete pure number numbers to ABC-number format |
| Complete Suffix | `^(XYZ)([0-9]+)$` | `$1-$2` | Complete XYZ123 format numbers to XYZ-123 format |
| Replace Separator | `^([A-Z]+)_([0-9]+)$` | `$1-$2` | Replace underscore-separated numbers with hyphen-separated |

## Common Questions

### Q: What is number completion?

**A**: Number completion is an auxiliary function used to automatically complete or correct incomplete, non-standard numbers during the number identification process, improving the accuracy of number identification.

### Q: When do I need to use number completion rules?

**A**: When the number format in your video file names is not uniform, incomplete, or uses special formats, using number completion rules can help the system more accurately identify numbers.

### Q: How to judge if number completion rules are effective?

**A**: You can verify through the following methods:
1. Configure number completion rules
2. Run a scanning task
3. Check the number identification situation in the scanning results
4. Check if the numbers were corrected according to the completion rules

### Q: Can I create multiple number completion rules?

**A**: Yes, you can create multiple different number completion rules, and the system will apply them in the order of rule priority.

### Q: What is the matching order of number completion rules?

**A**: The system will apply them in the order they were created, with earlier created rules being applied first.

## Best Practices

- **Rule name**: Use descriptive names for easy subsequent management
- **Matching pattern**: When using regular expressions, ensure the pattern accurately matches the target number format
- **Completion pattern**: Ensure the completed number format conforms to the standard format
- **Rule quantity**: Avoid creating too many rules to prevent conflicts between rules
- **Regular maintenance**: Regularly adjust and optimize rules based on actual usage conditions
