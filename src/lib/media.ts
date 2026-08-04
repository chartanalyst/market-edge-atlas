import { uploadAdminMedia } from "@/lib/media.functions";

const MAX_EDGE = 1800;
const THUMB_EDGE = 560;

export type UploadedMedia = {
  url: string;
  thumbUrl: string;
  name: string;
};

function slugifyName(name: string) {
  return name
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

async function resize(file: File, maxEdge: number): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process this image");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", 0.86),
  );
  if (!blob) throw new Error("Could not compress this image");
  return blob;
}

async function blobToBase64(blob: Blob): Promise<string> {
  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
  return btoa(binary);
}

async function putServer(path: string, body: Blob, contentType: string): Promise<string> {
  const base64 = await blobToBase64(body);
  const { url } = await uploadAdminMedia({ data: { path, contentType, base64 } });
  return url;
}

/**
 * Notion-style upload: pick a file, resize/compress on client, store via admin API.
 */
export async function uploadMedia(file: File): Promise<UploadedMedia> {
  const stamp = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const base = slugifyName(file.name) || "file";

  if (file.type.startsWith("image/")) {
    const [full, thumb] = await Promise.all([resize(file, MAX_EDGE), resize(file, THUMB_EDGE)]);
    const url = await putServer(`images/${stamp}-${base}.webp`, full, "image/webp");
    const thumbUrl = await putServer(`images/${stamp}-${base}-thumb.webp`, thumb, "image/webp");
    return { url, thumbUrl, name: file.name };
  }

  const ext = (file.name.split(".").pop() ?? "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const url = await putServer(
    `docs/${stamp}-${base}.${ext}`,
    file,
    file.type || "application/octet-stream",
  );
  return { url, thumbUrl: url, name: file.name };
}
