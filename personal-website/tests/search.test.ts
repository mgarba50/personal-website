import { describe, expect, it } from "vitest";
import { filterSearchRecords, searchRecords } from "@/lib/search";

describe("searchRecords", () => {
  it("provides seeded records across the platform", () => {
    expect(searchRecords.length).toBeGreaterThan(10);
  });

  it("filters by keyword and type", () => {
    const results = filterSearchRecords("agro", "Article");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((item) => item.type === "Article")).toBe(true);
  });
});
