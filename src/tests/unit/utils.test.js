import { test, expect } from "vitest";
import { cn } from "@/lib/utils.ts";

test("returns valid className string", async () => {
  const classNames = cn(
    "px-2 py-1 bg-red hover:bg-dark-red",
    "p-3 bg-[#B91C1C]",
  );

  expect(classNames).toBe("hover:bg-dark-red p-3 bg-[#B91C1C]");
});
