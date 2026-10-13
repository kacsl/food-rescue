export const AVATAR_TYPES = ["Initials", "Icon", "Image"] as const;
export const AVATAR_SIZES = ["SM", "MD", "LG", "XL", "2XL"] as const;
export type AvatarType = (typeof AVATAR_TYPES)[number];
export type AvatarSize = (typeof AVATAR_SIZES)[number];

const sizeVar: Record<AvatarSize, string> = {
  SM: "var(--size-control-xs)",
  MD: "var(--size-control-sm)",
  LG: "var(--size-control-md)",
  XL: "var(--size-control-lg)",
  "2XL": "var(--size-control-xl)",
};

const typeSize: Record<AvatarSize, string> = {
  SM: "var(--font-size-body-xs)",
  MD: "var(--font-size-body-sm)",
  LG: "var(--font-size-body-base)",
  XL: "var(--font-size-heading-sm)",
  "2XL": "var(--font-size-heading-base)",
};

export function Avatar({
  type = "Initials",
  size = "SM",
  initials = "VA",
  showStatus = false,
  src,
}: {
  type?: AvatarType;
  size?: AvatarSize;
  initials?: string;
  showStatus?: boolean;
  src?: string;
}) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: sizeVar[size], height: sizeVar[size] }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: "var(--radius-pill)",
          border: "var(--border-hairline) solid var(--color-border-subtle)",
          background: "var(--color-background-brand-subtle)",
          color: "var(--color-text-brand)",
          fontSize: typeSize[size],
          fontWeight: "var(--font-weight-semibold)",
        }}
      >
        {type === "Image" && src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="" src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : type === "Icon" ? (
          <span aria-hidden="true">●</span>
        ) : (
          initials
        )}
      </span>
      {showStatus ? (
        <span
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "var(--size-dot-md)",
            height: "var(--size-dot-md)",
            borderRadius: "var(--radius-pill)",
            background: "var(--color-status-success-solid)",
            boxShadow: "0 0 0 var(--border-hairline) var(--color-background-surface)",
          }}
        />
      ) : null}
    </span>
  );
}
