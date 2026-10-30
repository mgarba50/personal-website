import { siteOrigin } from "@/lib/auth-config";
export const privateHeaders = { "Cache-Control": "private, no-store, max-age=0", "X-Robots-Tag": "noindex, nofollow", "Referrer-Policy": "no-referrer", "X-Content-Type-Options": "nosniff" };
export class PublicError extends Error { constructor(public status: number, message: string) { super(message); } }
export function apiError(error: unknown) {
  return Response.json({ ok: false, message: error instanceof PublicError ? error.message : "This service is temporarily unavailable. Please contact support." }, { status: error instanceof PublicError ? error.status : 503, headers: privateHeaders });
}
export function sameOrigin(request: Request) {
  const allowed = new Set([siteOrigin(), "https://musaallama.com", "https://www.musaallama.com"]);
  if (!request.headers.get("origin") || !allowed.has(request.headers.get("origin")!)) throw new PublicError(403, "Please submit this request from the website.");
}
export async function limitedBody(request: Request, limit: number) {
  if (Number(request.headers.get("content-length") || 0) > limit) throw new PublicError(413, "The submission is too large.");
  const reader = request.body?.getReader();
  if (!reader) throw new PublicError(400, "The submission is empty.");
  const chunks: Uint8Array[] = []; let total = 0;
  try { while (true) {
    const part = await reader.read(); if (part.done) break;
    total += part.value.byteLength;
    if (total > limit) { await reader.cancel(); throw new PublicError(413, "The submission is too large."); }
    chunks.push(part.value);
  } } finally { reader.releaseLock(); }
  return Buffer.concat(chunks, total);
}
export function textField(data: FormData, key: string, max: number, required = true) {
  const value = data.get(key);
  if ((value !== null && typeof value !== "string") || (typeof value === "string" && value.length > max)) throw new PublicError(400, "Check the submitted details.");
  const result = String(value || "").trim();
  if (required && !result) throw new PublicError(400, "Complete the required fields.");
  return result;
}
export function validReceipt(file: File) {
  const types: Record<string, string> = { "application/pdf": "pdf", "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" };
  if (!types[file.type] || file.size <= 0 || file.size > 4 * 1024 * 1024) throw new PublicError(400, "Use a PDF, JPEG, PNG or WebP receipt no larger than 4 MB.");
  return types[file.type];
}
export async function checkReceiptSignature(file: File) {
  const b = Buffer.from(await file.slice(0, 12).arrayBuffer());
  const ok = file.type === "application/pdf" ? b.subarray(0,5).toString() === "%PDF-" : file.type === "image/png" ? b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) : file.type === "image/jpeg" ? b[0] === 255 && b[1] === 216 && b[2] === 255 : b.subarray(0,4).toString() === "RIFF" && b.subarray(8,12).toString() === "WEBP";
  if (!ok) throw new PublicError(400, "The receipt format could not be verified.");
}
