import React from 'react'
import { motion } from 'framer-motion'

type Props = {}

export default function BackgroundCircles({}: Props) {
  return (
    <motion.div
    initial={{
        opacity: 0,
    }}
    animate={{
        scale: [1, 2, 2, 3, 1],
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
        borderRadius: ['20%', '20%', '50%', '80%', '20%'],
    }}
    transition={{
        duration: 2.5,
    }}
    className='relative flex justify-center items-center'>
        <div className='absolute border border-pink-500 rounded-full h-[285px] w-[285px] mt-52 opacity-40 animate-ping' />
        <div className='absolute border border-purple-500 rounded-full h-[580px] w-[580px] opacity-10 mt-52 animate-pulse' />
       {/* <div className='absolute border border-pink-500 rounded-full h-[350px] w-[350px] mt-52 opacity-30 animate-ping' /> */}
    </motion.div>
  )
}