import { createFileRoute } from "@tanstack/react-router";
import { ClientToolPage } from "@/components/toolkit/ClientToolPage";
import { getToolSeo } from "@/lib/client-tools";

const seo = getToolSeo("image-compressor");

export const Route = createFileRoute("/image-compressor")({
  head: () => ({
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `https://CreatorKitTools.com${seo.path}` }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <ClientToolPage toolId="image-compressor" />;
}
