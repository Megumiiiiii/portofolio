import Image from "next/image";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function ContactMe() {
  return (
    <div className="starfield relative flex flex-col text-center max-w-5xl px-5 h-screen justify-center mx-auto items-center gap-8">
      <h2 className="absolute top-24 uppercase tracking-[10px] text-pink-800 font-serif text-xl">
        Contact
      </h2>
      <a
        className="flex items-center gap-3 text-lg text-pink-900 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-900"
        href="mailto:contact@megumii.xyz"
      >
        <EnvelopeIcon className="text-pink-800 h-6 w-6 motion-safe:animate-pulse" />
        contact@megumii.xyz
      </a>
      <a
        href="https://discordapp.com/users/873803230042263563"
        target="_blank"
        rel="noreferrer"
        className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-900"
      >
        <Image
          src="https://lanyard.cnrad.dev/api/873803230042263563?idleMessage=:doing%20something%20else...&bg=427bc2"
          alt="Discord presence"
          width={410}
          height={210}
          className="h-auto w-full max-w-[410px]"
        />
      </a>
    </div>
  );
}
