import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/react";

import { Footer } from "@/components/footer";
import { StoreProvider } from "@/components/store-provider";
import { ToastManager } from "@/components/toast-manager";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Apollo Aesthetics",
  description:
    "Premium frontend ecommerce funnel for Dermato Care Kojic Acid 2% Face Serum by Apollo Aesthetics.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <StoreProvider>
          <main className="flex-1">
            {children}
          </main>
          <ToastManager />
          <Footer />
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  );
}
