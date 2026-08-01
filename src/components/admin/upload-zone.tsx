import { useRef, useState } from "react";
import { ImagePlus, Loader2, Paperclip, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { uploadMedia } from "@/lib/media";

type BaseProps = {
  label: string;
  accept?: string;
};

/** Single image slot — click, pick, done. */
export function ImageUpload({
  label,
  value,
  onChange,
}: BaseProps & { value: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  async function pick(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      const media = await uploadMedia(file);
      onChange(media.url);
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className="eyebrow">{label}</span>
      <div className="mt-2 flex items-start gap-3">
        {value ? (
          <img
            src={value}
            alt=""
            loading="lazy"
            className="h-24 w-32 border border-border object-cover"
          />
        ) : null}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => input.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
            {value ? "Replace image" : "Upload image"}
          </button>
          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          ) : null}
        </div>
      </div>
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0] ?? undefined)}
      />
    </div>
  );
}

/** Multi-image gallery with automatic resize + compression. */
export function GalleryUpload({
  label,
  value,
  onChange,
}: BaseProps & { value: string[]; onChange: (urls: string[]) => void }) {
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  async function pick(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    try {
      const uploaded = [];
      for (const file of Array.from(files)) {
        const media = await uploadMedia(file);
        uploaded.push(media.url);
      }
      onChange([...value, ...uploaded]);
      toast.success(`${uploaded.length} image${uploaded.length > 1 ? "s" : ""} uploaded`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className="eyebrow">{label}</span>
      <div className="mt-2 flex flex-wrap gap-3">
        {value.map((url) => (
          <div key={url} className="relative">
            <img src={url} alt="" loading="lazy" className="h-20 w-28 border border-border object-cover" />
            <button
              type="button"
              aria-label="Remove image"
              onClick={() => onChange(value.filter((u) => u !== url))}
              className="absolute right-0 top-0 grid h-6 w-6 place-items-center border border-border bg-background text-muted-foreground transition-colors hover:text-emerald"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => input.current?.click()}
        disabled={busy}
        className="mt-3 inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald disabled:opacity-60"
      >
        {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
        Upload images
      </button>
      <input
        ref={input}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => pick(e.target.files)}
      />
    </div>
  );
}

/** Document slot (PDF, CV, report attachment). */
export function FileUpload({
  label,
  accept = "application/pdf",
  value,
  onChange,
}: BaseProps & { value: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  async function pick(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      const media = await uploadMedia(file);
      onChange(media.url);
      toast.success("File uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className="eyebrow">{label}</span>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => input.current?.click()}
          disabled={busy}
          className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Paperclip className="h-3.5 w-3.5" />}
          {value ? "Replace file" : "Upload file"}
        </button>
        {value ? (
          <>
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground underline transition-colors hover:text-foreground"
            >
              View current file
            </a>
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </>
        ) : null}
      </div>
      <input
        ref={input}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0] ?? undefined)}
      />
    </div>
  );
}
