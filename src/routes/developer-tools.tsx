import { createFileRoute } from "@tanstack/react-router";

import { CategoryToolsPage } from "@/components/site/CategoryToolsPage";

export const Route = createFileRoute("/developer-tools")({
  head: () => ({
    meta: [
      { title: "Developer Tools - Free Browser-Based Utilities" },
      {
        name: "description",
        content: "Free developer, text, and creator utilities for encoding, decoding, formatting, validating, hashing, passwords, UUIDs, and YouTube metadata helpers.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Developer Tools - CreatorKitTools" },
      { property: "og:description", content: "Browser-based developer utilities with no account, no uploads, and no CreatorKitTools backend." },
      { property: "og:url", content: "https://creatorkittools.com/developer-tools" },
    ],
    links: [{ rel: "canonical", href: "https://creatorkittools.com/developer-tools" }],
  }),
  component: () => (
    <CategoryToolsPage
      title="Developer Tools"
      description="Format, encode, decode, validate, generate, and compare text directly in your browser."
      categories={["developer", "text", "youtube"]}
    />
  ),
});
