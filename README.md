# FinAssist — AI-Powered Loan & Credit Guidance Chatbot
### CAPACITI Clickatell AI Bootcamp 2026 — Week 4 Project
**Industry:** Finance / Banking  
**Theme:** End-to-End AI Solution & Career Readiness  
**Date:** May 2026

---

## What is FinAssist?

FinAssist is an AI-powered chatbot that provides instant, plain-language loan and credit guidance to South African banking customers. Powered by Claude AI (Anthropic), it helps users understand loan types, credit scores, application requirements, and responsible borrowing — 24/7, for free, with no personal data collected.

> ⚠️ **Disclaimer:** FinAssist provides general financial guidance only. For personalised advice, consult a qualified financial advisor or your bank.

---

## The Problem It Solves

Many South Africans struggle to make informed decisions about loans and credit because:
- Banking terminology is complex and confusing
- Getting advice from a human advisor takes time and appointments
- Many people don't know what affects their credit score or what to prepare for an application

FinAssist bridges this gap by providing instant, accessible, plain-language answers to financial questions.

---

## Project Files

| File | Description |
|------|-------------|
| `finassist_chatbot.html` | Main deliverable — fully functional AI chatbot |
| `finassist_documentation.docx` | Full project documentation |
| `Week4_FinAssist_Presentation.pptx` | 10-slide presentation deck |
| `README.md` | This file |

---

## How to Use

1. Download `finassist_chatbot.html`
2. Open it in any modern browser (Chrome, Firefox, Edge, Safari)
3. An internet connection is required (for Claude AI API calls)
4. Click a quick-topic button or type any loan/credit question and press **Enter**

### Quick Topics Available
- 💼 What types of loans are available?
- 📊 How does credit score affect my loan application?
- 📄 What documents do I need to apply for a loan?
- 📈 How can I improve my credit score?

---

## How It Works (Architecture)

```
User types question
        ↓
HTML chat interface captures input
        ↓
JavaScript builds API request (with full conversation history)
        ↓
Claude AI processes system prompt + conversation history
        ↓
AI returns plain-language guidance
        ↓
JavaScript renders response with markdown formatting
        ↓
User reads answer and asks follow-up questions
```

---

## Topics Covered

FinAssist can answer questions about:

- **Loan types** — personal loans, home loans (bonds), vehicle finance, student loans, business loans, debt consolidation
- **Credit scores** — what they are, score ranges (300–850), what affects them, how to improve them
- **Application process** — documents needed, eligibility criteria, affordability assessments
- **Interest rates** — fixed vs variable, repo rate, prime rate, how banks calculate rates
- **Responsible borrowing** — debt-to-income ratio, affordability, avoiding over-indebtedness
- **SA credit bureaus** — TransUnion, Experian, Compuscan, XDS
- **National Credit Act (NCA)** — consumer protections
- **Debt solutions** — consolidation and debt review options

---

## Responsible AI Features

FinAssist was built with financial responsibility at its core:

| Guardrail | Implementation |
|-----------|---------------|
| No personal data | Never asks for ID, account details, or income figures |
| No approval decisions | Explains criteria only — never predicts qualification |
| Mandatory disclaimer | Every response reminds users to consult a professional |
| Financial literacy focus | Empowers users with knowledge, not dependency |

---

## Tools Used

| Tool | Purpose |
|------|---------|
| Claude AI (Anthropic) | Core AI — natural language processing and response generation |
| HTML / CSS / JavaScript | Chat interface and API integration |
| Anthropic Messages API | Connects interface to Claude AI |
| DM Serif Display / DM Sans | Typography (loaded from Google Fonts) |

---

## Core Competencies Demonstrated

This project demonstrates the Week 4 core competencies:

1. **End-to-end solution design** — Complete layered architecture from UI to AI to response
2. **Problem-solving using AI** — Real banking problem solved with accessible AI tools
3. **Presentation and storytelling** — 10-slide deck explaining problem, solution, and responsible AI
4. **Portfolio finalization** — Fourth and final project completing the bootcamp portfolio

---

## Full Bootcamp Portfolio

| Week | Project | Description |
|------|---------|-------------|
| Week 1 | AI Chatbot | Conversational AI prototype |
| Week 2 | Content Generator | AI-powered content creation tool |
| Week 3 | Sentiment Analysis Tool | Restaurant review sentiment analyzer |
| Week 4 ✓ | **FinAssist** | AI loan & credit guidance chatbot |

---

## About CAPACITI

CAPACITI is a division of UMU Africa, based in Gqeberha, South Africa.  
📧 hello@capaciti.org.za | 🌐 www.capaciti.org.za

---

*CAPACITI Clickatell AI Bootcamp 2026 | Week 4: AI Solution Development & Industry Application | May 2026*
