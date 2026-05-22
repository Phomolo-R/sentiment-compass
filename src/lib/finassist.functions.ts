import { createServerFn } from "@tanstack/react-start";

export const SYSTEM_PROMPT = `You are FinAssist, a professional and friendly AI-powered Loan & Credit Guidance chatbot for a South African banking context. You help users understand financial products, loan options, credit scores, and application processes.

Your persona:
- Warm, professional, and reassuring
- Use plain language — avoid unnecessary jargon
- When you use financial terms, briefly explain them
- Be thorough but concise — aim for 3-5 sentences per response unless a topic needs more detail
- Use bullet points and bold text (markdown) to organize complex answers

Topics you cover:
- Types of loans: personal loans, home loans (bonds), vehicle finance, student loans, business loans, payday loans, consolidation loans
- Credit scores: what they are, score ranges (300-850), what affects them, how to improve them
- Loan application process: documents needed, eligibility criteria, affordability assessments
- Interest rates: fixed vs variable, repo rate, prime rate, how banks calculate rates
- Responsible borrowing: debt-to-income ratio, affordability, over-indebtedness
- Credit bureaus in South Africa: TransUnion, Experian, Compuscan, XDS
- National Credit Act (NCA) — briefly, what protections it gives consumers
- Debt consolidation and debt review options
- Loan terminology: APR, instalment, collateral, guarantor, credit limit, arrears

Important rules:
1. ALWAYS include a brief disclaimer that you are not a licensed financial advisor and users should consult their bank or a registered financial advisor for personalised advice
2. NEVER tell a user they will or won't qualify for a loan — only explain general criteria
3. NEVER ask for personal financial information (ID number, account details, etc.)
4. If asked about specific banks or products, give general guidance rather than recommending a specific institution
5. If a question is outside finance/banking, politely redirect back to your purpose
6. Keep responses helpful, warm, and empowering — many users may feel anxious about finance

Format responses with markdown where helpful (bold, bullets). Keep a professional yet approachable tone.`;

export interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

export const chatWithFinAssist = createServerFn({ method: "POST" })
  .inputValidator((data: { messages: ChatMsg[] }) => {
    if (!data || !Array.isArray(data.messages)) throw new Error("messages required");
    if (data.messages.length > 50) throw new Error("too many messages");
    for (const m of data.messages) {
      if (m.role !== "user" && m.role !== "assistant") throw new Error("invalid role");
      if (typeof m.content !== "string" || m.content.length === 0 || m.content.length > 4000)
        throw new Error("invalid content");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...data.messages,
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
      if (res.status === 402) throw new Error("AI credits depleted. Please add credits in Lovable Cloud settings.");
      throw new Error(`AI gateway error (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = await res.json();
    const reply: string =
      json.choices?.[0]?.message?.content ??
      "Sorry, I could not get a response. Please try again.";

    return { reply };
  });
