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
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    applyTheme(media.matches ? "dark" : "light");
    emitChange();
  };
  media.addEventListener("change", onSystemChange);

  return () => {
    listeners = listeners.filter((listener) => listener !== callback);
    media.removeEventListener("change", onSystemChange);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

/**
 * Reads and updates the app theme. The root layout script sets the initial
 * `data-theme` from storage or the system preference before first paint.
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
