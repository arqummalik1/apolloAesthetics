import { SuccessReceipt } from "@/components/success-receipt";
import { StorefrontHeader } from "@/components/storefront-header";

export default function SuccessPage() {
  return (
    <main className="page-shell space-y-5 sm:space-y-6">
      <StorefrontHeader />
      <SuccessReceipt />
    </main>
  );
}
