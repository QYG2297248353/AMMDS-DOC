---
title: Life Archive
sidebar_label: Life Archive
description: Keep anniversaries, figure records, fitness records and intimacy records in the admin area — what each page does, how to fill in the fields, and what the limits are.
sidebar_position: 5.5
---

# Life Archive

Life Archive（生活档案）is a private record book for yourself, kept in the admin sidebar. It has four pages: **Anniversary（纪念日）**, **Figure Records（身材记录）**, **Fitness Records（健身记录）** and **Intimacy（亲密生活）**. The pages are independent, so use only the ones you need.

Life Archive is available only after you sign in to the admin area. The public site has no entry to it. Everything stays inside your own AMMDS instance and is not synced to an outside service.

## Entry and shared behaviour

After signing in, find **生活档案（Life Archive）** in the left sidebar and expand it to see the four pages.

All four pages work the same way:

- Use the **Add** button at the top to create a record; save when you are done.
- Every row can be edited or deleted. You get a confirmation first, and **deleting is permanent**.
- Lists show 10 rows per page by default; you can change the page size or move between pages.
- The summary cards and charts refresh after you save, edit or delete a record.

## 1. Anniversaries

Anniversaries（纪念日）is for birthdays, wedding anniversaries, festivals and important work dates. Four summary cards sit at the top:

| Card | What it counts |
| --- | --- |
| Anniversaries | Every anniversary record |
| Upcoming | Records whose next occurrence falls within the next 7 days, including today |
| This Month | Records whose month matches the current month |
| Today | Records whose month and day both match today |

All four cards use **every record**. They do not change when you search or filter the list.

### Add an anniversary

Choose **新增纪念日（Add Anniversary）** and fill in the fields below.

| Field | How to fill it | Notes and limits |
| --- | --- | --- |
| Event Name | Required | 2–30 characters, for example “Wedding anniversary” |
| Date Type | Solar（新历）or Lunar（农历）, default Solar | Choosing Lunar only marks the record; the date is not converted for you |
| Date | Required | Pick the day the event happened or will happen; future dates are allowed |
| Event Type | Required, default Anniversary | Birthday, Anniversary, Festival, Work, Personal or Other; the list shows a coloured tag for each type |
| Repeat Type | Required, default Yearly | Yearly, Monthly or Once |
| Reminder Time | Default “1 day before” | Same day, 1 day before, 3 days before, 7 days before or No reminder; saved records show a **Reminder** tag in the list |
| Notes | Optional | Up to 200 characters |

:::note[Repeat type and the countdown]
Repeat Type is stored as information about the record. The countdown in the list and the summary cards are always based on the next occurrence of the same month and day. Selecting Monthly or Once does not change that.
:::

### List and filters

- The search box looks at the event name and the notes.
- Choose **筛选（Filter）** to filter by event type and date range, then choose **应用筛选（Apply）**.
- The type filter offers Birthday, Anniversary, Festival, Work and Other. It **does not offer Personal**. You can still choose Personal when adding a record; you just cannot filter by it yet.
- The countdown reads “Today”, “Tomorrow”, “Day after tomorrow” or “In N days”. It is based on the month and day only, not the year.
- Tick several rows to delete them in one go.

## 2. Figure Records

Figure Records（身材记录）tracks changes in height, weight and body measurements. Four summary cards sit at the top:

| Card | What it counts |
| --- | --- |
| Total Records | Every figure record |
| Avg. Height | Average across all records |
| Avg. Weight | Average across all records |
| Avg. BMI | Average across all records |

The summary cards use every record. The **Weight & BMI Trend** chart below follows the current filter and redraws after you apply it.

### Add a figure record

Choose **新增记录（Add Record）** and fill in the fields below.

| Field | How to fill it | Notes and limits |
| --- | --- | --- |
| Record Date | Required | Today or earlier only; future dates are not allowed |
| Height | Required | 100–250 cm, at most 1 decimal place |
| Weight | Required | 30–200 kg, at most 1 decimal place |
| BMI | Calculated automatically | Based on height and weight, shown with 1 decimal place; it updates when either value changes |
| Chest / Waist / Hip | Optional | Each 40–200 cm, at most 1 decimal place |
| Bicep | Optional | 15–60 cm, at most 1 decimal place |
| Thigh | Optional | 30–100 cm, at most 1 decimal place |
| Calf | Optional | 20–60 cm, at most 1 decimal place |
| Remark | Optional | Up to 200 characters |

The BMI ranges match the labels on the page:

| BMI | Label |
| --- | --- |
| Below 16 | Severely Low |
| 16 to under 18.5 | Underweight |
| 18.5 to under 24 | Healthy |
| 24 to under 28 | Overweight |
| 28 to under 32 | Obese |
| 32 and above | Severely Obese |

### List and filters

- The search box looks at remarks and also accepts height or weight numbers.
- Choose **筛选（Filter）** to filter by record date range and weight range.
- The start date cannot be later than the end date, and the minimum weight cannot be greater than the maximum weight; the page warns you if either is wrong.
- Page size can be 10, 20 or 50 rows.
- You can edit a record, delete one row, or tick several rows and delete them together.
- If the trend chart has no data, it shows “No trend data in the current filter range”.

## 3. Fitness Records

Fitness Records（健身记录）is for logging each workout. Four summary cards sit at the top: Total Records, Total Duration, Avg. Duration and Calories Burned. All four use every record.

Two charts sit below:

| Chart | What it shows |
| --- | --- |
| Workout Trend (Last 30 Days) | Total duration and calories for each of the last 30 days; days without a workout count as zero |
| Sport Type Distribution | The share of each sport type, ordered by total duration across all records |

Both charts use fixed data and are not affected by the list filters.

### Add a fitness record

Choose **新增记录（Add Record）** and fill in the fields below.

| Field | How to fill it | Notes and limits |
| --- | --- | --- |
| Record Date | Required | Date only; no time of day |
| Sport Type | Required | Aerobic, Strength Training, Yoga, Swimming, Running, Cycling or Other |
| Exercise | Required | Up to 128 characters, for example “Jogging” or “Bench press” |
| Intensity | Required | Low, Medium or High |
| Feeling | Required | Easy, Moderate, Tired or Exhausted |
| Duration | Required | 0–1440 minutes, whole numbers only |
| Calories | Required | 0–20000 kcal, whole numbers only; estimated automatically once type, intensity and duration are filled in |
| Location | Optional | Up to 128 characters |
| Heart Rate | Optional | 0–300; enter the average heart rate, whole numbers only |
| Weight | Optional | 0–500 kg, at most 1 decimal place |
| Shoulder Width | Optional | 0–300 cm, at most 1 decimal place |
| Bicep | Optional | 0–300 cm, at most 1 decimal place |
| Forearm | Optional | 0–300 cm, at most 1 decimal place |
| Chest | Optional | 0–300 cm, at most 1 decimal place |
| Waist | Optional | 0–300 cm, at most 1 decimal place |
| Hip | Optional | 0–300 cm, at most 1 decimal place |
| Thigh | Optional | 0–300 cm, at most 1 decimal place |
| Calf | Optional | 0–300 cm, at most 1 decimal place |
| Remark | Optional | Up to 1000 characters |

:::note[Calories are only an estimate]
The automatic number is a common reference value based on sport type, intensity and duration; it is not a precise measurement. You can edit it directly. You can also open **计算器（Calculator）**, enter your weight, sport type, intensity and duration, get an estimate based on your weight, and apply it to the record.
:::

### List and filters

- The search box looks at sport type and location.
- Choose **筛选（Filter）** to filter by sport type, intensity and record date range.
- Click a column header to sort by record date, duration or calories.
- You can edit a record, delete one row, or tick several rows and delete them together.
- The list shows summary fields only. Heart rate, measurements and remarks are visible when you open a record for editing.

## 4. Intimacy

Intimacy（亲密生活）stores private records. Four summary cards sit at the top:

| Card | What it counts |
| --- | --- |
| Total Records | Every intimacy record |
| Orgasm Count | Records where Orgasm is set to Yes |
| Avg. Duration | Average duration across all records |
| Partner Count | The number of different partner names that appear in your records |

The **Frequency, last 12 months** chart counts records by month, including the current month. Months without records show as zero. The cards and chart use every record.

:::note[The list shows a summary only]
The list shows date, type, partner, location, duration, protection and mood. Private details such as remarks are not shown in the list; open a record with **编辑（Edit）** to see them.
:::

### Add an intimacy record

Choose **新增记录（New record）** and fill in the fields below.

| Field | How to fill it | Notes and limits |
| --- | --- | --- |
| Date | Required | Date only |
| Type | Required | Solo（自慰）, Partner（伴侣）, Same-sex（同性）or Group（多人） |
| Partner | Required for every type except Solo | Pick a name from earlier records or type a new one; Group allows several partners |
| Location | Required | Up to 128 characters |
| Duration | Required | 0–1440 minutes, whole numbers only |
| Protection | Optional | Condom, Female condom, Birth control pill, IUD, Sterilization or None |
| Position | Optional | Up to 64 characters |
| Lingerie | Optional | Yes or No, default No |
| Orgasm | Optional | Yes or No, default No |
| Partner Orgasm | Shown for every type except Solo | Yes or No, default No |
| Ejaculation | Shown for every type except Solo | Inside, Outside, Face, Chest, Oral or Anal |
| Squirting | Optional | Yes or No, default No |
| Props | Optional | Up to 255 characters |
| Mood | Optional | Pleasant, Excited, Calm or Tired |
| Remark | Optional | Up to 1000 characters |

:::note[Solo hides partner fields]
When Type is set to **Solo（自慰）**, the **Partner**, **Partner Orgasm** and **Ejaculation** fields are hidden automatically, and no partner is required. Switch back to Partner, Same-sex or Group and those fields reappear.
:::

### List and filters

- The search box looks at partner and location.
- Click a column header to sort by date, partner or duration.
- This page has search only; there is no date or type filter.
- You can edit a record, delete one row, or tick several rows and delete them together.

## Data and privacy

- Life Archive is available only to people signed in to the admin area. The public site has no entry and no share link.
- Records stay in your own AMMDS instance and are not uploaded to an outside service.
- Deleting is permanent, whether you delete one row or several.
- Summary cards use every record and are not affected by search or filters. The figure trend follows the filters; the fitness and intimacy charts use fixed ranges.

## Common questions

| Symptom | Explanation |
| --- | --- |
| I cannot find Life Archive in the sidebar | Sign in to the admin area first. Life Archive is not in the public site menu |
| The summary cards did not change after filtering | Expected: they use every record. The Weight & BMI Trend chart does follow the figure filters |
| I chose Monthly for an anniversary, but the countdown still counts by year | The countdown and summary always use the next occurrence of the same month and day; Repeat Type is stored as information only |
| The lunar date was not converted | Choosing Lunar only marks the record. The date is saved as the day you picked; check a lunar calendar and enter the matching date yourself |
| I cannot edit BMI | BMI is calculated from height and weight; change either value and it updates |
| The estimated calories look wrong | It is a reference value; edit it directly, or use the calculator to estimate from your weight |
| The partner fields disappeared after choosing Solo | That is intended. Partner-related fields hide automatically and come back when you choose another type |
| I cannot see remarks in the intimacy list | The list shows a summary only; open a record with Edit to see remarks |
| Can I recover a deleted record? | No. Deleting is permanent |

## Next

- [Common questions](../faq)
- [Profile, store and sign-in security](./account/overview)
- [Admin features](/docs/backend)
