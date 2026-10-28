import Image from "next/image";

export default function About() {
  return (
    <div className="h-screen flex flex-col md:flex-row max-w-6xl px-8 gap-10 justify-center mx-auto items-center">
      <Image
        className="h-56 w-56 md:h-72 md:w-72 rounded-2xl object-cover shrink-0"
        src="/pict/meg.webp"
        alt="Illustration of Megumii"
        width={288}
        height={288}
      />
      <div className="text-center md:text-left max-w-xl">
        <h2 className="text-2xl font-bold text-pink-900">
          Here is a little background
        </h2>
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-pink-900">
          I am a megumii, I was born on 14 July 2001.
          <br className="sm:block hidden" /> I love anime &amp; rhythm games.
          Came to web3 since 2022.
        </p>
      </div>
    </div>
  );
}
