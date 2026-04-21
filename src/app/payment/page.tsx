import { PaymentSimulator } from "@/components/payment-simulator";
import { StorefrontHeader } from "@/components/storefront-header";

export default function PaymentPage() {
  return (
    <main className="page-shell space-y-5 sm:space-y-6">
      <StorefrontHeader />
      <PaymentSimulator />
    </main>
  );
}
