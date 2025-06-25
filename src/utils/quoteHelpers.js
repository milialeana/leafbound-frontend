import quotes from "./quotes";

export function getRandomQuote(excludeId = null) {
  const filtered = quotes.filter((q) => q.id !== excludeId);
  return filtered[Math.floor(Math.random() * filtered.length)];
}
