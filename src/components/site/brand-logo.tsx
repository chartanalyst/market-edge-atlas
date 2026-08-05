import { cn } from "@/lib/utils";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site-meta";

const LOGO_SRC = "/1-removebg-preview.png";

export function BrandLogo({
  className,
  imageClassName,
  showText = true,
}: {
  className?: string;
  imageClassName?: string;
  showText?: boolean;
}) {
  return (
    <span className={cn("flex min-w-0 items-center gap-3.5", className)}>
      <img
        src={LOGO_SRC}
        alt={SITE_NAME}
        className={cn("h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14", imageClassName)}
        width={56}
        height={56}
      />
      {showText ? (
        <span className="hidden min-w-0 flex-col leading-tight sm:flex">
          <span className="truncate font-display text-base font-semibold tracking-tight">
            {SITE_NAME}
          </span>
          <span className="eyebrow text-[0.6rem]">{SITE_TAGLINE}</span>
        </span>
      ) : null}
    </span>
  );
}
