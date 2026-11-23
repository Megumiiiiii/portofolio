import Head from "next/head";
import Link from "next/link";

const title = "Privacy Policy — Hermes Backup";
const description =
  "How the Hermes Backup personal application accesses, stores and protects data obtained from Google APIs.";
const siteUrl = "https://www.megumii.xyz/privacy";

export default function Privacy() {
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

        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm opacity-80">Hermes Backup · last updated 23 November 2026</p>

        <p className="mt-8">
          Hermes Backup is a personal, single-user command-line application. It runs on a private
          server owned and operated by the account holder and connects to that same person&apos;s
          Google Drive to store backups. It is not a public service, has no other users, and is
          distributed to nobody.
        </p>

        <h2 className="mt-10 text-xl font-semibold">What data is accessed</h2>
        <p className="mt-3">
          When the application is authorized, it requests the Google Drive scope so it can create a
          folder, upload backup archives, list the archives it created, and delete its own older
          archives according to a retention policy. The archives contain files from the operator&apos;s
          own server: configuration, source code, databases and documents.
        </p>
        <p className="mt-3">
          The application does not read, index, analyse, or transfer any Google Drive content that it
          did not itself upload. It does not access Gmail, Calendar, Contacts, Photos, or any other
          Google service.
        </p>

        <h2 className="mt-10 text-xl font-semibold">How data is stored and protected</h2>
        <p className="mt-3">
          The OAuth refresh token issued by Google is stored locally on the operator&apos;s server in a
          file readable only by the operator&apos;s user account (permissions <code>0600</code>). Backup
          archives are stored in the operator&apos;s own Google Drive account, protected by that
          account&apos;s security settings, including two-factor authentication. No copy of the data is
          kept by the application developer on any third-party server, and nothing is sent to any
          analytics, advertising, or telemetry service.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Sharing</h2>
        <p className="mt-3">
          Data is not sold, rented, shared, or disclosed to any third party. The only recipient of
          the data is Google Drive, which stores it under the operator&apos;s own account.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Limited Use disclosure</h2>
        <p className="mt-3">
          The use of information received from Google APIs adheres to the{" "}
          <a
            className="underline decoration-pink-800 underline-offset-4"
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noreferrer"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Retention and deletion</h2>
        <p className="mt-3">
          Archives are retained on a rolling schedule (seven daily copies and four weekly copies) and
          older copies are removed automatically. The operator can delete any archive at any time
          from Google Drive. Access can be revoked permanently at{" "}
          <a
            className="underline decoration-pink-800 underline-offset-4"
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noreferrer"
          >
            myaccount.google.com/permissions
          </a>
          ; revoking the grant deletes the stored token&apos;s ability to refresh, and the token file can
          then be removed from the server.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Contact</h2>
        <p className="mt-3">
          Questions about this policy: <a className="underline decoration-pink-800 underline-offset-4" href="mailto:megumii6976@gmail.com">megumii6976@gmail.com</a>.
        </p>

        <p className="mt-12 text-sm opacity-70">
          See also the <Link className="underline decoration-pink-800 underline-offset-4" href="terms">Terms of Service</Link>.
        </p>
      </main>
    </div>
  );
}
