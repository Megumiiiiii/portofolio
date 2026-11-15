import { Html, Head, Main, NextScript } from "next/document";

// Replays an explicit choice before the first paint so a dark-mode visitor
// never sees the pink theme flash. With no stored choice the CSS media query
// takes over and the site follows the OS.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;}catch(e){}`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}