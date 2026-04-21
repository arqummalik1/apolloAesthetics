"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { OrderSummary } from "@/components/order-summary";
import { useStore } from "@/components/store-provider";

export function SuccessReceipt() {
  const router = useRouter();
  const { state, resetAfterSuccess, showToast } = useStore();
  const order = state.checkout.completedOrder;
  const shouldRedirectHome = state.isHydrated && !order;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (shouldRedirectHome) {
      router.replace("/");
    }
  }, [router, shouldRedirectHome]);

  useEffect(() => {
    if (order && state.isHydrated) {
      setShowConfetti(true);
      showToast("Order placed successfully! 🎉", "success");
    }
  }, [order, state.isHydrated, showToast]);

  if (!state.isHydrated) {
    return <LoadingPanel message="Loading order confirmation..." />;
  }

  if (shouldRedirectHome || !order) {
    return null;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      {showConfetti && <ConfettiAnimation onComplete={() => setShowConfetti(false)} />}
      <section className="panel space-y-6">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-white uppercase sm:text-sm sm:tracking-[0.22em]">
          ✓ Order Confirmed
        </div>
        <div>
          <h1 className="font-[family:var(--font-display)] text-4xl text-[color:var(--ink-900)] sm:text-5xl">
            Thank you for your order!
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--ink-600)]">
            Your order has been successfully placed. We'll deliver it to your address within 3-5 business days.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-[color:var(--shell-100)] to-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.22em] text-[color:var(--navy-500)]">Order ID</p>
            <p className="mt-2 break-all text-2xl font-semibold text-[color:var(--ink-900)]">{order.id}</p>
          </div>
          <div className="rounded-[1.5rem] bg-gradient-to-br from-[color:var(--shell-100)] to-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.22em] text-[color:var(--navy-500)]">Estimated Delivery</p>
            <p className="mt-2 text-base leading-7 text-[color:var(--ink-700)]">3-5 business days</p>
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-[color:var(--border-soft)] bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.22em] text-[color:var(--navy-500)]">Shipping Details</p>
          <div className="mt-4 space-y-2 break-words text-[color:var(--ink-700)]">
            <p className="font-semibold text-[color:var(--ink-900)]">{order.customerAddress.fullName}</p>
            <p>{order.customerAddress.addressLine}</p>
            {order.customerAddress.landmark ? <p>{order.customerAddress.landmark}</p> : null}
            <p>
              {order.customerAddress.city}, {order.customerAddress.state} {order.customerAddress.postalCode}
            </p>
            <p>{order.customerAddress.phone}</p>
            <p>{order.customerAddress.email}</p>
          </div>
        </div>

        <div className="rounded-[1.6rem] bg-gradient-to-br from-[color:var(--navy-50)] to-[color:var(--shell-100)] p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.22em] text-[color:var(--navy-500)]">Payment Method</p>
          <p className="mt-2 text-lg font-semibold text-[color:var(--ink-900)]">
            {order.paymentMethodId === "upi-demo" ? "UPI Payment" : order.paymentMethodId === "card-demo" ? "Card Payment" : "Cash on Delivery"}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[color:var(--navy-600)] px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[color:var(--navy-700)] hover:shadow-xl sm:w-auto"
            onClick={() => {
              resetAfterSuccess();
              router.push("/");
            }}
            type="button"
          >
            Start New Order
          </button>
          <Link
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[color:var(--border-strong)] px-6 py-4 text-base font-semibold text-[color:var(--navy-700)] transition hover:bg-white hover:shadow-md sm:w-auto"
            href="/"
          >
            Return to Home
          </Link>
        </div>
      </section>

      <OrderSummary heading="Confirmed Order" order={order} />
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

function ConfettiAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed right-4 top-4 z-50 animate-in slide-in-from-right-8 fade-in duration-500 sm:right-8 sm:top-8">
      <div className="flex items-center gap-3 rounded-[1.25rem] border border-green-500/20 bg-white px-5 py-4 shadow-[0_20px_60px_rgba(34,197,94,0.25)] backdrop-blur-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-xl">
          ✓
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-[color:var(--ink-900)]">Order Confirmed!</p>
          <p className="text-xs text-[color:var(--ink-600)]">Thank you for your purchase</p>
        </div>
      </div>
    </div>
  );
}
