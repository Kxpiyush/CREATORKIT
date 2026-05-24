import { jsPDF } from "jspdf";
import type { FFmpeg } from "@ffmpeg/ffmpeg";

export type ToolCategory = "image" | "video" | "audio";

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
  | "video-to-mp3"
  | "video-to-gif"
  | "video-compressor"
  | "video-trimmer"
  | "merge-videos"
  | "extract-frames"
  | "resize-video"
  | "mute-video"
  | "change-video-speed"
  | "mp3-cutter"
  | "audio-compressor"
  | "audio-merger"
  | "wav-to-mp3"
  | "mp3-to-wav"
  | "volume-booster"
  | "reverse-audio"
  | "audio-trimmer"
  | "change-audio-speed";

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
  beta?: boolean;
  engine?: "canvas" | "web-audio" | "media-engine";
}

export interface ProcessOptions {
  width?: number;
  height?: number;
  quality?: number;
  start?: number;
  duration?: number;
  speed?: number;
  volume?: number;
  text?: string;
  bottomText?: string;
  watermark?: string;
  blur?: number;
}

export interface ProcessResult {
  blob: Blob;
  filename: string;
  previewUrl?: string;
  mime: string;
}

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    id: "jpg-to-png",
    title: "JPG to PNG",
    description: "Convert JPG images to transparent-ready PNG files.",
    seoTitle: "JPG to PNG Converter - Free Online Browser Tool",
    metaDescription: "Convert JPG images to PNG directly in your browser. No uploads, private, fast, and free.",
    category: "image",
    accept: "image/jpeg",
    outputName: "converted.png",
    route: "/jpg-to-png",
    engine: "canvas",
  },
  {
    id: "png-to-jpg",
    title: "PNG to JPG",
    description: "Convert PNG images into smaller JPG files.",
    seoTitle: "PNG to JPG Converter - Free Online Browser Tool",
    metaDescription: "Convert PNG images to JPG in your browser. No server uploads, no login, private, and free.",
    category: "image",
    accept: "image/png",
    outputName: "converted.jpg",
    route: "/png-to-jpg",
    engine: "canvas",
  },
  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Reduce image file size in your browser.",
    seoTitle: "Free Image Compressor Online - Private Browser Tool",
    metaDescription: "Compress JPG and PNG images directly in your browser. No uploads, private, fast, and free.",
    category: "image",
    route: "/image-compressor",
    accept: "image/*",
    outputName: "compressed.jpg",
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
    accept: "image/*",
    outputName: "cropped.png",
    route: "/crop-image",
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
    engine: "canvas",
  },
  {
    id: "video-to-mp3",
    title: "Video to MP3",
    description: "Extract audio from a video file.",
    seoTitle: "Video to MP3 Converter - Free Browser Tool",
    metaDescription: "Extract MP3 audio from video files in your browser. Private beta tool with no server upload.",
    category: "video",
    route: "/video-to-mp3",
    accept: "video/*",
    outputName: "audio.mp3",
    beta: true,
    engine: "media-engine",
  },
  {
    id: "video-to-gif",
    title: "Video to GIF",
    description: "Convert the first seconds of video to GIF.",
    seoTitle: "Video to GIF Converter - Free Browser Tool",
    metaDescription: "Convert short video clips to GIF in your browser. No uploads, private, and free.",
    category: "video",
    route: "/video-to-gif",
    accept: "video/*",
    outputName: "clip.gif",
    beta: true,
    engine: "media-engine",
  },
  {
    id: "video-compressor",
    title: "Video Compressor",
    description: "Shrink videos directly on your device.",
    seoTitle: "Video Compressor Online - Browser Beta Tool",
    metaDescription: "Compress smaller videos in your browser. Files are processed locally and never uploaded.",
    category: "video",
    accept: "video/*",
    outputName: "compressed.mp4",
    beta: true,
    engine: "media-engine",
  },
  {
    id: "video-trimmer",
    title: "Video Trimmer",
    description: "Cut a short clip from a video.",
    seoTitle: "Video Trimmer Online - Free Browser Tool",
    metaDescription: "Trim short video clips directly in your browser without uploading files to a server.",
    category: "video",
    accept: "video/*",
    outputName: "trimmed.mp4",
    beta: true,
    engine: "media-engine",
  },
  {
    id: "merge-videos",
    title: "Merge Videos",
    description: "Join multiple videos in browser memory.",
    seoTitle: "Merge Videos Online - Browser Beta Tool",
    metaDescription: "Join video files locally in your browser. No accounts, no uploads, and no server storage.",
    category: "video",
    accept: "video/*",
    multiple: true,
    outputName: "merged.mp4",
    beta: true,
    engine: "media-engine",
  },
  {
    id: "extract-frames",
    title: "Extract Thumbnail",
    description: "Export a still frame from video.",
    seoTitle: "Extract Video Thumbnail Online - Free Tool",
    metaDescription: "Extract a still frame thumbnail from a video in your browser with private local processing.",
    category: "video",
    accept: "video/*",
    outputName: "thumbnail.jpg",
    engine: "media-engine",
  },
  {
    id: "resize-video",
    title: "Resize Video",
    description: "Scale video width for social platforms.",
    seoTitle: "Resize Video Online - Browser Beta Tool",
    metaDescription: "Resize videos locally in your browser for social platforms. No server upload required.",
    category: "video",
    accept: "video/*",
    outputName: "resized.mp4",
    beta: true,
    engine: "media-engine",
  },
  {
    id: "mute-video",
    title: "Mute Video",
    description: "Remove the audio track from a video.",
    seoTitle: "Mute Video Online - Free Browser Tool",
    metaDescription: "Remove audio from videos directly in your browser. Private, free, and no upload required.",
    category: "video",
    accept: "video/*",
    outputName: "muted.mp4",
    engine: "media-engine",
  },
  {
    id: "change-video-speed",
    title: "Change Video Speed",
    description: "Speed up or slow down a video.",
    seoTitle: "Change Video Speed Online - Browser Tool",
    metaDescription: "Speed up or slow down videos locally in your browser. Files are never uploaded.",
    category: "video",
    accept: "video/*",
    outputName: "speed-video.mp4",
    engine: "media-engine",
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
    id: "audio-compressor",
    title: "Audio Compressor",
    description: "Beta MP3 compression using the browser media engine.",
    seoTitle: "Audio Compressor Online - Browser Beta Tool",
    metaDescription: "Compress audio files in your browser. Private beta tool with no server upload or account.",
    category: "audio",
    accept: "audio/*",
    outputName: "compressed.mp3",
    beta: true,
    engine: "media-engine",
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
    id: "wav-to-mp3",
    title: "WAV to MP3",
    description: "Beta MP3 export using the browser media engine.",
    seoTitle: "WAV to MP3 Converter - Free Browser Beta Tool",
    metaDescription: "Convert WAV audio to MP3 in your browser. Private beta tool with no file uploads.",
    category: "audio",
    accept: ".wav,audio/wav,audio/wave",
    outputName: "converted.mp3",
    beta: true,
    engine: "media-engine",
  },
  {
    id: "mp3-to-wav",
    title: "MP3 to WAV",
    description: "Convert MP3 audio to WAV.",
    seoTitle: "MP3 to WAV Converter - Free Browser Tool",
    metaDescription: "Convert MP3 audio to WAV locally in your browser. No server uploads or accounts.",
    category: "audio",
    accept: ".mp3,audio/mpeg",
    outputName: "converted.wav",
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
];

let ffmpegPromise: Promise<FFmpeg> | null = null;
const FFMPEG_CORE_VERSION = "esm-0.12.10";

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

function enforceBrowserLimit(tool: ToolDefinition, files: File[]) {
  if (tool.engine !== "media-engine") return;

  const maxMb = tool.category === "video" ? 50 : 30;
  const totalMb = files.reduce((sum, file) => sum + file.size, 0) / 1024 / 1024;

  if (totalMb > maxMb) {
    throw new Error(
      `${tool.title} runs fully in your browser. Please use files under ${maxMb} MB for reliable processing.`,
    );
  }
}

export async function processTool(
  toolId: ClientToolId,
  files: File[],
  options: ProcessOptions,
  onProgress: (progress: number, stage: string) => void,
): Promise<ProcessResult> {
  const tool = getTool(toolId);
  if (files.length === 0) throw new Error("Choose a file first.");
  enforceBrowserLimit(tool, files);

  if (tool.category === "image") {
    return processImageTool(tool, files, options, onProgress);
  }

  if (tool.engine === "web-audio") {
    return processWebAudioTool(tool, files, options, onProgress);
  }

  return processFfmpegTool(tool, files, options, onProgress);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function loadFfmpeg(onProgress: (progress: number, stage: string) => void) {
  if (!ffmpegPromise) {
    ffmpegPromise = (async () => {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const ffmpeg = new FFmpeg();
      ffmpeg.on("log", ({ message }) => {
        console.debug("[ffmpeg]", message);
      });
      ffmpeg.on("progress", ({ progress }) => {
        onProgress(Math.min(98, Math.max(25, Math.round(25 + progress * 73))), "Processing in browser");
      });
      onProgress(4, "Preparing file");
      const wasmURL = `/ffmpeg/ffmpeg-core.wasm?v=${FFMPEG_CORE_VERSION}`;
      onProgress(23, "Preparing file");
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 90_000);
      try {
        await ffmpeg.load(
          {
            coreURL: `/ffmpeg/ffmpeg-core.js?v=${FFMPEG_CORE_VERSION}`,
            wasmURL,
          },
          { signal: controller.signal },
        );
      } catch (error) {
        console.error("Could not load browser media tools", error);
        ffmpegPromise = null;
        throw new Error(
          `The browser could not prepare the private media tools. ${
            error instanceof Error ? error.message : "Refresh the page or try a smaller file."
          }`,
        );
      } finally {
        window.clearTimeout(timeout);
      }
      onProgress(24, "Preparing file");
      return ffmpeg;
    })();
  }
  return ffmpegPromise;
}

async function processFfmpegTool(
  tool: ToolDefinition,
  files: File[],
  options: ProcessOptions,
  onProgress: (progress: number, stage: string) => void,
): Promise<ProcessResult> {
  const ffmpeg = await loadFfmpeg(onProgress);
  const { fetchFile } = await import("@ffmpeg/util");
  onProgress(25, "Preparing file");
  const inputNames = await writeFiles(ffmpeg, files, fetchFile);
  const input = inputNames[0];
  const output = tool.outputName;
  const start = String(options.start ?? 0);
  const duration = String(options.duration ?? 10);
  const width = String(options.width ?? 720);
  const speed = clamp(options.speed ?? 1, 0.5, 2);
  const volume = clamp(options.volume ?? 1.5, 0.25, 3);

  if (tool.id === "merge-videos" || tool.id === "audio-merger") {
    const list = inputNames.map((name) => `file '${name}'`).join("\n");
    await ffmpeg.writeFile("inputs.txt", list);
  }

  const commandMap: Record<string, string[]> = {
    "video-to-mp3": ["-i", input, "-vn", "-b:a", "192k", output],
    "video-to-gif": [
      "-i",
      input,
      "-t",
      String(Math.min(Number(duration), 12)),
      "-vf",
      "fps=12,scale=480:-1:flags=lanczos",
      output,
    ],
    "video-compressor": [
      "-i",
      input,
      "-vf",
      "scale='min(1280,iw)':-2",
      "-c:v",
      "libx264",
      "-crf",
      String(options.quality ?? 30),
      "-preset",
      "veryfast",
      "-c:a",
      "aac",
      "-b:a",
      "96k",
      output,
    ],
    "video-trimmer": ["-ss", start, "-i", input, "-t", duration, "-c", "copy", output],
    "merge-videos": ["-f", "concat", "-safe", "0", "-i", "inputs.txt", "-c", "copy", output],
    "extract-frames": ["-ss", start, "-i", input, "-frames:v", "1", "-q:v", "2", output],
    "resize-video": ["-i", input, "-vf", `scale=${width}:-2`, "-c:a", "copy", output],
    "mute-video": ["-i", input, "-an", "-c:v", "copy", output],
    "change-video-speed": [
      "-i",
      input,
      "-filter_complex",
      `[0:v]setpts=${(1 / speed).toFixed(3)}*PTS[v];[0:a]atempo=${speed.toFixed(2)}[a]`,
      "-map",
      "[v]",
      "-map",
      "[a]",
      output,
    ],
    "mp3-cutter": ["-ss", start, "-i", input, "-t", duration, "-b:a", "192k", output],
    "audio-compressor": ["-i", input, "-b:a", "96k", output],
    "audio-merger": ["-f", "concat", "-safe", "0", "-i", "inputs.txt", "-b:a", "192k", output],
    "wav-to-mp3": ["-i", input, "-b:a", "192k", output],
    "mp3-to-wav": ["-i", input, output],
    "volume-booster": ["-i", input, "-filter:a", `volume=${volume}`, output],
    "reverse-audio": ["-i", input, "-filter_complex", "areverse", output],
    "audio-trimmer": ["-ss", start, "-i", input, "-t", duration, "-b:a", "192k", output],
    "change-audio-speed": ["-i", input, "-filter:a", `atempo=${speed.toFixed(2)}`, output],
  };

  const command = commandMap[tool.id];
  if (!command) throw new Error("This tool is not available yet.");

  onProgress(30, "Processing in browser");
  const exitCode = await ffmpeg.exec(command, 120_000);
  if (exitCode !== 0) {
    throw new Error("Processing took too long or failed in this browser. Try a smaller file.");
  }
  onProgress(96, "Creating download");
  const data = await ffmpeg.readFile(output);
  const bytes = data instanceof Uint8Array ? data : new TextEncoder().encode(data);
  const mime = mimeForOutput(output);
  const blob = new Blob([bytes], { type: mime });
  onProgress(100, "Done");
  return { blob, filename: output, previewUrl: URL.createObjectURL(blob), mime };
}

async function writeFiles(
  ffmpeg: FFmpeg,
  files: File[],
  fetchFile: (file: File) => Promise<Uint8Array>,
) {
  const names: string[] = [];
  for (const [index, file] of files.entries()) {
    const extension = extensionFor(file.name, file.type);
    const name = `input-${index}.${extension}`;
    await ffmpeg.writeFile(name, await fetchFile(file));
    names.push(name);
  }
  return names;
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

  if (tool.id === "audio-merger") {
    output = mergeAudioBuffers(buffers);
  } else if (tool.id === "mp3-cutter" || tool.id === "audio-trimmer") {
    output = sliceAudioBuffer(input, startSeconds, durationSeconds);
  } else if (tool.id === "volume-booster") {
    output = transformAudioBuffer(input, (sample) => clamp(sample * volume, -1, 1));
  } else if (tool.id === "reverse-audio") {
    output = reverseAudioBuffer(input);
  } else if (tool.id === "change-audio-speed") {
    output = await renderAudioSpeed(input, speed);
  } else if (tool.id === "mp3-to-wav") {
    output = input;
  } else {
    throw new Error("This audio tool needs the beta media engine.");
  }

  onProgress(96, "Creating download");
  const blob = encodeWav(output);
  onProgress(100, "Done");

  return {
    blob,
    filename: tool.outputName.endsWith(".wav") ? tool.outputName : tool.outputName.replace(/\.[^.]+$/, ".wav"),
    previewUrl: URL.createObjectURL(blob),
    mime: "audio/wav",
  };
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
    for (let index = 0; index < inputData.length; index += 1) {
      outputData[index] = transform(inputData[index]);
    }
  }

  return output;
}

function reverseAudioBuffer(buffer: AudioBuffer) {
  const output = createAudioBuffer(buffer.numberOfChannels, buffer.length, buffer.sampleRate);

  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const inputData = buffer.getChannelData(channel);
    const outputData = output.getChannelData(channel);
    for (let index = 0; index < inputData.length; index += 1) {
      outputData[index] = inputData[inputData.length - index - 1];
    }
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
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }
}

async function processImageTool(
  tool: ToolDefinition,
  files: File[],
  options: ProcessOptions,
  onProgress: (progress: number, stage: string) => void,
): Promise<ProcessResult> {
  onProgress(10, "Preparing file");
  if (tool.id === "image-to-pdf") {
    const pdf = new jsPDF({ unit: "px", format: "a4" });
    for (const [index, file] of files.entries()) {
      const image = await loadImage(file);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const scale = Math.min(pageWidth / image.width, pageHeight / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      if (index > 0) pdf.addPage();
      pdf.addImage(image, "JPEG", (pageWidth - width) / 2, (pageHeight - height) / 2, width, height);
    }
    const blob = pdf.output("blob");
    onProgress(96, "Creating download");
    onProgress(100, "Done");
    return { blob, filename: tool.outputName, previewUrl: URL.createObjectURL(blob), mime: "application/pdf" };
  }

  const image = await loadImage(files[0]);
  onProgress(35, "Processing in browser");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not supported in this browser.");

  const width = options.width || image.width;
  const height = options.height || Math.round((image.height / image.width) * width);
  canvas.width = width;
  canvas.height = height;

  if (tool.id === "crop-image") {
    const size = Math.min(image.width, image.height);
    context.drawImage(
      image,
      (image.width - size) / 2,
      (image.height - size) / 2,
      size,
      size,
      0,
      0,
      width,
      height,
    );
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
    const text = options.watermark || "Video Aid";
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
  return {
    blob,
    filename: tool.outputName,
    previewUrl: URL.createObjectURL(blob),
    mime,
  };
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
      else reject(new Error("Could not export image."));
    }, mime, quality);
  });
}

function extensionFor(name: string, type: string) {
  const found = name.match(/\.([a-z0-9]+)$/i)?.[1];
  if (found) return found.toLowerCase();
  if (type.includes("mp4")) return "mp4";
  if (type.includes("mpeg")) return "mp3";
  if (type.includes("wav")) return "wav";
  return "bin";
}

function mimeForOutput(filename: string) {
  if (filename.endsWith(".mp3")) return "audio/mpeg";
  if (filename.endsWith(".wav")) return "audio/wav";
  if (filename.endsWith(".gif")) return "image/gif";
  if (filename.endsWith(".jpg")) return "image/jpeg";
  if (filename.endsWith(".png")) return "image/png";
  if (filename.endsWith(".pdf")) return "application/pdf";
  return "video/mp4";
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
