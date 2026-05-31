import { createFileRoute } from "@tanstack/react-router";

import { CategoryToolsPage } from "@/components/site/CategoryToolsPage";

export const Route = createFileRoute("/word-tools")({
  head: () => ({
    meta: [
      { title: "Word Tools - Free Browser-Based DOCX Utilities" },
      {
        name: "description",
        content: "Free browser-based Word and document tools for DOCX extraction, conversion, metadata, images, comparison, and text utilities.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Word Tools - CreatorKitTools" },
      { property: "og:description", content: "Process Word DOCX and text documents locally in your browser with no uploads or backend." },
      { property: "og:url", content: "https://creatorkittools.com/word-tools" },
    ],
    links: [{ rel: "canonical", href: "https://creatorkittools.com/word-tools" }],
  }),
  component: () => (
    <CategoryToolsPage
      title="Word Tools"
      description="Convert, extract, count, inspect, and compare Word and text documents directly in your browser."
      categories={["word", "document"]}
    />
  ),
});
