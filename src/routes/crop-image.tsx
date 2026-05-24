import { createFileRoute } from "@tanstack/react-router";
import { ClientToolPage } from "@/components/toolkit/ClientToolPage";

export const Route = createFileRoute("/crop-image")({
  head: () => ({
    meta: [
      { title: "Crop Image - Free Browser Tool" },
      {
        name: "description",
        content:
          "Crop images locally in your browser. Your image is never uploaded to a server.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <ClientToolPage toolId="crop-image" />;
}
