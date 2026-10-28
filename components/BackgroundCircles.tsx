import { motion, useReducedMotion } from "framer-motion";

export default function BackgroundCircles() {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative flex justify-center items-center"
      aria-hidden="true"
    >
      <motion.div
        className="absolute rounded-full border border-pink-800 h-[285px] w-[285px] mt-52"
        initial={false}
        animate={
          reduce
            ? { opacity: 0.4, scale: 1 }
            : { opacity: [0.35, 0.6, 0.35], scale: [1, 1.06, 1] }
        }
        transition={
          reduce
            ? { duration: 0 }
            : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        className="absolute rounded-full border border-purple-800 h-[420px] w-[420px] md:h-[560px] md:w-[560px] mt-52"
        initial={false}
        animate={reduce ? { opacity: 0.25, scale: 1 } : { opacity: [0.2, 0.4, 0.2] }}
        transition={
          reduce
            ? { duration: 0 }
            : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
        }
      />
    </div>
  );
}
