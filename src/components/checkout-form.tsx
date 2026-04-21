"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { OrderSummary } from "@/components/order-summary";
import { useStore } from "@/components/store-provider";
import { validateAddress } from "@/lib/validation";
import type { CustomerAddress } from "@/types/store";

const blankAddress: CustomerAddress = {
  fullName: "",
  phone: "",
  email: "",
  addressLine: "",
  landmark: "",
  city: "",
  state: "",
  postalCode: "",
};

export function CheckoutForm() {
  const router = useRouter();
  const { state, saveAddress } = useStore();
  const [draft, setDraft] = useState<Partial<CustomerAddress>>({});
  const form: CustomerAddress = {
    ...(state.checkout.customerAddress ?? blankAddress),
    ...draft,
  };
  const errors = validateAddress(form);

  const isDisabled = state.cart.items.length === 0 || Object.keys(errors).length > 0;
  const shouldRedirectHome = state.isHydrated && state.cart.items.length === 0;

  useEffect(() => {
    if (shouldRedirectHome) {
      router.replace("/");
    }
  }, [router, shouldRedirectHome]);

  function update<K extends keyof CustomerAddress>(field: K, value: CustomerAddress[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateAddress(form);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    saveAddress(form);
    router.push("/payment");
  }

  if (!state.isHydrated) {
    return <LoadingPanel message="Loading checkout..." />;
  }

  if (shouldRedirectHome) {
    return null;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form className="panel space-y-6" onSubmit={onSubmit}>
        <div>
          <p className="eyebrow">Address Details</p>
          <h1 className="mt-3 font-[family:var(--font-display)] text-3xl text-[color:var(--ink-900)] sm:text-4xl">Complete the delivery profile.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--ink-600)]">
            This frontend-only checkout saves your details locally so refreshes do not break the journey.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            error={errors.fullName}
            label="Full name"
            onChange={(value) => update("fullName", value)}
            value={form.fullName}
            autoComplete="name"
          />
          <Field
            error={errors.phone}
            label="Phone"
            onChange={(value) => update("phone", value)}
            value={form.phone}
            autoComplete="tel"
            inputMode="tel"
            type="tel"
          />
          <Field
            error={errors.email}
            label="Email"
            onChange={(value) => update("email", value)}
            value={form.email}
            autoComplete="email"
            inputMode="email"
            type="email"
          />
          <Field
            error={errors.postalCode}
            label="Postal code"
            onChange={(value) => update("postalCode", value)}
            value={form.postalCode}
            autoComplete="postal-code"
            inputMode="numeric"
          />
        </div>

        <button
          className={`inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 py-4 text-base font-semibold text-white transition-all duration-300 sm:w-auto ${
            isDisabled ? "cursor-not-allowed bg-slate-400" : "bg-[color:var(--navy-600)] hover:bg-[color:var(--navy-700)] hover:scale-105 hover:shadow-lg active:scale-95"
          }`}
          disabled={isDisabled}
          type="submit"
        >
          Continue to Demo Payment
        </button>
      </form>

      <OrderSummary heading="Saved Cart" />
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

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  type?: string;
};

function Field({ label, value, onChange, error, autoComplete, inputMode, type = "text" }: FieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label className="flex flex-col gap-2" htmlFor={id}>
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--navy-500)]">{label}</span>
      <input
        className={`rounded-[1.1rem] border bg-white px-4 py-4 text-base text-[color:var(--ink-900)] outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-[color:var(--gold-500)] ${
          error ? "border-rose-400" : "border-[color:var(--border-soft)]"
        }`}
        autoComplete={autoComplete}
        id={id}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        placeholder={label}
        type={type}
        value={value}
      />
      {error ? <span className="text-sm text-rose-600">{error}</span> : null}
    </label>
  );
}
