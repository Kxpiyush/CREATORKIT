import { createFileRoute } from "@tanstack/react-router";
import { ClientToolPage } from "@/components/toolkit/ClientToolPage";

export const Route = createFileRoute("/mp3-cutter")({
  head: () => ({
    meta: [
      { title: "MP3 Cutter - Free Browser Audio Trimmer" },
      {
        name: "description",
        content:
          "Cut MP3 files directly in your browser. Your audio never leaves your device.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <ClientToolPage toolId="mp3-cutter" />;
}
