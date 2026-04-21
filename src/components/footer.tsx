import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[color:var(--border-soft)] bg-white/50 px-4 py-8 backdrop-blur">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-[family:var(--font-display)] text-xl font-semibold text-[color:var(--ink-900)]">
              Apollo Aesthetics
            </h3>
            <p className="text-sm leading-6 text-[color:var(--ink-600)]">
              Premium skincare products for radiant, healthy skin. Clinical formulations backed by science.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--navy-500)]">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link className="text-sm text-[color:var(--ink-700)] transition hover:text-[color:var(--navy-600)]" href="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="text-sm text-[color:var(--ink-700)] transition hover:text-[color:var(--navy-600)]" href="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--navy-500)]">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link className="text-sm text-[color:var(--ink-700)] transition hover:text-[color:var(--navy-600)]" href="/terms">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link className="text-sm text-[color:var(--ink-700)] transition hover:text-[color:var(--navy-600)]" href="/privacy">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--navy-500)]">Contact</h4>
            <ul className="space-y-2 text-sm text-[color:var(--ink-700)]">
              <li>Email: contact@apolloaesthetics.com</li>
              <li>Phone: +91 98765 43210</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[color:var(--border-soft)] pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-[color:var(--ink-600)]">
              © {currentYear} Apollo Aesthetics. All rights reserved.
            </p>
            <p className="text-xs text-[color:var(--ink-600)]">
              Registered Trademark. Dermato Care Kojic Acid 2% Face Serum
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
