"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [clicked, setClicked] = useState(false);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "var(--color-background-canvas)",
      }}
    >
      <Button
        label="Button"
        aria-pressed={clicked}
        onClick={() => setClicked((value) => !value)}
      />
    </main>
  );
}
