const RAW = "/readme";

const links = [
  { href: "https://megumii.xyz/", src: `${RAW}/link_portfolio_light.svg`, alt: "Portfolio" },
  { href: "https://t.me/KatouMegumii", src: `${RAW}/link_telegram_light.svg`, alt: "Telegram" },
  {
    href: "https://discordapp.com/users/873803230042263563",
    src: `${RAW}/link_discord_light.svg`,
    alt: "Discord",
  },
];

export default function About() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-6 px-5 py-24 md:px-8">
      {/* Same content as github.com/Megumiiiiii/Megumiiiiii README.md */}
      <a
        href="https://megumii.xyz/"
        className="block w-full max-w-3xl"
        aria-label="Megumii"
      >
        <img
          src={`${RAW}/light_mode.svg`}
          alt="Megumii"
          width={1018}
          height={471}
          className="h-auto w-full rounded-2xl"
        />
      </a>

      <nav
        aria-label="Links"
        className="flex w-full max-w-3xl items-center justify-between gap-3"
      >
        {links.map((link) => (
          <a
            key={link.alt}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="block w-1/3 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-900"
            aria-label={link.alt}
          >
            <img
              src={link.src}
              alt={link.alt}
              width={339}
              height={60}
              className="h-auto w-full"
            />
          </a>
        ))}
      </nav>

      <img
        src={`${RAW}/pacman_light.svg`}
        alt="Pac-Man eating my contribution graph"
        width={1018}
        height={224}
        className="h-auto w-full max-w-3xl rounded-2xl"
      />
    </div>
  );
}
