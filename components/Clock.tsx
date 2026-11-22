import { useEffect, useState } from "react";

/**
 * A wall clock in the header: analog, and always the visitor's own time.
 *
 * `new Date()` is already in the device's timezone, so nothing has to know
 * about zones. The hands are plain SVG rotated by the clock angle, updated once
 * a second -- a quartz tick, not a sweep.
 */

const TICKS = Array.from({ length: 12 }, (_, i) => i);

// Rendered before the clock has read the device time. A fixed instant keeps the
// server output and the browser's first render identical (no hydration drift),
// and the hands land on the real time one frame later.
const PLACEHOLDER = new Date(2000, 0, 1, 0, 0, 0);

/** Clock angles in degrees, 0 = 12 o'clock. */
function angles(now: Date, reversed: boolean) {
  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;
  return {
    hour: hours * 30,
    minute: minutes * 6,
    // Past roughly two thirds of the page the clock stops agreeing with the
    // visitor and the second hand runs the other way. --creep is written by
    // components/Creep.tsx, so this needs no shared state.
    second: seconds * 6 * (reversed ? -1 : 1),
  };
}

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  const [reversed, setReversed] = useState(false);

  useEffect(() => {
    // The first read happens on the next frame rather than straight inside the
    // effect, which keeps the render pass free of a synchronous state update.
    const tick = () => {
      setNow(new Date());
      const creep =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--creep"),
        ) || 0;
      setReversed(creep > 0.66);
    };
    const frame = window.requestAnimationFrame(tick);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(id);
    };
  }, []);

  const shown = now ?? PLACEHOLDER;
  const { hour, minute, second } = angles(shown, reversed);
  const label = now
    ? `Local time ${now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}`
    : "Local time";

  return (
    <div className="clock" role="img" aria-label={label} title={label}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        {TICKS.map((i) => {
          const major = i % 3 === 0;
          return (
            <line
              key={i}
              className={major ? "tick tick-major" : "tick"}
              x1="50"
              y1={major ? 6 : 7.5}
              x2="50"
              y2={major ? 15 : 12.5}
              transform={`rotate(${i * 30} 50 50)`}
            />
          );
        })}

        {/* Hour hand, drawn from the centre upwards then rotated into place. */}
        <line className="hand hand-hour" x1="50" y1="53" x2="50" y2="28" transform={`rotate(${hour} 50 50)`} />
        <line className="hand hand-minute" x1="50" y1="54" x2="50" y2="17" transform={`rotate(${minute} 50 50)`} />
        <line className="hand hand-second" x1="50" y1="58" x2="50" y2="14" transform={`rotate(${second} 50 50)`} />

        <circle className="pin" cx="50" cy="50" r="3.4" />
      </svg>
    </div>
  );
}