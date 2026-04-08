import { describe, expect, it } from "vitest";
import { books } from "@/content/collections/books";
import { articles } from "@/content/collections/articles";
import { poems } from "@/content/collections/poems";

describe("content smoke", () => {
  it("has seeded records for core collections", () => {
    expect(books.length).toBeGreaterThan(0);
    expect(articles.length).toBeGreaterThan(0);
    expect(poems.length).toBeGreaterThan(0);
  });
});
