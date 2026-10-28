import Image from "next/image";
import { motion } from "framer-motion";

type Tool = {
  src: string;
  alt: string;
};

type NodeCard = {
  name: string;
  role: string;
  summary: string;
  href: string;
  label: string;
  logo: string;
  tools: Tool[];
};

const tools = {
  copy: { src: "/pict/copy.webp", alt: "Copy" },
  github: { src: "/pict/github.webp", alt: "GitHub" },
  ubuntu: { src: "/pict/ubuntu.webp", alt: "Ubuntu" },
  vim: { src: "/pict/vim.webp", alt: "Vim" },
  go: { src: "/pict/go.webp", alt: "Go" },
  js: { src: "/pict/js.webp", alt: "JavaScript" },
  typescript: { src: "/pict/typescript.webp", alt: "TypeScript" },
  react: { src: "/pict/react.webp", alt: "React" },
  metamask: { src: "/pict/metamask.webp", alt: "MetaMask" },
  docker: { src: "/pict/docker.webp", alt: "Docker" },
};

const nodes: NodeCard[] = [
  {
    name: "IKA",
    role: "Permanent Testnet Validator (for now)",
    summary: "The fastest parallel MPC network, launching on Sui",
    href: "https://ika-validators.com/validator/0x1b8f21f0222b347f166178c99693c16b56844341a3c01a306483e61115cdaebf",
    label: "ika-testnet-1.megumii.xyz",
    logo: "/pict/ika.webp",
    tools: [tools.copy, tools.github, tools.ubuntu, tools.vim],
  },
  {
    name: "Creditcoin",
    role: "Validator",
    summary:
      "Fastest growing #RWA blockchain with 5M+ loans recorded on-chain for 500k+ real-world customers",
    href: "https://polkadot.js.org/apps/?rpc=wss://rpc.mainnet.creditcoin.network/ws#/accounts",
    label: "Portal",
    logo: "/pict/ctc.webp",
    tools: [
      tools.copy,
      tools.github,
      tools.ubuntu,
      tools.go,
      tools.js,
      tools.typescript,
      tools.react,
      tools.metamask,
    ],
  },
  {
    name: "Tangle",
    role: "Validator",
    summary:
      "Built on Substrate, Tangle Network empowers privacy-enhancing and governance-decentralized applications, incorporating cross-chain functionality, EVM compatibility, advanced governance systems, and ZK applications into a unified ecosystem.",
    href: "https://polkadot.js.org/apps/?rpc=wss://rpc.tangle.tools#/accounts",
    label: "Portal",
    logo: "/pict/tangle.webp",
    tools: [tools.copy, tools.github, tools.ubuntu, tools.vim],
  },
  {
    name: "Sarcophagus",
    role: "Mainnet & Testnet Node Operator",
    summary:
      "A decentralized dead man's switch built on Ethereum and Arweave.",
    href: "https://app.sarcophagus.io/archaeologists",
    label: "app.sarcophagus.io/archaeologists",
    logo: "/pict/sarco.png",
    tools: [
      tools.copy,
      tools.github,
      tools.ubuntu,
      tools.vim,
      tools.docker,
      tools.metamask,
    ],
  },
];

export default function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="starfield flex relative overflow-hidden flex-col text-left md:flex-row max-w-full h-screen justify-evenly mx-auto items-center z-0"
    >
      <h2 className="absolute top-24 uppercase tracking-[10px] text-pink-800 font-serif text-xl">
        Active Nodes
      </h2>
      <div className="thin-scroll relative w-full flex overflow-x-scroll snap-x snap-mandatory z-20">
        {nodes.map((node) => (
          <article
            key={node.name}
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <Image
                className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-center object-contain"
                src={node.logo}
                alt={node.name}
                width={200}
                height={200}
              />
            </motion.div>
            <h3 className="text-lg font-semibold text-pink-900 text-center">
              {node.name}
            </h3>
            <p className="text-lg font-semibold text-pink-800 text-center">
              {node.role}
            </p>
            <ul className="flex items-center gap-2 justify-center flex-wrap">
              {node.tools.map((tool) => (
                <li key={tool.alt}>
                  <Image
                    className="h-7 w-7"
                    src={tool.src}
                    alt={tool.alt}
                    width={28}
                    height={28}
                  />
                </li>
              ))}
            </ul>
            <p className="text-sm font-semibold text-pink-900 text-center max-w-3xl">
              {node.summary}
            </p>
            <a
              target="_blank"
              rel="noreferrer"
              href={node.href}
              className="text-sm font-mono font-semibold text-purple-800 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800"
            >
              {node.label}
            </a>
          </article>
        ))}
      </div>
      <div className="w-full absolute top-[30%] bg-pink-800/15 left-0 h-[300px] skew-y-12" />
    </motion.div>
  );
}
