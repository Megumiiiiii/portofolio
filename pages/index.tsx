import Head from 'next/head'
//import Image from 'next/image'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import WorkExperience from '../components/WorkExperience'
import ContactMe from '../components/ContactMe';
import Projects from '../components/Project'
//import Archive from '../components/Archive'

type Props = {}

export default function Home( {}: Props ) {
  return (
    <div className='bg-pink-200 text-pink-400 h-screen snap-y snap-mandatory overflow-y-scroll z-0 scrollbar-thin scrollbar-track-pink-200 scrollbar-thumb-pink-500/40'>
      <Head>
        <title>Megumii - Portofolio</title>
        <meta name="description" content="My Portofolio" />
        <link rel="icon" href="/me.ico" />
        <meta data-rh="true" property="og:image" content="/pr.png" />
        <meta data-rh="true" name="twitter:image" content="/pr.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1919" />
        <meta property="og:image:height" content="885" />
        <meta property="og:image" content="/pr.png" />
        <link rel="canonical" href="https://k.megumii.xyz" />
        <meta name="Timestamp" content="2023-09-14T06:12:52.859Z" />
        <meta name="Creator" content="xFK3NdQ1utoPQ2tXMgNKFn9oZGw0Tl4ihNo7JY5Ldnk" />
        <meta property="og:url" content="ar://megumii" />
        <meta name="keywords" content="personal website, portofolio, website pribadi, tentang saya, about me, megumii, about megumii, megumii katou" />
        <meta name="twitter:card" content="summary_large_image" />     
      </Head>
      <Header />
      <section id='hero' className='snap-center'>
        <Hero />
      </section>
      <section id='about' className='snap-center'>
        <About />
      </section>
      <section id='experience' className='snap-start'>
        <WorkExperience />
      </section>
      <section id='project' className='snap-start'>
        <Projects />
      </section>
      <section id="contact" className="snap-start">
        <ContactMe />
      </section>
        <footer className='sticky bottom-3 md:text-center space-y-4 ml-5 text-sm'>
          <span>Built with 💜&#65039; by the&nbsp;<a target="_blank" rel="noreferrer" href="https://arweave.net/UT3OV5u3JFgYkm3fWuvicKwYrfbWcar-Uo5gU3kmfZg"><strong><span className='text-purple-600'>Arweave</span></strong></a> community. Learn more at &nbsp;</span><a target="_blank" rel="noreferrer" href="https://arweave.org"><strong><span className='text-purple-600'>Arweave.org</span></strong></a>
        </footer>
    </div>
  )
}