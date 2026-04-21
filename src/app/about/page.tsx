import Link from "next/link";
import { StorefrontHeader } from "@/components/storefront-header";

export default function AboutPage() {
  return (
    <div className="page-shell">
      <StorefrontHeader />
      <div className="panel mt-6 space-y-6">
        <div>
          <p className="eyebrow">About</p>
          <h1 className="mt-3 font-[family:var(--font-display)] text-3xl text-[color:var(--ink-900)] sm:text-4xl">
            About Apollo Aesthetics
          </h1>
        </div>

        <div className="space-y-6 text-[color:var(--ink-700)]">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">Our Story</h2>
            <p className="leading-7">
              Apollo Aesthetics was founded with a singular mission: to bring clinical-grade skincare to everyone who deserves it. We believe that beautiful, healthy skin shouldn't be a luxury reserved for the few.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">Our Philosophy</h2>
            <p className="leading-7">
              We combine cutting-edge dermatological science with nature's finest ingredients to create formulations that deliver real results. Every product is developed with rigorous testing and quality standards.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">Our Products</h2>
            <p className="leading-7">
              Our flagship product, Dermato Care Kojic Acid 2% Face Serum, represents the culmination of years of research and development. Formulated with premium Kojic Acid, it targets hyperpigmentation, dark spots, and uneven skin tone, revealing a brighter, more radiant complexion.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">Quality Promise</h2>
            <p className="leading-7">
              Every Apollo Aesthetics product is:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>Dermatologically tested</li>
              <li>Free from harmful parabens and sulfates</li>
              <li>Cruelty-free - never tested on animals</li>
              <li>Manufactured in FDA-approved facilities</li>
              <li>Backed by clinical research</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">Our Commitment</h2>
            <p className="leading-7">
              We are committed to transparency, sustainability, and customer satisfaction. When you choose Apollo Aesthetics, you're choosing a brand that cares about your skin and the planet.
            </p>
          </section>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[color:var(--navy-600)] px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[color:var(--navy-700)] hover:shadow-xl sm:w-auto"
            href="/"
          >
            Explore Our Products
          </Link>
          <Link
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[color:var(--border-soft)] bg-white px-6 py-4 text-base font-semibold text-[color:var(--navy-700)] transition hover:bg-[color:var(--shell-100)] sm:w-auto"
            href="/contact"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
