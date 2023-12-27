export const prerender = false;

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { create, insertMultiple, search } from "@orama/orama";

export const GET: APIRoute = async ({ params }) => {
  const posts: never[] = await getCollection("posts");

  const db = await create({
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

  await insertMultiple(db, posts);

  const results = await search(db, {
    term: params.term ?? "",
  });

  return new Response(JSON.stringify(results));
};
