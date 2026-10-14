import type { ReactNode } from "react";
import { BottomNav } from "@/components/ds/bottom-nav";
import { IconButton } from "valere-DS";
import { StatusBar } from "./status-bar";
import "./food-phone.css";

export type FoodScreen = "nearby" | "donations" | "notifications";

type PhoneFrameProps = {
  screen: FoodScreen;
  onScreen: (screen: FoodScreen) => void;
  notificationCount?: number;
  showCreate?: boolean;
  onCreate?: () => void;
  hideNav?: boolean;
  hideBlobs?: boolean;
  /** Logged-out screens use the home-frame blob positions. */
  gateBlobs?: boolean;
  contentKey?: string;
  overlay?: ReactNode;
  children: ReactNode;
};

export function PhoneFrame({
  screen,
  onScreen,
  notificationCount,
  showCreate,
  onCreate,
  hideNav = false,
  hideBlobs = false,
  gateBlobs = false,
  contentKey,
  overlay,
  children,
}: PhoneFrameProps) {
  return (
    <div className="food-stage">
      <div className="food-scaler">
        <div className={gateBlobs ? "food-phone food-phone--gate" : "food-phone"}>
          {!hideBlobs && (
            <>
              <span aria-hidden="true" className="food-blob food-blob--shape-bottom food-blob--bottom" />
              <span aria-hidden="true" className="food-blob food-blob--shape-top food-blob--top" />
            </>
          )}

          <div
            className="food-phone__scroll"
            style={{
              paddingBottom: hideNav ? 0 : 120,
              background: hideBlobs ? "var(--color-background-canvas, #ffffff)" : "transparent",
            }}
          >
            <StatusBar />
            <div key={contentKey ?? screen} className="food-page-view">
              {children}
            </div>
          </div>

          {showCreate && !hideNav ? (
            <div className="food-phone__fab">
              <IconButton
                variant="Primary"
                size="LG"
                aria-label="New donation"
                onClick={onCreate}
                icon={<img src="/food/plus.svg" width={20} height={20} alt="" />}
              />
            </div>
          ) : null}

          {!hideNav && (
            <div className="food-phone__nav">
              <BottomNav
                activeId={screen}
                notificationCount={notificationCount}
                onSelect={(id) => onScreen(id as FoodScreen)}
              />
            </div>
          )}

          {overlay}
        </div>
      </div>
    </div>
  );
}
