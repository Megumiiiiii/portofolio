import React from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import BackgroundCircles from './BackgroundCircles'


type Props = {};

export default function Hero({ }: Props) {
    const [text, count] = useTypewriter({
        words: [
            '2024-Will-Becomes-Anime',
            '1 + 1 > 2',
        ],
        loop: true,
        deleteSpeed: 50,
        typeSpeed: 100,
        delaySpeed: 2000,
    });
  return (
    <div className='h-screen  flex flex-col space-y-8 items-center justify-center text-center overflow-hidden'>
         <BackgroundCircles />
         <img
         className='relative rounded-full h-32 w-32 mx-auto object-cover'
         src='./pict/zz.png'
         alt='megumii'
         />     
         <div className='z-20'>
            <h1 className='text-3xl lg:text-4xl font-semibold px-10'>
                <span className='mr-1'>{text}</span>
                <Cursor cursorColor='#FF00CB'
                />
            </h1>
            <div className='px-5 grid grid-cols-3'>
                <a href="#about" className='heroButton'>About</a>
                <a href="https://k.megumii.xyz" rel='noreferrer' target='_blank' className='heroButton'>Docs</a>
                <a href="#experience" className='heroButton'>Experiences</a>
                <a href="#contact" className='heroButton'>Contact</a>
                <a href="" className='heroButton'>F5</a>
                <a href="#project" className='heroButton'>Nodes</a>
            </div>
         </div>
    </div>
  )
}
