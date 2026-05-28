import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CreatorKitTools - Browser-Based File Tools" },
      {
        name: "description",
        content: "Learn about CreatorKitTools privacy-first, browser-based tools for images, PDFs, and audio.",
      },
      { property: "og:title", content: "About CreatorKitTools" },
      {
        property: "og:description",
        content: "Creator Kit provides lightweight free creator tools that process files locally in your browser.",
      },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <LegalPage
      title="About CreatorKitTools"
      description="CreatorKitTools is a lightweight utility website for common image, PDF, and audio tasks."
      sections={[
        {
          title: "Browser-based processing",
          body: "The tools run in your browser using local browser capabilities and free open-source libraries. This keeps the experience private for common image, PDF, and audio tasks.",
        },
        {
          title: "Privacy-first philosophy",
          body: "Creator Kit is built around a simple promise: files should not need to leave your device for basic creator utilities.",
        },
        {
          title: "No-upload approach",
          body: "There is no backend file-processing pipeline, no server-side upload queue, and no cloud file storage for your media.",
        },
        {
          title: "Free creator tools",
          body: "The site focuses only on practical utilities that can work without a backend, such as image compression, format conversion, PDF merging, PDF splitting, PDF rotation, text-to-PDF conversion, and audio trimming.",
        },
      ]}
    />
  );
}
