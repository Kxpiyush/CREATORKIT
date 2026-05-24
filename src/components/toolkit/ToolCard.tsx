import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ToolId } from "@/lib/api";

interface ToolCardProps {
  id: ToolId;
  title: string;
  description: string;
  icon: LucideIcon;
  active: boolean;
  onToggle: () => void;
}

export function ToolCard({ title, description, icon: Icon, active, onToggle }: ToolCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "w-full text-left p-4 rounded-xl ring-1 border transition-colors flex items-center justify-between group",
        active
          ? "bg-brand ring-brand/30 border-brand/10"
          : "bg-card ring-border/60 border-border hover:border-brand/50",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "size-8 rounded-lg flex items-center justify-center border",
            active
              ? "bg-black/20 border-transparent"
              : "bg-muted border-border",
          )}
        >
          <Icon
            className={cn("size-4", active ? "text-brand-foreground" : "text-muted-foreground")}
          />
        </div>
        <div>
          <p
            className={cn(
              "text-sm font-medium",
              active ? "text-brand-foreground" : "text-foreground",
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              "text-[11px]",
              active ? "text-brand-foreground/70" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        </div>
      </div>
      <div
        className={cn(
          "size-4 rounded-full flex items-center justify-center border transition-colors",
          active
            ? "bg-background border-transparent"
            : "border-border group-hover:border-brand",
        )}
      >
        <div
          className={cn(
            "size-1.5 rounded-full transition-opacity",
            active ? "bg-brand opacity-100" : "bg-brand opacity-0 group-hover:opacity-100",
          )}
        />
      </div>
    </button>
  );
}