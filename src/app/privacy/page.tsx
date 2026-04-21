import Link from "next/link";
import { StorefrontHeader } from "@/components/storefront-header";

export default function PrivacyPage() {
  return (
    <div className="page-shell">
      <StorefrontHeader />
      <div className="panel mt-6 space-y-6">
        <div>
          <p className="eyebrow">Legal</p>
          <h1 className="mt-3 font-[family:var(--font-display)] text-3xl text-[color:var(--ink-900)] sm:text-4xl">
            Privacy Policy
          </h1>
        </div>

        <div className="space-y-6 text-[color:var(--ink-700)]">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">1. Information Collection</h2>
            <p className="leading-7">
              We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include your name, email address, phone number, and shipping address.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">2. Use of Information</h2>
            <p className="leading-7">
              We use the information we collect to process transactions, send you technical notices and support messages, respond to your comments and questions, and provide customer service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">3. Information Sharing</h2>
            <p className="leading-7">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">4. Data Security</h2>
            <p className="leading-7">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">5. Cookies</h2>
            <p className="leading-7">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">6. Your Rights</h2>
            <p className="leading-7">
              You have the right to access, correct, or delete your personal information. You may also opt out of certain communications from us.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[color:var(--ink-900)]">7. Contact Us</h2>
            <p className="leading-7">
              If you have any questions about this Privacy Policy, please contact us at contact@apolloaesthetics.com
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
