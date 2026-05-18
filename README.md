# Restaurant Review Sentiment Analysis
### CAPACITI Clickatell AI Bootcamp 2026 — Week 3 Project
**Theme:** AI for Data Analysis & Insights
**Date:** May 2026

---

## Project Overview

This project demonstrates the use of AI-assisted sentiment analysis to extract meaningful business insights from unstructured restaurant customer review data. A dataset of 25 restaurant reviews was collected, analyzed, and visualized to identify patterns in customer sentiment.

The project fulfills the Week 3 deliverable requirements:
- A sentiment analysis tool (interactive analyzer)
- A dashboard presenting findings visually
- A data insights report with recommendations
- Full documentation

---

## Project Files

| File | Description |
|------|-------------|
| `sentiment_analyzer.html` | Interactive tool — paste any review to get instant sentiment classification |
| `sentiment_dashboard.html` | Visual dashboard — charts, metrics, and full results table |
| `Restaurant_Sentiment_Analysis_Report.docx` | Written insights report with findings and recommendations |
| `restaurant_reviews.csv` | Raw dataset — 25 restaurant reviews with text and star ratings |
| `sentiment_results.csv` | Analysis output — sentiment labels, confidence scores, and key signals |
| `README.md` | This file — project documentation |

---

## Dataset

- **Total Reviews:** 25
- **Source:** Simulated restaurant customer reviews representing typical feedback found on Google Reviews, TripAdvisor, and Zomato
- **Coverage:** Food quality, service, atmosphere, hygiene, value for money

### Sentiment Breakdown

| Sentiment | Count | Percentage | Avg Confidence |
|-----------|-------|------------|----------------|
| Positive  | 12    | 48%        | 93%            |
| Neutral   | 5     | 20%        | 77%            |
| Negative  | 8     | 32%        | 96%            |

---

## Methodology

### Step 1 — Data Collection
25 restaurant reviews were compiled representing a realistic spread of customer experiences, including a mix of positive, neutral, and negative feedback across key dining factors.

### Step 2 — AI-Assisted Classification
Each review was analyzed using AI natural language processing to:
- Assign a **sentiment label** (Positive / Neutral / Negative)
- Calculate a **confidence score** out of 100
- Identify the **key signal words** driving the classification

### Step 3 — Insight Generation
Results were interpreted to identify:
- What drives positive customer experiences
- What characterizes neutral or undecided customers
- What critical issues appear in negative reviews

### Step 4 — Visualization & Reporting
Findings were presented via:
- An interactive HTML dashboard with pie chart, bar chart, and confidence score distribution
- A written Word report with a structured analysis and business recommendations

---

## Key Findings

### What Customers Love (Positive)
Food quality and attentive service are the primary drivers of positive sentiment. High-scoring reviews consistently use strong superlatives and express intention to return.

### The Undecided Customer (Neutral)
Neutral reviews highlight seasoning, portion sizes, and menu variety as areas for improvement. These customers can be converted with targeted improvements.

### Critical Concerns (Negative)
- **Food safety:** Two reviews raised serious hygiene and food safety issues (99% confidence)
- **Wait times:** Multiple reviews cited excessive waits despite reservations
- **Management responsiveness:** Dismissive responses to complaints significantly worsened the customer experience

---

## Recommendations

**Priority 1 — Immediate:**
- Conduct a food safety audit
- Implement a formal complaints response process

**Priority 2 — Short-term:**
- Review reservation and seating management
- Invest in kitchen seasoning training

**Priority 3 — Growth:**
- Expand vegetarian and dietary-preference menu options
- Leverage positive food quality feedback in marketing

---

## Tools Used

| Tool | Purpose |
|------|---------|
| Claude AI (Anthropic) | Sentiment classification and confidence scoring |
| HTML / CSS / JavaScript | Dashboard and analyzer development |
| Chart.js | Data visualization (pie chart, bar chart) |
| Microsoft Word (docx) | Insights report |
| Google Sheets / CSV | Data storage and organization |

---

## Core Competencies Demonstrated

- **Data interpretation using AI** — extracted business insights from raw text data
- **Analytical thinking** — structured the analysis around meaningful questions
- **AI-assisted insights generation** — produced actionable recommendations from AI output
- **Individual project ownership** — all files documented, organized, and portfolio-ready

---

## How to Use the Files

### Sentiment Analyzer
1. Open `sentiment_analyzer.html` in any web browser
2. Paste any restaurant review into the text box
3. Click **Analyze Sentiment** to get an instant classification, confidence score, and key signals
4. Use the preset buttons to try example reviews

### Dashboard
1. Open `sentiment_dashboard.html` in any web browser
2. View the pie chart, bar chart, confidence distribution, and full results table
3. No internet connection required — fully self-contained

### CSV Files
1. Open `restaurant_reviews.csv` or `sentiment_results.csv` in Google Sheets or Excel
2. Use **File → Import** in Google Sheets to upload

---

## Portfolio Notes

This project was completed as part of the CAPACITI Clickatell AI Bootcamp (April–May 2026), Week 3: Sentiment Analysis & Data Insights. It demonstrates the ability to apply AI tools to real-world data analysis tasks and communicate findings professionally.

---

*CAPACITI is a division of UMU Africa | www.capaciti.org.za*
