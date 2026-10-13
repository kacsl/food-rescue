import type { CSSProperties } from "react";
import { TOAST_TONES, type ToastTone } from "valere-DS";

export { TOAST_TONES, type ToastTone };

const borderByTone: Record<ToastTone, string> = {
  Info: "var(--color-status-info-border, #007bab)",
  Success: "var(--color-status-success-border, #2d974f)",
  Warning: "var(--color-status-warning-border, #ab7300)",
  Error: "var(--color-status-error-border, #d7463c)",
};

const iconColorByTone: Record<ToastTone, string> = {
  Info: "var(--color-icon-info, #00668f)",
  Success: "var(--color-icon-success, #1a7f3d)",
  Warning: "var(--color-icon-warning, #8f5f00)",
  Error: "var(--color-icon-error, #b8342c)",
};

function ToastToneIcon({ tone }: { tone: ToastTone }) {
  if (tone === "Success") {
    // Figma node 607:109 (icon/circle-check)
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        style={{ display: "block", width: "var(--size-icon-md, 20px)", height: "var(--size-icon-md, 20px)" }}
      >
        <path
          d="M17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10ZM19.1667 10C19.1667 15.0626 15.0626 19.1667 10 19.1667C4.93739 19.1667 0.833333 15.0626 0.833333 10C0.833333 4.93739 4.93739 0.833333 10 0.833333C15.0626 0.833333 19.1667 4.93739 19.1667 10Z"
          fill="currentColor"
        />
        <path
          d="M11.9108 7.74414C12.2362 7.4187 12.7638 7.4187 13.0892 7.74414C13.4146 8.06958 13.4146 8.59709 13.0892 8.92253L9.75586 12.2559C9.43042 12.5813 8.90291 12.5813 8.57747 12.2559L6.91081 10.5892C6.58537 10.2638 6.58537 9.73624 6.91081 9.41081C7.23624 9.08537 7.76376 9.08537 8.08919 9.41081L9.16667 10.4883L11.9108 7.74414Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (tone === "Warning") {
    // Figma node 607:119 (icon/triangle-alert)
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        style={{ display: "block", width: "var(--size-icon-md, 20px)", height: "var(--size-icon-md, 20px)" }}
      >
        <path
          d="M9.99151 1.65509C10.4337 1.65509 10.8684 1.77261 11.2505 1.99526C11.6316 2.21738 11.9472 2.53626 12.1652 2.91973L18.8302 14.5831L18.9075 14.728C19.0765 15.0708 19.1645 15.4487 19.1647 15.8323C19.1648 16.2709 19.0501 16.7024 18.831 17.0823C18.6119 17.4623 18.296 17.7774 17.9163 17.997C17.5366 18.2166 17.1057 18.3327 16.6671 18.3331H3.33299C2.89494 18.3357 2.46389 18.2233 2.08299 18.0068C1.6998 17.789 1.38059 17.4736 1.15851 17.0929C0.936531 16.7123 0.819312 16.2795 0.818337 15.8388C0.81738 15.3992 0.932704 14.9674 1.152 14.5864L7.81785 2.91973C8.03584 2.53613 8.35213 2.21741 8.73338 1.99526C9.11539 1.7727 9.5494 1.65511 9.99151 1.65509ZM9.99151 3.32175C9.84427 3.32178 9.69965 3.3608 9.57241 3.43487C9.44504 3.50909 9.3391 3.61587 9.26642 3.74412L9.2656 3.74656L2.59894 15.4132L2.59649 15.4165C2.52303 15.5437 2.48468 15.6887 2.485 15.8356C2.48539 15.9823 2.52428 16.1263 2.59812 16.2531C2.67215 16.38 2.77882 16.4856 2.90655 16.5582C3.03419 16.6308 3.17887 16.6678 3.32566 16.6665H16.6655C16.8117 16.6663 16.9556 16.6281 17.0822 16.555C17.2086 16.4818 17.3135 16.3763 17.3865 16.2498C17.4596 16.1232 17.4981 15.9793 17.498 15.8331C17.498 15.6869 17.4596 15.5431 17.3865 15.4165L17.3849 15.4132L10.7182 3.74656L10.7166 3.74412C10.6439 3.61593 10.5387 3.50907 10.4114 3.43487C10.2841 3.36066 10.1389 3.32175 9.99151 3.32175Z"
          fill="currentColor"
        />
        <path
          d="M9.16667 10.8333V7.5C9.16667 7.03976 9.53976 6.66667 10 6.66667C10.4602 6.66667 10.8333 7.03976 10.8333 7.5V10.8333C10.8333 11.2936 10.4602 11.6667 10 11.6667C9.53976 11.6667 9.16667 11.2936 9.16667 10.8333Z"
          fill="currentColor"
        />
        <path
          d="M10.0081 13.3333C10.4684 13.3333 10.8415 13.7064 10.8415 14.1667C10.8415 14.6269 10.4684 15 10.0081 15H10C9.53976 15 9.16667 14.6269 9.16667 14.1667C9.16667 13.7064 9.53976 13.3333 10 13.3333H10.0081Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (tone === "Error") {
    // Figma node 607:129 (icon/circle-x)
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        style={{ display: "block", width: "var(--size-icon-md, 20px)", height: "var(--size-icon-md, 20px)" }}
      >
        <path
          d="M17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10ZM19.1667 10C19.1667 15.0626 15.0626 19.1667 10 19.1667C4.93739 19.1667 0.833333 15.0626 0.833333 10C0.833333 4.93739 4.93739 0.833333 10 0.833333C15.0626 0.833333 19.1667 4.93739 19.1667 10Z"
          fill="currentColor"
        />
        <path
          d="M11.9108 6.91081C12.2362 6.58537 12.7638 6.58537 13.0892 6.91081C13.4146 7.23624 13.4146 7.76376 13.0892 8.08919L8.08919 13.0892C7.76376 13.4146 7.23624 13.4146 6.91081 13.0892C6.58537 12.7638 6.58537 12.2362 6.91081 11.9108L11.9108 6.91081Z"
          fill="currentColor"
        />
        <path
          d="M6.91081 6.91081C7.23624 6.58537 7.76376 6.58537 8.08919 6.91081L13.0892 11.9108C13.4146 12.2362 13.4146 12.7638 13.0892 13.0892C12.7638 13.4146 12.2362 13.4146 11.9108 13.0892L6.91081 8.08919C6.58537 7.76376 6.58537 7.23624 6.91081 6.91081Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  // Figma node 607:139 (icon/info)
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={{ display: "block", width: "var(--size-icon-md, 20px)", height: "var(--size-icon-md, 20px)" }}
    >
      <path
        d="M17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10ZM19.1667 10C19.1667 15.0626 15.0626 19.1667 10 19.1667C4.93739 19.1667 0.833333 15.0626 0.833333 10C0.833333 4.93739 4.93739 0.833333 10 0.833333C15.0626 0.833333 19.1667 4.93739 19.1667 10Z"
        fill="currentColor"
      />
      <path
        d="M9.16667 13.3333V10C9.16667 9.53976 9.53976 9.16667 10 9.16667C10.4602 9.16667 10.8333 9.53976 10.8333 10V13.3333C10.8333 13.7936 10.4602 14.1667 10 14.1667C9.53976 14.1667 9.16667 13.7936 9.16667 13.3333Z"
        fill="currentColor"
      />
      <path
        d="M10.0081 5.83333C10.4684 5.83333 10.8415 6.20643 10.8415 6.66667C10.8415 7.1269 10.4684 7.5 10.0081 7.5H10C9.53976 7.5 9.16667 7.1269 9.16667 6.66667C9.16667 6.20643 9.53976 5.83333 10 5.83333H10.0081Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ToastCloseIcon() {
  // Figma node 607:69 (icon/x, 16x16)
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ display: "block", width: "var(--size-icon-sm, 16px)", height: "var(--size-icon-sm, 16px)" }}
    >
      <path
        d="M11.5286 3.52865C11.789 3.2683 12.211 3.2683 12.4714 3.52865C12.7317 3.789 12.7317 4.211 12.4714 4.47135L4.47135 12.4714C4.211 12.7317 3.789 12.7317 3.52865 12.4714C3.2683 12.211 3.2683 11.789 3.52865 11.5286L11.5286 3.52865Z"
        fill="currentColor"
      />
      <path
        d="M3.52865 3.52865C3.789 3.2683 4.211 3.2683 4.47135 3.52865L12.4714 11.5286C12.7317 11.789 12.7317 12.211 12.4714 12.4714C12.211 12.7317 11.789 12.7317 11.5286 12.4714L3.52865 4.47135C3.2683 4.211 3.2683 3.789 3.52865 3.52865Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * C25 – Toast component
 * Synchronized with Figma node 1122:23 / 1122:59 (Design-system---Kari-s-side-project)
 */
export function Toast({
  tone = "Info",
  title = "Report published",
  body = "Everyone in the workspace can read it now.",
  showBody = true,
  actionLabel = "Undo",
  showAction = false,
  showClose = true,
  onAction,
  onClose,
  style,
}: {
  tone?: ToastTone;
  title?: string;
  body?: string;
  showBody?: boolean;
  actionLabel?: string;
  showAction?: boolean;
  showClose?: boolean;
  onAction?: () => void;
  onClose?: () => void;
  style?: CSSProperties;
}) {
  return (
    <div
      role="status"
      style={{
        display: "flex",
        alignItems: showBody || showAction ? "flex-start" : "center",
        gap: "var(--space-inline-md, 12px)",
        width: "min(100%, 400px)",
        padding: "var(--space-inset-md, 16px)",
        borderRadius: "var(--radius-control, 12px)",
        border: `var(--border-hairline, 1px) solid ${borderByTone[tone]}`,
        background: "var(--color-background-surface, #ffffff)",
        boxShadow:
          "var(--elevation-3, 0px 4px 8px 0px rgba(0, 0, 0, 0.06), 0px 0px 4px 0px rgba(0, 0, 0, 0.04))",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "var(--size-icon-md, 20px)",
          height: "var(--size-icon-md, 20px)",
          flexShrink: 0,
          color: iconColorByTone[tone],
        }}
      >
        <ToastToneIcon tone={tone} />
      </span>

      <div
        style={{
          flex: "1 0 0",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "var(--space-stack-xs, 4px)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-family-brand)",
            fontSize: "var(--font-size-body-sm, 14px)",
            fontWeight: "var(--font-weight-semibold, 600)",
            lineHeight: "normal",
            color: "var(--color-text-primary, #303036)",
            wordBreak: "break-word",
          }}
        >
          {title}
        </p>

        {showBody ? (
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-family-brand)",
              fontSize: "var(--font-size-body-xs, 12px)",
              fontWeight: "var(--font-weight-regular, 400)",
              lineHeight: "normal",
              color: "var(--color-text-secondary, #5c5c63)",
              wordBreak: "break-word",
            }}
          >
            {body}
          </p>
        ) : null}

        {showAction ? (
          <div style={{ display: "flex", alignItems: "flex-start", paddingTop: "var(--space-stack-xs, 4px)" }}>
            <button
              type="button"
              onClick={onAction}
              style={{
                padding: 0,
                border: "none",
                background: "transparent",
                fontFamily: "var(--font-family-brand)",
                fontSize: "var(--font-size-body-xs, 12px)",
                fontWeight: "var(--font-weight-semibold, 600)",
                lineHeight: "normal",
                color: "var(--color-text-brand, #be240c)",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              {actionLabel}
            </button>
          </div>
        ) : null}
      </div>

      {showClose ? (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="evolve-icon-button"
          data-variant="Ghost"
          data-size="SM"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "var(--size-control-sm, 36px)",
            height: "var(--size-control-sm, 36px)",
            flexShrink: 0,
            borderRadius: "var(--radius-control, 12px)",
            border: "none",
            background: "transparent",
            color: "var(--color-icon-muted, #75757d)",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <ToastCloseIcon />
        </button>
      ) : null}
    </div>
  );
}
