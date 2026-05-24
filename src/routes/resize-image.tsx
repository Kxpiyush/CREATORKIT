import { createFileRoute } from "@tanstack/react-router";
import { ClientToolPage } from "@/components/toolkit/ClientToolPage";

export const Route = createFileRoute("/resize-image")({
  head: () => ({
    meta: [
      { title: "Resize Image - Free Browser Tool" },
      {
        name: "description",
        content:
          "Resize images locally in your browser with Canvas. Private, fast, and free.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <ClientToolPage toolId="resize-image" />;
}
