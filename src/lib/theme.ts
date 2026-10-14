"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

let listeners: (() => void)[] = [];

function emitChange() {
  for (const listener of listeners) listener();
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.setAttribute("data-theme", theme);
}

function subscribe(callback: () => void) {
  listeners = [...listeners, callback];
  const onStorageChange = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    applyTheme(event.newValue === "dark" ? "dark" : "light");
    emitChange();
  };
  window.addEventListener("storage", onStorageChange);

  return () => {
    listeners = listeners.filter((listener) => listener !== callback);
    window.removeEventListener("storage", onStorageChange);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

/**
 * Reads and updates the app theme. Always defaults to light mode unless the
 * user has explicitly set dark mode in localStorage.
 */
export function useTheme(): [Theme, (next: Theme) => void] {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function setTheme(next: Theme) {
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    emitChange();
  }

  return [theme, setTheme];
}
