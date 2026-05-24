import { Link } from "@tanstack/react-router";

const legalLinks = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" },
  { to: "/disclaimer", label: "Disclaimer" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold">CREATOR_KIT</p>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground">
              Files are processed locally in your browser and never uploaded. No accounts, no
              database storage, and no server-side file processing.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
            {legalLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-6 rounded-lg border border-dashed border-border bg-background/70 px-4 py-3 text-xs text-muted-foreground">
          Cookie and ads notice: this website may use cookies, basic analytics, affiliate links, or
          Google AdSense in the future. Any future ad or analytics provider may use cookies according
          to its own policies.
        </div>
      </div>
    </footer>
  );
}
