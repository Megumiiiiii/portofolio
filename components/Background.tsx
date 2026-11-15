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

/** Petals in the air when the fall is running. */
const PETAL_COUNT = 30;

/**
 * Petals kept when the visitor turned animations off. The other ten are dropped
 * by CSS (`prefers-reduced-motion: reduce`), so a still sky is calmer instead of
 * being as dense as a moving one.
 */
const PETAL_STATIC_COUNT = 20;

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
  const spinSpeed = r(10);
  return {
    left: `${(r(1) * 100).toFixed(2)}%`,
    size: 12 + Math.round(r(2) * 12), // 12-24px across
    duration: 12 + r(3) * 10, // 12-22s to cross the viewport
    // Negative delays drop petals mid-air instead of all starting at the top.
    delay: -r(4) * 22,
    drift: (0.6 + r(5) * 1.4).toFixed(2),
    opacity: (0.55 + r(6) * 0.4).toFixed(2),
    spin: r(7) > 0.5 ? 1 : -1,
    // Where the petal sits when it is not animating (reduced-motion visitors
    // and the first frame before the fall starts): scattered over the page
    // instead of piled above the fold where nobody would see them.
    y: `${(r(8) * 100).toFixed(2)}vh`,
    rot: `${Math.round(r(9) * 360)}deg`,
    // A third of them turn over as they fall (a flat petal flipping on its own
    // axis), the rest just spin on the plane. Slower petals get 9-18s per turn.
    flip: r(11) > 0.66,
    spinDuration: (9 + spinSpeed * 9).toFixed(2),
    // Anything past the static budget is hidden when animations are off.
    extra: i >= PETAL_STATIC_COUNT,
  };
});

export default function Background() {
  return (
    <div aria-hidden="true" className="bg-layer">
      <div className="bg-petals only-light">
        {petals.map((p, i) => (
          <span
            key={i}
            className={`petal${p.extra ? " petal-extra" : ""}`}
            style={
              {
                left: p.left,
                opacity: p.opacity,
                "--size": `${p.size}px`,
                "--dur": `${p.duration.toFixed(2)}s`,
                "--delay": `${p.delay.toFixed(2)}s`,
                "--drift": p.drift,
                "--spin": p.spin,
                "--y": p.y,
                "--rot": p.rot,
                "--spin-dur": `${p.spinDuration}s`,
              } as React.CSSProperties
            }
          >
            <span className={`petal-body${p.flip ? " petal-flip" : ""}`} />
          </span>
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