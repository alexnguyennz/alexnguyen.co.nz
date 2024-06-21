import { test, expect } from "vitest";
import { GET } from "@/pages/rss.xml.js";
import config from "/astro.config.mjs";

test("returns RSS XML", async () => {
  const response = await GET({ site: config.site });
  const data = await response.text();

  expect(data)
    .to.be.a("string")
    .and.satisfy((msg) =>
      msg.startsWith('<?xml version="1.0" encoding="UTF-8"?>'),
    );
});
