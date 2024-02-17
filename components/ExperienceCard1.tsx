import React from 'react'
import { motion } from 'framer-motion'

type Props = {}

export default function ExperienceCard({}: Props) {
  return (
    <article className='cursor-pointer w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen rounded-lg'>                    
        <motion.img
        initial={{
            y: -100,
            opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0}}
        className='w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center '
        src='./pict/sarco.png'
        alt='sarco'
        />
            <div>
                <h3 className='text-4xl font-sans text-semibold md:text-center'>Sarcophagus</h3>
            </div>
            <div>
                <h4 className='text-2xl font-mono md:text-center'>Ambassador</h4>
            </div>
            <div>
                <a target="_blank" rel="noreferrer" href="https://sarcophagus.io">
                    <p className='text-purple-400'>About Sarcophagus</p>
                </a>
            </div>
        <div className='px-0 md:px-2 items-center'>
            <div className='flex space-x-2 justify-center items-center'>
                <img className='h-10 w-10 space-x-2 justify-center rounded-full' src='./pict/discord.png' />
                <img className='h-10 w-10 space-x-2 justify-center rounded-full' src='./pict/tele.png' />
            </div>
            <div>
                <p className='py-5 font-serif text-pink-500'>
                Fri Mar 17 2023 - Thu Feb 15 2024
                </p>
            </div>
            <ul className='list-disc text-left object-left space-y-4 ml-5 text-sm'>
                <li>First time joining as a testnet participant 🖤</li>
                <li>02 Feb 2023 becomes local mod for Indonesian community, then I&39;m an Ambassador now</li>
            </ul>
        </div>
    </article>
  )
}
