import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, Download, FileVideo, Lock, Play, RotateCcw, ShieldCheck, Upload, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type ClientToolId,
  type ProcessOptions,
  type ProcessResult,
  TOOL_DEFINITIONS,
  downloadBlob,
  getTool,
  getToolPath,
  processTool,
} from "@/lib/client-tools";
import { cn } from "@/lib/utils";

interface ClientToolPageProps {
  toolId?: ClientToolId;
  homepage?: boolean;
}

export function ClientToolPage({ toolId = "video-to-mp3", homepage = false }: ClientToolPageProps) {
  const initialTool = getTool(toolId);
  const [selectedTool, setSelectedTool] = useState(initialTool.id);
  const tool = getTool(selectedTool);
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [working, setWorking] = useState(false);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [options, setOptions] = useState<ProcessOptions>({
    width: 720,
    height: 720,
    quality: 82,
    start: 0,
    duration: 10,
    speed: 1,
    volume: 1.5,
    blur: 6,
    text: "TOP TEXT",
    bottomText: "BOTTOM TEXT",
    watermark: "Video Aid",
  });

  const relatedTools = useMemo(() => {
    return TOOL_DEFINITIONS.filter((item) => item.category === tool.category);
  }, [tool.category]);

  useEffect(() => {
    resetWorkspace();
    setSelectedTool(toolId);
  }, [toolId]);

  const resetWorkspace = () => {
    setFiles([]);
    setResult(null);
    setProgress(0);
    setStage("");
    setWorking(false);
  };

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming?.length) return;
    const next = Array.from(incoming);
    setFiles(tool.multiple ? next : next.slice(0, 1));
    setResult(null);
    setProgress(0);
    setStage("");
    setWorking(false);
  };

  const run = async () => {
    if (files.length === 0) {
      toast.error("Choose a file first");
      return;
    }
    setWorking(true);
    setResult(null);
    try {
      const output = await processTool(tool.id, files, options, (pct, nextStage) => {
        setProgress(pct);
        setStage(nextStage);
      });
      setResult(output);
      toast.success("Ready to download");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Processing failed");
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-brand mb-3">
                All-in-One Creator Toolkit
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
                {homepage ? "Free browser-based media tools" : tool.title}
              </h1>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                {homepage
                  ? "Convert, compress, trim, resize, and edit image, video, and audio files instantly. No account, no upload queue, no server storage."
                  : tool.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <TrustBadge icon="lock">Files never uploaded</TrustBadge>
                <TrustBadge icon="zap">Browser-based processing</TrustBadge>
                <TrustBadge icon="check">Privacy first</TrustBadge>
                <TrustBadge icon="lock">No server storage</TrustBadge>
              </div>
            </div>
            <div className="rounded-lg border border-brand/25 bg-brand-muted px-4 py-3 text-xs text-foreground max-w-md">
              <Lock className="size-3.5 inline mr-2 text-brand" />
              Files are processed locally in your browser and never uploaded.
            </div>
          </div>
        </section>

        <AdSlot className="mb-8" label="Advertisement" />

        <section className="grid grid-cols-1 xl:grid-cols-[1fr_220px] gap-8 items-start">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
            <aside className="space-y-5">
              <div className="rounded-xl border border-border bg-card p-4">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Tool categories
                </h2>
                <div className="grid gap-2">
                  {(["image", "audio", "video"] as const).map((category) => (
                    <a
                      key={category}
                      href={`#${category}`}
                      className="rounded-md border border-border bg-surface-2 px-3 py-2 text-sm capitalize hover:border-brand transition-colors"
                    >
                      {category} tools
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Related tools
                </h2>
                <div className="grid gap-2">
                  {relatedTools.map((item) => (
                    <Link
                      key={item.id}
                      to={getToolPath(item.id)}
                      className={cn(
                        "rounded-md border px-3 py-2 text-left transition-colors block",
                        item.id === tool.id
                          ? "border-brand bg-brand text-brand-foreground"
                          : "border-border bg-surface-2 hover:border-brand",
                      )}
                    >
                      <span className="block text-sm font-medium">{item.title}</span>
                      <span className="block text-[11px] opacity-70">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            <div className="space-y-6">
              <UploadPanel toolId={tool.id} accept={tool.accept} multiple={tool.multiple} files={files} onFiles={handleFiles} />
              <Controls toolId={tool.id} options={options} setOptions={setOptions} />

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-semibold">Process in browser</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your files are processed in your browser and never uploaded.
                      {tool.engine === "media-engine" ? " Best with small files under 50 MB." : ""}
                    </p>
                  </div>
                  <Button disabled={working || files.length === 0} onClick={run} className="bg-brand text-brand-foreground hover:bg-brand/90 min-w-32">
                    {working ? <RotateCcw className="size-4 mr-2 animate-spin" /> : <Play className="size-4 mr-2" />}
                    {working ? "Processing" : "Start"}
                  </Button>
                </div>
                {(working || progress > 0) && (
                  <div className="mt-5">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>{stage || "Waiting"}</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-brand transition-[width]" style={{ width: `${progress}%` }} />
                    </div>
                    {working && progress < 25 && (
                      <p className="mt-3 text-[11px] text-muted-foreground">
                        Preparing private media tools. First load can take a minute; if it stays here, refresh once and try a smaller file.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <ResultPanel result={result} onDownload={() => result && downloadBlob(result.blob, result.filename)} />
            </div>
          </div>

          <AdSlot className="hidden xl:flex sticky top-20 h-[600px]" label="Sponsored" vertical />
        </section>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoCard title="Features" text="Drag and drop files, process locally, preview results, and download directly from browser memory." />
          <InfoCard title="Private by design" text="Files never upload to our servers, and this site does not require accounts or cloud storage." />
          <InfoCard title="Fast lightweight pages" text="Image and Web Audio tools use native browser APIs where possible for quick processing." />
        </section>

        <FAQ toolTitle={tool.title} />
        <ToolDirectory selectedTool={selectedTool} onSelect={setSelectedTool} />
      </main>
    </div>
  );
}

function TopBar() {
  return (
    <nav className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-7 rounded-md bg-brand text-brand-foreground grid place-items-center font-semibold text-xs">
            C
          </div>
          <span className="text-sm font-semibold tracking-tight">
            CREATOR<span className="text-brand">_</span>KIT
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-4 text-xs text-muted-foreground">
          <a href="#image" className="hover:text-foreground">Image</a>
          <a href="#video" className="hover:text-foreground">Video</a>
          <a href="#audio" className="hover:text-foreground">Audio</a>
        </div>
      </div>
    </nav>
  );
}

function UploadPanel({
  toolId,
  accept,
  multiple,
  files,
  onFiles,
}: {
  toolId: ClientToolId;
  accept: string;
  multiple?: boolean;
  files: File[];
  onFiles: (files: FileList | null) => void;
}) {
  return (
    <label
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        onFiles(event.dataTransfer.files);
      }}
      className="block rounded-xl border border-dashed border-border bg-card p-8 text-center cursor-pointer hover:border-brand transition-colors"
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(event) => onFiles(event.target.files)}
      />
      <div className="size-11 mx-auto rounded-lg border border-border bg-muted grid place-items-center mb-4">
        <Upload className="size-4 text-muted-foreground" />
      </div>
      <h2 className="text-sm font-semibold mb-1">Drop files here or click to upload</h2>
      <p className="text-xs text-muted-foreground">
        {multiple ? "Multiple files supported" : "One file at a time"} / best with files under 250 MB
      </p>
      {files.length > 0 && (
        <div className="mt-5 grid gap-2 text-left">
          {files.map((file) => (
            <div key={`${toolId}-${file.name}-${file.size}`} className="flex items-center gap-2 rounded-md bg-surface-2 border border-border px-3 py-2">
              <FileVideo className="size-4 text-brand" />
              <span className="text-xs truncate flex-1">{file.name}</span>
              <span className="text-[10px] text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
            </div>
          ))}
        </div>
      )}
    </label>
  );
}

function Controls({
  toolId,
  options,
  setOptions,
}: {
  toolId: ClientToolId;
  options: ProcessOptions;
  setOptions: (options: ProcessOptions) => void;
}) {
  const update = (patch: ProcessOptions) => setOptions({ ...options, ...patch });
  const needsTiming = toolId.includes("trim") || toolId.includes("cutter") || toolId === "video-to-gif" || toolId === "extract-frames";
  const needsSize = toolId.includes("resize") || toolId === "image-compressor" || toolId === "video-compressor";
  const needsSpeed = toolId.includes("speed");
  const needsVolume = toolId === "volume-booster";
  const needsText = toolId === "meme-maker" || toolId === "add-watermark";
  const needsBlur = toolId === "blur-image";

  if (!needsTiming && !needsSize && !needsSpeed && !needsVolume && !needsText && !needsBlur) {
    return null;
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold mb-4">Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {needsTiming && (
          <>
            <Field label="Start seconds" value={options.start ?? 0} onChange={(value) => update({ start: value })} />
            <Field label="Duration seconds" value={options.duration ?? 10} onChange={(value) => update({ duration: value })} />
          </>
        )}
        {needsSize && (
          <>
            <Field label="Width" value={options.width ?? 720} onChange={(value) => update({ width: value })} />
            <Field label="Quality" value={options.quality ?? 82} onChange={(value) => update({ quality: value })} />
          </>
        )}
        {needsSpeed && <Field label="Speed" value={options.speed ?? 1} step={0.25} onChange={(value) => update({ speed: value })} />}
        {needsVolume && <Field label="Volume boost" value={options.volume ?? 1.5} step={0.25} onChange={(value) => update({ volume: value })} />}
        {needsBlur && <Field label="Blur pixels" value={options.blur ?? 6} onChange={(value) => update({ blur: value })} />}
        {toolId === "meme-maker" && (
          <>
            <TextField label="Top text" value={options.text ?? ""} onChange={(value) => update({ text: value })} />
            <TextField label="Bottom text" value={options.bottomText ?? ""} onChange={(value) => update({ bottomText: value })} />
          </>
        )}
        {toolId === "add-watermark" && (
          <TextField label="Watermark" value={options.watermark ?? ""} onChange={(value) => update({ watermark: value })} />
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <Input type="number" step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function ResultPanel({ result, onDownload }: { result: ProcessResult | null; onDownload: () => void }) {
  if (!result) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
        Your result will appear here after processing.
      </div>
    );
  }

  const isImage = result.mime.startsWith("image/");
  const isVideo = result.mime.startsWith("video/");
  const isAudio = result.mime.startsWith("audio/");

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold">Download ready</h2>
          <p className="text-xs text-muted-foreground">{result.filename}</p>
        </div>
        <Button onClick={onDownload} className="bg-brand text-brand-foreground hover:bg-brand/90">
          <Download className="size-4 mr-2" />
          Download
        </Button>
      </div>
      {isImage && result.previewUrl && <img src={result.previewUrl} alt="Preview" className="max-h-[420px] rounded-lg border border-border mx-auto" />}
      {isVideo && result.previewUrl && <video src={result.previewUrl} controls className="w-full max-h-[420px] rounded-lg border border-border" />}
      {isAudio && result.previewUrl && <audio src={result.previewUrl} controls className="w-full" />}
    </div>
  );
}

function ToolDirectory({ selectedTool }: { selectedTool: ClientToolId; onSelect: (tool: ClientToolId) => void }) {
  return (
    <section className="mt-14 space-y-8">
      {(["image", "audio", "video"] as const).map((category) => (
        <div key={category} id={category}>
          <h2 className="text-xl font-semibold capitalize mb-4">
            {category === "video" ? "Beta video tools" : `${category} tools`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {TOOL_DEFINITIONS.filter((tool) => tool.category === category).map((tool) => (
              <Link
                key={tool.id}
                to={getToolPath(tool.id)}
                className={cn(
                  "rounded-lg border p-4 text-left bg-card transition-colors block",
                  selectedTool === tool.id ? "border-brand" : "border-border hover:border-brand",
                )}
              >
                <span className="flex items-center justify-between gap-2 text-sm font-semibold">
                  {tool.title}
                  {tool.beta && (
                    <span className="rounded-md border border-border bg-surface-2 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                      Beta
                    </span>
                  )}
                </span>
                <span className="block text-xs text-muted-foreground mt-1">{tool.description}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function FAQ({ toolTitle }: { toolTitle: string }) {
  return (
    <section className="mt-14 rounded-xl border border-border bg-card p-6">
      <h2 className="text-xl font-semibold mb-5">{toolTitle} FAQ</h2>
      <div className="grid gap-5">
        <FAQItem
          question="Is this tool free?"
          answer="Yes. Creator Kit tools are free to use in your browser."
        />
        <FAQItem
          question="Are my files uploaded?"
          answer="No. Files are processed locally in your browser and never uploaded."
        />
        <FAQItem
          question="Does this work on mobile?"
          answer="Most image and audio tools work on modern mobile browsers. Large video tools work best on desktop."
        />
        <FAQItem
          question="Is processing private?"
          answer="Yes. Processing happens on your device, with no login, no database storage, and no server-side file handling."
        />
        <FAQItem
          question="Why can large video or audio files take longer?"
          answer="Video and audio conversion can be heavy, so your browser may need extra time to prepare local media tools and process the file on your device."
        />
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-1">{question}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
    </div>
  );
}

function TrustBadge({ icon, children }: { icon: "lock" | "zap" | "check"; children: React.ReactNode }) {
  const Icon = icon === "lock" ? Lock : icon === "zap" ? Zap : BadgeCheck;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-muted-foreground">
      <Icon className="size-3 text-brand" />
      {children}
    </span>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h2 className="text-sm font-semibold mb-1">{title}</h2>
      <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}

function AdSlot({
  className = "",
  vertical = false,
  label,
}: {
  className?: string;
  vertical?: boolean;
  label: string;
}) {
  return (
    <aside
      className={`items-center justify-center rounded-lg border border-dashed border-border bg-card/70 text-[10px] uppercase tracking-widest text-muted-foreground ${
        vertical ? "px-4" : "min-h-24 flex"
      } ${className}`}
    >
      <span className="rounded-full border border-border bg-background px-3 py-1">{label}</span>
    </aside>
  );
}
