const EMBED_SIZE = 96;

export function embedText(text: string): number[] {
  const vec = new Array(EMBED_SIZE).fill(0);
  for (let i = 0; i < text.length; i += 1) {
    const idx = text.charCodeAt(i) % EMBED_SIZE;
    vec[idx] += 1;
  }
  const mag = Math.sqrt(vec.reduce((a, b) => a + b * b, 0)) || 1;
  return vec.map((v) => Number((v / mag).toFixed(6)));
}

export function cosine(a: number[], b: number[]): number {
  const length = Math.min(a.length, b.length);
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < length; i += 1) {
    dot += a[i] * b[i];
    magA += a[i] ** 2;
    magB += b[i] ** 2;
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB) || 1;
  return dot / denom;
}
