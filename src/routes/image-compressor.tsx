import { createFileRoute } from "@tanstack/react-router";
import { ClientToolPage } from "@/components/toolkit/ClientToolPage";

export const Route = createFileRoute("/image-compressor")({
  head: () => ({
    meta: [
      { title: "Image Compressor - Free Browser Tool" },
      {
        name: "description",
        content:
          "Compress images in your browser with Canvas. No uploads, no server cost, direct download.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <ClientToolPage toolId="image-compressor" />;
}
