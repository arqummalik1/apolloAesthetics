"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { useEffect, useState } from "react";

import { useStore } from "@/components/store-provider";

type Crumb = {
  label: string;
  href?: Route;
};

type HeaderConfig = {
  eyebrow: string;
  title: string;
  description: string;
  crumbs: Crumb[];
  primaryLink: {
    label: string;
    href: Route;
  };
  secondaryLink: {
    label: string;
    href: Route;
  };
};

const headerByPath: Record<string, HeaderConfig> = {
  "/": {
    eyebrow: "Apollo Aesthetics",
    title: "Dermato Care Kojic Acid 2%",
    description: "Premium serum showcase built for a clean mobile-to-desktop buying journey.",
    crumbs: [{ label: "Home" }, { label: "Product" }],
    primaryLink: { label: "Gallery", href: "/#gallery" as Route },
    secondaryLink: { label: "Checkout", href: "/checkout" as Route },
  },
  "/checkout": {
    eyebrow: "Checkout",
    title: "Delivery Details",
    description: "Review the product and enter the shipping information comfortably on any screen size.",
    crumbs: [{ label: "Home", href: "/" as Route }, { label: "Checkout" }],
    primaryLink: { label: "Back to Home", href: "/" as Route },
    secondaryLink: { label: "Payment", href: "/payment" as Route },
  },
  "/payment": {
    eyebrow: "Payment",
    title: "Demo Payment",
    description: "Select a payment method and complete the checkout flow with mobile-friendly controls.",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Checkout", href: "/checkout" as Route },
      { label: "Payment" },
    ],
    primaryLink: { label: "Back to Checkout", href: "/checkout" as Route },
    secondaryLink: { label: "Home", href: "/" as Route },
  },
  "/success": {
    eyebrow: "Confirmation",
    title: "Order Success",
    description: "A polished confirmation state that keeps the receipt and next actions easy to scan on mobile.",
    crumbs: [
      { label: "Home", href: "/" as Route },
      { label: "Checkout", href: "/checkout" as Route },
      { label: "Success" },
    ],
    primaryLink: { label: "Start Again", href: "/" as Route },
    secondaryLink: { label: "Product", href: "/#gallery" as Route },
  },
};

export function StorefrontHeader() {
  const pathname = usePathname();
  const { cartQuantity, openCart } = useStore();
  const config = headerByPath[pathname] ?? headerByPath["/"];
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-2 z-30 rounded-[1.25rem] border border-white/70 bg-white/82 px-3 shadow-lg backdrop-blur transition-all duration-300 sm:top-4 sm:rounded-[2rem] sm:px-5 sm:py-4">
      <div className={`flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-4 transition-all duration-300 ${isScrolled ? "py-1.5" : "py-2"}`}>
        <div className="min-w-0 space-y-1 sm:space-y-3">
          <nav aria-label="Breadcrumb" className="overflow-x-auto">
            <ol className="flex min-w-max items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--navy-500)] sm:text-[11px] sm:gap-2">
              {config.crumbs.map((crumb, index) => (
                <li className="flex items-center gap-1.5 sm:gap-2" key={`${crumb.label}-${index}`}>
                  {crumb.href ? (
                    <Link className="whitespace-nowrap rounded-full bg-[color:var(--shell-100)] px-2 py-0.5 sm:px-2.5 sm:py-1" href={crumb.href}>
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="whitespace-nowrap rounded-full bg-[color:var(--navy-700)] px-2 py-0.5 text-white sm:px-2.5 sm:py-1">
                      {crumb.label}
                    </span>
                  )}
                  {index < config.crumbs.length - 1 ? <span className="text-[color:var(--navy-400)]">/</span> : null}
                </li>
              ))}
            </ol>
          </nav>

          <div className={`space-y-0.5 sm:space-y-1 transition-all duration-300 ${isScrolled ? "h-0 overflow-hidden opacity-0 sm:h-auto sm:overflow-visible sm:opacity-100" : "h-auto opacity-100"}`}>
            <p className="hidden text-xs uppercase tracking-[0.26em] text-[color:var(--navy-500)] sm:block sm:text-sm">{config.eyebrow}</p>
            <h1 className={`truncate font-semibold text-[color:var(--ink-900)] transition-all duration-300 sm:text-xl lg:text-2xl ${isScrolled ? "text-sm" : "text-base"}`}>{config.title}</h1>
            <p className="hidden max-w-2xl text-sm leading-6 text-[color:var(--ink-600)] sm:block">{config.description}</p>
          </div>
        </div>

        <div className={`grid grid-cols-2 gap-1.5 sm:gap-2 sm:flex sm:flex-wrap sm:justify-end transition-all duration-300 ${isScrolled ? "h-0 overflow-hidden opacity-0 sm:h-auto sm:overflow-visible sm:opacity-100" : "h-auto opacity-100"}`}>
          <Link
            className="inline-flex min-h-9 items-center justify-center rounded-full border border-[color:var(--border-soft)] bg-white px-3 py-2 text-xs font-semibold text-[color:var(--navy-700)] transition hover:border-[color:var(--gold-500)] sm:min-h-11 sm:px-4 sm:py-3 sm:text-sm"
            href={config.primaryLink.href}
          >
            {config.primaryLink.label}
          </Link>
          <Link
            className="inline-flex min-h-9 items-center justify-center rounded-full border border-[color:var(--border-soft)] bg-white px-3 py-2 text-xs font-semibold text-[color:var(--navy-700)] transition hover:border-[color:var(--gold-500)] sm:min-h-11 sm:px-4 sm:py-3 sm:text-sm"
            href={config.secondaryLink.href}
          >
            {config.secondaryLink.label}
          </Link>
          <button
            className="col-span-2 inline-flex min-h-9 items-center justify-center rounded-full bg-[color:var(--navy-700)] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[color:var(--navy-600)] sm:min-h-11 sm:px-4 sm:py-3 sm:text-sm sm:col-span-1"
            onClick={openCart}
            type="button"
          >
            Cart {cartQuantity > 0 ? `(${cartQuantity})` : ""}
          </button>
        </div>
      </div>
    </header>
  );
}
