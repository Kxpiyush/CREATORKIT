import { createFileRoute, Link } from "@tanstack/react-router";

import { ClientToolPage } from "@/components/toolkit/ClientToolPage";
import { getTool, isClientToolId } from "@/lib/client-tools";

export const Route = createFileRoute("/$toolId")({
  head: () => ({
    meta: [
      { title: "Free Browser Tool - Creator Kit" },
      {
        name: "description",
        content: "Use free media tools in your browser. Your files are processed locally and never uploaded.",
      },
    ],
  }),
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
