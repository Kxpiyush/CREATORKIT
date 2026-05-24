import { createFileRoute } from "@tanstack/react-router";
import { ClientToolPage } from "@/components/toolkit/ClientToolPage";

export const Route = createFileRoute("/png-to-jpg")({
  head: () => ({
    meta: [
      { title: "PNG to JPG Converter - Free Browser Tool" },
      {
        name: "description",
        content:
          "Convert PNG images to JPG directly in your browser. No upload, no account, instant download.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <ClientToolPage toolId="png-to-jpg" />;
}
