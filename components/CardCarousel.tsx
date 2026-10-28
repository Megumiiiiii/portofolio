import {
  Children,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type Edges = {
  atStart: boolean;
  atEnd: boolean;
};

type CardCarouselProps = {
  label: string;
  children: ReactNode;
};

const arrowClass =
  "absolute top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-pink-800 bg-pink-100 text-pink-900 hover:bg-pink-900 hover:text-pink-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-pink-100 disabled:hover:text-pink-900";

export default function CardCarousel({ label, children }: CardCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState<Edges>({ atStart: true, atEnd: false });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const readEdges = () => {
      const max = el.scrollWidth - el.clientWidth;
      setEdges({
        atStart: el.scrollLeft <= 2,
        atEnd: max <= 2 || el.scrollLeft >= max - 2,
      });
    };

    el.addEventListener("scroll", readEdges, { passive: true });
    const observer = new ResizeObserver(() => readEdges());
    observer.observe(el);
    const frame = requestAnimationFrame(readEdges);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", readEdges);
      observer.disconnect();
    };
  }, []);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el || el.clientWidth === 0) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    const last = Math.max(el.children.length - 1, 0);
    const next = Math.min(Math.max(index + direction, 0), last);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: next * el.clientWidth,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div className="relative z-10 min-h-0 w-full flex-1">
      <button
        type="button"
        className={`${arrowClass} left-2 sm:left-4`}
        aria-label={`Previous ${label}`}
        disabled={edges.atStart}
        onClick={() => scrollByCard(-1)}
      >
        <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div
        ref={scrollerRef}
        className="thin-scroll flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
      >
        {Children.map(children, (child) => (
          <div className="flex h-full w-full min-w-0 max-w-full shrink-0 grow-0 basis-full snap-start items-center justify-center overflow-hidden px-14 sm:px-20">
            {child}
          </div>
        ))}
      </div>
      <button
        type="button"
        className={`${arrowClass} right-2 sm:right-4`}
        aria-label={`Next ${label}`}
        disabled={edges.atEnd}
        onClick={() => scrollByCard(1)}
      >
        <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}
