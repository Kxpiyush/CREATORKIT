import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, Copy, Download, FileAudio, FileImage, FileText, FileVideo, Lock, Play, RotateCcw, Upload, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type ClientToolId,
  type ProcessOptions,
  type ProcessResult,
  type ToolCategory,
  TOOL_DEFINITIONS,
  downloadBlob,
  getTool,
  getToolPath,
  isNoInputTool,
  isTextInputTool,
  processTool,
} from "@/lib/client-tools";
import { cn } from "@/lib/utils";

interface ClientToolPageProps {
  toolId?: ClientToolId;
  homepage?: boolean;
}

export function ClientToolPage({ toolId = "image-compressor", homepage = false }: ClientToolPageProps) {
  const initialTool = getTool(toolId);
  const [selectedTool, setSelectedTool] = useState(initialTool.id);
  const tool = getTool(selectedTool);
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [working, setWorking] = useState(false);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [options, setOptions] = useState<ProcessOptions>({
    width: 720,
    height: 720,
    quality: 82,
    start: 0,
    duration: 10,
    end: 10,
    speed: 1,
    volume: 1.5,
    blur: 6,
    text: "",
    bottomText: "",
    watermark: "CreatorKitTools",
  });

  const relatedTools = useMemo(() => {
    return TOOL_DEFINITIONS.filter((item) => item.category === tool.category);
  }, [tool.category]);

  useEffect(() => {
    resetWorkspace();
    setSelectedTool(toolId);
  }, [toolId]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const canonicalUrl = `https://creatorkittools.com${getToolPath(tool.id)}`;
    upsertHeadLink("canonical", canonicalUrl);
    upsertMetaProperty("og:url", canonicalUrl);
  }, [tool.id]);

  const resetWorkspace = () => {
    setFiles([]);
    setResult(null);
    setProgress(0);
    setStage("");
    setWorking(false);
    setErrorMessage("");
  };

  const clearWorkspace = () => {
    resetWorkspace();
    setOptions({
      width: 720,
      height: 720,
      quality: 82,
      start: 0,
      duration: 10,
      end: 10,
      speed: 1,
      volume: 1.5,
      blur: 6,
      text: "",
      bottomText: "",
      watermark: "CreatorKitTools",
    });
  };

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming?.length) return;
    const next = Array.from(incoming);
    setFiles(tool.multiple ? next : next.slice(0, 1));
    setResult(null);
    setProgress(0);
    setStage("");
    setWorking(false);
    setErrorMessage("");
  };

  const run = async () => {
    if (!canStartTool(tool.id, files, options)) {
      toast.error(allowsTextOnly(tool.id) ? "Paste text or choose a .txt file first" : "Choose a file first");
      return;
    }
    setWorking(true);
    setResult(null);
    setErrorMessage("");
    try {
      const output = await processTool(tool.id, files, options, (pct, nextStage) => {
        setProgress(pct);
        setStage(nextStage);
      });
      setResult(output);
      toast.success("Ready to download");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Processing failed";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <Breadcrumbs toolTitle={tool.title} category={tool.category} />
        <section className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-brand mb-3">
                All-in-One Creator Toolkit
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
                {homepage ? "Free browser-based file tools" : tool.title}
              </h1>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                {homepage
                  ? "Compress, convert, merge, resize, and edit files directly in your browser. No uploads, no account, no server storage."
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
                {(["image", "pdf", "word", "audio", "video", "developer", "network"] as const).map((category) => (
                    <Link
                      key={category}
                      to={categoryPath(category)}
                      className="rounded-md border border-border bg-surface-2 px-3 py-2 text-sm capitalize hover:border-brand transition-colors"
                    >
                      {categoryLabel(category)}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Related tools
                </h2>
                <div className="grid gap-2">
                  {relatedTools.filter((item) => item.id !== tool.id).slice(0, 8).map((item) => (
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
              {tool.accept && (
                <UploadPanel
                  key={tool.id}
                  toolId={tool.id}
                  accept={tool.accept}
                  multiple={tool.multiple}
                  files={files}
                  onFiles={handleFiles}
                />
              )}
              {tool.category === "video" && <VideoWarning />}
              <Controls toolId={tool.id} options={options} setOptions={setOptions} />

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-semibold">Process in browser</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your files are processed in your browser and never uploaded.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="outline" disabled={working} onClick={clearWorkspace}>
                      Clear
                    </Button>
                    <Button disabled={working || !canStartTool(tool.id, files, options)} onClick={run} className="bg-brand text-brand-foreground hover:bg-brand/90 min-w-32">
                      {working ? <RotateCcw className="size-4 mr-2 animate-spin" /> : <Play className="size-4 mr-2" />}
                      {working ? "Processing" : "Start"}
                    </Button>
                  </div>
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
                        Loading media engine. First load can take a minute; if it takes too long, retry or use a smaller file.
                      </p>
                    )}
                    {errorMessage && (
                      <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-foreground">
                        <p>{errorMessage}</p>
                        {errorMessage.toLowerCase().includes("media engine") && (
                          <Button type="button" variant="outline" size="sm" className="mt-3" onClick={run}>
                            Retry
                          </Button>
                        )}
                      </div>
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
          <InfoCard title="Features" text="Drag and drop files, process locally where available, preview results, and download directly from browser memory." />
          <InfoCard title="Private by design" text="Files never upload to our servers, and this site does not require accounts or cloud storage." />
          <InfoCard title="Fast lightweight pages" text="Image and Web Audio tools use native browser APIs where possible for quick processing." />
        </section>

        <HowToUse toolTitle={tool.title} />
        <FAQ toolTitle={tool.title} />
      </main>
    </div>
  );
}

function TopBar() {
  return (
    <nav className="border-b border-border/60 bg-card/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/favicon-48x48.png" alt="" className="size-8 rounded-lg" />
          <span className="text-sm font-bold tracking-tight">CreatorKitTools</span>
        </Link>
        <div className="hidden md:flex items-center gap-4 text-xs text-muted-foreground">
          <Link to="/image-tools" className="hover:text-foreground">Image</Link>
          <Link to="/pdf-tools" className="hover:text-foreground">PDF</Link>
          <Link to="/word-tools" className="hover:text-foreground">Word</Link>
          <Link to="/audio-tools" className="hover:text-foreground">Audio</Link>
          <Link to="/video-tools" className="hover:text-foreground">Video</Link>
          <Link to="/developer-tools" className="hover:text-foreground">Developer</Link>
          <Link to="/network-tools" className="hover:text-foreground">Network</Link>
        </div>
      </div>
    </nav>
  );
}

function Breadcrumbs({ toolTitle, category }: { toolTitle: string; category: ToolCategory }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-foreground">
        Home
      </Link>
      <span>/</span>
      <Link to={categoryPath(category)} className="hover:text-foreground">
        {categoryLabel(category)}
      </Link>
      <span>/</span>
      <span className="font-medium text-foreground">{toolTitle}</span>
    </nav>
  );
}

function categoryPath(category: ToolCategory) {
  if (category === "pdf") return "/pdf-tools";
  if (category === "word" || category === "document") return "/word-tools";
  if (category === "audio") return "/audio-tools";
  if (category === "video") return "/video-tools";
  if (category === "developer" || category === "text" || category === "youtube") return "/developer-tools";
  if (category === "network") return "/network-tools";
  return "/image-tools";
}

function categoryLabel(category: ToolCategory) {
  if (category === "pdf") return "PDF Tools";
  if (category === "word" || category === "document") return "Word Tools";
  if (category === "audio") return "Audio Tools";
  if (category === "video") return "Video Tools";
  if (category === "developer" || category === "text" || category === "youtube") return "Developer Tools";
  if (category === "network") return "Network Tools";
  return "Image Tools";
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
      className={cn(
        "block rounded-2xl border border-dashed border-border bg-card p-10 text-center transition-colors",
        "cursor-pointer hover:border-brand",
      )}
    >
      <input
        key={toolId}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(event) => {
          onFiles(event.target.files);
          event.currentTarget.value = "";
        }}
      />
      <div className="size-14 mx-auto rounded-2xl border border-border bg-muted grid place-items-center mb-4">
        <Upload className="size-5 text-muted-foreground" />
      </div>
      <h2 className="text-base font-semibold mb-1">Drop files here or click to upload</h2>
      <p className="text-xs text-muted-foreground">
        {multiple ? "Multiple files supported" : "One file at a time"} / files stay on your device
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
  const needsTiming = toolId.includes("trim") || toolId.includes("cutter") || toolId === "video-to-gif";
  const needsTimestamp = toolId === "extract-frames";
  const needsSize = toolId.includes("resize") || toolId === "image-compressor";
  const needsSpeed = toolId.includes("speed");
  const needsVolume = toolId === "volume-booster";
  const needsGenerator = toolId === "lorem-ipsum-generator" || toolId === "uuid-generator" || toolId === "password-generator";
  const needsText =
    isTextInputTool(toolId) ||
    toolId === "meme-maker" ||
    toolId === "add-watermark" ||
    toolId === "add-watermark-pdf" ||
    toolId === "txt-to-pdf" ||
    toolId === "text-case-converter" ||
    toolId === "word-counter";
  const needsBlur = toolId === "blur-image";
  const needsPageRange = toolId === "split-pdf";
  const needsRotation = toolId === "rotate-pdf";

  if (!needsTiming && !needsTimestamp && !needsSize && !needsSpeed && !needsVolume && !needsText && !needsBlur && !needsPageRange && !needsRotation && !needsGenerator) {
    return null;
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold mb-4">Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {needsTiming && (
          <>
            <Field label="Start seconds" value={options.start ?? 0} onChange={(value) => update({ start: value })} />
            {toolId === "video-trimmer" || toolId === "video-to-gif" ? (
              <Field label="End seconds" value={options.end ?? 10} onChange={(value) => update({ end: value })} />
            ) : (
              <Field label="Duration seconds" value={options.duration ?? 10} onChange={(value) => update({ duration: value })} />
            )}
          </>
        )}
        {needsTimestamp && <Field label="Timestamp seconds" value={options.start ?? 0} onChange={(value) => update({ start: value })} />}
        {needsSize && (
          <>
            <Field label="Width" value={options.width ?? 720} onChange={(value) => update({ width: value })} />
            <Field label="Quality" value={options.quality ?? 82} onChange={(value) => update({ quality: value })} />
          </>
        )}
        {needsSpeed && <Field label="Speed" value={options.speed ?? 1} step={0.25} onChange={(value) => update({ speed: value })} />}
        {needsVolume && <Field label="Volume boost" value={options.volume ?? 1.5} step={0.25} onChange={(value) => update({ volume: value })} />}
        {needsBlur && <Field label="Blur pixels" value={options.blur ?? 6} onChange={(value) => update({ blur: value })} />}
        {needsPageRange && (
          <TextField label="Page range" value={options.pageRange ?? ""} placeholder="Example: 1-3 or 1,3,5" onChange={(value) => update({ pageRange: value })} />
        )}
        {needsRotation && (
          <Field label="Rotation angle" value={options.rotation ?? 90} step={90} onChange={(value) => update({ rotation: value })} />
        )}
        {needsGenerator && (
          <Field
            label={toolId === "password-generator" ? "Password length" : toolId === "uuid-generator" ? "How many UUIDs" : "Paragraphs"}
            value={options.width ?? (toolId === "password-generator" ? 20 : 5)}
            onChange={(value) => update({ width: value })}
          />
        )}
        {(toolId === "regex-tester" || toolId === "text-diff-checker") && (
          <label className="grid gap-2 md:col-span-2">
            <span className="text-xs text-muted-foreground">{toolId === "regex-tester" ? "Regex pattern" : "Original text"}</span>
            <textarea
              className="min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={options.text ?? ""}
              onChange={(event) => update({ text: event.target.value })}
              placeholder={toolId === "regex-tester" ? "Example: \\b\\w+@\\w+\\.com\\b" : "Paste original text here."}
            />
          </label>
        )}
        {(toolId === "youtube-thumbnail-downloader" || toolId === "youtube-thumbnail-viewer") && (
          <label className="grid gap-2">
            <span className="text-xs text-muted-foreground">Thumbnail size</span>
            <select
              className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={options.preset ?? "maxresdefault"}
              onChange={(event) => update({ preset: event.target.value })}
            >
              <option value="maxresdefault">maxresdefault</option>
              <option value="sddefault">sddefault</option>
              <option value="hqdefault">hqdefault</option>
              <option value="mqdefault">mqdefault</option>
              <option value="default">default</option>
            </select>
          </label>
        )}
        {toolId === "meme-maker" && (
          <>
            <TextField label="Top text" value={options.text ?? ""} onChange={(value) => update({ text: value })} />
            <TextField label="Bottom text" value={options.bottomText ?? ""} onChange={(value) => update({ bottomText: value })} />
          </>
        )}
        {toolId === "add-watermark" && (
          <TextField label="Watermark" value={options.watermark ?? ""} onChange={(value) => update({ watermark: value })} />
        )}
        {toolId === "add-watermark-pdf" && (
          <TextField label="Watermark text" value={options.watermark ?? ""} onChange={(value) => update({ watermark: value })} />
        )}
        {toolId === "txt-to-pdf" && (
          <label className="grid gap-2 md:col-span-2">
            <span className="text-xs text-muted-foreground">Text content</span>
            <textarea
              className="min-h-36 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={options.text ?? ""}
              onChange={(event) => update({ text: event.target.value })}
              placeholder="Paste text here, or upload a .txt file above."
            />
          </label>
        )}
        {(toolId === "text-case-converter" || toolId === "case-converter") && (
          <>
            <label className="grid gap-2">
              <span className="text-xs text-muted-foreground">Conversion</span>
              <select
                className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={textCaseMode(options.text)}
                onChange={(event) => update({ text: event.target.value })}
              >
                <option value="uppercase">Uppercase</option>
                <option value="lowercase">Lowercase</option>
                <option value="title">Title Case</option>
                <option value="sentence">Sentence case</option>
              </select>
            </label>
            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs text-muted-foreground">Text content</span>
              <textarea
                className="min-h-36 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={options.bottomText ?? ""}
                onChange={(event) => update({ bottomText: event.target.value })}
                placeholder="Paste text here, or upload a .txt file above."
              />
            </label>
          </>
        )}
        {toolId === "word-counter" && (
          <label className="grid gap-2 md:col-span-2">
            <span className="text-xs text-muted-foreground">Text content</span>
            <textarea
              className="min-h-36 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={options.bottomText ?? ""}
              onChange={(event) => update({ bottomText: event.target.value })}
              placeholder="Paste text here, or upload a .txt file above."
            />
          </label>
        )}
        {isTextInputTool(toolId) && toolId !== "txt-to-pdf" && toolId !== "text-case-converter" && toolId !== "case-converter" && toolId !== "word-counter" && (
          <label className="grid gap-2 md:col-span-2">
            <span className="text-xs text-muted-foreground">{toolId.includes("youtube") ? "YouTube URL, video ID, title, or description" : toolId === "ip-lookup" ? "IP address, or leave blank for your IP" : toolId === "regex-tester" ? "Test text" : toolId === "text-diff-checker" ? "Changed text" : "Text content"}</span>
            <textarea
              className="min-h-36 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={options.bottomText ?? ""}
              onChange={(event) => update({ bottomText: event.target.value })}
              placeholder={toolId.includes("youtube") ? "Paste a YouTube URL, video ID, or text here." : toolId === "ip-lookup" ? "Example: 8.8.8.8, or leave blank to check your IP." : "Paste text here."}
            />
          </label>
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
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <Input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
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
        <div className="flex flex-wrap gap-2">
          {result.text && (
            <Button
              variant="outline"
              onClick={() => {
                void navigator.clipboard.writeText(result.text ?? "");
                toast.success("Copied");
              }}
            >
              <Copy className="size-4 mr-2" />
              Copy
            </Button>
          )}
          <Button onClick={onDownload} className="bg-brand text-brand-foreground hover:bg-brand/90">
            <Download className="size-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      {result.text && (
        <pre className="max-h-[420px] overflow-auto rounded-lg border border-border bg-background p-4 text-left text-xs leading-6 whitespace-pre-wrap">
          {result.text}
        </pre>
      )}
      {result.items && (
        <div className="grid gap-3 sm:grid-cols-2">
          {result.items.map((item) => (
            <a
              key={`${item.label}-${item.url ?? item.text ?? ""}`}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border bg-background p-3 text-sm hover:border-brand"
            >
              {item.url && <img src={item.url} alt={item.label} className="mb-3 aspect-video w-full rounded-md object-cover" />}
              <span className="font-medium">{item.label}</span>
              {item.url && <span className="mt-1 block break-all text-xs text-muted-foreground">{item.url}</span>}
            </a>
          ))}
        </div>
      )}
      {isImage && result.previewUrl && <img src={result.previewUrl} alt="Preview" className="max-h-[420px] rounded-lg border border-border mx-auto" />}
      {isVideo && result.previewUrl && <video src={result.previewUrl} controls className="w-full max-h-[420px] rounded-lg border border-border" />}
      {isAudio && result.previewUrl && <audio src={result.previewUrl} controls className="w-full" />}
    </div>
  );
}

function VideoWarning() {
  return (
    <div className="rounded-xl border border-amber-300/40 bg-amber-50 px-5 py-4 text-sm text-amber-950 dark:bg-amber-400/10 dark:text-amber-100">
      <h2 className="font-semibold">Video tools run locally in your browser</h2>
      <p className="mt-1 leading-6">
        Large files may be slower and use more memory because processing happens on your device.
      </p>
      <p className="mt-2 text-xs opacity-80">
        Large videos may process slowly because everything runs in your browser.
      </p>
    </div>
  );
}

function HowToUse({ toolTitle }: { toolTitle: string }) {
  const steps = ["Choose your file", "Adjust options", "Process in browser", "Download result"];

  return (
    <section className="mt-14 rounded-xl border border-border bg-card p-6">
      <h2 className="text-xl font-semibold mb-5">How to use {toolTitle}</h2>
      <div className="grid gap-3 md:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step} className="rounded-lg border border-border bg-background p-4">
            <span className="grid size-8 place-items-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
              {index + 1}
            </span>
            <h3 className="mt-3 text-sm font-semibold">{step}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

function allowsTextOnly(toolId: ClientToolId) {
  return isTextInputTool(toolId) || isNoInputTool(toolId);
}

function canStartTool(toolId: ClientToolId, files: File[], options: ProcessOptions) {
  if (toolId === "document-compare") return files.length >= 2;
  if (toolId === "ip-lookup") return true;
  if (!allowsTextOnly(toolId)) return files.length > 0;
  if (isNoInputTool(toolId)) return true;
  return files.length > 0 || textOnlyValue(toolId, options).length > 0;
}

function textOnlyValue(toolId: ClientToolId, options: ProcessOptions) {
  if (toolId === "txt-to-pdf") return (options.text ?? "").trim();
  return (options.bottomText ?? "").trim();
}

function textCaseMode(value?: string) {
  return value === "lowercase" || value === "title" || value === "sentence" ? value : "uppercase";
}

function upsertHeadLink(rel: string, href: string) {
  const existing = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  const link = existing ?? document.createElement("link");
  link.rel = rel;
  link.href = href;
  if (!existing) document.head.appendChild(link);
}

function upsertMetaProperty(property: string, content: string) {
  const existing = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  const meta = existing ?? document.createElement("meta");
  meta.setAttribute("property", property);
  meta.content = content;
  if (!existing) document.head.appendChild(meta);
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
          answer="Most image, PDF, document, audio, and smaller video tools work on modern mobile browsers. Large files work best on desktop."
        />
        <FAQItem
          question="Is processing private?"
          answer="Yes. Processing happens on your device, with no login, no database storage, and no server-side file handling."
        />
        <FAQItem
          question="Why can large PDF, audio, or video files take longer?"
          answer="PDF rendering, audio editing, and video conversion can be heavy, so your browser may need extra time and memory to process large files on your device."
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
