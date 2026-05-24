import { createFileRoute } from "@tanstack/react-router";
import { ClientToolPage } from "@/components/toolkit/ClientToolPage";

export const Route = createFileRoute("/video-to-gif")({
  head: () => ({
    meta: [
      { title: "Video to GIF Converter - Free Browser Tool" },
      {
        name: "description",
        content:
          "Convert video clips to GIF directly in your browser. Nothing uploads.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <ClientToolPage toolId="video-to-gif" />;
}
