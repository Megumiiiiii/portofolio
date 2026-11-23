import { Html, Head, Main, NextScript } from "next/document";

// Replays an explicit choice before the first paint so a dark-mode visitor
// never sees the pink theme flash. With no stored choice the CSS media query
// takes over and the site follows the OS.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;}catch(e){}`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* The export has to run from "/" on Vercel and from "/<manifest>/" on
            an Arweave path gateway. next/router rewrites the URL to drop the
            trailing slash after hydration, which would make every relative
            image resolve against the gateway root, so the base is pinned once
            at parse time. */}
        <base href="./" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}