import { createFileRoute } from "@tanstack/react-router";

import { CategoryToolsPage } from "@/components/site/CategoryToolsPage";

export const Route = createFileRoute("/image-tools")({
  head: () => ({
    meta: [
      { title: "Image Tools - Free Browser-Based Image Utilities" },
      {
        name: "description",
        content: "Compress, convert, resize, crop, blur, watermark, and edit images locally in your browser with free CreatorKitTools image tools.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Image Tools - CreatorKitTools" },
      { property: "og:description", content: "Free image tools that run locally in your browser with no uploads." },
      { property: "og:url", content: "https://creatorkittools.com/image-tools" },
    ],
    links: [{ rel: "canonical", href: "https://creatorkittools.com/image-tools" }],
  }),
  component: () => (
    <CategoryToolsPage
      title="Image Tools"
      description="Compress, resize, crop, watermark, and convert images with fast browser-based tools."
      categories={["image"]}
    />
  ),
});
