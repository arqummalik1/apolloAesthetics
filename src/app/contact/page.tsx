import Link from "next/link";
import { StorefrontHeader } from "@/components/storefront-header";

export default function ContactPage() {
  return (
    <div className="page-shell">
      <StorefrontHeader />
      <div className="panel mt-6 space-y-6">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 font-[family:var(--font-display)] text-3xl text-[color:var(--ink-900)] sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--ink-600)]">
            Have questions about our products or need assistance? We're here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-[color:var(--border-soft)] bg-[color:var(--shell-100)] p-6">
            <h2 className="mb-4 text-xl font-semibold text-[color:var(--ink-900)]">Email</h2>
            <p className="text-[color:var(--ink-700)]">
              contact@apolloaesthetics.com
            </p>
            <p className="mt-2 text-sm text-[color:var(--ink-600)]">
              We typically respond within 24 hours
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[color:var(--border-soft)] bg-[color:var(--shell-100)] p-6">
            <h2 className="mb-4 text-xl font-semibold text-[color:var(--ink-900)]">Phone</h2>
            <p className="text-[color:var(--ink-700)]">
              +91 98765 43210
            </p>
            <p className="mt-2 text-sm text-[color:var(--ink-600)]">
              Mon-Fri: 9AM - 6PM IST
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[color:var(--border-soft)] bg-[color:var(--shell-100)] p-6">
            <h2 className="mb-4 text-xl font-semibold text-[color:var(--ink-900)]">Address</h2>
            <p className="text-[color:var(--ink-700)]">
              Apollo Aesthetics Headquarters
            </p>
            <p className="mt-2 text-sm text-[color:var(--ink-600)]">
              123 Business Park, Sector 18<br />
              Gurugram, Haryana 122015<br />
              India
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[color:var(--border-soft)] bg-[color:var(--shell-100)] p-6">
            <h2 className="mb-4 text-xl font-semibold text-[color:var(--ink-900)]">Business Hours</h2>
            <p className="text-[color:var(--ink-700)]">
              Monday - Friday: 9AM - 6PM
            </p>
            <p className="text-[color:var(--ink-700)]">
              Saturday: 10AM - 4PM
            </p>
            <p className="mt-2 text-sm text-[color:var(--ink-600)]">
              Sunday: Closed
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[color:var(--border-soft)] bg-white px-6 py-4 text-base font-semibold text-[color:var(--navy-700)] transition hover:bg-[color:var(--shell-100)] sm:w-auto"
            href="/"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
