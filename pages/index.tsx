import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import WorkExperience from "../components/WorkExperience";
import ContactMe from "../components/ContactMe";
import Projects from "../components/Project";

const title = "Megumii — Portfolio";
const description =
  "Megumii's portfolio: web3 contributor and node operator. Anime, rhythm games, and validators since 2022.";
const siteUrl = "https://www.megumii.xyz/";
const socialImage = "https://www.megumii.xyz/pr.png";

export default function Home() {
  return (
    <div className="scroll-shell bg-pink-200 text-pink-900 h-screen snap-y snap-mandatory overflow-y-scroll">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/me.ico" />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1919" />
        <meta property="og:image:height" content="885" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialImage} />
        <meta
          name="Creator"
          content="xFK3NdQ1utoPQ2tXMgNKFn9oZGw0Tl4ihNo7JY5Ldnk"
        />
      </Head>
      <Header />
      <main>
        <section id="hero" className="snap-center">
          <Hero />
        </section>
        <section id="about" className="snap-center">
          <About />
        </section>
        <section id="experience" className="snap-start">
          <WorkExperience />
        </section>
        <section id="project" className="snap-start">
          <Projects />
        </section>
        <section id="contact" className="snap-start">
          <ContactMe />
        </section>
      </main>
    </div>
  );
}
