import { createFileRoute } from "@tanstack/react-router";

import { CategoryToolsPage } from "@/components/site/CategoryToolsPage";

export const Route = createFileRoute("/network-tools")({
  head: () => ({
    meta: [
      { title: "Network Tools - Free Browser-Based IP and User Agent Tools" },
      {
        name: "description",
        content: "Free browser-based network tools for checking your public IP, IP lookup details, and user agent information.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Network Tools - CreatorKitTools" },
      { property: "og:description", content: "Simple browser-based IP and user agent tools with no CreatorKitTools backend." },
      { property: "og:url", content: "https://creatorkittools.com/network-tools" },
    ],
    links: [{ rel: "canonical", href: "https://creatorkittools.com/network-tools" }],
  }),
  component: () => (
    <CategoryToolsPage
      title="Network Tools"
      description="Check public IP details and browser user agent information from the frontend."
      categories={["network"]}
    />
  ),
});
