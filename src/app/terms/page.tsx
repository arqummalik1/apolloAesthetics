import Link from "next/link";
import { StorefrontHeader } from "@/components/storefront-header";

export default function TermsPage() {
  return (
    <div className="page-shell">
      <StorefrontHeader />
      <div className="panel mt-6 space-y-6">
        <div>
          <p className="eyebrow">Legal</p>
          <h1 className="mt-3 font-[family:var(--font-display)] text-3xl text-[color:var(--ink-900)] sm:text-4xl">
            Terms and Conditions
          </h1>
        </div>

        <div className="space-y-6 text-[color:var(--ink-700)]">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">1. Acceptance of Terms</h2>
            <p className="leading-7">
              By accessing and using the Apollo Aesthetics website, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">2. Products and Services</h2>
            <p className="leading-7">
              All products offered by Apollo Aesthetics are subject to availability. We reserve the right to discontinue any product at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">3. Pricing and Payment</h2>
            <p className="leading-7">
              All prices are in INR and are inclusive of applicable taxes. Payment can be made through UPI, credit/debit cards, or cash on delivery.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">4. Shipping and Delivery</h2>
            <p className="leading-7">
              Orders are typically delivered within 3-5 business days. We are not responsible for delays caused by shipping carriers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">5. Returns and Refunds</h2>
            <p className="leading-7">
              Returns are accepted within 7 days of delivery for damaged or defective products. Contact our customer service for assistance.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">6. Privacy Policy</h2>
            <p className="leading-7">
              Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the website and informs users of our data collection practices.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">7. Contact Information</h2>
            <p className="leading-7">
              For any questions regarding these Terms and Conditions, please contact us at contact@apolloaesthetics.com
            </p>
          </section>
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
