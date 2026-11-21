import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles on AWS cloud engineering, large-scale data migrations, event-driven microservices, and observability.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section
      title="Blog"
      subtitle="Engineering notes on cloud architectures, backend reliability, and production observability."
    >
      <BlogExplorer posts={posts} />
    </Section>
  );
}
