import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Clock from "./Clock";

const iconStyle = { width: 44, height: 44 };

// The icon colours are `currentColor` so they follow the theme variables; the
// toggle writes an explicit choice, which _document replays before first paint.
function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.dataset.theme ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* private mode: the choice just does not survive a reload */
  }
}

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex w-full items-start justify-between p-5">
      <motion.nav
        aria-label="Social"
        initial={{ x: -500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.7 }}
        className="flex flex-row items-center text-purple-800"
      >
        <SocialIcon
          network="twitter"
          url="https://x.com/megumii_tez"
          rel="noreferrer"
          target="_blank"
          fgColor="currentColor"
          bgColor="transparent"
          style={iconStyle}
        />
        <SocialIcon
          url="https://github.com/Megumiiiiii"
          rel="noreferrer"
          target="_blank"
          fgColor="currentColor"
          bgColor="transparent"
          style={iconStyle}
        />
        <SocialIcon
          network="linktree"
          url="https://s.megumii.xyz"
          rel="noreferrer"
          target="_blank"
          fgColor="currentColor"
          bgColor="transparent"
          style={iconStyle}
        />
      </motion.nav>
      <div className="flex flex-col items-end gap-2">
        <div className="flex flex-row items-center gap-1">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
            className="rounded-md p-2 text-purple-800 transition-colors hover:text-pink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-900"
          >
            {/* Sun offers the way out of dark, moon the way in; CSS picks one. */}
            <SunIcon className="only-dark h-6 w-6" aria-hidden="true" />
            <MoonIcon className="only-light h-6 w-6" aria-hidden="true" />
          </button>
          <motion.a
            href="https://t.me/KatouMegumii"
            target="_blank"
            rel="noreferrer"
            aria-label="Let's Talk on Telegram"
            initial={{ x: 500, opacity: 0, scale: 0.5 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.7 }}
            className="flex flex-row items-center text-purple-800 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800"
          >
            <SocialIcon
              as="span"
              url="https://t.me/KatouMegumii"
              fgColor="currentColor"
              bgColor="transparent"
              style={iconStyle}
              aria-hidden="true"
            />
            <span className="hidden md:inline-flex text-sm text-purple-800">
              Let&apos;s Talk
            </span>
          </motion.a>
        </div>
        <Clock />
      </div>
    </header>
  );
}
