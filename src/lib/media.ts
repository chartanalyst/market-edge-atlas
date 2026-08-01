import { supabase } from "@/integrations/supabase/client";

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

async function put(path: string, body: Blob, contentType: string) {
  const { error } = await supabase.storage
    .from("media")
    .upload(path, body, { contentType, upsert: true, cacheControl: "31536000" });
  if (error) throw new Error(error.message);
  return `/api/public/media/${path}`;
}

/**
 * Notion-style upload: pick a file, everything else is automatic.
 * Images are resized, compressed to WebP and given a thumbnail;
 * documents are stored as-is.
 */
export async function uploadMedia(file: File): Promise<UploadedMedia> {
  const stamp = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const base = slugifyName(file.name) || "file";

  if (file.type.startsWith("image/")) {
    const [full, thumb] = await Promise.all([resize(file, MAX_EDGE), resize(file, THUMB_EDGE)]);
    const url = await put(`images/${stamp}-${base}.webp`, full, "image/webp");
    const thumbUrl = await put(`images/${stamp}-${base}-thumb.webp`, thumb, "image/webp");
    return { url, thumbUrl, name: file.name };
  }

  const ext = (file.name.split(".").pop() ?? "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const url = await put(
    `docs/${stamp}-${base}.${ext}`,
    file,
    file.type || "application/octet-stream",
  );
  return { url, thumbUrl: url, name: file.name };
}
