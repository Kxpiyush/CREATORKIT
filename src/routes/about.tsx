import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Creator Kit - Browser-Based Creator Tools" },
      {
        name: "description",
        content: "Learn about Creator Kit's privacy-first, browser-based media tools for images, audio, and video.",
      },
      { property: "og:title", content: "About Creator Kit" },
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
      title="About Creator Kit"
      description="Creator Kit is a lightweight utility website for common image, audio, and video tasks."
      sections={[
        {
          title: "Browser-based processing",
          body: "The tools run in your browser using local browser capabilities whenever possible. This keeps the experience fast for common image and audio tasks.",
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
          body: "The site focuses on practical utilities such as image compression, format conversion, resizing, cropping, audio trimming, and beta video tools.",
        },
      ]}
    />
  );
}
