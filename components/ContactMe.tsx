import React, { useState } from "react";
import { motion } from "framer-motion";
import { EarthCanvas } from "./canvas";
import { EnvelopeIcon } from '@heroicons/react/24/outline'
type Props = {};
type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function ContactMe({ }: Props) {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex relative flex-col text-center md:text-center md:flex-row max-w-5xl px-5 h-screen justify-evenly mx-auto items-center"
    >
      <EarthCanvas />
      <div className="flex flex-col space-y-2 items-center justify-between">
        <div className="space-y-3">
          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon className="text-pink-500 h-5 w-5 animate-pulse" />
            <a className="text-1xl" href={`mailto:contact@megumii.xyz`}>
            contact@megumii.xyz
            </a>
          </div>

          <>

          </>

          <div className="flex items-center space-x-5 justify-center">
        <a href="https://discordapp.com/users/873803230042263563" target="_blank" rel="noreferrer">
            <img src="https://lanyard.cnrad.dev/api/873803230042263563?idleMessage=:doing%20something%20else...&bg=427bc2" alt="Discord Presence"/>
        </a>
        </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactMe;
