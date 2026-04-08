import env from "@/lib/env";

export const paymentChannels = [
  {
    name: "Stripe",
    audience: "International cards and global digital product purchases",
    configured: env.stripeConfigured
  },
  {
    name: "Paystack",
    audience: "Regional and Nigerian payment routing",
    configured: env.paystackConfigured
  },
  {
    name: "Flutterwave",
    audience: "Alternative regional rail",
    configured: env.flutterwaveConfigured
  },
  {
    name: "Manual transfer",
    audience: "Enterprise, procurement, and invoice-led flows",
    configured: true
  }
];

export function getPaymentStatusSummary() {
  const configuredCount = paymentChannels.filter((channel) => channel.configured).length;
  return `${configuredCount}/${paymentChannels.length} channels configured`;
}
