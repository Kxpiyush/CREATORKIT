import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LegalPage } from "@/components/site/LegalPage";

const CONTACT_EMAIL = "NEXORABIZ2025@GMAIL.COM";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/${CONTACT_EMAIL}`;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Creator Kit" },
      { name: "description", content: "Contact Creator Kit about browser-based media tools, privacy, ads, or support." },
      { property: "og:title", content: "Contact Creator Kit" },
      { property: "og:description", content: "Get in touch with Creator Kit." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const website = String(formData.get("website") ?? "");

    if (website) {
      event.preventDefault();
      setStatus("sent");
      setStatusMessage("Thanks. Your message was received.");
      formRef.current?.reset();
      return;
    }

    setStatus("sending");
    setStatusMessage("Sending message...");

    window.setTimeout(() => {
      setStatus("sent");
      setStatusMessage(
        "Message submitted. If this is the first submission, check your Gmail for a FormSubmit activation email.",
      );
      formRef.current?.reset();
    }, 1200);
  };

  return (
    <LegalPage
      title="Contact"
      description="Use this page for support, privacy questions, advertising inquiries, or feedback."
      sections={[
        {
          title: "Email",
          body: `For support, privacy questions, advertising inquiries, or business requests, email ${CONTACT_EMAIL}.`,
        },
        {
          title: "Frontend-only contact form",
          body: "This form uses a free form-to-email endpoint from the frontend. Creator Kit still has no backend, database, or authentication system.",
        },
      ]}
    >
      <section className="mt-6 rounded-xl border border-border bg-card p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Contact form</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sends to {CONTACT_EMAIL}. The first message may require email activation.
            </p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm font-medium text-brand hover:underline"
          >
            Email directly
          </a>
        </div>
        <iframe name="contact-submit-frame" title="Contact form submission" className="hidden" />
        <form
          ref={formRef}
          action={FORMSUBMIT_ENDPOINT}
          method="POST"
          target="contact-submit-frame"
          onSubmit={handleSubmit}
          className="mt-4 grid gap-4"
        >
          <input type="hidden" name="_subject" value="Creator Kit contact message" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <label className="grid gap-2">
            <span className="text-xs text-muted-foreground">Name</span>
            <Input name="name" placeholder="Your name" required />
          </label>
          <label className="hidden">
            <span>Website</span>
            <Input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          <label className="grid gap-2">
            <span className="text-xs text-muted-foreground">Email</span>
            <Input name="email" type="email" placeholder="you@example.com" required />
          </label>
          <label className="grid gap-2">
            <span className="text-xs text-muted-foreground">Topic</span>
            <select
              name="topic"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option>Support request</option>
              <option>Privacy question</option>
              <option>Advertising inquiry</option>
              <option>Business inquiry</option>
              <option>Feedback</option>
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-xs text-muted-foreground">Message</span>
            <textarea
              name="message"
              className="min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="How can we help?"
              required
            />
          </label>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Please do not attach private media files unless we specifically ask for them. Creator Kit
            tools process files locally in your browser.
          </p>
          {statusMessage && (
            <p
              className={`rounded-md border px-3 py-2 text-xs ${
                status === "sent"
                  ? "border-brand/30 bg-brand-muted text-foreground"
                  : "border-border bg-surface-2 text-muted-foreground"
              }`}
            >
              {statusMessage}
            </p>
          )}
          <Button type="submit" disabled={status === "sending"} className="w-fit">
            {status === "sending" ? "Sending..." : "Send message"}
          </Button>
        </form>
      </section>
    </LegalPage>
  );
}
