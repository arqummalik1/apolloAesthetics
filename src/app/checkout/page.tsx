import { CheckoutForm } from "@/components/checkout-form";
import { StorefrontHeader } from "@/components/storefront-header";

export default function CheckoutPage() {
  return (
    <main className="page-shell space-y-5 sm:space-y-6">
      <StorefrontHeader />
      <CheckoutForm />
    </main>
  );
}
