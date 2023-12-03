import React from 'react'
import { motion } from 'framer-motion'
type Props = {}
export default function Projects({}: Props) {
  
  return (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className='flex relative overflow-hidden flex-col text-left md:flex-row max-w-full h-screen justify-evenly mx-auto items-center z-0'>
        <h4 className='absolute top-12 uppercase tracking-[10px] text-pink-500 font-serif text-1xl'>
            Active Nodes
        </h4>
        <div className="relative w-full flex overflow-x-scroll snap-x snap-mandatory z-20 scrollbar scrollbar-track-pink-200 scrollbar-thumb-pink-500">
            <div className="cursor-auto w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen rounded-full">
                <motion.img 
                initial={{
                    y: 100,
                    opacity: 0,
                }}
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1, y: 0}}
                className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-center" 
                src="./pict/sarco.png" 
                alt="sarco"/>
                <div className="space-y-10 px-0 md:px-10">
                    <h3 className="text-lg font-semibold text-pink-500 text-center">Sarcophagus</h3>
                </div>
                <div className="space-y-10 px-0 md:px-10">
                    <h3 className="text-lg font-semibold text-pink-500 text-center">Mainnet &amp; Testnet Node Operator</h3>
                </div>
                <div className="flex items-center space-x-2 justify-center">
                    <img className="h-7 w-7" src="./pict/copy.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/github.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/ubuntu.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/vim.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/docker.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/metamask.png" alt=""/>
                </div>
                <div className="space-y-10 px-0 md:px-10">
                  <h4 className="text-sm font-semibold text-pink-500 text-center">A decentralized dead man&#x27;s switch built on Ethereum and Arweave.</h4>
                </div>
                <div className="space-x-5 px-10 cursor-pointer">
                    <a target="_blank" rel="noreferrer" href="https://app.sarcophagus.io/archaeologists">
                    <span className="md:inline-flex text-sm font-mono text-purple-500"><b>app.sarcophagus.io/archaeologists</b></span>
                    </a>
                </div>
            </div>

            <div className="cursor-auto w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen rounded-full">
                <motion.img
                initial={{
                    y: 100,
                    opacity: 0,
                }} 
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1, y: 0}}
                className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-center" 
                src="./pict/ar.png" 
                alt="ar"/>
                <div className="space-y-10 px-0 md:px-10">
                    <h3 className="text-lg font-semibold text-pink-500 text-center">Ar.io</h3>
                </div>
                <div className="space-y-10 px-0 md:px-10">
                    <h3 className="text-lg font-semibold text-pink-500 text-center">Gateway Operator</h3>
                </div>
                <div className="flex items-center space-x-2 justify-center">
                    <img className="h-7 w-7" src="./pict/copy.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/github.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/ubuntu.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/docker.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/vim.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/typescript.png" alt=""/>
                </div>
                <div className="space-y-10 px-0 md:px-10">
                    <h4 className="text-sm font-semibold text-pink-500 text-center">ar.io is a network of decentralized gateways and permanent domains for the Arweave ecosystem 🐘</h4>
                </div>
                <div className="space-x-5 px-10 cursor-pointer">
                    <a target="_blank" rel="noreferrer" href="https://blessingway.xyz">
                    <span className="md:inline-flex text-sm font-mono text-purple-500"><b>blessingway.xyz</b></span>
                    </a>
                </div>
            </div>

            <div className="cursor-auto w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen rounded-full">
                <motion.img
                initial={{
                    y: 100,
                    opacity: 0,
                }} 
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1, y: 0}}
                className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-center" 
                src="./pict/avail.png" 
                alt="avail"/>
                <div className="space-y-10 px-0 md:px-10">
                    <h3 className="text-lg font-semibold text-pink-500 text-center">Avail</h3>
                </div>
                <div className="space-y-10 px-0 md:px-10">
                    <h3 className="text-lg font-semibold text-pink-500 text-center">Validator</h3>
                </div>
                <div className="flex items-center space-x-2 justify-center">
                    <img className="h-7 w-7" src="./pict/copy.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/github.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/ubuntu.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/vim.png" alt=""/>
                </div>
                <div className="space-y-10 px-0 md:px-10">
                    <h4 className="text-sm font-semibold text-pink-500 text-center">Avail is a modular blockchain with a data availability layer designed to scale blockchain networks</h4>
                </div>
                <div className="space-x-5 px-10 cursor-pointer">
                    <a target="_blank" rel="noreferrer" href="https://goldberg.avail.tools/">
                    <span className="md:inline-flex text-sm font-mono text-purple-500"><b>Avail Tools</b></span>
                    </a>
                </div>
            </div>

            <div className="cursor-auto w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen rounded-full">
                <motion.img
                initial={{
                    y: 100,
                    opacity: 0,
                }} 
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1, y: 0}}
                className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-center" 
                src="./pict/dym.png" 
                alt="dym"/>
                <div className="space-y-10 px-0 md:px-10">
                    <h3 className="text-lg font-semibold text-pink-500 text-center">Dymension</h3>
                </div>
                <div className="space-y-10 px-0 md:px-10">
                    <h3 className="text-lg font-semibold text-pink-500 text-center">RollApp Operator &amp; Validator</h3>
                </div>
                <div className="flex items-center space-x-2 justify-center">
                    <img className="h-7 w-7" src="./pict/copy.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/github.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/ubuntu.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/go.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/js.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/typescript.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/react.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/metamask.png" alt=""/>
                </div>
                <div className="space-y-10 px-0 md:px-10">
                    <h4 className="text-sm font-semibold text-pink-500 text-center">Powering the Internet of RollApps</h4>
                </div>
                <div className="space-x-5 px-10 cursor-pointer">
                    <a target="_blank" rel="noreferrer" href="https://portal.dymension.xyz/rollapp/megumii_6349524-1">
                    <span className="md:inline-flex text-sm font-mono text-purple-500"><b>Portal</b></span>
                    </a>
                </div>
            </div>

            <div className="cursor-auto w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen rounded-full">
                <motion.img 
                initial={{
                    y: 100,
                    opacity: 0,
                }}
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1, y: 0}}
                className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-center" 
                src="./pict/tangle.png" 
                alt="tangle"/>
                <div className="space-y-10 px-0 md:px-10">
                    <h3 className="text-lg font-semibold text-pink-500 text-center">Tangle</h3>
                </div>
                <div className="space-y-10 px-0 md:px-10">
                    <h3 className="text-lg font-semibold text-pink-500 text-center">Testnet Validator</h3>
                </div>
                <div className="flex items-center space-x-2 justify-center">
                    <img className="h-7 w-7" src="./pict/copy.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/github.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/ubuntu.png" alt=""/>
                    <img className="h-7 w-7" src="./pict/vim.png" alt=""/>
                </div>
                <div className="space-y-10 px-0 md:px-10">
                    <h4 className="text-sm font-semibold text-pink-500 text-center">Built on Substrate, Tangle Network empowers privacy-enhancing and governance-decentralized applications, incorporating cross-chain functionality, EVM compatibility, advanced governance systems, and ZK applications into a unified ecosystem.</h4>
                </div>
                <div className="space-x-5 px-10 cursor-pointer">
                    <a target="_blank" rel="noreferrer" href="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc-archive.tangle.tools#/staking">
                    <span className="md:inline-flex text-sm font-mono text-purple-500"><b>PolkadotJS</b></span>
                    </a>
                </div>
            </div>
        </div>
        <div className='w-full absolute top-[30%] bg-pink-500/30 left-0 h-[300px] skew-y-12 transform-gpu' />
    </motion.div>
  )
}
