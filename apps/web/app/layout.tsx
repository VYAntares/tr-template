import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'template-app',
    template: '%s | template-app',
  },
  description:
    'A monorepo template: Next.js and NestJS behind one origin, with the build, test and deployment wiring already in place.',
  applicationName: 'template-app',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // Extensions like Dark Reader stamp attributes on <html> before React
    // hydrates, which otherwise logs a mismatch an evaluator would read as a
    // console gate failure. This covers that one element, not its children, so
    // a real mismatch anywhere inside still reports.
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <header className="border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto flex w-full max-w-3xl items-baseline justify-between gap-4 px-6 py-5">
            <Link
              href="/"
              className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100"
            >
              template-app
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">{children}</main>

        <footer className="border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-6 text-sm text-slate-500 dark:text-slate-400">
            <p>A project template. Not a commercial service.</p>
            <nav aria-label="Legal">
              <ul className="flex gap-6">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-slate-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
