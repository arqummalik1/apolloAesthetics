"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { BenefitStrip } from "@/components/benefit-strip";
import { CartDrawer } from "@/components/cart-drawer";
import { KojicBenefitsSection } from "@/components/kojic-benefits-section";
import { ProductGallery } from "@/components/product-gallery";
import { ProductHero } from "@/components/product-hero";
import { useStore } from "@/components/store-provider";
import { faqItems, product } from "@/data/product";
import { formatCurrency } from "@/lib/format";

export function HomeScreen() {
  const { addToCart, subtotal } = useStore();
  const [isBarVisible, setIsBarVisible] = useState(true);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        setIsBarVisible(false);
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        setIsBarVisible(true);
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <>
      <div className="space-y-6">
        <ProductHero />

        <BenefitStrip />

        <KojicBenefitsSection />

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            <p className="eyebrow">Product Ritual</p>
            <h2 className="font-[family:var(--font-display)] text-4xl text-[color:var(--ink-900)]">
              One polished serum page, built to move visitors straight to checkout.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-[color:var(--ink-600)]">{product.description}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="panel">
              <p className="eyebrow">How To Use</p>
              <ul className="mt-4 space-y-3 text-[color:var(--ink-700)]">
                {product.usage.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <p className="eyebrow">Conservative Notes</p>
              <ul className="mt-4 space-y-3 text-[color:var(--ink-700)]">
                {product.caution.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {product.featureImages.map((asset) => (
            <article className="panel overflow-hidden p-3" key={asset.id}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
                <Image
                  alt={asset.alt}
                  className="object-cover object-center"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  src={asset.src}
                />
              </div>
              <div className="px-2 pb-1 pt-4">
                <p className="text-sm uppercase tracking-[0.22em] text-[color:var(--navy-500)]">{asset.label}</p>
                <p className="mt-2 text-[color:var(--ink-600)]">{asset.accent}</p>
              </div>
            </article>
          ))}
        </section>

        <ProductGallery />

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="panel">
            <p className="eyebrow">Ingredients Snapshot</p>
            <h2 className="mt-3 text-3xl font-semibold text-[color:var(--ink-900)]">Listed ingredients highlighted on the bottle.</h2>
            <p className="mt-4 text-base leading-7 text-[color:var(--ink-600)]">
              The storefront keeps copy close to the visible packaging and avoids stronger unverified skincare claims.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {product.listedIngredients.map((ingredient) => (
                <div className="rounded-[1.2rem] bg-[color:var(--shell-100)] px-4 py-4 font-semibold text-[color:var(--ink-800)]" key={ingredient}>
                  {ingredient}
                </div>
              ))}
            </div>
          </div>

          <div className="panel" id="checkout-flow">
            <p className="eyebrow">Checkout Flow</p>
            <h2 className="mt-3 text-3xl font-semibold text-[color:var(--ink-900)]">From ad-style landing page to demo order confirmation.</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <FlowCard
                body="Visitors see the product, its angles, use guidance, and a sticky purchase call to action."
                step="01"
                title="Landing"
              />
              <FlowCard
                body="The cart and checkout capture quantity plus address details while persisting locally."
                step="02"
                title="Address"
              />
              <FlowCard
                body="A demo payment selector completes the order and lands on a success receipt page."
                step="03"
                title="Confirmation"
              />
            </div>
          </div>
        </section>

        <section className="panel">
          <p className="eyebrow">FAQ</p>
          <div className="mt-5 grid gap-4">
            {faqItems.map((item) => (
              <article className="rounded-[1.5rem] border border-[color:var(--border-soft)] bg-white/70 p-5" key={item.question}>
                <h3 className="text-lg font-semibold text-[color:var(--ink-900)]">{item.question}</h3>
                <p className="mt-3 text-base leading-7 text-[color:var(--ink-600)]">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:px-4 sm:pb-4 transition-transform duration-300 ease-in-out">
        <div className={`mx-auto flex max-w-6xl flex-col gap-3 rounded-[1.4rem] border border-[color:var(--border-soft)] bg-white/90 px-4 py-4 shadow-[0_24px_60px_rgba(9,14,24,0.12)] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:rounded-[1.8rem] sm:px-5 transition-transform duration-300 ${isBarVisible ? "translate-y-0" : "translate-y-full"}`}>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--navy-500)]">Ready to order</p>
            <p className="mt-1 text-base font-semibold text-[color:var(--ink-900)] sm:text-lg">{product.name} Face Serum</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-[color:var(--ink-600)]">Cart total: {formatCurrency(subtotal)}</p>
            <button
              className="min-h-11 rounded-full bg-[color:var(--gold-500)] px-5 py-3 text-sm font-semibold text-[color:var(--navy-900)]"
              onClick={() => addToCart(1)}
              type="button"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <CartDrawer />
    </>
  );
}

type FlowCardProps = {
  step: string;
  title: string;
  body: string;
};

function FlowCard({ step, title, body }: FlowCardProps) {
  return (
    <div className="rounded-[1.5rem] bg-[color:var(--shell-100)] p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--navy-500)]">{step}</p>
      <h3 className="mt-3 text-xl font-semibold text-[color:var(--ink-900)]">{title}</h3>
      <p className="mt-3 text-base leading-7 text-[color:var(--ink-600)]">{body}</p>
    </div>
  );
}
