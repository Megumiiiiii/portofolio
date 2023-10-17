import React from 'react'
import { motion } from 'framer-motion'
type Props = {}

export default function About({ }: Props) {
  return (
    <div
    className='h-screen flex flex-col relative text-center md:text-left md:flex-row max-w-7 px-10 justify-evenly mx-auto items-center'>
        <h3 className='absolute top-12 uppercase tracking-[10px] text-pink-500 font-serif text-2xl'>
            About
        </h3>
        <motion.img
        initial={{
            x: -300,
            opacity: 0,
        }}
        transition={{
            duration: 1.5,
        }}
        whileInView={{ opacity: 1, x: 0 }}
        src='./pict/zz.png'
        alt=''
        className='mb-50 md:mb-0  rounded-lg flex-shrink-0 w-56 h-56 object-contain md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]'
        />
        <motion.div
        initial={{
          x: 300,
          opacity: 0,
      }}
      transition={{
          duration: 1.5,
      }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
        className='space-y-10 px-10 md:px-10'>
          <h4 className='text-3xl font-mono'>Here is a litle background</h4>
          <p className='text-sm mx-auto font-mono'>I am a megumii, i was born on 14 July 2001. I love anime & rhythm games. Came to web3 since 2022.</p>
        </motion.div>
    </div>
  )
}
