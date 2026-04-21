"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { product } from "@/data/product";

export function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeAsset = product.gallery[activeIndex] ?? product.gallery[0];

  useEffect(() => {
    if (product.gallery.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % product.gallery.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8" id="gallery">
      <div className="space-y-5">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--border-soft)] bg-white p-3 shadow-[0_24px_52px_rgba(38,51,78,0.1)] sm:rounded-[2rem] sm:p-4">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(255,214,132,0.35),transparent_75%)]" />
          <div className="relative aspect-[1/1] overflow-hidden rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(252,250,247,1),rgba(236,225,213,0.85))] sm:aspect-[4/3] sm:rounded-[1.5rem]">
            <Image
              alt={activeAsset.alt}
              className="object-cover object-center transition duration-500"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              src={activeAsset.src}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-[1.25rem] bg-[color:var(--shell-100)] px-4 py-3 text-sm text-[color:var(--ink-700)]">
          <div>
            <p className="font-semibold text-[color:var(--ink-900)]">Auto carousel running</p>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--navy-500)]">Client demo ready</p>
          </div>
          <p className="rounded-full bg-white px-3 py-1 font-semibold text-[color:var(--navy-700)]">
            {activeIndex + 1}/{product.gallery.length}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          {product.gallery.map((asset, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                aria-pressed={isActive}
                className={`rounded-[1.4rem] border p-2 text-left transition focus:outline-none focus:ring-2 focus:ring-[color:var(--navy-400)] focus:ring-offset-2 ${
                  isActive
                    ? "border-[color:var(--navy-500)] bg-[color:var(--navy-700)] text-white shadow-lg"
                    : "border-[color:var(--border-soft)] bg-white text-[color:var(--ink-700)] hover:border-[color:var(--gold-500)]"
                }`}
                key={asset.id}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <div className="relative aspect-square overflow-hidden rounded-[1rem]">
                  <Image alt={asset.alt} className="object-cover object-center" fill sizes="20vw" src={asset.src} />
                </div>
                <p className="mt-3 text-sm font-semibold leading-5">{asset.label}</p>
              </button>
            );
          })}
        </div>
      </div>

        <div className="space-y-6">
          <div>
            <p className="eyebrow">Gallery Notes</p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-3xl text-[color:var(--ink-900)] sm:text-4xl">
              Real product mockups, shown across multiple angles.
            </h2>
          </div>
          <div className="panel space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--navy-500)]">Active View</p>
              <p className="mt-2 text-2xl font-semibold text-[color:var(--ink-900)]">{activeAsset.label}</p>
              <p className="mt-2 text-base leading-7 text-[color:var(--ink-600)]">{activeAsset.accent}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.4rem] bg-[color:var(--shell-100)] p-4">
                <p className="text-sm uppercase tracking-[0.22em] text-[color:var(--navy-500)]">Mockup Style</p>
                <p className="mt-2 text-[color:var(--ink-700)]">Real clinic and tabletop mockups with front, side, angled, and back views.</p>
              </div>
              <div className="rounded-[1.4rem] bg-[color:var(--shell-100)] p-4">
                <p className="text-sm uppercase tracking-[0.22em] text-[color:var(--navy-500)]">Showcase Goal</p>
                <p className="mt-2 text-[color:var(--ink-700)]">Give the client and shoppers a fuller sense of the bottle from every useful angle.</p>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
