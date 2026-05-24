import { useCallback, useRef, useState } from "react";
import { Film, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  file: File | null;
  onFile: (file: File | null) => void;
  disabled?: boolean;
}

const ACCEPT = ".mp4,.mov,.avi,video/mp4,video/quicktime,video/x-msvideo";
const MAX_UPLOAD_MB = 100;
const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;

export function UploadZone({ file, onFile, disabled }: UploadZoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const f = files[0];
      if (!/\.(mp4|mov|avi)$/i.test(f.name)) return;
      if (f.size > MAX_UPLOAD_BYTES) return;
      onFile(f);
    },
    [onFile],
  );

  return (
    <section
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (!disabled) handleFiles(e.dataTransfer.files);
      }}
      onClick={() => !disabled && inputRef.current?.click()}
      className={cn(
        "p-8 rounded-2xl bg-card ring-1 ring-border/60 border border-border flex flex-col items-center justify-center text-center group cursor-pointer transition-all",
        dragging && "border-brand ring-brand/40 scale-[1.01]",
        disabled && "opacity-60 cursor-not-allowed",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="size-10 rounded-lg bg-muted border border-border flex items-center justify-center mb-4">
        {file ? (
          <Film className="size-4 text-brand" />
        ) : (
          <Upload className="size-4 text-muted-foreground" />
        )}
      </div>
      {file ? (
        <>
          <h3 className="text-sm font-medium text-foreground mb-1 truncate max-w-full">
            {file.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-4 font-mono">
            {(file.size / 1024 / 1024).toFixed(1)} MB
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onFile(null);
            }}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Replace file
          </button>
        </>
      ) : (
        <>
          <h3 className="text-sm font-medium text-foreground mb-1">
            Drop video to import
          </h3>
          <p className="text-xs text-muted-foreground mb-6">
            MP4, MOV, or AVI / up to {MAX_UPLOAD_MB} MB / 5 min max
          </p>
          <span className="text-xs font-medium bg-foreground text-background px-4 py-2 rounded-md group-hover:opacity-90 transition-opacity">
            Select File
          </span>
        </>
      )}
    </section>
  );
}
