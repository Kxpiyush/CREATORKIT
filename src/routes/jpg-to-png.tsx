import { createFileRoute } from "@tanstack/react-router";
import { ClientToolPage } from "@/components/toolkit/ClientToolPage";

export const Route = createFileRoute("/jpg-to-png")({
  head: () => ({
    meta: [
      { title: "JPG to PNG Converter - Free Browser Tool" },
      {
        name: "description",
        content:
          "Convert JPG images to PNG directly in your browser. Your files are processed locally and never uploaded.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <ClientToolPage toolId="jpg-to-png" />;
}
