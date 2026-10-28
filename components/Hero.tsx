import Image from "next/image";
import { Cursor, useTypewriter } from "react-simple-typewriter";

export default function Hero() {
  const [text] = useTypewriter({
    words: ["2027-Will-Becomes-Anime"],
    loop: true,
    deleteSpeed: 50,
    typeSpeed: 100,
    delaySpeed: 2000,
  });

  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <Image
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
        src="/pict/zz.webp"
        alt="Megumii"
        width={128}
        height={128}
        priority
      />
      <div className="z-20">
        <h1 className="text-4xl lg:text-5xl font-semibold text-pink-900">
          Megumii
        </h1>
        <p className="mt-3 text-2xl lg:text-3xl font-medium text-pink-800 min-h-10">
          <span className="mr-1" suppressHydrationWarning>
            {text}
          </span>
          <Cursor cursorColor="#9d174d" />
        </p>
        <nav
          aria-label="Page"
          className="px-5 mt-6 flex flex-wrap justify-center gap-3"
        >
          <a href="#about" className="heroButton">
            About
          </a>
          <a
            href="https://learn.megumii.xyz"
            rel="noreferrer"
            target="_blank"
            className="heroButton"
          >
            Docs
          </a>
          <a href="#experience" className="heroButton">
            Experiences
          </a>
          <a href="#contact" className="heroButton">
            Contact
          </a>
          <a href="#project" className="heroButton">
            Nodes
          </a>
        </nav>
      </div>
    </div>
  );
}
