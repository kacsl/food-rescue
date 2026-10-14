import { useRef, useState, type ChangeEvent } from "react";
import { IconButton } from "valere-DS";
import { PencilIcon } from "@heroicons/react/24/outline";
import { KariAvatar } from "@/components/ds/avatar";

type EditableAvatarProps = {
  name: string;
  src?: string;
  size?: number;
  onPhotoChange: (dataUrl: string) => void;
  onError: (message: string) => void;
};

/**
 * Avatar with a photo edit control. Upload failures are reported through `onError`.
 * valere-DS Avatar can show an image, but it has no edit action or file input.
 */
export function EditableAvatar({ name, src, size = 96, onPhotoChange, onError }: EditableAvatarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editState, setEditState] = useState<"Default" | "Hover" | "Active">("Default");

  function openPicker() {
    inputRef.current?.click();
  }

  function onFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      onError("Choose an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        onError("Couldn't read that image");
        return;
      }
      onPhotoChange(reader.result);
    };
    reader.onerror = () => {
      onError("Couldn't read that image");
    };
    reader.readAsDataURL(file);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "var(--radius-pill, 9999px)",
            overflow: "hidden",
            border: "1px solid var(--color-border-subtle, #e6e7ed)",
            background: "var(--color-background-muted, #f2f2f6)",
          }}
        >
          {src ? (
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <KariAvatar
              size={size}
              tabIndex={-1}
              aria-hidden="true"
              style={{ pointerEvents: "none", border: "none", background: "var(--color-background-muted, #f2f2f6)" }}
            />
          )}
        </div>

        <span style={{ position: "absolute", right: 0, bottom: 2 }}>
          <IconButton
            variant="Outline"
            size="XS"
            state={editState}
            aria-label={`Edit photo for ${name}`}
            onClick={openPicker}
            onMouseEnter={() => setEditState("Hover")}
            onMouseLeave={() => setEditState("Default")}
            onMouseDown={() => setEditState("Active")}
            onMouseUp={() => setEditState("Hover")}
            icon={<PencilIcon width={14} height={14} strokeWidth={1.75} aria-hidden="true" />}
            style={{
              borderRadius: "var(--radius-pill, 9999px)",
              borderColor: "var(--color-border-subtle, #e6e7ed)",
              transition: "background-color 0.15s ease, transform 0.15s ease",
              transform: editState === "Hover" ? "scale(1.06)" : editState === "Active" ? "scale(0.95)" : "scale(1)",
            }}
          />
        </span>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onFile}
          tabIndex={-1}
          aria-hidden="true"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
