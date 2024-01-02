import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blog = (await getCollection("posts")).filter(
    ({ data }) => data.published,
  );

  return rss({
    title: "Alex Nguyen",
    description: "Website of web developer Alex Nguyen",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  });
}
