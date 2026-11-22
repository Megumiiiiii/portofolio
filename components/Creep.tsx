import { useEffect, useRef, useState } from "react";

/**
 * The page gets wrong as you scroll.
 *
 * One scroll listener on the snap container writes a single number,
 * `--creep` (0 at the top, 1 at the bottom), plus a `data-creep` stage on
 * <html>. Everything else — vignette, grain, blood, the copy that starts
 * noticing you — is CSS keyed off that number, so the effect costs one
 * property write per frame and no layout work.
 *
 * The stages are deliberately uneven: the first two thirds only feel slightly
 * off, and the last third is where the page stops pretending.
 */

const WHISPERS: Record<number, string> = {
  1: "keep scrolling",
  2: "you have been here before",
  3: "don't look behind you",
  4: "it is already inside the page",
};

function stageFor(progress: number): number {
  if (progress < 0.18) return 0;
  if (progress < 0.38) return 1;
  if (progress < 0.58) return 2;
  if (progress < 0.78) return 3;
  return 4;
}

export default function Creep() {
  const [stage, setStage] = useState(0);
  const lastStage = useRef(0);

  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".scroll-shell");
    if (!shell) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const max = shell.scrollHeight - shell.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, shell.scrollTop / max)) : 0;
      const root = document.documentElement;
      root.style.setProperty("--creep", progress.toFixed(4));

      const next = stageFor(progress);
      // Always write the attribute (stage 0 is a real stage, and CSS relies on
      // the attribute existing), but only re-render React when it changes.
      root.dataset.creep = String(next);
      if (next !== lastStage.current) {
        lastStage.current = next;
        setStage(next);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    shell.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Images and the Lanyard card settle after first paint and grow the page;
    // without this the visitor could reach the visual bottom while the ratio
    // still reads "middle" and the descent never arrives.
    const resize = new ResizeObserver(onScroll);
    Array.from(shell.children).forEach((child) => resize.observe(child));
    window.addEventListener("load", onScroll);
    return () => {
      shell.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
      resize.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="creep-layer">
      <div className="creep-vignette" />
      <div className="creep-grain" />
      <div className="creep-blood">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <p className="creep-whisper">{WHISPERS[stage] ?? ""}</p>
    </div>
  );
}
