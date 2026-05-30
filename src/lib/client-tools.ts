import { degrees, rgb, StandardFonts, PDFDocument } from "pdf-lib";
import { jsPDF } from "jspdf";
import JSZip from "jszip";
import ffmpegCoreUrl from "@ffmpeg/core?url";
import ffmpegCoreWasmUrl from "@ffmpeg/core/wasm?url";

export type ToolCategory = "image" | "pdf" | "document" | "audio" | "video" | "youtube" | "social" | "text";

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
  | "merge-videos"
  | "youtube-thumbnail-downloader"
  | "youtube-thumbnail-viewer"
  | "youtube-video-id-extractor"
  | "youtube-title-length-checker"
  | "youtube-description-length-checker"
  | "instagram-caption-formatter"
  | "instagram-hashtag-generator"
  | "tiktok-hashtag-generator"
  | "tiktok-caption-formatter"
  | "social-media-image-resizer"
  | "character-counter"
  | "case-converter"
  | "remove-duplicate-lines"
  | "text-sorter"
  | "text-reverser"
  | "url-encoder"
  | "url-decoder"
  | "base64-encoder"
  | "base64-decoder";

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
  preset?: string;
}

export interface ProcessResult {
  blob: Blob;
  filename: string;
  previewUrl?: string;
  mime: string;
  text?: string;
  items?: Array<{ label: string; url?: string; filename?: string; text?: string }>;
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
    category: "pdf",
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
    category: "document",
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
    category: "text",
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
    category: "text",
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
  {
    id: "youtube-thumbnail-downloader",
    title: "YouTube Thumbnail Downloader",
    description: "Paste a YouTube URL, preview thumbnail sizes, and download a public thumbnail image.",
    seoTitle: "YouTube Thumbnail Downloader - Free Browser Tool",
    metaDescription: "Download public YouTube thumbnails by pasting a video URL. Browser-only, fast, and no account required.",
    category: "youtube",
    route: "/youtube-thumbnail-downloader",
    accept: "",
    outputName: "youtube-thumbnail.jpg",
    engine: "text",
  },
  {
    id: "youtube-thumbnail-viewer",
    title: "YouTube Thumbnail Viewer",
    description: "Preview all common public YouTube thumbnail sizes from a video URL.",
    seoTitle: "YouTube Thumbnail Viewer - Free Online Tool",
    metaDescription: "View public YouTube thumbnail previews for maxres, sd, hq, mq, and default sizes in your browser.",
    category: "youtube",
    route: "/youtube-thumbnail-viewer",
    accept: "",
    outputName: "youtube-thumbnails.txt",
    engine: "text",
  },
  {
    id: "youtube-video-id-extractor",
    title: "YouTube Video ID Extractor",
    description: "Extract a YouTube video ID from watch, short, embed, or youtu.be links.",
    seoTitle: "YouTube Video ID Extractor - Free Online Tool",
    metaDescription: "Extract YouTube video IDs from youtube.com, youtu.be, and shorts URLs locally in your browser.",
    category: "youtube",
    route: "/youtube-video-id-extractor",
    accept: "",
    outputName: "youtube-video-id.txt",
    engine: "text",
  },
  {
    id: "youtube-title-length-checker",
    title: "YouTube Title Length Checker",
    description: "Count title characters and get simple length guidance.",
    seoTitle: "YouTube Title Length Checker - Free SEO Tool",
    metaDescription: "Check YouTube title character length and get simple browser-only guidance for clearer video titles.",
    category: "youtube",
    route: "/youtube-title-length-checker",
    accept: ".txt,text/plain",
    outputName: "youtube-title-check.txt",
    engine: "text",
  },
  {
    id: "youtube-description-length-checker",
    title: "YouTube Description Length Checker",
    description: "Count description characters and words before publishing.",
    seoTitle: "YouTube Description Length Checker - Free Online Tool",
    metaDescription: "Count YouTube description characters and words locally in your browser. Free, fast, and private.",
    category: "youtube",
    route: "/youtube-description-length-checker",
    accept: ".txt,text/plain",
    outputName: "youtube-description-check.txt",
    engine: "text",
  },
  {
    id: "instagram-caption-formatter",
    title: "Instagram Caption Formatter",
    description: "Clean spacing, preserve line breaks, and copy a formatted Instagram caption.",
    seoTitle: "Instagram Caption Formatter - Free Browser Tool",
    metaDescription: "Format Instagram captions locally in your browser. Clean spacing, preserve line breaks, and copy instantly.",
    category: "social",
    route: "/instagram-caption-formatter",
    accept: ".txt,text/plain",
    outputName: "instagram-caption.txt",
    engine: "text",
  },
  {
    id: "instagram-hashtag-generator",
    title: "Instagram Hashtag Generator",
    description: "Generate simple local hashtag ideas from your topic keywords.",
    seoTitle: "Instagram Hashtag Generator - Free No AI Tool",
    metaDescription: "Generate Instagram hashtag suggestions from your keywords locally in the browser. No AI API or login.",
    category: "social",
    route: "/instagram-hashtag-generator",
    accept: ".txt,text/plain",
    outputName: "instagram-hashtags.txt",
    engine: "text",
  },
  {
    id: "tiktok-hashtag-generator",
    title: "TikTok Hashtag Generator",
    description: "Create simple TikTok hashtag suggestions from topic keywords.",
    seoTitle: "TikTok Hashtag Generator - Free Browser Tool",
    metaDescription: "Generate TikTok hashtag ideas locally from your keywords. No paid API, no backend, and no login.",
    category: "social",
    route: "/tiktok-hashtag-generator",
    accept: ".txt,text/plain",
    outputName: "tiktok-hashtags.txt",
    engine: "text",
  },
  {
    id: "tiktok-caption-formatter",
    title: "TikTok Caption Formatter",
    description: "Clean spacing and line breaks for TikTok captions.",
    seoTitle: "TikTok Caption Formatter - Free Online Tool",
    metaDescription: "Format TikTok captions locally in your browser. Clean extra spacing and copy the result.",
    category: "social",
    route: "/tiktok-caption-formatter",
    accept: ".txt,text/plain",
    outputName: "tiktok-caption.txt",
    engine: "text",
  },
  {
    id: "social-media-image-resizer",
    title: "Social Media Image Resizer",
    description: "Resize images for Instagram, TikTok, and YouTube sizes using Canvas.",
    seoTitle: "Social Media Image Resizer - Free Browser Tool",
    metaDescription: "Resize images for Instagram posts, stories, TikTok covers, YouTube thumbnails, and banners directly in your browser.",
    category: "social",
    route: "/social-media-image-resizer",
    accept: "image/*",
    outputName: "social-image.png",
    engine: "canvas",
  },
  {
    id: "character-counter",
    title: "Character Counter",
    description: "Count characters, characters without spaces, words, and lines.",
    seoTitle: "Character Counter Online - Free Browser Tool",
    metaDescription: "Count characters, words, lines, and characters without spaces locally in your browser.",
    category: "text",
    route: "/character-counter",
    accept: ".txt,text/plain",
    outputName: "character-count.txt",
    engine: "text",
  },
  {
    id: "case-converter",
    title: "Case Converter",
    description: "Convert text to uppercase, lowercase, title case, or sentence case.",
    seoTitle: "Case Converter Online - Free Text Tool",
    metaDescription: "Convert text case locally in your browser. Uppercase, lowercase, title case, and sentence case.",
    category: "text",
    route: "/case-converter",
    accept: ".txt,text/plain",
    outputName: "converted-text.txt",
    engine: "text",
  },
  {
    id: "remove-duplicate-lines",
    title: "Remove Duplicate Lines",
    description: "Remove repeated lines while keeping the first occurrence.",
    seoTitle: "Remove Duplicate Lines Online - Free Text Tool",
    metaDescription: "Remove duplicate text lines locally in your browser. No upload, no login, and free.",
    category: "text",
    route: "/remove-duplicate-lines",
    accept: ".txt,text/plain",
    outputName: "unique-lines.txt",
    engine: "text",
  },
  {
    id: "text-sorter",
    title: "Text Sorter",
    description: "Sort lines alphabetically in your browser.",
    seoTitle: "Text Sorter Online - Free Line Sorter",
    metaDescription: "Sort text lines alphabetically in your browser. Private, fast, and no uploads.",
    category: "text",
    route: "/text-sorter",
    accept: ".txt,text/plain",
    outputName: "sorted-text.txt",
    engine: "text",
  },
  {
    id: "text-reverser",
    title: "Text Reverser",
    description: "Reverse text characters or lines locally.",
    seoTitle: "Text Reverser Online - Free Browser Tool",
    metaDescription: "Reverse text locally in your browser. Free text reversing tool with copy and download.",
    category: "text",
    route: "/text-reverser",
    accept: ".txt,text/plain",
    outputName: "reversed-text.txt",
    engine: "text",
  },
  {
    id: "url-encoder",
    title: "URL Encoder",
    description: "Encode text for safe use in URLs.",
    seoTitle: "URL Encoder Online - Free Browser Tool",
    metaDescription: "Encode URLs and query text locally in your browser using JavaScript.",
    category: "text",
    route: "/url-encoder",
    accept: ".txt,text/plain",
    outputName: "encoded-url.txt",
    engine: "text",
  },
  {
    id: "url-decoder",
    title: "URL Decoder",
    description: "Decode URL-encoded text locally.",
    seoTitle: "URL Decoder Online - Free Browser Tool",
    metaDescription: "Decode URL encoded text locally in your browser. No uploads or account required.",
    category: "text",
    route: "/url-decoder",
    accept: ".txt,text/plain",
    outputName: "decoded-url.txt",
    engine: "text",
  },
  {
    id: "base64-encoder",
    title: "Base64 Encoder",
    description: "Encode plain text to Base64 locally.",
    seoTitle: "Base64 Encoder Online - Free Browser Tool",
    metaDescription: "Encode text to Base64 locally in your browser. Lightweight, private, and free.",
    category: "text",
    route: "/base64-encoder",
    accept: ".txt,text/plain",
    outputName: "base64-encoded.txt",
    engine: "text",
  },
  {
    id: "base64-decoder",
    title: "Base64 Decoder",
    description: "Decode Base64 text in your browser.",
    seoTitle: "Base64 Decoder Online - Free Browser Tool",
    metaDescription: "Decode Base64 text locally in your browser. No server uploads or paid APIs.",
    category: "text",
    route: "/base64-decoder",
    accept: ".txt,text/plain",
    outputName: "base64-decoded.txt",
    engine: "text",
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
  const acceptsTextOnly = isTextInputTool(tool.id);
  if (!acceptsTextOnly && files.length === 0) throw new Error("Choose a file first.");

  if (tool.category === "youtube" || tool.category === "text") return processTextTool(tool, files, options, onProgress);
  if (tool.category === "social" && tool.id !== "social-media-image-resizer") return processTextTool(tool, files, options, onProgress);
  if (tool.id === "social-media-image-resizer") return processImageTool(tool, files, options, onProgress);
  if (tool.category === "pdf") return processPdfTool(tool, files, options, onProgress);
  if (tool.category === "document") return processDocumentTool(tool, files, options, onProgress);
  if (tool.category === "video") return processVideoTool(tool, files, options, onProgress);
  if (tool.id === "jpg-to-pdf" || tool.id === "png-to-pdf" || tool.id === "image-to-pdf") {
    return processImagesToPdf(tool, files, onProgress);
  }
  if (tool.category === "image") return processImageTool(tool, files, options, onProgress);
  return processWebAudioTool(tool, files, options, onProgress);
}

export function isTextInputTool(toolId: ClientToolId) {
  return [
    "txt-to-pdf",
    "text-case-converter",
    "word-counter",
    "youtube-thumbnail-downloader",
    "youtube-thumbnail-viewer",
    "youtube-video-id-extractor",
    "youtube-title-length-checker",
    "youtube-description-length-checker",
    "instagram-caption-formatter",
    "instagram-hashtag-generator",
    "tiktok-hashtag-generator",
    "tiktok-caption-formatter",
    "character-counter",
    "case-converter",
    "remove-duplicate-lines",
    "text-sorter",
    "text-reverser",
    "url-encoder",
    "url-decoder",
    "base64-encoder",
    "base64-decoder",
  ].includes(toolId);
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

async function processTextTool(
  tool: ToolDefinition,
  files: File[],
  options: ProcessOptions,
  onProgress: (progress: number, stage: string) => void,
): Promise<ProcessResult> {
  onProgress(10, "Preparing text");
  const input = await readFlexibleTextInput(files[0], options);
  onProgress(60, "Processing in browser");

  if (tool.id === "youtube-thumbnail-downloader" || tool.id === "youtube-thumbnail-viewer") {
    const videoId = extractYouTubeVideoId(input);
    if (!videoId) throw new Error("Paste a valid YouTube URL or video ID.");
    const sizes = youtubeThumbnailSizes(videoId);
    const selected = sizes.find((item) => item.label === (options.preset || "maxresdefault")) ?? sizes[0];
    if (tool.id === "youtube-thumbnail-viewer") {
      const text = sizes.map((item) => `${item.label}: ${item.url}`).join("\n");
      return textResultWithItems(tool, text, "text/plain", sizes, onProgress);
    }
    try {
      const response = await fetch(selected.url);
      if (!response.ok) throw new Error("Thumbnail size was not available.");
      const blob = await response.blob();
      onProgress(100, "Done");
      return {
        blob,
        filename: `youtube-${videoId}-${selected.label}.jpg`,
        previewUrl: URL.createObjectURL(blob),
        mime: blob.type || "image/jpeg",
        text: sizes.map((item) => `${item.label}: ${item.url}`).join("\n"),
        items: sizes,
      };
    } catch {
      return textResultWithItems(
        tool,
        `Preview links are ready. If download is blocked by the browser, open the selected thumbnail and save it.\n\n${sizes
          .map((item) => `${item.label}: ${item.url}`)
          .join("\n")}`,
        "text/plain",
        sizes,
        onProgress,
      );
    }
  }

  if (tool.id === "youtube-video-id-extractor") {
    const videoId = extractYouTubeVideoId(input);
    if (!videoId) throw new Error("Paste a valid YouTube URL or video ID.");
    return textResult(tool, videoId, "text/plain", onProgress);
  }

  if (tool.id === "youtube-title-length-checker") {
    const count = input.length;
    const guidance = count <= 0 ? "Paste a title first." : count <= 70 ? "Good length for most search and browse surfaces." : "Consider shortening so the full title is easier to scan.";
    return textResult(tool, [`Characters: ${count}`, `Guidance: ${guidance}`].join("\n"), "text/plain", onProgress);
  }

  if (tool.id === "youtube-description-length-checker") {
    return textResult(tool, textStats(input), "text/plain", onProgress);
  }

  if (tool.id === "instagram-caption-formatter" || tool.id === "tiktok-caption-formatter") {
    return textResult(tool, formatCaption(input), "text/plain", onProgress);
  }

  if (tool.id === "instagram-hashtag-generator" || tool.id === "tiktok-hashtag-generator") {
    return textResult(tool, generateHashtags(input, tool.id.startsWith("tiktok")), "text/plain", onProgress);
  }

  if (tool.id === "character-counter") {
    const output = [
      `Characters: ${input.length}`,
      `Characters without spaces: ${input.replace(/\s/g, "").length}`,
      `Words: ${countWords(input)}`,
      `Lines: ${input ? input.split(/\r?\n/).length : 0}`,
    ].join("\n");
    return textResult(tool, output, "text/plain", onProgress);
  }

  if (tool.id === "case-converter" || tool.id === "text-case-converter") {
    return textResult(tool, convertCase(input, options.text), "text/plain", onProgress);
  }

  if (tool.id === "word-counter") {
    const output = [
      `Words: ${countWords(input)}`,
      `Characters: ${input.length}`,
      `Characters without spaces: ${input.replace(/\s/g, "").length}`,
      `Sentences: ${countSentences(input)}`,
      `Paragraphs: ${countParagraphs(input)}`,
    ].join("\n");
    return textResult(tool, output, "text/plain", onProgress);
  }

  if (tool.id === "remove-duplicate-lines") {
    return textResult(tool, [...new Set(input.split(/\r?\n/))].join("\n"), "text/plain", onProgress);
  }

  if (tool.id === "text-sorter") {
    return textResult(tool, input.split(/\r?\n/).sort((a, b) => a.localeCompare(b)).join("\n"), "text/plain", onProgress);
  }

  if (tool.id === "text-reverser") {
    return textResult(tool, [...input].reverse().join(""), "text/plain", onProgress);
  }

  if (tool.id === "url-encoder") return textResult(tool, encodeURIComponent(input), "text/plain", onProgress);
  if (tool.id === "url-decoder") {
    try {
      return textResult(tool, decodeURIComponent(input), "text/plain", onProgress);
    } catch {
      throw new Error("This does not look like valid URL-encoded text.");
    }
  }
  if (tool.id === "base64-encoder") return textResult(tool, btoa(unescape(encodeURIComponent(input))), "text/plain", onProgress);
  if (tool.id === "base64-decoder") {
    try {
      return textResult(tool, decodeURIComponent(escape(atob(input.trim()))), "text/plain", onProgress);
    } catch {
      throw new Error("This does not look like valid Base64 text.");
    }
  }

  throw new Error("This text tool is not available.");
}

function extractYouTubeVideoId(value: string) {
  const trimmed = value.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("youtu.be")) return cleanVideoId(url.pathname.split("/").filter(Boolean)[0]);
    if (url.pathname.startsWith("/shorts/")) return cleanVideoId(url.pathname.split("/")[2]);
    if (url.pathname.startsWith("/embed/")) return cleanVideoId(url.pathname.split("/")[2]);
    return cleanVideoId(url.searchParams.get("v") ?? "");
  } catch {
    return null;
  }
}

function cleanVideoId(value?: string | null) {
  const match = (value ?? "").match(/[a-zA-Z0-9_-]{11}/);
  return match?.[0] ?? null;
}

function youtubeThumbnailSizes(videoId: string) {
  return ["maxresdefault", "sddefault", "hqdefault", "mqdefault", "default"].map((label) => ({
    label,
    url: `https://img.youtube.com/vi/${videoId}/${label}.jpg`,
    filename: `youtube-${videoId}-${label}.jpg`,
  }));
}

function formatCaption(value: string) {
  return value
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function generateHashtags(value: string, tiktok: boolean) {
  const base = value
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .map((word) => word.trim())
    .filter((word) => word.length > 1);
  const unique = [...new Set(base)].slice(0, 12);
  const general = tiktok ? ["fyp", "tiktok", "viral", "creator"] : ["instagram", "instagood", "creator", "content"];
  return [...unique, ...general]
    .slice(0, 18)
    .map((word) => `#${word.replace(/[^a-z0-9]/gi, "")}`)
    .join(" ");
}

function textStats(input: string) {
  return [
    `Characters: ${input.length}`,
    `Characters without spaces: ${input.replace(/\s/g, "").length}`,
    `Words: ${countWords(input)}`,
    `Sentences: ${countSentences(input)}`,
    `Paragraphs: ${countParagraphs(input)}`,
  ].join("\n");
}

function countWords(input: string) {
  return input.trim() ? input.trim().split(/\s+/).length : 0;
}

function countSentences(input: string) {
  return input.trim() ? input.split(/[.!?]+/).filter((part) => part.trim()).length : 0;
}

function countParagraphs(input: string) {
  return input.trim() ? input.split(/\n\s*\n/).filter((part) => part.trim()).length : 0;
}

function convertCase(input: string, mode?: string) {
  if (mode === "lowercase") return input.toLowerCase();
  if (mode === "title") return toTitleCase(input);
  if (mode === "sentence") return toSentenceCase(input);
  return input.toUpperCase();
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

async function readFlexibleTextInput(file: File | undefined, options: ProcessOptions) {
  const text = file ? await file.text() : options.bottomText || options.text || "";
  if (!text.trim()) throw new Error("Paste text first.");
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

function textResultWithItems(
  tool: ToolDefinition,
  text: string,
  mime: string,
  items: ProcessResult["items"],
  onProgress: (progress: number, stage: string) => void,
): ProcessResult {
  const result = textResult(tool, text, mime, onProgress);
  return { ...result, items };
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
  const socialSize = tool.id === "social-media-image-resizer" ? socialImageSize(options.preset) : null;
  const targetWidth = socialSize?.width ?? width;
  const targetHeight = socialSize?.height ?? height;
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  if (tool.id === "crop-image") {
    const size = Math.min(image.width, image.height);
    context.drawImage(image, (image.width - size) / 2, (image.height - size) / 2, size, size, 0, 0, targetWidth, targetHeight);
  } else if (tool.id === "social-media-image-resizer" && socialSize) {
    drawImageCover(context, image, targetWidth, targetHeight);
  } else {
    if (tool.id === "blur-image") context.filter = `blur(${options.blur ?? 6}px)`;
    context.drawImage(image, 0, 0, targetWidth, targetHeight);
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

function socialImageSize(preset?: string) {
  const presets: Record<string, { width: number; height: number }> = {
    "instagram-post": { width: 1080, height: 1080 },
    "instagram-story": { width: 1080, height: 1920 },
    "tiktok-cover": { width: 1080, height: 1920 },
    "youtube-thumbnail": { width: 1280, height: 720 },
    "youtube-banner": { width: 2560, height: 1440 },
  };
  return presets[preset || "instagram-post"];
}

function drawImageCover(context: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number) {
  const scale = Math.max(width / image.width, height / image.height);
  const sourceWidth = width / scale;
  const sourceHeight = height / scale;
  const sourceX = (image.width - sourceWidth) / 2;
  const sourceY = (image.height - sourceHeight) / 2;
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);
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
