import { createFileRoute } from "@tanstack/react-router";
import { ClientToolPage } from "@/components/toolkit/ClientToolPage";

export const Route = createFileRoute("/video-to-mp3")({
  head: () => ({
    meta: [
      { title: "Video to MP3 Converter - Free Browser Tool" },
      {
        name: "description",
        content:
          "Convert video to MP3 in your browser. Files are processed locally and never uploaded.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <ClientToolPage toolId="video-to-mp3" />;
}
