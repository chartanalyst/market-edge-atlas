import { useEffect } from "react";

const ease = 0.12;
const maxStep = 140;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function shouldUseNativeScroll(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      'textarea, input, select, [contenteditable="true"], [data-native-scroll], [role="dialog"]',
    ),
  );
}

export function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    if (reduceMotion.matches || !finePointer.matches) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let frame = 0;

    const maxScroll = () => Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const tick = () => {
      const distance = targetY - currentY;

      if (Math.abs(distance) < 0.35) {
        currentY = targetY;
        window.scrollTo(0, targetY);
        frame = 0;
        return;
      }

      currentY += distance * ease;
      window.scrollTo(0, currentY);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.defaultPrevented || event.ctrlKey || shouldUseNativeScroll(event.target)) return;

      event.preventDefault();
      const multiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 18 : 1;
      const delta = clamp(event.deltaY * multiplier, -maxStep, maxStep);

      targetY = clamp(targetY + delta, 0, maxScroll());
      start();
    };

    const syncPosition = () => {
      if (!frame) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", syncPosition);
    window.addEventListener("keydown", stop);

    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", syncPosition);
      window.removeEventListener("keydown", stop);
    };
  }, []);

  return null;
}
