import { HomeScreen } from "@/components/home-screen";
import { StorefrontHeader } from "@/components/storefront-header";

export default function HomePage() {
  return (
    <main className="page-shell space-y-5 sm:space-y-6">
      <StorefrontHeader />
      <HomeScreen />
    </main>
  );
}
