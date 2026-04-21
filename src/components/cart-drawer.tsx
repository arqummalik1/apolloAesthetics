"use client";

import { useEffect } from "react";
import Link from "next/link";

import { formatCurrency } from "@/lib/format";
import { product } from "@/data/product";
import { useStore } from "@/components/store-provider";

export function CartDrawer() {
  const { state, subtotal, cartQuantity, closeCart, setQuantity, addToCart } = useStore();
  const item = state.cart.items.find((entry) => entry.productId === product.id);

  useEffect(() => {
    if (!state.isCartOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeCart, state.isCartOpen]);

  return (
    <>
      <div
        aria-hidden={!state.isCartOpen}
        className={`fixed inset-0 z-40 bg-[rgba(15,18,26,0.42)] transition ${
          state.isCartOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
      />
      <aside
        aria-label="Shopping cart"
        aria-modal="true"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[color:var(--border-soft)] bg-[color:var(--shell-50)] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-[0_30px_80px_rgba(16,22,34,0.18)] transition duration-300 sm:p-6 ${
          state.isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Cart</p>
            <h2 className="mt-2 text-2xl font-semibold text-[color:var(--ink-900)] sm:text-3xl">Your Serum Order</h2>
          </div>
          <button
            className="rounded-full border border-[color:var(--border-soft)] px-4 py-2 text-sm font-semibold text-[color:var(--navy-700)]"
            onClick={closeCart}
            type="button"
          >
            Close
          </button>
        </div>

        <div className="mt-6 flex-1 overflow-y-auto pr-1 sm:mt-8">
          {item ? (
            <div className="space-y-5 rounded-[1.7rem] border border-[color:var(--border-soft)] bg-white p-5 shadow-sm">
              <div className="space-y-1">
                <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--navy-500)]">{product.brand}</p>
                <h3 className="text-2xl font-semibold text-[color:var(--ink-900)]">{product.name}</h3>
                <p className="text-[color:var(--ink-600)]">{product.form}</p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="inline-flex items-center justify-center gap-3 rounded-full border border-[color:var(--border-soft)] px-3 py-2">
                  <button
                    aria-label="Decrease quantity"
                    className="h-9 w-9 rounded-full bg-[color:var(--shell-100)] text-lg font-semibold text-[color:var(--navy-700)] transition-all duration-200 hover:bg-[color:var(--navy-100)] hover:scale-110 active:scale-95"
                    onClick={() => setQuantity(item.quantity - 1)}
                    type="button"
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center text-lg font-semibold text-[color:var(--ink-900)]">{item.quantity}</span>
                  <button
                    aria-label="Increase quantity"
                    className="h-9 w-9 rounded-full bg-[color:var(--shell-100)] text-lg font-semibold text-[color:var(--navy-700)] transition-all duration-200 hover:bg-[color:var(--navy-100)] hover:scale-110 active:scale-95"
                    onClick={() => addToCart(1)}
                    type="button"
                  >
                    +
                  </button>
                </div>
                <p className="text-center text-xl font-semibold text-[color:var(--ink-900)] sm:text-right">{formatCurrency(product.price * item.quantity)}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-[1.8rem] border border-dashed border-[color:var(--border-strong)] bg-white/70 p-8 text-center text-[color:var(--ink-600)]">
              <p className="text-xl font-semibold text-[color:var(--ink-900)]">Your cart is empty</p>
              <p className="mt-3 leading-7">Add the featured serum to start the Apollo Aesthetics demo checkout flow.</p>
            </div>
          )}
        </div>

        <div className="space-y-4 border-t border-[color:var(--border-soft)] pt-6">
          <div className="flex items-center justify-between text-base text-[color:var(--ink-700)]">
            <span>Items</span>
            <span>{cartQuantity}</span>
          </div>
          <div className="flex items-center justify-between text-xl font-semibold text-[color:var(--ink-900)]">
            <span>Total</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <Link
            className={`inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 py-4 text-base font-semibold text-white transition-all duration-300 ${
              item ? "bg-[color:var(--navy-600)] hover:bg-[color:var(--navy-700)] hover:scale-105 hover:shadow-lg active:scale-95" : "pointer-events-none bg-slate-400"
            }`}
            href="/checkout"
            onClick={closeCart}
          >
            Continue to Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}
