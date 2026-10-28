import { motion } from "framer-motion";
import CardCarousel from "./CardCarousel";
import ExperienceCard from "./ExperienceCard";
import ExperienceCard1 from "./ExperienceCard1";

export default function WorkExperience() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="starfield relative flex h-screen flex-col overflow-hidden"
    >
      <h2 className="section-kicker relative z-20 px-16 pt-20 sm:pt-24">
        Experience
      </h2>
      <CardCarousel label="experience">
        <ExperienceCard />
        <ExperienceCard1 />
      </CardCarousel>
      <div className="pointer-events-none absolute top-[32%] left-0 z-0 h-[300px] w-full -skew-y-12 bg-pink-800/15" />
    </motion.div>
  );
}
