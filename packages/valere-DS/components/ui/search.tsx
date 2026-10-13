import { CloseIcon, SearchIcon, SpinnerIcon } from "../../lib/icons";
import { fieldChrome, fieldHeight, type FieldSize, type FieldState } from "../../lib/field-input";

export const SEARCH_STATES = ["Default", "Hover", "Focus", "Filled", "Loading", "Disabled"] as const;
export type SearchState = (typeof SEARCH_STATES)[number];

export function Search({
  state = "Default",
  size = "MD",
  value = "Search products…",
  showIconLeft = true,
}: {
  state?: SearchState;
  size?: FieldSize;
  value?: string;
  showIconLeft?: boolean;
}) {
  const chrome = fieldChrome(state as FieldState);
  const empty = state === "Default" || state === "Hover" || state === "Focus";
  const clearSize = size === "LG" ? "var(--size-control-sm)" : "var(--size-control-xs)";
  return (
    <div
      role="search"
      aria-label="Search"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-inline-sm)",
        width: "100%",
        height: fieldHeight(size),
        paddingInline: "var(--space-inset-md)",
        borderRadius: "var(--radius-control)",
        borderStyle: "solid",
        borderWidth: chrome.borderWidth,
        borderColor: chrome.borderColor,
        background: chrome.background,
        color: chrome.color,
        boxShadow: chrome.boxShadow,
      }}
    >
      {showIconLeft ? <SearchIcon /> : null}
      <span style={{ flex: 1, fontSize: "var(--font-size-body-sm)", color: empty ? "var(--color-text-tertiary)" : chrome.color }}>{value}</span>
      {state === "Loading" ? <SpinnerIcon /> : null}
      {state === "Filled" ? (
        <span style={{ display: "inline-flex", width: clearSize, height: clearSize, alignItems: "center", justifyContent: "center" }}>
          <CloseIcon />
        </span>
      ) : null}
    </div>
  );
}
