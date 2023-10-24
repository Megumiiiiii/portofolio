import React from 'react'
import { motion } from 'framer-motion'

type Props = {};

export default function Skills({}: Props) {
  return (
    <div className='group relative flex cursor-pointer'>
        <motion.img
        initial={{
            x: 400,
            opacity: 0
        }}
        transition={{ duration: 1.8 }}
        whileInView={{ opacity: 1, x:0 }}
        viewport={{ once: true }}
        src='./pict/python.png'
        className='object-cover w-20 h-20 md:w-24 md:h-24 xl:w-28 xl:h-28 rounded-full filter group-hover:grayscale border transition duration-300 ease-in-out'
        />
        <div className='absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white h-20 w-20 md:w-24 md:h-24 xl:w-28 xl:h-28 rounded-full z-0'>
          <div className='flex items-center justify-center h-full'>
            <p className='text-3xl font-bold text-black opacity-100'>1%</p>
          </div>
        </div>
    </div>
  )
}