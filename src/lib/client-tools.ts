import { degrees, rgb, StandardFonts, PDFDocument } from "pdf-lib";
import { jsPDF } from "jspdf";
import JSZip from "jszip";
import ffmpegCoreUrl from "@ffmpeg/core?url";
import ffmpegCoreWasmUrl from "@ffmpeg/core/wasm?url";

export type ToolCategory = "image" | "pdf" | "document" | "audio" | "video";

export type ClientToolId =
  | "jpg-to-png"
  | "png-to-jpg"
  | "image-compressor"
  | "resize-image"
  | "crop-image"
  | "blur-image"
  | "meme-maker"
  | "add-watermark"
  | "image-to-pdf"
  | "merge-pdf"
  | "split-pdf"
  | "rotate-pdf"
  | "add-watermark-pdf"
  | "jpg-to-pdf"
  | "png-to-pdf"
  | "pdf-to-jpg"
  | "txt-to-pdf"
  | "docx-to-text"
  | "docx-to-html"
  | "text-case-converter"
  | "word-counter"
  | "mp3-cutter"
  | "audio-merger"
  | "volume-booster"
  | "reverse-audio"
  | "audio-trimmer"
  | "change-audio-speed"
  | "video-to-mp3"
  | "mute-video"
  | "video-trimmer"
  | "video-to-gif"
  | "extract-frames"
  | "merge-videos";

export interface ToolDefinition {
  id: ClientToolId;
  title: string;
  description: string;
  category: ToolCategory;
  seoTitle?: string;
  metaDescription?: string;
  route?: string;
  accept: string;
  multiple?: boolean;
  outputName: string;
  engine: "canvas" | "pdf-lib" | "pdf-js" | "jspdf" | "mammoth" | "text" | "web-audio" | "ffmpeg";
}

export interface ProcessOptions {
  width?: number;
  height?: number;
  quality?: number;
  start?: number;
  duration?: number;
  end?: number;
  speed?: number;
  volume?: number;
  text?: string;
  bottomText?: string;
  watermark?: string;
  blur?: number;
  rotation?: number;
  pageRange?: string;
}

export interface ProcessResult {
  blob: Blob;
  filename: string;
  previewUrl?: string;
  mime: string;
  text?: string;
}

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Reduce JPG and PNG file size in your browser.",
    seoTitle: "Free Image Compressor Online - Private Browser Tool",
    metaDescription: "Compress JPG and PNG images directly in your browser. No uploads, private, fast, and free.",
    category: "image",
    route: "/image-compressor",
    accept: "image/*",
    outputName: "compressed.jpg",
    engine: "canvas",
  },
  {
    id: "jpg-to-png",
    title: "JPG to PNG",
    description: "Convert JPG images to PNG files.",
    seoTitle: "JPG to PNG Converter - Free Online Browser Tool",
    metaDescription: "Convert JPG images to PNG directly in your browser. No uploads, private, fast, and free.",
    category: "image",
    route: "/jpg-to-png",
    accept: "image/jpeg",
    outputName: "converted.png",
    engine: "canvas",
  },
  {
    id: "png-to-jpg",
    title: "PNG to JPG",
    description: "Convert PNG images into smaller JPG files.",
    seoTitle: "PNG to JPG Converter - Free Online Browser Tool",
    metaDescription: "Convert PNG images to JPG in your browser. No server uploads, no login, private, and free.",
    category: "image",
    route: "/png-to-jpg",
    accept: "image/png",
    outputName: "converted.jpg",
    engine: "canvas",
  },
  {
    id: "resize-image",
    title: "Resize Image",
    description: "Change image dimensions with Canvas.",
    seoTitle: "Resize Image Tool - Free Online Image Resizer",
    metaDescription: "Resize images online using your browser. Change dimensions privately without uploading files.",
    category: "image",
    route: "/resize-image",
    accept: "image/*",
    outputName: "resized.png",
    engine: "canvas",
  },
  {
    id: "crop-image",
    title: "Crop Image",
    description: "Crop the center of an image for quick publishing.",
    seoTitle: "Crop Image Online - Free Private Browser Tool",
    metaDescription: "Crop images directly in your browser. Fast, private, free, and no server uploads.",
    category: "image",
    route: "/crop-image",
    accept: "image/*",
    outputName: "cropped.png",
    engine: "canvas",
  },
  {
    id: "blur-image",
    title: "Blur Image",
    description: "Add a soft blur effect to an image.",
    seoTitle: "Blur Image Online - Free Browser Tool",
    metaDescription: "Add blur to images locally in your browser. Your files are never uploaded.",
    category: "image",
    accept: "image/*",
    outputName: "blurred.png",
    engine: "canvas",
  },
  {
    id: "meme-maker",
    title: "Meme Maker",
    description: "Add top and bottom meme text.",
    seoTitle: "Free Meme Maker Online - Browser-Based Tool",
    metaDescription: "Create memes by adding top and bottom text to images in your browser with no uploads.",
    category: "image",
    accept: "image/*",
    outputName: "meme.png",
    engine: "canvas",
  },
  {
    id: "add-watermark",
    title: "Add Watermark",
    description: "Stamp text onto the bottom-right of an image.",
    seoTitle: "Add Watermark to Image Online - Free Tool",
    metaDescription: "Add a text watermark to images privately in your browser. No upload or account required.",
    category: "image",
    accept: "image/*",
    outputName: "watermarked.png",
    engine: "canvas",
  },
  {
    id: "image-to-pdf",
    title: "Image to PDF",
    description: "Create a PDF from one or more images.",
    seoTitle: "Image to PDF Converter - Free Browser Tool",
    metaDescription: "Convert images to a PDF in your browser. Files stay on your device and are never uploaded.",
    category: "image",
    accept: "image/*",
    multiple: true,
    outputName: "images.pdf",
    engine: "jspdf",
  },
  {
    id: "merge-pdf",
    title: "Merge PDF",
    description: "Upload multiple PDFs and merge them into one PDF.",
    seoTitle: "Merge PDF Online - Free Browser Tool",
    metaDescription: "Merge PDF files directly in your browser. No uploads, no account, private, and free.",
    category: "document",
    route: "/merge-pdf",
    accept: "application/pdf",
    multiple: true,
    outputName: "merged.pdf",
    engine: "pdf-lib",
  },
  {
    id: "split-pdf",
    title: "Split PDF",
    description: "Extract a page range from a PDF file.",
    seoTitle: "Split PDF Online - Free Browser Tool",
    metaDescription: "Split PDF pages directly in your browser. No uploads, private, fast, and free.",
    category: "pdf",
    route: "/split-pdf",
    accept: "application/pdf",
    outputName: "split.pdf",
    engine: "pdf-lib",
  },
  {
    id: "rotate-pdf",
    title: "Rotate PDF",
    description: "Rotate every page in a PDF by 90, 180, or 270 degrees.",
    seoTitle: "Rotate PDF Online - Free Browser Tool",
    metaDescription: "Rotate PDF pages directly in your browser. Your files are never uploaded.",
    category: "pdf",
    route: "/rotate-pdf",
    accept: "application/pdf",
    outputName: "rotated.pdf",
    engine: "pdf-lib",
  },
  {
    id: "add-watermark-pdf",
    title: "Add Watermark to PDF",
    description: "Add a text watermark to each PDF page.",
    seoTitle: "Add Watermark to PDF Online - Free Tool",
    metaDescription: "Add a text watermark to PDF pages directly in your browser with no uploads.",
    category: "pdf",
    route: "/add-watermark-pdf",
    accept: "application/pdf",
    outputName: "watermarked.pdf",
    engine: "pdf-lib",
  },
  {
    id: "jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert JPG images into one PDF.",
    seoTitle: "JPG to PDF Converter - Free Browser Tool",
    metaDescription: "Create PDF files from JPG images directly in your browser. No uploads or account required.",
    category: "pdf",
    route: "/jpg-to-pdf",
    accept: "image/jpeg",
    multiple: true,
    outputName: "images.pdf",
    engine: "jspdf",
  },
  {
    id: "png-to-pdf",
    title: "PNG to PDF",
    description: "Convert PNG images into one PDF.",
    seoTitle: "PNG to PDF Converter - Free Browser Tool",
    metaDescription: "Convert PNG images to PDF directly in your browser. No server uploads.",
    category: "pdf",
    route: "/png-to-pdf",
    accept: "image/png",
    multiple: true,
    outputName: "images.pdf",
    engine: "jspdf",
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Render PDF pages to JPG images and download them as a ZIP.",
    seoTitle: "PDF to JPG Converter - Free Online Tool",
    metaDescription: "Convert PDF pages to JPG images in your browser using pdf.js. No uploads, private, and free.",
    category: "pdf",
    route: "/pdf-to-jpg",
    accept: "application/pdf",
    outputName: "pdf-pages.zip",
    engine: "pdf-js",
  },
  {
    id: "txt-to-pdf",
    title: "TXT to PDF",
    description: "Paste or upload text and convert it into a PDF.",
    seoTitle: "TXT to PDF Converter - Free Browser Tool",
    metaDescription: "Convert text to PDF directly in your browser. No uploads, no server processing, and free.",
    category: "pdf",
    route: "/txt-to-pdf",
    accept: ".txt,text/plain",
    outputName: "text.pdf",
    engine: "jspdf",
  },
  {
    id: "docx-to-text",
    title: "DOCX to Text",
    description: "Extract readable plain text from a DOCX file.",
    seoTitle: "DOCX to Text Converter - Free Browser Tool",
    metaDescription: "Extract readable text from DOCX files directly in your browser using Mammoth. No uploads or server processing.",
    category: "document",
    route: "/docx-to-text",
    accept: ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    outputName: "document.txt",
    engine: "mammoth",
  },
  {
    id: "docx-to-html",
    title: "DOCX to HTML",
    description: "Convert basic DOCX formatting into clean HTML.",
    seoTitle: "DOCX to HTML Converter - Free Browser Tool",
    metaDescription: "Convert DOCX files to basic HTML directly in your browser using Mammoth. No uploads or paid APIs.",
    category: "document",
    route: "/docx-to-html",
    accept: ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    outputName: "document.html",
    engine: "mammoth",
  },
  {
    id: "text-case-converter",
    title: "Text Case Converter",
    description: "Convert pasted text to uppercase, lowercase, title case, or sentence case.",
    seoTitle: "Text Case Converter - Free Online Tool",
    metaDescription: "Convert text case in your browser. Uppercase, lowercase, title case, and sentence case with copy and download.",
    category: "document",
    route: "/text-case-converter",
    accept: ".txt,text/plain",
    outputName: "converted-text.txt",
    engine: "text",
  },
  {
    id: "word-counter",
    title: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs from pasted text.",
    seoTitle: "Word Counter Online - Free Browser Tool",
    metaDescription: "Count words, characters, sentences, and paragraphs in your browser. Private, fast, and free.",
    category: "document",
    route: "/word-counter",
    accept: ".txt,text/plain",
    outputName: "word-count.txt",
    engine: "text",
  },
  {
    id: "mp3-cutter",
    title: "MP3 Cutter",
    description: "Trim MP3 or audio files and download a WAV cut.",
    seoTitle: "MP3 Cutter Online - Free Browser Audio Trimmer",
    metaDescription: "Cut MP3 and audio files directly in your browser. Private, fast, free, and no uploads.",
    category: "audio",
    route: "/mp3-cutter",
    accept: "audio/*",
    outputName: "cut.wav",
    engine: "web-audio",
  },
  {
    id: "audio-merger",
    title: "Audio Merger",
    description: "Combine multiple audio files into one WAV.",
    seoTitle: "Audio Merger Online - Free Browser Tool",
    metaDescription: "Merge audio files locally in your browser and download a WAV file. No uploads required.",
    category: "audio",
    accept: "audio/*",
    multiple: true,
    outputName: "merged.wav",
    engine: "web-audio",
  },
  {
    id: "audio-trimmer",
    title: "Audio Trimmer",
    description: "Cut a section from audio and download WAV.",
    seoTitle: "Audio Trimmer Online - Free Browser Tool",
    metaDescription: "Trim audio files privately in your browser and download WAV output. No uploads required.",
    category: "audio",
    accept: "audio/*",
    outputName: "trimmed.wav",
    engine: "web-audio",
  },
  {
    id: "volume-booster",
    title: "Volume Booster",
    description: "Increase audio volume and download WAV.",
    seoTitle: "Volume Booster Online - Free Audio Tool",
    metaDescription: "Boost audio volume in your browser and download a WAV file. Private, free, and no upload.",
    category: "audio",
    accept: "audio/*",
    outputName: "boosted.wav",
    engine: "web-audio",
  },
  {
    id: "reverse-audio",
    title: "Reverse Audio",
    description: "Reverse an audio file and download WAV.",
    seoTitle: "Reverse Audio Online - Free Browser Tool",
    metaDescription: "Reverse audio files locally in your browser. Download WAV output without uploading files.",
    category: "audio",
    accept: "audio/*",
    outputName: "reversed.wav",
    engine: "web-audio",
  },
  {
    id: "change-audio-speed",
    title: "Change Audio Speed",
    description: "Speed up or slow down audio and download WAV.",
    seoTitle: "Change Audio Speed Online - Free Browser Tool",
    metaDescription: "Speed up or slow down audio locally in your browser. Private, free, and no server storage.",
    category: "audio",
    accept: "audio/*",
    outputName: "speed-audio.wav",
    engine: "web-audio",
  },
  {
    id: "video-to-mp3",
    title: "Video to MP3",
    description: "Extract audio from MP4, MOV, or WebM and download an MP3.",
    seoTitle: "Video to MP3 Converter - Free Browser Tool",
    metaDescription: "Convert video to MP3 directly in your browser with ffmpeg.wasm. No uploads, no server processing, and free.",
    category: "video",
    route: "/video-to-mp3",
    accept: "video/mp4,video/quicktime,video/webm",
    outputName: "audio.mp3",
    engine: "ffmpeg",
  },
  {
    id: "mute-video",
    title: "Mute Video",
    description: "Remove the audio track from a video and download a muted copy.",
    seoTitle: "Mute Video Online - Free Browser Tool",
    metaDescription: "Mute videos directly in your browser. Remove audio locally with no uploads or server storage.",
    category: "video",
    route: "/mute-video",
    accept: "video/*",
    outputName: "muted.mp4",
    engine: "ffmpeg",
  },
  {
    id: "video-trimmer",
    title: "Video Trimmer",
    description: "Choose start and end time, then export a trimmed video.",
    seoTitle: "Video Trimmer Online - Free Browser Tool",
    metaDescription: "Trim videos locally in your browser using ffmpeg.wasm. Private, free, and no server upload.",
    category: "video",
    route: "/video-trimmer",
    accept: "video/*",
    outputName: "trimmed.mp4",
    engine: "ffmpeg",
  },
  {
    id: "video-to-gif",
    title: "Video to GIF",
    description: "Convert a short video clip into a GIF in your browser.",
    seoTitle: "Video to GIF Converter - Free Browser Tool",
    metaDescription: "Create GIFs from short videos directly in your browser. No uploads, no account, and no backend.",
    category: "video",
    route: "/video-to-gif",
    accept: "video/*",
    outputName: "video.gif",
    engine: "ffmpeg",
  },
  {
    id: "extract-frames",
    title: "Extract Frames",
    description: "Capture a JPG frame from a video timestamp.",
    seoTitle: "Extract Frames from Video - Free Browser Tool",
    metaDescription: "Extract video thumbnails as JPG images locally in your browser. Files are never uploaded.",
    category: "video",
    route: "/extract-frames",
    accept: "video/*",
    outputName: "frame.jpg",
    engine: "canvas",
  },
  {
    id: "merge-videos",
    title: "Merge Videos",
    description: "Merge compatible videos with matching format, codec, resolution, and dimensions.",
    seoTitle: "Merge Videos Online - Free Browser Tool",
    metaDescription: "Merge compatible videos locally in your browser. No uploads, no server processing, and no paid API.",
    category: "video",
    route: "/merge-videos",
    accept: "video/*",
    multiple: true,
    outputName: "merged.mp4",
    engine: "ffmpeg",
  },
];

export function getTool(id: ClientToolId): ToolDefinition {
  const tool = TOOL_DEFINITIONS.find((item) => item.id === id);
  if (!tool) throw new Error(`Unknown tool: ${id}`);
  return tool;
}

export function isClientToolId(id: string): id is ClientToolId {
  return TOOL_DEFINITIONS.some((tool) => tool.id === id);
}

export function getToolPath(id: ClientToolId): string {
  return getTool(id).route ?? `/${id}`;
}

export function getToolSeo(id: ClientToolId) {
  const tool = getTool(id);
  return {
    title: tool.seoTitle ?? `${tool.title} - Free Browser Tool`,
    description:
      tool.metaDescription ??
      `${tool.description} Files are processed locally in your browser and never uploaded.`,
    path: getToolPath(id),
  };
}

export async function processTool(
  toolId: ClientToolId,
  files: File[],
  options: ProcessOptions,
  onProgress: (progress: number, stage: string) => void,
): Promise<ProcessResult> {
  const tool = getTool(toolId);
  const acceptsTextOnly = tool.id === "txt-to-pdf" || tool.id === "text-case-converter" || tool.id === "word-counter";
  if (!acceptsTextOnly && files.length === 0) throw new Error("Choose a file first.");

  if (tool.category === "pdf") return processPdfTool(tool, files, options, onProgress);
  if (tool.category === "document") return processDocumentTool(tool, files, options, onProgress);
  if (tool.category === "video") return processVideoTool(tool, files, options, onProgress);
  if (tool.id === "jpg-to-pdf" || tool.id === "png-to-pdf" || tool.id === "image-to-pdf") {
    return processImagesToPdf(tool, files, onProgress);
  }
  if (tool.category === "image") return processImageTool(tool, files, options, onProgress);
  return processWebAudioTool(tool, files, options, onProgress);
}

type FFmpegInstance = {
  loaded: boolean;
  load: (config?: Record<string, string>, options?: { signal?: AbortSignal }) => Promise<unknown>;
  on: (event: "progress", callback: (event: { progress: number }) => void) => void;
  off: (event: "progress", callback: (event: { progress: number }) => void) => void;
  writeFile: (path: string, data: Uint8Array | string) => Promise<unknown>;
  readFile: (path: string) => Promise<Uint8Array | string>;
  deleteFile: (path: string) => Promise<unknown>;
  exec: (args: string[], timeout?: number) => Promise<number>;
};

let ffmpegPromise: Promise<FFmpegInstance> | null = null;

async function getFfmpeg(onProgress: (progress: number, stage: string) => void) {
  if (ffmpegPromise) {
    onProgress(16, "Loading media engine");
    return ffmpegPromise;
  }

  ffmpegPromise = (async () => {
    onProgress(8, "Loading media engine");
    const { FFmpeg } = await import("@ffmpeg/ffmpeg");
    const ffmpeg = new FFmpeg() as FFmpegInstance;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 45000);
    try {
      await ffmpeg.load(
        {
          coreURL: ffmpegCoreUrl,
          wasmURL: ffmpegCoreWasmUrl,
        },
        { signal: controller.signal },
      );
      onProgress(20, "Preparing file");
      return ffmpeg;
    } catch (error) {
      ffmpegPromise = null;
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("Media engine is taking longer than expected. Try a smaller file or reload.");
      }
      throw new Error("Media engine could not load. Use the retry button or reload the page.");
    } finally {
      window.clearTimeout(timeout);
    }
  })();

  return ffmpegPromise;
}

async function processVideoTool(
  tool: ToolDefinition,
  files: File[],
  options: ProcessOptions,
  onProgress: (progress: number, stage: string) => void,
): Promise<ProcessResult> {
  if (tool.id === "extract-frames") return extractVideoFrame(tool, files[0], options, onProgress);
  if (tool.id === "merge-videos" && files.length < 2) throw new Error("Choose at least two video files to merge.");

  const ffmpeg = await getFfmpeg(onProgress);
  const progressHandler = ({ progress }: { progress: number }) => {
    onProgress(35 + Math.min(55, Math.round(Math.max(0, progress) * 55)), "Processing video");
  };
  ffmpeg.on("progress", progressHandler);

  const writtenFiles: string[] = [];
  try {
    onProgress(24, "Preparing file");
    const inputNames = await Promise.all(
      files.map(async (file, index) => {
        const inputName = `input-${index}.${videoExtension(file)}`;
        await ffmpeg.writeFile(inputName, new Uint8Array(await file.arrayBuffer()));
        writtenFiles.push(inputName);
        return inputName;
      }),
    );

    const start = Math.max(0, options.start ?? 0);
    const duration = videoDurationOption(options, tool.id === "video-to-gif" ? 6 : 10);
    const firstVideoExt = videoOutputExtension(files[0]);
    let outputName = tool.outputName;
    let mime = "video/mp4";
    let args: string[];

    if (tool.id === "video-to-mp3") {
      outputName = "audio.mp3";
      mime = "audio/mpeg";
      args = ["-i", inputNames[0], "-vn", "-codec:a", "libmp3lame", "-q:a", "2", outputName];
    } else if (tool.id === "mute-video") {
      outputName = `muted.${firstVideoExt}`;
      mime = firstVideoExt === "webm" ? "video/webm" : "video/mp4";
      args = ["-i", inputNames[0], "-c", "copy", "-an", outputName];
    } else if (tool.id === "video-trimmer") {
      outputName = `trimmed.${firstVideoExt}`;
      mime = firstVideoExt === "webm" ? "video/webm" : "video/mp4";
      args = ["-ss", String(start), "-t", String(duration), "-i", inputNames[0], "-c", "copy", "-avoid_negative_ts", "make_zero", outputName];
    } else if (tool.id === "video-to-gif") {
      outputName = "video.gif";
      mime = "image/gif";
      args = [
        "-ss",
        String(start),
        "-t",
        String(Math.min(duration, 12)),
        "-i",
        inputNames[0],
        "-vf",
        "fps=10,scale=480:-1:flags=lanczos",
        "-loop",
        "0",
        outputName,
      ];
    } else if (tool.id === "merge-videos") {
      outputName = `merged.${firstVideoExt}`;
      mime = firstVideoExt === "webm" ? "video/webm" : "video/mp4";
      const listFile = inputNames.map((name) => `file '${name}'`).join("\n");
      await ffmpeg.writeFile("merge-list.txt", listFile);
      writtenFiles.push("merge-list.txt");
      args = ["-f", "concat", "-safe", "0", "-i", "merge-list.txt", "-c", "copy", outputName];
    } else {
      throw new Error("This video tool is not available.");
    }

    onProgress(35, "Processing video");
    const exitCode = await ffmpeg.exec(args, 120000);
    if (exitCode !== 0) throw new Error(videoFailureMessage(tool.id));

    onProgress(94, "Creating download");
    const data = await ffmpeg.readFile(outputName);
    writtenFiles.push(outputName);
    const blob = new Blob([fileDataToUint8Array(data)], { type: mime });
    onProgress(100, "Done");
    return { blob, filename: outputName, previewUrl: URL.createObjectURL(blob), mime };
  } catch (error) {
    if (error instanceof Error && error.message.includes("Media engine")) throw error;
    throw new Error(error instanceof Error && error.message ? error.message : videoFailureMessage(tool.id));
  } finally {
    ffmpeg.off("progress", progressHandler);
    await Promise.allSettled(writtenFiles.map((name) => ffmpeg.deleteFile(name)));
  }
}

async function extractVideoFrame(
  tool: ToolDefinition,
  file: File,
  options: ProcessOptions,
  onProgress: (progress: number, stage: string) => void,
): Promise<ProcessResult> {
  onProgress(10, "Preparing file");
  const video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;
  video.preload = "metadata";
  const url = URL.createObjectURL(file);

  try {
    await new Promise<void>((resolve, reject) => {
      video.onloadedmetadata = () => resolve();
      video.onerror = () => reject(new Error("Could not read this video. Try a common MP4 or WebM file."));
      video.src = url;
    });

    onProgress(45, "Processing video");
    const timestamp = clamp(options.start ?? 0, 0, Math.max(0, video.duration || 0));
    await new Promise<void>((resolve, reject) => {
      video.onseeked = () => resolve();
      video.onerror = () => reject(new Error("Could not seek to that timestamp."));
      video.currentTime = timestamp;
    });

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is not supported in this browser.");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    onProgress(94, "Creating download");
    const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
    onProgress(100, "Done");
    return { blob, filename: tool.outputName, previewUrl: URL.createObjectURL(blob), mime: "image/jpeg" };
  } finally {
    URL.revokeObjectURL(url);
  }
}

function videoDurationOption(options: ProcessOptions, fallback: number) {
  const start = Math.max(0, options.start ?? 0);
  if (typeof options.end === "number" && options.end > start) return Math.max(0.1, options.end - start);
  return Math.max(0.1, options.duration ?? fallback);
}

function videoExtension(file: File) {
  const nameExtension = file.name.split(".").pop()?.toLowerCase();
  if (nameExtension === "webm" || nameExtension === "mov" || nameExtension === "mp4") return nameExtension;
  if (file.type.includes("webm")) return "webm";
  if (file.type.includes("quicktime")) return "mov";
  return "mp4";
}

function videoOutputExtension(file: File) {
  return videoExtension(file) === "webm" ? "webm" : "mp4";
}

function fileDataToUint8Array(data: Uint8Array | string) {
  return typeof data === "string" ? new TextEncoder().encode(data) : data;
}

function videoFailureMessage(toolId: ClientToolId) {
  if (toolId === "merge-videos") {
    return "Browser merge requires matching video properties: same format, codec, resolution, dimensions, and stream layout. Try files exported from the same source/settings.";
  }
  if (toolId === "video-to-gif") {
    return "GIF creation is heavy in the browser. Try a shorter clip, lower duration, or smaller file.";
  }
  return "Video processing failed in the browser. Try a smaller file or a video with a common MP4/WebM format.";
}

async function processDocumentTool(
  tool: ToolDefinition,
  files: File[],
  options: ProcessOptions,
  onProgress: (progress: number, stage: string) => void,
): Promise<ProcessResult> {
  onProgress(10, "Preparing file");

  if (tool.id === "txt-to-pdf") return textToPdf(tool, files[0], options, onProgress);

  if (tool.id === "docx-to-text" || tool.id === "docx-to-html") {
    const mammoth = await import("mammoth/mammoth.browser");
    onProgress(45, "Processing in browser");
    const arrayBuffer = await files[0].arrayBuffer();
    if (tool.id === "docx-to-html") {
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Converted DOCX</title></head>
<body>
${result.value}
</body>
</html>
`;
      return textResult(tool, html, "text/html", onProgress);
    }
    const result = await mammoth.extractRawText({ arrayBuffer });
    return textResult(tool, result.value.trim(), "text/plain", onProgress);
  }

  if (tool.id === "text-case-converter") {
    const input = await readTextInput(files[0], options);
    const mode = textCaseMode(options.text);
    const output =
      mode === "lowercase"
        ? input.toLowerCase()
        : mode === "title"
          ? toTitleCase(input)
          : mode === "sentence"
            ? toSentenceCase(input)
            : input.toUpperCase();
    return textResult(tool, output, "text/plain", onProgress);
  }

  if (tool.id === "word-counter") {
    const input = await readTextInput(files[0], options);
    const words = input.trim() ? input.trim().split(/\s+/).length : 0;
    const characters = input.length;
    const charactersNoSpaces = input.replace(/\s/g, "").length;
    const sentences = input.trim() ? input.split(/[.!?]+/).filter((part) => part.trim()).length : 0;
    const paragraphs = input.trim() ? input.split(/\n\s*\n/).filter((part) => part.trim()).length : 0;
    const output = [
      `Words: ${words}`,
      `Characters: ${characters}`,
      `Characters without spaces: ${charactersNoSpaces}`,
      `Sentences: ${sentences}`,
      `Paragraphs: ${paragraphs}`,
    ].join("\n");
    return textResult(tool, output, "text/plain", onProgress);
  }

  throw new Error("This document tool is not available.");
}

function textCaseMode(value?: string) {
  return value === "lowercase" || value === "title" || value === "sentence" ? value : "uppercase";
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function processPdfTool(
  tool: ToolDefinition,
  files: File[],
  options: ProcessOptions,
  onProgress: (progress: number, stage: string) => void,
): Promise<ProcessResult> {
  onProgress(10, "Preparing file");

  if (tool.id === "merge-pdf") return mergePdfs(tool, files, onProgress);
  if (tool.id === "split-pdf") return splitPdf(tool, files[0], options, onProgress);
  if (tool.id === "rotate-pdf") return rotatePdf(tool, files[0], options, onProgress);
  if (tool.id === "add-watermark-pdf") return watermarkPdf(tool, files[0], options, onProgress);
  if (tool.id === "pdf-to-jpg") return pdfToJpg(tool, files[0], onProgress);
  if (tool.id === "txt-to-pdf") return textToPdf(tool, files[0], options, onProgress);
  if (tool.id === "jpg-to-pdf" || tool.id === "png-to-pdf") return processImagesToPdf(tool, files, onProgress);

  throw new Error("This PDF tool is not available.");
}

async function mergePdfs(
  tool: ToolDefinition,
  files: File[],
  onProgress: (progress: number, stage: string) => void,
) {
  if (files.length < 2) throw new Error("Choose at least two PDF files to merge.");
  const output = await PDFDocument.create();
  for (const [index, file] of files.entries()) {
    onProgress(20 + Math.round((index / files.length) * 60), "Processing in browser");
    const source = await PDFDocument.load(await file.arrayBuffer());
    const pages = await output.copyPages(source, source.getPageIndices());
    pages.forEach((page) => output.addPage(page));
  }
  return pdfResult(tool, await output.save(), onProgress);
}

async function splitPdf(
  tool: ToolDefinition,
  file: File,
  options: ProcessOptions,
  onProgress: (progress: number, stage: string) => void,
) {
  const source = await PDFDocument.load(await file.arrayBuffer());
  const output = await PDFDocument.create();
  const pages = parsePageRange(options.pageRange, source.getPageCount());
  if (pages.length === 0) throw new Error("Enter a valid page range, like 1-3 or 1,3,5.");
  onProgress(45, "Processing in browser");
  const copied = await output.copyPages(source, pages.map((page) => page - 1));
  copied.forEach((page) => output.addPage(page));
  return pdfResult(tool, await output.save(), onProgress);
}

async function rotatePdf(
  tool: ToolDefinition,
  file: File,
  options: ProcessOptions,
  onProgress: (progress: number, stage: string) => void,
) {
  const pdf = await PDFDocument.load(await file.arrayBuffer());
  const angle = options.rotation ?? 90;
  onProgress(45, "Processing in browser");
  pdf.getPages().forEach((page) => {
    const current = page.getRotation().angle;
    page.setRotation(degrees((current + angle) % 360));
  });
  return pdfResult(tool, await pdf.save(), onProgress);
}

async function watermarkPdf(
  tool: ToolDefinition,
  file: File,
  options: ProcessOptions,
  onProgress: (progress: number, stage: string) => void,
) {
  const pdf = await PDFDocument.load(await file.arrayBuffer());
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);
  const text = options.watermark || options.text || "CreatorKitTools";
  onProgress(45, "Processing in browser");
  for (const page of pdf.getPages()) {
    const { width, height } = page.getSize();
    page.drawText(text, {
      x: width * 0.16,
      y: height * 0.48,
      size: Math.max(24, Math.min(width, height) * 0.08),
      font,
      color: rgb(0.35, 0.35, 0.35),
      opacity: 0.22,
      rotate: degrees(-35),
    });
  }
  return pdfResult(tool, await pdf.save(), onProgress);
}

async function pdfToJpg(
  tool: ToolDefinition,
  file: File,
  onProgress: (progress: number, stage: string) => void,
) {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.mjs", import.meta.url).toString();
  const document = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const zip = new JSZip();

  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    onProgress(15 + Math.round((pageNumber / document.numPages) * 75), "Processing in browser");
    const page = await document.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = window.document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is not supported in this browser.");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: context, viewport, canvas }).promise;
    const blob = await canvasToBlob(canvas, "image/jpeg", 0.9);
    zip.file(`page-${String(pageNumber).padStart(2, "0")}.jpg`, blob);
  }

  onProgress(96, "Creating download");
  const blob = await zip.generateAsync({ type: "blob" });
  onProgress(100, "Done");
  return { blob, filename: tool.outputName, previewUrl: URL.createObjectURL(blob), mime: "application/zip" };
}

async function textToPdf(
  tool: ToolDefinition,
  file: File | undefined,
  options: ProcessOptions,
  onProgress: (progress: number, stage: string) => void,
) {
  const text = file ? await file.text() : options.text || "";
  if (!text.trim()) throw new Error("Paste text or upload a TXT file first.");
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  const lines = pdf.splitTextToSize(text, pdf.internal.pageSize.getWidth() - margin * 2) as string[];
  let y = margin;
  onProgress(50, "Processing in browser");
  for (const line of lines) {
    if (y > pdf.internal.pageSize.getHeight() - margin) {
      pdf.addPage();
      y = margin;
    }
    pdf.text(line, margin, y);
    y += 16;
  }
  onProgress(100, "Done");
  const blob = pdf.output("blob");
  return { blob, filename: tool.outputName, previewUrl: URL.createObjectURL(blob), mime: "application/pdf" };
}

async function readTextInput(file: File | undefined, options: ProcessOptions) {
  const text = file ? await file.text() : options.bottomText || "";
  if (!text.trim()) throw new Error("Paste text or upload a text file first.");
  return text;
}

function textResult(
  tool: ToolDefinition,
  text: string,
  mime: string,
  onProgress: (progress: number, stage: string) => void,
): ProcessResult {
  onProgress(96, "Creating download");
  const blob = new Blob([text], { type: mime });
  onProgress(100, "Done");
  return { blob, filename: tool.outputName, previewUrl: URL.createObjectURL(blob), mime, text };
}

function toTitleCase(value: string) {
  return value.toLowerCase().replace(/\b[\p{L}\p{N}]/gu, (letter) => letter.toUpperCase());
}

function toSentenceCase(value: string) {
  const lower = value.toLowerCase();
  return lower.replace(/(^\s*[a-z])|([.!?]\s+[a-z])/g, (match) => match.toUpperCase());
}

function pdfResult(tool: ToolDefinition, bytes: Uint8Array, onProgress: (progress: number, stage: string) => void) {
  onProgress(96, "Creating download");
  const blob = new Blob([bytes], { type: "application/pdf" });
  onProgress(100, "Done");
  return { blob, filename: tool.outputName, previewUrl: URL.createObjectURL(blob), mime: "application/pdf" };
}

async function processImagesToPdf(
  tool: ToolDefinition,
  files: File[],
  onProgress: (progress: number, stage: string) => void,
): Promise<ProcessResult> {
  onProgress(10, "Preparing file");
  const pdf = new jsPDF({ unit: "px", format: "a4" });
  for (const [index, file] of files.entries()) {
    onProgress(15 + Math.round((index / files.length) * 75), "Processing in browser");
    const image = await loadImage(file);
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const scale = Math.min(pageWidth / image.width, pageHeight / image.height);
    const width = image.width * scale;
    const height = image.height * scale;
    if (index > 0) pdf.addPage();
    pdf.addImage(image, file.type.includes("png") ? "PNG" : "JPEG", (pageWidth - width) / 2, (pageHeight - height) / 2, width, height);
  }
  onProgress(96, "Creating download");
  const blob = pdf.output("blob");
  onProgress(100, "Done");
  return { blob, filename: tool.outputName, previewUrl: URL.createObjectURL(blob), mime: "application/pdf" };
}

async function processWebAudioTool(
  tool: ToolDefinition,
  files: File[],
  options: ProcessOptions,
  onProgress: (progress: number, stage: string) => void,
): Promise<ProcessResult> {
  onProgress(10, "Preparing file");
  const buffers = await Promise.all(files.map(decodeAudioFile));
  const input = buffers[0];
  const startSeconds = Math.max(0, options.start ?? 0);
  const durationSeconds = Math.max(0.1, options.duration ?? 10);
  const speed = clamp(options.speed ?? 1, 0.5, 2);
  const volume = clamp(options.volume ?? 1.5, 0.25, 3);

  onProgress(35, "Processing in browser");
  let output: AudioBuffer;

  if (tool.id === "audio-merger") output = mergeAudioBuffers(buffers);
  else if (tool.id === "mp3-cutter" || tool.id === "audio-trimmer") output = sliceAudioBuffer(input, startSeconds, durationSeconds);
  else if (tool.id === "volume-booster") output = transformAudioBuffer(input, (sample) => clamp(sample * volume, -1, 1));
  else if (tool.id === "reverse-audio") output = reverseAudioBuffer(input);
  else if (tool.id === "change-audio-speed") output = await renderAudioSpeed(input, speed);
  else throw new Error("This audio tool is not available.");

  onProgress(96, "Creating download");
  const blob = encodeWav(output);
  onProgress(100, "Done");
  return { blob, filename: tool.outputName, previewUrl: URL.createObjectURL(blob), mime: "audio/wav" };
}

async function processImageTool(
  tool: ToolDefinition,
  files: File[],
  options: ProcessOptions,
  onProgress: (progress: number, stage: string) => void,
): Promise<ProcessResult> {
  onProgress(10, "Preparing file");
  const image = await loadImage(files[0]);
  onProgress(35, "Processing in browser");
  const canvas = window.document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not supported in this browser.");

  const width = options.width || image.width;
  const height = options.height || Math.round((image.height / image.width) * width);
  canvas.width = width;
  canvas.height = height;

  if (tool.id === "crop-image") {
    const size = Math.min(image.width, image.height);
    context.drawImage(image, (image.width - size) / 2, (image.height - size) / 2, size, size, 0, 0, width, height);
  } else {
    if (tool.id === "blur-image") context.filter = `blur(${options.blur ?? 6}px)`;
    context.drawImage(image, 0, 0, width, height);
  }

  if (tool.id === "meme-maker") {
    drawMemeText(context, canvas.width, options.text || "TOP TEXT", 44);
    drawMemeText(context, canvas.width, options.bottomText || "BOTTOM TEXT", canvas.height - 28);
  }

  if (tool.id === "add-watermark") {
    context.filter = "none";
    context.font = "600 28px Inter, Arial";
    context.fillStyle = "rgba(255,255,255,.85)";
    context.strokeStyle = "rgba(0,0,0,.55)";
    context.lineWidth = 4;
    const text = options.watermark || "CreatorKitTools";
    const x = canvas.width - context.measureText(text).width - 28;
    const y = canvas.height - 28;
    context.strokeText(text, x, y);
    context.fillText(text, x, y);
  }

  const mime = tool.id === "png-to-jpg" || tool.id === "image-compressor" ? "image/jpeg" : "image/png";
  const quality = (options.quality ?? 82) / 100;
  const blob = await canvasToBlob(canvas, mime, quality);
  onProgress(96, "Creating download");
  onProgress(100, "Done");
  return { blob, filename: tool.outputName, previewUrl: URL.createObjectURL(blob), mime };
}

function parsePageRange(range: string | undefined, pageCount: number) {
  if (!range?.trim()) return Array.from({ length: pageCount }, (_, index) => index + 1);
  const pages = new Set<number>();
  for (const part of range.split(",")) {
    const trimmed = part.trim();
    const match = trimmed.match(/^(\d+)(?:-(\d+))?$/);
    if (!match) continue;
    const start = Number(match[1]);
    const end = Number(match[2] ?? match[1]);
    for (let page = Math.min(start, end); page <= Math.max(start, end); page += 1) {
      if (page >= 1 && page <= pageCount) pages.add(page);
    }
  }
  return [...pages].sort((a, b) => a - b);
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image."));
    img.src = URL.createObjectURL(file);
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, mime: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Could not export file."));
    }, mime, quality);
  });
}

function drawMemeText(context: CanvasRenderingContext2D, width: number, text: string, y: number) {
  context.filter = "none";
  context.font = "800 36px Impact, Arial Black, sans-serif";
  context.textAlign = "center";
  context.fillStyle = "white";
  context.strokeStyle = "black";
  context.lineWidth = 6;
  context.strokeText(text.toUpperCase(), width / 2, y);
  context.fillText(text.toUpperCase(), width / 2, y);
}

async function decodeAudioFile(file: File) {
  const AudioContextClass =
    window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) throw new Error("Web Audio is not supported in this browser.");

  const context = new AudioContextClass();
  try {
    return await context.decodeAudioData(await file.arrayBuffer());
  } finally {
    void context.close();
  }
}

function createAudioBuffer(channels: number, length: number, sampleRate: number) {
  const context = new OfflineAudioContext(channels, Math.max(1, length), sampleRate);
  return context.createBuffer(channels, Math.max(1, length), sampleRate);
}

function sliceAudioBuffer(buffer: AudioBuffer, startSeconds: number, durationSeconds: number) {
  const startFrame = Math.min(buffer.length, Math.floor(startSeconds * buffer.sampleRate));
  const frameCount = Math.max(1, Math.min(buffer.length - startFrame, Math.floor(durationSeconds * buffer.sampleRate)));
  const output = createAudioBuffer(buffer.numberOfChannels, frameCount, buffer.sampleRate);
  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    output.copyToChannel(buffer.getChannelData(channel).slice(startFrame, startFrame + frameCount), channel);
  }
  return output;
}

function transformAudioBuffer(buffer: AudioBuffer, transform: (sample: number) => number) {
  const output = createAudioBuffer(buffer.numberOfChannels, buffer.length, buffer.sampleRate);
  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const inputData = buffer.getChannelData(channel);
    const outputData = output.getChannelData(channel);
    for (let index = 0; index < inputData.length; index += 1) outputData[index] = transform(inputData[index]);
  }
  return output;
}

function reverseAudioBuffer(buffer: AudioBuffer) {
  const output = createAudioBuffer(buffer.numberOfChannels, buffer.length, buffer.sampleRate);
  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const inputData = buffer.getChannelData(channel);
    const outputData = output.getChannelData(channel);
    for (let index = 0; index < inputData.length; index += 1) outputData[index] = inputData[inputData.length - index - 1];
  }
  return output;
}

function mergeAudioBuffers(buffers: AudioBuffer[]) {
  const sampleRate = buffers[0].sampleRate;
  const channels = Math.max(...buffers.map((buffer) => buffer.numberOfChannels));
  const length = buffers.reduce((sum, buffer) => sum + Math.round(buffer.duration * sampleRate), 0);
  const output = createAudioBuffer(channels, length, sampleRate);
  let offset = 0;
  for (const buffer of buffers) {
    const frameCount = Math.round(buffer.duration * sampleRate);
    for (let channel = 0; channel < channels; channel += 1) {
      const source = buffer.getChannelData(Math.min(channel, buffer.numberOfChannels - 1));
      output.copyToChannel(source.slice(0, frameCount), channel, offset);
    }
    offset += frameCount;
  }
  return output;
}

async function renderAudioSpeed(buffer: AudioBuffer, speed: number) {
  const length = Math.max(1, Math.ceil(buffer.length / speed));
  const context = new OfflineAudioContext(buffer.numberOfChannels, length, buffer.sampleRate);
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.playbackRate.value = speed;
  source.connect(context.destination);
  source.start(0);
  return context.startRendering();
}

function encodeWav(buffer: AudioBuffer) {
  const channels = Math.min(2, buffer.numberOfChannels);
  const bytesPerSample = 2;
  const blockAlign = channels * bytesPerSample;
  const dataLength = buffer.length * blockAlign;
  const arrayBuffer = new ArrayBuffer(44 + dataLength);
  const view = new DataView(arrayBuffer);
  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataLength, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channels, true);
  view.setUint32(24, buffer.sampleRate, true);
  view.setUint32(28, buffer.sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, "data");
  view.setUint32(40, dataLength, true);
  const channelData = Array.from({ length: channels }, (_, channel) => buffer.getChannelData(channel));
  let offset = 44;
  for (let index = 0; index < buffer.length; index += 1) {
    for (let channel = 0; channel < channels; channel += 1) {
      const sample = clamp(channelData[channel][index], -1, 1);
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += bytesPerSample;
    }
  }
  return new Blob([arrayBuffer], { type: "audio/wav" });
}

function writeString(view: DataView, offset: number, value: string) {
  for (let index = 0; index < value.length; index += 1) view.setUint8(offset + index, value.charCodeAt(index));
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
