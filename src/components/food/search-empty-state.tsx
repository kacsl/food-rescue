import type { CSSProperties } from "react";
import { Button } from "@/components/ds/button";

const clearSearchButtonStyle: CSSProperties = {
  "--button-color": "var(--color-text-brand)",
  "--button-hover-color": "var(--color-text-brand)",
  "--button-active-color": "var(--color-action-primary-pressed)",
  "--button-background": "var(--color-background-surface)",
  "--button-hover-background": "var(--color-background-subtle)",
  "--button-active-background": "var(--color-background-muted)",
  "--button-border-color": "var(--color-border-subtle)",
  "--button-hover-border-color": "var(--color-border-subtle)",
  "--button-active-border-color": "var(--color-border-default)",
} as CSSProperties;

/** Figma 86:21207 — empty search results */
export function SearchEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="food-search-empty" role="status" aria-live="polite">
      <div className="food-search-empty__copy">
        <h2 className="food-search-empty__title">No results found</h2>
        <p className="food-search-empty__description">
          We couldn&apos;t find anything for that. Try using another keyword or clearing your filters
        </p>
      </div>
      <img
        className="food-search-empty__art"
        src="/food/search-empty-state.svg"
        alt=""
        aria-hidden="true"
        width={132}
        height={192}
      />
      <Button
        variant="Outline"
        size="LG"
        label="Clear search"
        onClick={onClear}
        className="food-search-empty__clear"
        style={clearSearchButtonStyle}
      />
    </div>
  );
}
