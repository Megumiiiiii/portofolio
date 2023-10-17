import React from 'react'
import { motion } from 'framer-motion'
import Skill from './Skill'
import Skill1 from './Skill1'
import Skill2 from './Skill2'
import Skill3 from './Skill3'
import Skill4 from './Skill4'
import Skill5 from './Skill5'
import Skill6 from './Skill6'
import Skill7 from './Skill7'
import Skill8 from './Skill8'
import Skill9 from './Skill9'
import Skill10 from './Skill10'
import Skill11 from './Skill11'

type Props = {}

export default function 
Skills({}: Props) {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    viewport={{ once: true }}
    className='h-screen flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center'>
        <h3 className='absolute top-10 uppercase tracking-[10px] text-pink-500 font-serif text-2xl'>
            Skills
        </h3>
        <div className='mb-50 md:mb-0 grid grid-cols-4 gap-4'>
          <Skill />
          <Skill1 />
          <Skill2 />
          <Skill3 />
          <Skill4 />
          <Skill5 />
          <Skill6 />
          <Skill7 />
          <Skill8 />
          <Skill9 />
          <Skill10 />
          <Skill11 />
        </div>
    </motion.div>
  )
}