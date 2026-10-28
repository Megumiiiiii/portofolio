import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";

const iconStyle = { width: 44, height: 44 };

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex w-full items-start justify-between p-5 xl:items-center">
      <motion.nav
        aria-label="Social"
        initial={{ x: -500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.7 }}
        className="flex flex-row items-center"
      >
        <SocialIcon
          network="twitter"
          url="https://x.com/megumii_tez"
          rel="noreferrer"
          target="_blank"
          fgColor="#6b21a8"
          bgColor="transparent"
          style={iconStyle}
        />
        <SocialIcon
          url="https://github.com/Megumiiiiii"
          rel="noreferrer"
          target="_blank"
          fgColor="#6b21a8"
          bgColor="transparent"
          style={iconStyle}
        />
        <SocialIcon
          network="linktree"
          url="https://s.megumii.xyz"
          rel="noreferrer"
          target="_blank"
          fgColor="#6b21a8"
          bgColor="transparent"
          style={iconStyle}
        />
      </motion.nav>
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
          fgColor="#6b21a8"
          bgColor="transparent"
          style={iconStyle}
          aria-hidden="true"
        />
        <span className="hidden md:inline-flex text-sm text-purple-800">
          Let&apos;s Talk
        </span>
      </motion.a>
    </header>
  );
}
