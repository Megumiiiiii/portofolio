import { useEffect, useRef } from "react";

/**
 * The page never ends.
 *
 * Once the visitor reaches the real Contact section, this keeps appending
 * copies of the earlier sections below the fold. Each copy is a DOM clone of
 * the original (not a re-render), so the clock in the copy is stopped at the
 * moment it was taken and the photographs never finish loading — the details
 * that make a copy feel wrong without anyone being able to say why.
 *
 * Copies are tagged `data-echo="n"` and carry `--n`, so the stylesheet can
 * degrade them in proportion to depth. Deep copies also have their words
 * corroded. A copy that has scrolled far enough above the visitor is removed
 * and the scroll position is compensated, so the page can run forever without
 * the DOM growing forever.
 */

const SECTIONS = ["hero", "about", "project", "experience", "nodes", "contact"];

const WHISPERS = [
  "this is where you came in",
  "the page is longer than it was",
  "did you count the sections?",
  "it is copying itself",
  "we are still here",
  "you have been here before",
  "nothing here belongs to you",
  "it is already inside the page",
  "stop counting",
  "there is no contact section",
  "keep scrolling",
  "it will not end",
];

const GLYPHS = "▓▒░#%&@$?";

/**
 * Safety valve, not a design limit: 400 copies is roughly 400 screens of
 * scrolling, far past anything a visitor will do. Copying is cheap and a
 * removed copy above the viewport always risks a visible jump, so nothing is
 * dropped while the page is being read.
 */
const MAX_COPIES = 400;

export default function Endless() {
  const marker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".scroll-shell");
    const sentinel = marker.current;
    const main = sentinel?.parentElement;
    if (!shell || !sentinel || !main) return;

    const sources = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (sources.length !== SECTIONS.length) return;

    let depth = 0;
    let previous = "";

    const pick = () => {
      const pool = sources.filter((el) => el.id !== previous);
      const el = pool[Math.floor(Math.random() * pool.length)];
      previous = el.id;
      return el;
    };

    /** Replace a share of the letters, growing with depth. Whitespace survives,
     *  so the shape of the paragraph still reads as a paragraph. */
    const corrode = (root: HTMLElement, level: number) => {
      if (level < 6) return;
      const chance = Math.min(0.22, (level - 5) * 0.015);
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      for (const node of nodes) {
        const parent = node.parentElement;
        if (!parent || parent.closest("script, style, svg")) continue;
        const text = node.nodeValue ?? "";
        if (text.trim().length < 4) continue;
        node.nodeValue = [...text]
          .map((ch) =>
            ch.trim() && Math.random() < chance
              ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
              : ch
          )
          .join("");
      }
    };

    /**
     * The neofetch card is the one drawing in the page, so it is the one thing a
     * copy can visibly get wrong. Mirror it, tilt it, and eventually shove it
     * past the edge of its own frame until it is cropped -- a card that is
     * still perfectly legible in the fourth copy reads as an untouched image
     * pasted into a broken page.
     */
    const derange = (root: HTMLElement, level: number) => {
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>('img[src*="readme/card"]')
      );
      if (!cards.length) return;

      // The frame has to clip, or a translated card just spills into the
      // neighbouring section and the effect reads as a layout bug.
      const frame = cards[0].parentElement;
      if (frame) frame.style.overflow = "hidden";
      root.style.overflow = "hidden";

      if (level < 2) return;

      const between = (min: number, max: number) => min + Math.random() * (max - min);
      const mirror = level >= 4 && Math.random() < 0.65 ? -1 : 1;
      const upsideDown = level >= 7 && Math.random() < 0.5 ? -1 : 1;
      const tilt = level >= 3 ? between(-2.5, 2.5) * Math.min(level / 2, 3) : 0;
      // Capped so a sliver always stays in frame: a copy whose card has left
      // completely just looks like an empty section, not a damaged one.
      const slideX =
        level >= 5 ? between(-1, 1) * Math.min(level * 6, 62) : between(-2, 2);
      const slideY = level >= 6 ? between(-1, 1) * Math.min(level * 3, 30) : 0;
      const zoom = level >= 6 ? 1 + between(0.05, 0.3) : 1;

      const transform =
        `translate(${slideX.toFixed(1)}%, ${slideY.toFixed(1)}%) ` +
        `rotate(${tilt.toFixed(1)}deg) ` +
        `scale(${(mirror * zoom).toFixed(2)}, ${(upsideDown * zoom).toFixed(2)})`;

      cards.forEach((card) => {
        card.style.transform = transform;
        card.style.transformOrigin = "center";
        if (level >= 9) card.style.filter = "blur(0.5px) contrast(1.12)";
      });
    };

    const build = (source: HTMLElement, level: number) => {
      const node = source.cloneNode(true) as HTMLElement;
      node.removeAttribute("id");
      node.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
      node.querySelectorAll("a, button, input, select, textarea").forEach((el) => {
        el.setAttribute("tabindex", "-1");
        (el as HTMLElement).style.pointerEvents = "none";
      });

      node.classList.add("creep-echo");
      node.setAttribute("aria-hidden", "true");
      node.setAttribute("inert", "");
      node.dataset.echo = String(level);
      node.style.setProperty("--n", String(level));
      if (level >= 3) node.dataset.rot = "";
      if (level >= 8) node.dataset.glitch = "";
      corrode(node, level);
      derange(node, level);

      const whisper = document.createElement("p");
      whisper.className = "echo-whisper";
      whisper.textContent = WHISPERS[(level - 1) % WHISPERS.length];
      node.appendChild(whisper);
      return node;
    };

    const append = () => {
      if (depth >= MAX_COPIES) return;
      main.insertBefore(build(pick(), depth + 1), sentinel);
      depth += 1;
      const root = document.documentElement;
      root.dataset.echoes = String(depth);
      root.style.setProperty("--echo", String(depth));
    };

    // A scroll listener rather than a bare IntersectionObserver: the observer
    // only fires when the sentinel crosses a threshold, so a visitor parked at
    // the bottom (or jumping there) would get exactly one copy and then nothing.
    let queued = 0;
    const topUp = () => {
      queued = 0;
      const remaining = shell.scrollHeight - shell.clientHeight - shell.scrollTop;
      if (remaining > 1400) return;
      append();
      // Keep going until the buffer ahead of the visitor is refilled, but never
      // more than one copy per frame.
      queued = window.requestAnimationFrame(topUp);
    };
    const onScroll = () => {
      if (!queued) queued = window.requestAnimationFrame(topUp);
    };

    shell.addEventListener("scroll", onScroll, { passive: true });
    topUp();

    return () => {
      shell.removeEventListener("scroll", onScroll);
      if (queued) window.cancelAnimationFrame(queued);
    };
  }, []);

  return <div ref={marker} aria-hidden="true" className="h-px w-full" />;
}
