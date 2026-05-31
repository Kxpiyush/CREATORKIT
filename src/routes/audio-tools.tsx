import { createFileRoute } from "@tanstack/react-router";

import { CategoryToolsPage } from "@/components/site/CategoryToolsPage";

export const Route = createFileRoute("/audio-tools")({
  head: () => ({
    meta: [
      { title: "Audio Tools - Free Browser-Based Audio Utilities" },
      {
        name: "description",
        content: "Cut, merge, trim, reverse, boost volume, and change audio speed locally in your browser with free CreatorKitTools audio tools.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Audio Tools - CreatorKitTools" },
      { property: "og:description", content: "Free browser-based audio tools with no server uploads." },
      { property: "og:url", content: "https://creatorkittools.com/audio-tools" },
    ],
    links: [{ rel: "canonical", href: "https://creatorkittools.com/audio-tools" }],
  }),
  component: () => (
    <CategoryToolsPage
      title="Audio Tools"
      description="Cut, merge, trim, reverse, boost, and adjust audio directly in your browser."
      categories={["audio"]}
    />
  ),
});
