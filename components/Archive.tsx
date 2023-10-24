import React from 'react'
import { motion } from 'framer-motion'
import Inactive from './Inactive'
import Inactive1 from './Inactive1'
import Inactive2 from './Inactive2'
import Inactive3 from './Inactive3'
import Inactive4 from './Inactive4'
import Inactive5 from './Inactive5'

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
        <h5 className='absolute top-10 uppercase tracking-[10px] text-pink-500 font-serif text-2xl'>
            Archive/Inactive Node
        </h5>
        <div className='mb-50 md:mb-0 grid grid-cols-3 gap-3'>
          <Inactive />
          <Inactive1 />
          <Inactive2 />
          <Inactive3 />
          <Inactive4 />
          <Inactive5 />
        </div>
    </motion.div>
  )
}