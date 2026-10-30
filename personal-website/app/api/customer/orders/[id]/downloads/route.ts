import { getCurrentUser } from "@/lib/auth";
import { commerceEnabled, issueLinks, readOrder } from "@/lib/commerce";
import { siteOrigin } from "@/lib/auth-config";
import { apiError, privateHeaders, PublicError, sameOrigin } from "@/lib/request-security";
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    sameOrigin(request);
    const user = await getCurrentUser();
    if (!user) throw new PublicError(401, "Sign in to access your order.");
    commerceEnabled();
    const order = await readOrder((await params).id);
    if (order.user_id !== user.id) throw new PublicError(403, "This order does not belong to your account.");
    const links = await issueLinks(order, user);
    return Response.json({ ok: true, links: links.map(link => ({ title: link.slug, href: `${siteOrigin()}/api/download/${link.token}` })) }, { headers: privateHeaders });
  } catch (error) { return apiError(error); }
}
