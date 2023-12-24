import { getCollection } from "astro:content";
import { create, insertMultiple, search } from "@orama/orama";

export async function GET() {
  const posts = await getCollection("posts");

  /*console.log("posts", posts);

  const searchDB = await create({
    schema: {
      id: "string",
      slug: "string",
      body: "string",
      collection: "string",
      data: {
        title: "string",
        date: "string",
        tags: {
          slug: "string",
          collection: "string",
        },
        description: "string",
        published: "boolean",
      },
    },
  });

  await insertMultiple(searchDB, posts as never[]);

  const searchResult = await search(searchDB, {
    term: "",
  });*/

  return new Response(JSON.stringify(posts));
}
