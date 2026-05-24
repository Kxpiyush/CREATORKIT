import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy - Creator Kit" },
      {
        name: "description",
        content:
          "Read Creator Kit's privacy policy. Files are processed locally in your browser and never uploaded for processing.",
      },
      { property: "og:title", content: "Privacy Policy - Creator Kit" },
      {
        property: "og:description",
        content: "Creator Kit processes files locally in your browser with no accounts or server storage.",
      },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="Creator Kit is designed around local browser processing, clear privacy expectations, and a no-upload workflow for media utilities."
      sections={[
        {
          title: "Overview",
          body: "Creator Kit provides browser-based media tools for images, audio, and video. This policy explains what information may be handled when you use the website, how files are processed, and how analytics or future advertising tools may work.",
        },
        {
          title: "Files are processed locally",
          body: "When you select a file, the processing happens locally inside your browser using technologies such as Canvas API, Web Audio API, and browser-based media tooling. Your selected files are not uploaded to our servers for conversion, compression, trimming, resizing, or editing.",
        },
        {
          title: "Files are never stored by Creator Kit",
          body: "Creator Kit does not store your original files or processed downloads in a database, cloud bucket, server folder, or user account. Downloads are generated in browser memory and saved directly by you on your own device.",
        },
        {
          title: "No accounts or database storage",
          body: "Creator Kit does not require user accounts, passwords, subscriptions, or a user database. We do not store your processed files in cloud storage.",
        },
        {
          title: "Information you provide voluntarily",
          body: "If you contact us by email, we may receive your email address, name, message, and any details you choose to include. Do not send sensitive personal information or private media files by email unless necessary.",
        },
        {
          title: "Basic technical information",
          body: "Like most websites, hosting and security systems may automatically process basic technical information such as IP address, browser type, device type, pages requested, timestamps, and error logs. This information is used for security, reliability, abuse prevention, and site operation.",
        },
        {
          title: "Analytics",
          body: "Creator Kit uses Google Analytics 4 and Microsoft Clarity to understand traffic, popular pages, device types, interactions, and performance issues. Analytics helps improve the website and does not upload, inspect, or receive your selected media files.",
        },
        {
          title: "Google AdSense, ads, and cookies",
          body: "Creator Kit may display advertising through Google AdSense or similar partners in the future. Advertising providers may use cookies, device identifiers, or similar technologies to serve, measure, and personalize ads according to their own policies and consent requirements.",
        },
        {
          title: "Affiliate links",
          body: "The website may include affiliate links in the future. If you click an affiliate link and make a purchase, Creator Kit may earn a commission at no extra cost to you. Affiliate partners may process information according to their own privacy policies.",
        },
        {
          title: "Third-party services",
          body: "The website may rely on hosting, security, analytics, advertising, and performance services, including services such as Google Analytics and Microsoft Clarity. These third-party providers may process limited technical information needed to deliver their services. They do not receive your locally processed media files from Creator Kit.",
        },
        {
          title: "Children's privacy",
          body: "Creator Kit is intended for general audiences and is not designed to knowingly collect personal information from children. If you believe a child has provided personal information, contact us so we can review the request.",
        },
        {
          title: "Data retention",
          body: "Because Creator Kit does not upload or store your processed files, there is no server-side media file retention. Contact emails may be retained as needed to respond to support, legal, privacy, or business requests.",
        },
        {
          title: "Your choices",
          body: "You can avoid sending personal information by using the tools without contacting us. You can also control browser cookies through your browser settings, and Google or future advertising tools may provide additional opt-out or consent options.",
        },
        {
          title: "Changes to this policy",
          body: "We may update this Privacy Policy as the website evolves, including when analytics, ads, affiliate links, or additional tools are added. The latest version will be posted on this page.",
        },
        {
          title: "Contact",
          body: "For privacy questions, contact us at NEXORABIZ2025@GMAIL.COM.",
        },
      ]}
    />
  );
}
