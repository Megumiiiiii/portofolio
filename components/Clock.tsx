import { useEffect, useState } from "react";

/**
 * A wall clock in the header: analog, and always the visitor's own time.
 *
 * `new Date()` is already in the device's timezone, so nothing has to know
 * about zones. The hands are plain SVG rotated by the clock angle, updated once
 * a second -- a quartz tick, not a sweep.
 */

const TICKS = Array.from({ length: 12 }, (_, i) => i);

/** Clock angles in degrees, 0 = 12 o'clock. */
function angles(now: Date) {
  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;
  return { hour: hours * 30, minute: minutes * 6, second: seconds * 6 };
}

export default function Clock() {
  // A fixed value first: the server and the browser's first render have to
  // agree, otherwise React complains and the hands jump on hydration.
  const [now, setNow] = useState(() => new Date(2000, 0, 1, 0, 0, 0));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    setReady(true);
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const { hour, minute, second } = angles(now);
  const label = ready
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