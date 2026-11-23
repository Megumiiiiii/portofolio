import Head from "next/head";
import Link from "next/link";

const title = "Terms of Service — Hermes Backup";
const description = "Terms for the personal Hermes Backup application.";
const siteUrl = "https://www.megumii.xyz/terms";

export default function Terms() {
  return (
    <div className="min-h-screen bg-pink-200 text-pink-900">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={siteUrl} />
        <meta name="robots" content="index,follow" />
      </Head>

      <main className="mx-auto max-w-3xl px-6 py-16 leading-relaxed">
        <Link
          href="./"
          className="mb-10 inline-block rounded-lg border border-pink-800 px-6 py-2 text-xs tracking-widest transition-colors hover:bg-pink-900 hover:text-pink-100"
        >
          ← BACK TO PORTFOLIO
        </Link>

        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="mt-2 text-sm opacity-80">Hermes Backup · last updated 23 November 2026</p>

        <h2 className="mt-8 text-xl font-semibold">1. Scope</h2>
        <p className="mt-3">
          Hermes Backup is a private tool used by a single person to copy files from their own server
          to their own Google Drive account. It is not offered as a service to the public and has no
          third-party users.
        </p>

        <h2 className="mt-10 text-xl font-semibold">2. Acceptable use</h2>
        <p className="mt-3">
          The application may only be used with a Google account that the operator is authorized to
          access, and only to store the operator&apos;s own data. It must not be used to access, copy or
          redistribute another person&apos;s data.
        </p>

        <h2 className="mt-10 text-xl font-semibold">3. No warranty</h2>
        <p className="mt-3">
          The software is provided &quot;as is&quot;, without warranty of any kind. Backups may fail,
          be incomplete, or be removed by the retention policy. The operator is responsible for
          verifying that restores work.
        </p>

        <h2 className="mt-10 text-xl font-semibold">4. Limitation of liability</h2>
        <p className="mt-3">
          To the maximum extent permitted by law, no liability is accepted for data loss, service
          interruption, or any damages arising from use of the application.
        </p>

        <h2 className="mt-10 text-xl font-semibold">5. Changes</h2>
        <p className="mt-3">
          These terms may be updated at any time. The current version is always published on this
          page.
        </p>

        <h2 className="mt-10 text-xl font-semibold">6. Contact</h2>
        <p className="mt-3">
          <a className="underline decoration-pink-800 underline-offset-4" href="mailto:megumii6976@gmail.com">megumii6976@gmail.com</a>
        </p>

        <p className="mt-12 text-sm opacity-70">
          See also the <Link className="underline decoration-pink-800 underline-offset-4" href="privacy">Privacy Policy</Link>.
        </p>
      </main>
    </div>
  );
}
