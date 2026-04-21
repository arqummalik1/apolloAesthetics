"use client";

import { product, paymentOptions } from "@/data/product";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { getCartQuantity } from "@/lib/commerce";
import { useStore } from "@/components/store-provider";
import type { MockOrder } from "@/types/store";

type OrderSummaryProps = {
  order?: MockOrder;
  heading?: string;
};

export function OrderSummary({ order, heading = "Order Summary" }: OrderSummaryProps) {
  const { state, subtotal, cartQuantity } = useStore();
  const quantity = order ? getCartQuantity({ items: order.items }) : cartQuantity;
  const activeSubtotal = order ? order.subtotal : subtotal;
  const shipping = order ? order.shipping : 0;
  const total = order ? order.total : activeSubtotal + shipping;
  const paymentLabel = order
    ? paymentOptions.find((option) => option.id === order.paymentMethodId)?.label ?? "Demo payment"
    : paymentOptions.find((option) => option.id === state.checkout.selectedPaymentMethod)?.label ?? "Select on payment page";

  return (
    <aside className="panel space-y-5">
      <div>
        <p className="eyebrow">Checkout Snapshot</p>
        <h2 className="mt-3 text-2xl font-semibold text-[color:var(--ink-900)] sm:text-3xl">{heading}</h2>
      </div>

      <div className="rounded-[1.6rem] bg-[color:var(--shell-100)] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-[color:var(--navy-500)]">{product.brand}</p>
            <p className="mt-2 text-xl font-semibold text-[color:var(--ink-900)]">{product.name}</p>
            <p className="text-[color:var(--ink-600)]">{product.form}</p>
          </div>
          <span className="w-fit rounded-full bg-white px-3 py-1 text-sm font-semibold text-[color:var(--navy-700)] shadow-sm">
            Qty {quantity}
          </span>
        </div>
      </div>

      <dl className="space-y-3 text-[color:var(--ink-700)]">
        <div className="flex items-center justify-between gap-4 text-sm sm:text-base">
          <dt>Product subtotal</dt>
          <dd className="font-semibold">{formatCurrency(activeSubtotal)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm sm:text-base">
          <dt>Shipping</dt>
          <dd className="font-semibold">{shipping === 0 ? "Free" : formatCurrency(shipping)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-[color:var(--border-soft)] pt-3 text-base font-semibold text-[color:var(--ink-900)] sm:text-lg">
          <dt>Total</dt>
          <dd>{formatCurrency(total)}</dd>
        </div>
      </dl>

      <div className="rounded-[1.4rem] border border-[color:var(--border-soft)] bg-white/70 p-4 text-sm text-[color:var(--ink-600)]">
        <p className="font-semibold text-[color:var(--ink-900)]">Payment route</p>
        <p className="mt-2">{paymentLabel}</p>
        {order ? <p className="mt-2">Placed on {formatDateTime(order.createdAt)}</p> : null}
      </div>
    </aside>
  );
}
