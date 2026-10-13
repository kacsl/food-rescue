export const FIELD_STATES = [
  "Default",
  "Hover",
  "Focus",
  "Filled",
  "Error",
  "Disabled",
  "Typing",
  "Selected",
  "Open",
  "Pressed",
  "Writting",
  "Loading",
] as const;

export type FieldState = (typeof FIELD_STATES)[number];
export type FieldSize = "MD" | "LG";

export function fieldHeight(size: FieldSize): string {
  return size === "LG" ? "var(--size-control-lg)" : "var(--size-control-md)";
}

export function fieldChrome(state: FieldState): {
  background: string;
  borderColor: string;
  borderWidth: string;
  color: string;
  boxShadow: string;
} {
  const ring = "0 0 0 var(--border-focus-ring) var(--color-border-focus)";
  if (state === "Disabled") {
    return {
      background: "var(--color-background-subtle)",
      borderColor: "var(--color-border-subtle)",
      borderWidth: "var(--border-hairline)",
      color: "var(--color-text-disabled)",
      boxShadow: "none",
    };
  }
  if (state === "Error") {
    return {
      background: "var(--color-background-surface)",
      borderColor: "var(--color-status-error-border)",
      borderWidth: "var(--border-emphasis)",
      color: "var(--color-text-primary)",
      boxShadow: "none",
    };
  }
  if (state === "Focus" || state === "Typing" || state === "Writting" || state === "Open") {
    return {
      background: "var(--color-background-surface)",
      borderColor: "var(--color-border-focus)",
      borderWidth: "var(--border-hairline)",
      color: "var(--color-text-primary)",
      boxShadow: ring,
    };
  }
  if (state === "Hover" || state === "Pressed") {
    return {
      background: "var(--color-background-surface)",
      borderColor: "var(--color-border-strong)",
      borderWidth: "var(--border-hairline)",
      color: "var(--color-text-primary)",
      boxShadow: "none",
    };
  }
  return {
    background: "var(--color-background-surface)",
    borderColor: "var(--color-border-default)",
    borderWidth: "var(--border-hairline)",
    color: state === "Filled" || state === "Selected" ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
    boxShadow: "none",
  };
}
