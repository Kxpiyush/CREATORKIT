import { createFileRoute } from "@tanstack/react-router";

import { CategoryToolsPage } from "@/components/site/CategoryToolsPage";

export const Route = createFileRoute("/pdf-tools")({
  head: () => ({
    meta: [
      { title: "PDF Tools - Free Browser-Based PDF Utilities" },
      {
        name: "description",
        content: "Merge, split, rotate, watermark, and convert PDF files locally in your browser with free CreatorKitTools PDF utilities.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "PDF Tools - CreatorKitTools" },
      { property: "og:description", content: "Free browser-based PDF tools with no server uploads." },
      { property: "og:url", content: "https://creatorkittools.com/pdf-tools" },
    ],
    links: [{ rel: "canonical", href: "https://creatorkittools.com/pdf-tools" }],
  }),
  component: () => (
    <CategoryToolsPage
      title="PDF Tools"
      description="Merge, split, rotate, watermark, and convert PDFs directly in your browser."
      categories={["pdf"]}
    />
  ),
});
