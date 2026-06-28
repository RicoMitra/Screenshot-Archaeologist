export function extractImportantText(text: string, limit = 5): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length >= 3)
    .map((line, index) => ({ line, index, score: scoreLine(line) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map((item) => item.line);
}

function scoreLine(line: string) {
  let score = Math.min(line.length, 90) / 3;
  if (/\b(error|exception|failed|invoice|receipt|schedule|deadline|interview|lesson|article|summary)\b/i.test(line)) score += 35;
  if (/\b(TypeError|ReferenceError|SyntaxError|stack trace)\b/i.test(line)) score += 24;
  if (/\b(Rp|IDR|\$|USD|EUR)\s?\d|\d{1,2}\s+[A-Z][a-z]+\s+\d{4}/.test(line)) score += 22;
  if (/[.:]\s+\S/.test(line)) score += 8;
  if (line.length < 8) score -= 18;
  return score;
}
