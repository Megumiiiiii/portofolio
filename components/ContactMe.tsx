import React, { useState } from "react";
import { motion } from "framer-motion";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { useForm, SubmitHandler } from "react-hook-form";
type Props = {};
type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function ContactMe({ }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    window.location.href = `mailto:$contact@megumii.xyz?subject=${data.subject}&body=Hi, my name is ${data.name}. ${data.message}`;
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex relative flex-col text-center md:text-center md:flex-row max-w-5xl px-5 h-screen justify-evenly mx-auto items-center"
    >
        <h4 className='absolute top-12 uppercase tracking-[10px] text-pink-500 font-serif text-2xl'>
            CONTACT
        </h4>
      <div className="flex flex-col space-y-2 items-center">
        <div className="space-y-2">
          <div className="flex items-center space-x-5 justify-center">
            <PhoneIcon className="text-pink-500 h-5 w-5 animate-pulse" />
             <p className="text-1xl">14045</p>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon className="text-pink-500 h-5 w-5 animate-pulse" />
            <a className="text-1xl" href={`mailto:contact@megumii.xyz`}>
            contact@megumii.xyz
            </a>
          </div>
          <div className="flex items-center space-x-2 justify-center">
            <MapPinIcon className="text-pink-500 h-5 w-5 animate-pulse" />
            <p className="text-1xl">Banjarnegara, Central Java, Indonesia</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex flex-col space-y-2 mx-auto w-fit">
            <input
              className="contactInput"
              placeholder="Name"
              type="text"
              {...register("name")}
            />
          <input
              className="contactInput"
              placeholder="Email"
              type="text"
              {...register("email")}
            />
          <input
            className="contactInput"
            placeholder="Subject..."
            type="text"
            {...register("subject")}
          />
          <textarea
            className="contactInput h-36 overflow-y-scroll scrollbar-thin scrollbar-track-pink-200 scrollbar-thumb-pink-500"
            placeholder="Message..."
            {...register("message")}
          />
          <button
            type="submit"
            className="
            bg-pink-500 py-5 px-5 rounded-md text-white font-bold text-lg "
          >
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default ContactMe;
