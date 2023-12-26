export const prerender = false;

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { create, insertMultiple, search } from "@orama/orama";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const posts: never[] = await getCollection("posts");

  const searchDB = await create({
    schema: {
      id: "string",
      slug: "string",
      body: "string",
      collection: "string",
      data: {
        title: "string",
        tags: {
          slug: "string",
          collection: "string",
        },
        description: "string",
        published: "boolean",
      },
    },
  });

  await insertMultiple(searchDB, posts);

  const results = await search(searchDB, {
    term: params.get("term") ?? "",
  });

  return new Response(JSON.stringify(results));
};
