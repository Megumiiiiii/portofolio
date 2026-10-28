import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MotionConfig } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MotionConfig reducedMotion="user">
      <Component {...pageProps} />
    </MotionConfig>
  );
}
