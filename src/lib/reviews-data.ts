import type { Sentiment } from "./sentiment";

export interface ReviewRow {
  id: number;
  sentiment: Sentiment;
  score: number;
  keys: string;
  stars: number;
}

export const reviews: ReviewRow[] = [
  { id: 1, sentiment: "Positive", score: 98, keys: "absolutely incredible, divine, will be back", stars: 5 },
  { id: 2, sentiment: "Positive", score: 97, keys: "best pizza ever, highly recommend, makes all the difference", stars: 5 },
  { id: 3, sentiment: "Positive", score: 96, keys: "absolutely loved it, showstopper, beautifully presented", stars: 5 },
  { id: 4, sentiment: "Positive", score: 95, keys: "never disappoints, always consistent, remember our names", stars: 5 },
  { id: 5, sentiment: "Positive", score: 84, keys: "really lovely, fresh and generous — mild qualifier: slightly pricey", stars: 4 },
  { id: 6, sentiment: "Positive", score: 97, keys: "outstanding, flawlessly, could not fault a single thing", stars: 5 },
  { id: 7, sentiment: "Positive", score: 88, keys: "great atmosphere, one of the best, crispy and well-salted", stars: 4 },
  { id: 8, sentiment: "Positive", score: 96, keys: "absolutely love, consistently top-notch, best spots", stars: 5 },
  { id: 9, sentiment: "Positive", score: 90, keys: "fantastic, perfectly poached, totally worth it", stars: 4 },
  { id: 10, sentiment: "Positive", score: 98, keys: "passion for food, unforgettable, worth every cent", stars: 5 },
  { id: 11, sentiment: "Positive", score: 87, keys: "warm feel, generous portions, consistently good", stars: 4 },
  { id: 12, sentiment: "Positive", score: 97, keys: "went out of their way, spectacular, complimentary bottle", stars: 5 },
  { id: 13, sentiment: "Neutral", score: 78, keys: "decent, nothing memorable, would go back if in the area", stars: 3 },
  { id: 14, sentiment: "Neutral", score: 80, keys: "average, lacked seasoning, not bad just not great", stars: 3 },
  { id: 15, sentiment: "Neutral", score: 75, keys: "it was okay, toppings were sparse, might try again", stars: 3 },
  { id: 16, sentiment: "Neutral", score: 77, keys: "mixed experience, bland, redeemed somewhat", stars: 3 },
  { id: 17, sentiment: "Neutral", score: 76, keys: "neither impressed nor disappointed, fine, would suggest expanding", stars: 3 },
  { id: 18, sentiment: "Negative", score: 99, keys: "horrific, dismissive and rude, strongly advise others to avoid", stars: 1 },
  { id: 19, sentiment: "Negative", score: 99, keys: "piece of plastic, barely apologised, unacceptable food safety", stars: 1 },
  { id: 20, sentiment: "Negative", score: 92, keys: "completely overpriced, tasted off, disappointed", stars: 2 },
  { id: 21, sentiment: "Negative", score: 97, keys: "disorganised, mediocre at best, terrible all round", stars: 1 },
  { id: 22, sentiment: "Negative", score: 93, keys: "very disappointing, overcooked, did not match", stars: 2 },
  { id: 23, sentiment: "Negative", score: 98, keys: "shocking hygiene, sticky tables, would not recommend", stars: 1 },
  { id: 24, sentiment: "Negative", score: 91, keys: "slow and unfriendly, bad taste, no reason to come back", stars: 2 },
  { id: 25, sentiment: "Negative", score: 99, keys: "food poisoning, unsympathetic, zero accountability", stars: 1 },
];
