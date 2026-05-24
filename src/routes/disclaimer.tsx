import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer - Creator Kit" },
      { name: "description", content: "Disclaimer for Creator Kit browser-based media tools." },
      { property: "og:title", content: "Disclaimer - Creator Kit" },
      { property: "og:description", content: "Browser compatibility and processing performance may vary." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: Disclaimer,
});

function Disclaimer() {
  return (
    <LegalPage
      title="Disclaimer"
      description="Creator Kit provides lightweight browser tools, but results can vary by browser, file, and device."
      sections={[
        {
          title: "No warranties",
          body: "Creator Kit is provided without warranties. We do not guarantee that output files will meet every professional, legal, platform, or technical requirement.",
        },
        {
          title: "Browser compatibility",
          body: "Processing depends on browser APIs and device capabilities. Some tools may work differently across Chrome, Edge, Safari, Firefox, mobile browsers, and older devices.",
        },
        {
          title: "Large files",
          body: "Large images, audio files, and videos may process slowly, fail, or require a desktop browser with more memory. Beta video tools are especially device-dependent.",
        },
        {
          title: "User verification",
          body: "Always check downloaded files before publishing, sharing, or using them in professional projects.",
        },
      ]}
    />
  );
}
