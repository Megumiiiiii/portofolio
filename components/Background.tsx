/**
 * The page background: soft drifting clouds in light mode, small twinkling
 * stars in dark mode. Both layers are always in the DOM and CSS paints only the
 * one matching the active theme (see .only-light / .only-dark), so switching
 * modes costs nothing and there is no flash.
 *
 * Everything here is pure CSS: transform/opacity animations on a handful of
 * elements, which the compositor can run off the main thread. Nothing is drawn
 * in JS, so the page stays a static export.
 */
export default function Background() {
  return (
    <div aria-hidden="true" className="bg-layer">
      <div className="bg-clouds only-light">
        <span className="cloud cloud-1" />
        <span className="cloud cloud-2" />
        <span className="cloud cloud-3" />
        <span className="cloud cloud-4" />
        <span className="cloud cloud-5" />
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