import React from 'react'
import { motion } from 'framer-motion'
import { ComputersCanvas } from "./canvas";
type Props = {}

export default function About({ }: Props) {
  return (
    <motion.div
    className='h-screen flex flex-col relative text-center md:text-left md:flex-row max-w-7 px-10 justify-evenly mx-auto items-center'>
        <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >

        <div>
          <h1 className="space-y-10 px-10 md:px-10 font-bold">
            Here is a litle background
          </h1>
          <br/>
          <p className='text-sm mx-auto font-mono'>
          I am a megumii, i was born on 14 July 2001.<br className="sm:block hidden" />
          I love anime & rhythm games. Came to web3 since 2022.
          </p>
        </div>
      </div>
      
      <ComputersCanvas />

    </motion.div>
  )
}
