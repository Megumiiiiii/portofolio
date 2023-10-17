import React from 'react'
import { motion } from 'framer-motion'
import ExperienceCard from './ExperienceCard'
import ExperienceCard1 from './ExperienceCard1'
import ExperienceCard2 from './ExperienceCard2'

type Props = {}

export default function WorkExperience({}: Props) {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className='h-screen flex relative overflow-hidden flex-col text-justify md:flex-row max-w-full px-10 justify-center mx-auto items-center'>
        <h3 className='absolute top-12 uppercase tracking-[10px] text-pink-500 font-serif text-2xl'>
            Experience
        </h3>
        <div className='relative w-full flex overflow-x-scroll snap-x snap-mandatory z-20 scrollbar scrollbar-track-pink-200 scrollbar-thumb-pink-500'>
          <ExperienceCard />
          <ExperienceCard1 />
          <ExperienceCard2 />
        </div>
        <div className='w-full absolute top-[30%] bg-pink-500/30 left-0 h-[300px] -skew-y-12 transform-gpu' />       
    </motion.div>
  )
}
