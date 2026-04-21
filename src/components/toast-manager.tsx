"use client";

import { ToastContainer } from "@/components/toast";
import { useStore } from "@/components/store-provider";

export function ToastManager() {
  const { state, removeToast } = useStore();
  return <ToastContainer toasts={state.toasts} removeToast={removeToast} />;
}
