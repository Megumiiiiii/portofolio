import React from 'react'
import { SocialIcon } from 'react-social-icons'
import { motion } from 'framer-motion'

type Props = {};

export default function Header({}: Props) {
  return (
    <header className='sticky top-0 p-5 flex items-start justify-between max-w-10xl mx-auto z-30 xl:items-center'>
        <motion.div 
        initial={{
            x: -500,
            opacity: 0,
            scale: 0.5,
        }}
        animate={{
            x: 0,
            opacity: 1,
            scale: 1,
        }}
        transition={{
            duration: 1.7,
        }}
        className='flex flex-row items-center'>
            {/* Social Icons */}
            <SocialIcon network="twitter" url="https://x.com/megumii_tez"
            rel='noreferrer'
            target='_blank'
            fgColor='purple'
            bgColor='transparent'
            />
            <SocialIcon url="https://github.com/Megumiiiiii"
            rel='noreferrer'
            target='_blank'
            fgColor='purple'
            bgColor='transparent'
            />
            <SocialIcon network="linktree" url="https://s.megumii.xyz"
            rel='noreferrer'
            target='_blank'
            fgColor='purple'
            bgColor='transparent'
            />
                      
        </motion.div>
        <motion.div
        initial={{
            x: 500,
            opacity: 0,
            scale: 0.5,
        }}
        animate={{
            x: 0,
            opacity: 1,
            scale: 1,
        }}
        transition={{
            duration: 1.7,
        }}
        className='flex flex-row items-center text-pink-400 cursor-pointer'>
            <SocialIcon url="https://t.me/KatouMegumii"
            rel='noreferrer'
            target='_blank'
            fgColor='purple'
            bgColor='transparent'
            />
            <p className='hidden md:inline-flex text-sm text-pink-400'>
                Let&#39;s Talk
            </p>
        </motion.div>
    </header>
  )
}
