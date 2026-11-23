import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

/**
 * Things built end to end, as opposed to the nodes that are merely operated.
 * One card per project; the list is short on purpose.
 */

type Project = {
  name: string;
  tagline: string;
  summary: string;
  logo: string;
  stack: string[];
  links: { label: string; href: string }[];
};

const projects: Project[] = [
  {
    name: "Icyteru",
    tagline: "Hermes gateway client — desktop and Android",
    summary:
      "A native client for my own Hermes agent: streaming chat, sessions, approvals, attachments and push, built on one renderer shared by Electron and a Capacitor WebView.",
    logo: "pict/icyteru.png",
    stack: ["Electron", "React", "TypeScript", "Capacitor", "Vite"],
    links: [
      { label: "icyteru.megumii.xyz", href: "https://icyteru.megumii.xyz" },
      { label: "GitHub", href: "https://github.com/Megumiiiiii/icyteru" },
    ],
  },
];

export default function ProjectList() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="starfield relative flex min-h-screen w-full flex-col justify-center overflow-hidden"
    >
      <h2 className="section-kicker relative z-20 px-16 pt-20 sm:pt-24">Projects</h2>

      <div className="relative z-20 mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-12 sm:px-10">
        {projects.map((project) => (
          <article
            key={project.name}
            className="project-card flex flex-col gap-6 rounded-2xl p-6 sm:flex-row sm:items-start sm:p-8"
          >
            <Image
              src={project.logo}
              alt={project.name}
              width={96}
              height={96}
              className="app-icon h-20 w-20 shrink-0 rounded-2xl object-cover sm:h-24 sm:w-24"
            />

            <div className="flex min-w-0 flex-col gap-3">
              <div>
                <h3 className="text-2xl font-semibold leading-tight">{project.name}</h3>
                <p className="text-sm font-semibold opacity-80">{project.tagline}</p>
              </div>

              <p className="text-sm leading-relaxed">{project.summary}</p>

              <ul className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li key={item} className="project-chip">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-dotted underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {link.label}
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </motion.div>
  );
}
