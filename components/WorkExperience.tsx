import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import ExperienceCard1 from "./ExperienceCard1";

export default function WorkExperience() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="starfield h-screen flex relative overflow-hidden flex-col text-justify md:flex-row max-w-full px-10 justify-center mx-auto items-center"
    >
      <h2 className="absolute top-24 uppercase tracking-[10px] text-pink-800 font-serif text-xl">
        Experience
      </h2>
      <div className="thin-scroll relative w-full flex overflow-x-scroll snap-x snap-mandatory z-20">
        <ExperienceCard />
        <ExperienceCard1 />
      </div>
      <div className="w-full absolute top-[30%] bg-pink-800/15 left-0 h-[300px] -skew-y-12" />
    </motion.div>
  );
}
