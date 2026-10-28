import Image from "next/image";

export default function ExperienceCard1() {
  return (
    <article className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen">
      <Image
        className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center"
        src="/pict/sarco.png"
        alt="Sarcophagus"
        width={200}
        height={200}
      />
      <h3 className="text-4xl font-semibold text-center text-pink-900">
        Sarcophagus
      </h3>
      <p className="text-2xl font-mono text-center">Ambassador</p>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://sarcophagus.io"
        className="text-purple-800 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800"
      >
        About Sarcophagus
      </a>
      <div className="px-0 md:px-2">
        <div className="flex space-x-2 justify-center items-center">
          <Image
            className="h-10 w-10 rounded-full"
            src="/pict/discord.webp"
            alt="Discord"
            width={40}
            height={40}
          />
          <Image
            className="h-10 w-10 rounded-full"
            src="/pict/tele.webp"
            alt="Telegram"
            width={40}
            height={40}
          />
        </div>
        <p className="py-5 font-serif text-pink-800 text-center">
          Fri Mar 17 2023 - Thu Feb 15 2024
        </p>
        <ul className="list-disc text-left space-y-4 ml-5 text-sm">
          <li>First time joining as a testnet participant</li>
          <li>
            02 Feb 2023 becomes local mod for Indonesian community, then
            I&apos;m an Ambassador now
          </li>
        </ul>
      </div>
    </article>
  );
}
