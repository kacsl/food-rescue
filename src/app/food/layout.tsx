import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Kari · Food nearby",
  description: "Find food nearby and manage donations before they go to waste.",
};

export default function FoodLayout({ children }: { children: ReactNode }) {
  return children;
}
