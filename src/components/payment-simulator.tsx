"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { OrderSummary } from "@/components/order-summary";
import { useStore } from "@/components/store-provider";
import { paymentOptions } from "@/data/product";
import { isAddressComplete } from "@/lib/validation";

export function PaymentSimulator() {
  const router = useRouter();
  const { state, selectPaymentMethod, setPaymentStatus, completeOrder } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shouldRedirectHome = state.isHydrated && state.cart.items.length === 0;
  const shouldRedirectCheckout = state.isHydrated && !shouldRedirectHome && !isAddressComplete(state.checkout.customerAddress);

  useEffect(() => {
    if (shouldRedirectHome) {
      router.replace("/");
      return;
    }

    if (shouldRedirectCheckout) {
      router.replace("/checkout");
    }
  }, [router, shouldRedirectCheckout, shouldRedirectHome]);

  async function handlePay() {
    if (!state.checkout.selectedPaymentMethod) {
      return;
    }

    setIsSubmitting(true);
    setPaymentStatus("processing");
    await new Promise((resolve) => window.setTimeout(resolve, 1600));

    const order = completeOrder();
    setPaymentStatus(order ? "paid" : "idle");
    setIsSubmitting(false);

    if (order) {
      // Small delay to ensure state is persisted before navigation
      await new Promise((resolve) => window.setTimeout(resolve, 100));
      router.push("/success");
    }
  }

  if (!state.isHydrated) {
    return <LoadingPanel message="Preparing payment..." />;
  }

  if (shouldRedirectHome || shouldRedirectCheckout) {
    return null;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="panel space-y-6">
        <div>
          <p className="eyebrow">Demo Payment</p>
          <h1 className="mt-3 font-[family:var(--font-display)] text-3xl text-[color:var(--ink-900)] sm:text-4xl">Choose a payment mode and simulate completion.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--ink-600)]">
            This page demonstrates the final step of the Apollo Aesthetics checkout without connecting to a live gateway.
          </p>
        </div>

        <div className="grid gap-4">
          {paymentOptions.map((option) => {
            const isSelected = option.id === state.checkout.selectedPaymentMethod;

            return (
              <button
                className={`rounded-[1.4rem] border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-[color:var(--gold-500)] focus:ring-offset-2 sm:p-5 ${
                  isSelected
                    ? "border-[color:var(--navy-500)] bg-[color:var(--navy-700)] text-white"
                    : "border-[color:var(--border-soft)] bg-white hover:border-[color:var(--gold-500)]"
                }`}
                key={option.id}
                onClick={() => selectPaymentMethod(option.id)}
                type="button"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold sm:text-xl">{option.label}</p>
                    <p className={`mt-2 leading-7 ${isSelected ? "text-white/75" : "text-[color:var(--ink-600)]"}`}>
                      {option.description}
                    </p>
                  </div>
                  <span
                    className={`h-5 w-5 shrink-0 rounded-full border-2 ${
                      isSelected ? "border-white bg-[color:var(--gold-500)]" : "border-[color:var(--navy-400)]"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <button
          className={`inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 py-4 text-base font-semibold text-white transition sm:w-auto ${
            isSubmitting || !state.checkout.selectedPaymentMethod
              ? "cursor-not-allowed bg-slate-400"
              : "bg-[color:var(--navy-600)] hover:bg-[color:var(--navy-700)]"
          }`}
          disabled={isSubmitting || !state.checkout.selectedPaymentMethod}
          onClick={handlePay}
          type="button"
        >
          {isSubmitting ? "Processing Demo Payment..." : "Pay and Place Demo Order"}
        </button>
      </section>

      <OrderSummary heading="Final Review" />
    </div>
  );
}

function LoadingPanel({ message }: { message: string }) {
  return (
    <div className="panel text-center">
      <p className="eyebrow">Apollo Aesthetics</p>
      <p className="mt-4 text-lg text-[color:var(--ink-700)]">{message}</p>
    </div>
  );
}
