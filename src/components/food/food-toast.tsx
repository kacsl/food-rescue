"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Toast, type ToastTone } from "@/components/ds/toast";

const AUTO_DISMISS_MS = 4000;

export type FoodToastMessage = {
  tone: ToastTone;
  title: string;
  body?: string;
  position?: "top" | "bottom";
};

type ActiveToast = FoodToastMessage & { id: number };

type FoodToastContextValue = {
  toast: ActiveToast | null;
  showToast: (message: FoodToastMessage) => void;
  dismissToast: () => void;
};

const FoodToastContext = createContext<FoodToastContextValue | null>(null);

/** Holds the single toast shown inside the food phone. A new toast replaces the current one. */
export function FoodToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ActiveToast | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const dismissToast = useCallback(() => {
    clearTimer();
    setToast(null);
  }, [clearTimer]);

  const showToast = useCallback(
    (message: FoodToastMessage) => {
      clearTimer();
      setToast({ ...message, id: Date.now() });
      timer.current = setTimeout(() => setToast(null), AUTO_DISMISS_MS);
    },
    [clearTimer],
  );

  useEffect(() => clearTimer, [clearTimer]);

  const value = useMemo(() => ({ toast, showToast, dismissToast }), [toast, showToast, dismissToast]);

  return <FoodToastContext.Provider value={value}>{children}</FoodToastContext.Provider>;
}

/** Shows success, error, and info feedback as a toast. Must be used inside `FoodToastProvider`. */
export function useFoodToast() {
  const context = useContext(FoodToastContext);
  if (!context) throw new Error("useFoodToast must be used inside FoodToastProvider");
  return context;
}

/** Renders the active toast inside the phone (at the top when `toast.position === "top"`, otherwise at the bottom above the nav). */
export function FoodToastViewport({ raised = false }: { raised?: boolean }) {
  const { toast, dismissToast } = useFoodToast();
  if (!toast) return null;

  const isTop = toast.position === "top";
  const className = isTop
    ? "food-toast-viewport food-toast-viewport--top"
    : raised
      ? "food-toast-viewport food-toast-viewport--raised"
      : "food-toast-viewport";

  return (
    <div className={className}>
      <Toast
        key={toast.id}
        tone={toast.tone}
        title={toast.title}
        body={toast.body}
        showBody={Boolean(toast.body)}
        showAction={false}
        showClose
        onClose={dismissToast}
      />
    </div>
  );
}
