import { createFileRoute, Link } from "@tanstack/react-router";

import { ClientToolPage } from "@/components/toolkit/ClientToolPage";
import { getTool, getToolSeo, isClientToolId } from "@/lib/client-tools";

export const Route = createFileRoute("/$toolId")({
  head: ({ params }) => {
    if (!isClientToolId(params.toolId)) {
      return {
        meta: [
          { title: "Tool Not Found - Creator Kit" },
          { name: "robots", content: "noindex" },
        ],
      };
    }

    const seo = getToolSeo(params.toolId);
    const url = `https://creatorkittools.com${seo.path}`;

    return {
      meta: [
        { title: seo.title },
        { name: "description", content: seo.description },
        { name: "robots", content: "index,follow" },
        { property: "og:title", content: seo.title },
        { property: "og:description", content: seo.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: seo.title },
        { name: "twitter:description", content: seo.description },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { toolId } = Route.useParams();

  if (!isClientToolId(toolId)) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-md rounded-xl border border-border bg-card p-6 text-center">
          <h1 className="text-xl font-semibold mb-2">Tool not found</h1>
          <p className="text-sm text-muted-foreground mb-5">
            This tool page does not exist yet. Choose a tool from the homepage.
          </p>
          <Link
            to="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground"
          >
            Go to tools
          </Link>
        </div>
      </div>
    );
  }

  const tool = getTool(toolId);

  return <ClientToolPage toolId={tool.id} />;
}
