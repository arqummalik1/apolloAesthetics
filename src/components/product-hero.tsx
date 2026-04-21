"use client";

import Image from "next/image";
import Link from "next/link";

import { product, trustPoints } from "@/data/product";
import { formatCurrency } from "@/lib/format";
import { useStore } from "@/components/store-provider";

export function ProductHero() {
  const { addToCart, openCart, cartQuantity } = useStore();
  const [featureCard, detailCard] = product.featureImages;

  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),rgba(240,231,219,0.84)_42%,rgba(214,184,128,0.28)_100%)] px-4 py-6 shadow-[0_30px_80px_rgba(26,34,56,0.12)] sm:rounded-[2rem] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(255,224,162,0.42),transparent_65%)]" />
      <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[color:var(--border-strong)] bg-white/80 px-4 py-2 text-[11px] tracking-[0.2em] text-[color:var(--navy-500)] uppercase shadow-sm sm:text-sm sm:tracking-[0.24em]">
            Apollo Aesthetics
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold-500)]" />
            Dermato Care
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--navy-500)] sm:text-sm sm:tracking-[0.3em]">
              Kojic Acid 2% Face Serum
            </p>
            <h1 className="max-w-xl font-[family:var(--font-display)] text-4xl leading-[0.95] text-[color:var(--ink-900)] sm:text-5xl lg:text-6xl">
              Clinical clarity, elevated into a premium single-product storefront.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[color:var(--ink-600)] sm:text-lg sm:leading-8">{product.shortDescription}</p>
          </div>

        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="rounded-[1.5rem] border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-md">
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--navy-500)]">MRP</p>
            <p className="mt-2 text-xl font-semibold text-[color:var(--ink-900)] sm:text-2xl">{formatCurrency(product.price)}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-md">
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--navy-500)]">Format</p>
            <p className="mt-2 text-xl font-semibold text-[color:var(--ink-900)] sm:text-2xl">{product.form}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-md">
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--navy-500)]">Bottle</p>
            <p className="mt-2 text-xl font-semibold text-[color:var(--ink-900)] sm:text-2xl">{product.volume}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[color:var(--navy-600)] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(32,52,85,0.28)] transition-all duration-300 hover:bg-[color:var(--navy-700)] hover:scale-105 hover:shadow-[0_20px_50px_rgba(32,52,85,0.35)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[color:var(--navy-400)] focus:ring-offset-2 sm:w-auto"
            onClick={() => addToCart(1)}
            type="button"
          >
            Buy Now
          </button>
          <button
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[color:var(--border-strong)] bg-white/70 px-6 py-4 text-base font-semibold text-[color:var(--navy-700)] backdrop-blur transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold-500)] focus:ring-offset-2 sm:w-auto"
            onClick={openCart}
            type="button"
          >
            View Cart {cartQuantity > 0 ? `(${cartQuantity})` : ""}
          </button>
          <Link
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[color:var(--border-soft)] bg-white/50 px-4 py-4 text-base font-semibold text-[color:var(--navy-700)] transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-md active:scale-95 sm:w-auto sm:border-transparent sm:bg-transparent"
            href="#gallery"
          >
            Explore Angles
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {trustPoints.map((point) => (
            <div
              className="rounded-2xl border border-[color:var(--border-soft)] bg-[rgba(255,255,255,0.58)] px-4 py-3 text-sm text-[color:var(--ink-700)] transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-white"
              key={point}
            >
              {point}
            </div>
          ))}
        </div>
      </div>

      <div className="relative grid gap-4 lg:min-h-[44rem]">
        <div className="absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,217,140,0.68),transparent_70%)] blur-3xl" />

        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 p-4 shadow-[0_24px_56px_rgba(31,39,60,0.16)] backdrop-blur">
          <div className="absolute inset-x-8 bottom-4 h-10 rounded-full bg-black/10 blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(230,219,204,0.72))]">
            <Image
              alt={product.heroImage.alt}
              className="object-cover object-center"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              src={product.heroImage.src}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/70 p-3 shadow-lg">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.3rem] bg-[color:var(--shell-200)]">
              <Image
                alt={detailCard.alt}
                className="object-cover object-center"
                fill
                sizes="(max-width: 1024px) 50vw, 20vw"
                src={detailCard.src}
              />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/70 p-3 shadow-lg">
            <div className="absolute inset-x-3 top-3 z-10 flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.18em] text-white/80 sm:text-xs sm:tracking-[0.22em]">
              <span>Real Mockup</span>
              <span>Client Demo</span>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.3rem] bg-[color:var(--navy-700)]">
              <Image
                alt={featureCard.alt}
                className="object-cover object-center"
                fill
                sizes="(max-width: 1024px) 50vw, 20vw"
                src={featureCard.src}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
