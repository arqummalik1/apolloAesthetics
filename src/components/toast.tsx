"use client";

import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "info";
  onClose: () => void;
};

export function Toast({ message, type = "success", onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-[color:var(--navy-700)]" : "bg-[color:var(--navy-600)]";

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full px-6 py-4 shadow-[0_20px_60px_rgba(26,34,56,0.25)] transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${bgColor}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">✨</span>
        <p className="text-base font-semibold text-white">{message}</p>
      </div>
    </div>
  );
}

type ToastState = {
  message: string;
  type: "success" | "info";
  id: number;
};

export function ToastContainer({ toasts, removeToast }: { toasts: ToastState[]; removeToast: (id: number) => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}
