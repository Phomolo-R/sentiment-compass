export type Sentiment = "Positive" | "Negative" | "Neutral";

export interface AnalysisResult {
  sentiment: Sentiment;
  confidence: number;
  signals: string[];
  explanation: string;
}

const positiveWords = ["love","amazing","incredible","outstanding","excellent","perfect","fantastic","wonderful","best","great","delicious","divine","superb","brilliant","exceptional","top","recommend","flawless","flawlessly","spectacular","unforgettable","attentive","fresh","generous","warm","lovely","enjoyable","impressive","pleased","happy","satisfied","worth","definitely","always","loved","loved"];
const negativeWords = ["horrible","terrible","awful","disgusting","worst","never","avoid","rude","cold","slow","wrong","bad","poor","disappointing","disappointed","unacceptable","dirty","mediocre","overpriced","bland","undercooked","stale","tasteless","inedible","shocking","horrific","appalling","atrocious","dreadful","pathetic","useless","dismissive","unapologetic","disorganised","filthy","sticky","unsafe"];
const neutralWords = ["okay","fine","decent","average","moderate","reasonable","acceptable","adequate","fair","ordinary","standard","mixed","passable","alright","satisfactory"];
const neutralPhrases = ["nothing special","not too bad","not great","go back if"];

export function analyzeSentiment(text: string): AnalysisResult {
  const lower = text.toLowerCase();
  const words = lower.match(/\b[\w']+\b/g) || [];

  let posScore = 0, negScore = 0, neuScore = 0;
  const foundPos: string[] = [], foundNeg: string[] = [], foundNeu: string[] = [];

  words.forEach((w) => {
    if (positiveWords.includes(w)) { posScore++; foundPos.push(w); }
    if (negativeWords.includes(w)) { negScore++; foundNeg.push(w); }
    if (neutralWords.includes(w)) { neuScore++; foundNeu.push(w); }
  });
  neutralPhrases.forEach((p) => {
    if (lower.includes(p)) { neuScore += 2; foundNeu.push(p); }
  });

  const total = posScore + negScore + neuScore || 1;
  let sentiment: Sentiment;
  let confidence: number;
  let signals: string[];
  let explanation: string;

  if (posScore === 0 && negScore === 0 && neuScore === 0) {
    sentiment = "Neutral";
    confidence = 60;
    signals = ["no strong sentiment signals detected"];
    explanation = "This review does not contain strongly positive or negative language. It may be very factual or descriptive without expressing clear emotion.";
  } else if (posScore > negScore && posScore >= neuScore) {
    const dominance = posScore / total;
    confidence = Math.min(99, Math.round(65 + dominance * 35));
    if (negScore > 0) confidence = Math.max(70, confidence - negScore * 5);
    sentiment = "Positive";
    signals = [...new Set(foundPos)].slice(0, 5);
    explanation = `Classified as Positive with ${confidence}% confidence. ${posScore} positive signal${posScore > 1 ? "s were" : " was"} detected${negScore > 0 ? `, alongside ${negScore} negative signal${negScore > 1 ? "s" : ""} that slightly lowered confidence` : ""}.`;
  } else if (negScore > posScore && negScore >= neuScore) {
    const dominance = negScore / total;
    confidence = Math.min(99, Math.round(65 + dominance * 35));
    if (posScore > 0) confidence = Math.max(70, confidence - posScore * 5);
    sentiment = "Negative";
    signals = [...new Set(foundNeg)].slice(0, 5);
    explanation = `Classified as Negative with ${confidence}% confidence. ${negScore} negative signal${negScore > 1 ? "s were" : " was"} detected${posScore > 0 ? `, alongside ${posScore} positive signal${posScore > 1 ? "s" : ""} that slightly lowered confidence` : ""}.`;
  } else {
    confidence = Math.round(60 + Math.min(neuScore, 5) * 4);
    sentiment = "Neutral";
    signals = [...new Set([...foundNeu, ...foundPos.slice(0, 2), ...foundNeg.slice(0, 2)])].slice(0, 5);
    explanation = `Classified as Neutral with ${confidence}% confidence. It contains a mix of positive (${posScore}) and negative (${negScore}) signals without a clear dominant tone.`;
  }

  if (signals.length === 0) signals = ["general sentiment cues"];
  return { sentiment, confidence, signals, explanation };
}

export const presets: Record<string, string> = {
  positive: "Absolutely incredible experience from start to finish! The pasta was perfectly cooked and the truffle sauce was divine. Our waiter was attentive without being intrusive. Will be back every chance we get!",
  neutral: "Decent food but nothing particularly memorable. The chicken burger was fine — not too dry, not too saucy. Service was okay, a little slow at times. Would go back if I was in the area.",
  negative: "Horrific experience. Waited over an hour for food that arrived cold and undercooked. When we complained the manager was dismissive and rude. Will never return and would strongly advise others to avoid this place.",
  mixed: "The food itself was quite good — the pizza had great flavour and the dessert was lovely. But the service was really slow and the restaurant felt understaffed for a Saturday evening. Mixed feelings overall.",
};

export const sentimentColor = (s: Sentiment) =>
  s === "Positive" ? "var(--positive)" : s === "Negative" ? "var(--negative)" : "var(--neutral)";

export const sentimentBadgeClass = (s: Sentiment) =>
  s === "Positive"
    ? "bg-positive-soft text-[oklch(0.42_0.13_130)]"
    : s === "Negative"
    ? "bg-negative-soft text-[oklch(0.45_0.18_27)]"
    : "bg-neutral-soft text-[oklch(0.42_0.01_90)]";
