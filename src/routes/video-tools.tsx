import { createFileRoute } from "@tanstack/react-router";

import { CategoryToolsPage } from "@/components/site/CategoryToolsPage";

export const Route = createFileRoute("/video-tools")({
  head: () => ({
    meta: [
      { title: "Video Tools - Free Browser-Based Video Utilities" },
      {
        name: "description",
        content: "Convert, trim, mute, extract frames, create GIFs, and merge compatible videos locally in your browser.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Video Tools - CreatorKitTools" },
      { property: "og:description", content: "Free browser-based video tools with no server uploads." },
      { property: "og:url", content: "https://creatorkittools.com/video-tools" },
    ],
    links: [{ rel: "canonical", href: "https://creatorkittools.com/video-tools" }],
  }),
  component: () => (
    <CategoryToolsPage
      title="Video Tools"
      description="Use practical browser-based video tools. Large videos can be slower because processing runs on your device."
      categories={["video"]}
    />
  ),
});
