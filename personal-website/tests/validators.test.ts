import { describe, expect, it } from "vitest";
import { diplomaticIntakeSchema, newsletterSchema } from "@/lib/validators";

describe("validators", () => {
  it("accepts a complete diplomatic intake", () => {
    const parsed = diplomaticIntakeSchema.safeParse({
      fullName: "Musa Allama",
      organization: "Office of Musa Allama",
      title: "Principal",
      email: "office@example.com",
      phone: "+2340000000000",
      jurisdiction: "Nigeria",
      sector: "Agro-industrial",
      objective: "Review a strategic mandate.",
      languages: "English, Arabic",
      budget: "$10,000 - $25,000",
      horizon: "This quarter",
      attachment: ""
    });

    expect(parsed.success).toBe(true);
  });

  it("requires consent for newsletter signup", () => {
    const parsed = newsletterSchema.safeParse({
      name: "Reader",
      email: "reader@example.com",
      interests: "Books and essays",
      consent: ""
    });

    expect(parsed.success).toBe(false);
  });
});
