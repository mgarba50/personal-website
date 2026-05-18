export type PaymentProvider = "stripe" | "paystack" | "flutterwave" | "manual";

export const paymentProviders = {
  stripe: {
    publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
  },
  paystack: {
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    secretKey: process.env.PAYSTACK_SECRET_KEY,
  },
  flutterwave: {
    publicKey: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
    secretKey: process.env.FLUTTERWAVE_SECRET_KEY,
  },
};

export function isManualPayment(provider: string | null) {
  return provider === "manual";
}
