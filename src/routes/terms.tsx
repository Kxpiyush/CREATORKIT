import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service - Creator Kit" },
      { name: "description", content: "Terms of Service for Creator Kit's free browser-based media tools." },
      { property: "og:title", content: "Terms of Service - Creator Kit" },
      { property: "og:description", content: "Use Creator Kit responsibly. Tools are provided as-is." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      description="These terms explain the basic rules for using Creator Kit."
      sections={[
        {
          title: "Tools provided as is",
          body: "Creator Kit tools are provided as is, without guarantees that every tool will be available, error-free, or compatible with every browser, device, or file.",
        },
        {
          title: "No uptime guarantee",
          body: "We aim to keep the website available, but we do not guarantee uptime, uninterrupted access, or permanent availability of any specific tool.",
        },
        {
          title: "User responsibility",
          body: "You are responsible for the files and content you choose to process. Do not use Creator Kit to process or distribute illegal, harmful, infringing, or unauthorized content.",
        },
        {
          title: "Copyright and misuse",
          body: "You must have the necessary rights to process, edit, convert, or share the files you use with Creator Kit. The tools must not be used for copyright misuse or illegal activity.",
        },
        {
          title: "Limitation of liability",
          body: "To the maximum extent allowed by law, Creator Kit is not liable for lost data, file issues, browser crashes, compatibility problems, or damages related to use of the website.",
        },
      ]}
    />
  );
}
