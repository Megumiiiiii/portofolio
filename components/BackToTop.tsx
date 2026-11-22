import { useCallback, useEffect, useState } from "react";

/**
 * A way out.
 *
 * Small, and only there once the page has started going wrong: at the top it
 * would be another piece of chrome competing with the header, but by the fourth
 * section it is the only thing on screen that admits there is somewhere to go
 * back to. Clicking it returns to Hero and drops the endless copies, so the
 * page ends at Contact again until the visitor descends a second time.
 *
 * The jump is deliberate, not smooth: from four hundred screens down a smooth
 * scroll takes long enough to feel like a trap. A short blackout covers the cut
 * instead.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [deep, setDeep] = useState(false);

  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".scroll-shell");
    if (!shell) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const copies = Number(document.documentElement.dataset.echoes ?? 0);
      setVisible(shell.scrollTop > 320 || copies > 0);
      setDeep(copies >= 3);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    shell.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      shell.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const rewind = useCallback(() => {
    const shell = document.querySelector<HTMLElement>(".scroll-shell");
    if (!shell) return;

    document.documentElement.classList.add("rewinding");
    shell.scrollTo({ top: 0, behavior: "auto" });

    // Let the blackout land before the copies disappear, so the shrink in page
    // height happens out of sight.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.querySelectorAll(".creep-echo").forEach((el) => el.remove());
        const root = document.documentElement;
        delete root.dataset.echoes;
        root.style.setProperty("--echo", "0");
        shell.dispatchEvent(new Event("scroll"));
      });
    });

    window.setTimeout(() => {
      document.documentElement.classList.remove("rewinding");
    }, 320);
  }, []);

  return (
    <button
      type="button"
      onClick={rewind}
      aria-label="Back to the beginning"
      title="Back to the beginning"
      className="back-top"
      data-visible={visible}
      data-deep={deep}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 10V2.4" />
        <path d="M2.4 5.6 6 2l3.6 3.6" />
      </svg>
    </button>
  );
}
