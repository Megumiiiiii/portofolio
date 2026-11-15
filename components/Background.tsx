/**
 * The page background: falling sakura petals in light mode, small twinkling
 * stars in dark mode. Both layers are always in the DOM and CSS paints only the
 * one matching the active theme (see .only-light / .only-dark), so switching
 * modes costs nothing and there is no flash.
 *
 * Everything here is pure CSS: transform/opacity animations on a handful of
 * elements, which the compositor can run off the main thread. Nothing is drawn
 * in JS, so the page stays a static export.
 */

const PETAL_COUNT = 18;

/**
 * Deterministic pseudo-random in [0, 1): the petals have to be identical on the
 * server and in the browser, otherwise React would report a hydration mismatch
 * and the sky would jump on the first frame.
 */
function seeded(i: number): number {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const petals = Array.from({ length: PETAL_COUNT }, (_, i) => {
  const r = (k: number) => seeded(i * 7 + k);
  return {
    left: `${(r(1) * 100).toFixed(2)}%`,
    size: 10 + Math.round(r(2) * 12), // 10-22px across
    duration: 12 + r(3) * 10, // 12-22s to cross the viewport
    // Negative delays drop petals mid-air instead of all starting at the top.
    delay: -r(4) * 22,
    drift: (0.6 + r(5) * 1.4).toFixed(2),
    opacity: (0.55 + r(6) * 0.4).toFixed(2),
    spin: r(7) > 0.5 ? 1 : -1,
  };
});

export default function Background() {
  return (
    <div aria-hidden="true" className="bg-layer">
      <div className="bg-petals only-light">
        {petals.map((p, i) => (
          <span
            key={i}
            className="petal"
            style={
              {
                left: p.left,
                opacity: p.opacity,
                "--size": `${p.size}px`,
                "--dur": `${p.duration.toFixed(2)}s`,
                "--delay": `${p.delay.toFixed(2)}s`,
                "--drift": p.drift,
                "--spin": p.spin,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div className="bg-stars only-dark">
        <span className="star-field star-far" />
        <span className="star-field star-mid" />
        <span className="star-field star-near" />
        <span className="glow-star glow-star-1" />
        <span className="glow-star glow-star-2" />
        <span className="glow-star glow-star-3" />
      </div>
    </div>
  );
}