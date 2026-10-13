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
  overlay,
  children,
}: PhoneFrameProps) {
  return (
    <div className="food-stage">
      <div className="food-scaler">
        <div className="food-phone">
          {!hideBlobs && (
            <>
              <img className="food-blob food-blob--bottom" src="/food/blob-bottom.svg" width={595} height={583.19} alt="" />
              <img className="food-blob food-blob--top" src="/food/blob-top.svg" width={629} height={618} alt="" />
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
            <div key={screen} className="food-page-view">
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
