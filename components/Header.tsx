import { SocialIcon } from "react-social-icons";

const iconStyle = { width: 44, height: 44 };

export default function Header() {
  return (
    <header className="sticky top-0 p-5 flex items-start justify-between max-w-7xl mx-auto z-30 xl:items-center">
      <nav aria-label="Social" className="flex flex-row items-center">
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
      </nav>
      <a
        href="https://t.me/KatouMegumii"
        target="_blank"
        rel="noreferrer"
        aria-label="Let's Talk on Telegram"
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
      </a>
    </header>
  );
}
