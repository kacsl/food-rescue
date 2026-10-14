"use client";

import { useEffect, type ReactNode } from "react";
import { BottomNav } from "@/components/ds/bottom-nav";
import { IconButton } from "valere-DS";
import { StatusBar } from "./status-bar";
import "./food-phone.css";

const MOBILE_FRAME_QUERY = "(pointer: coarse) and (max-width: 1024px)";

/** Keeps the mobile shell inside the visible viewport, above Safari's bottom search bar. */
function useMobileVisualViewport() {
  useEffect(() => {
    const root = document.documentElement;
    const query = window.matchMedia(MOBILE_FRAME_QUERY);

    function update() {
      if (!query.matches) {
        root.style.removeProperty("--food-vvh");
        root.style.removeProperty("--food-vv-top");
        return;
      }
      const viewport = window.visualViewport;
      root.style.setProperty("--food-vvh", `${viewport?.height ?? window.innerHeight}px`);
      root.style.setProperty("--food-vv-top", `${viewport?.offsetTop ?? 0}px`);
    }

    update();
    query.addEventListener("change", update);
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    window.addEventListener("orientationchange", update);

    return () => {
      query.removeEventListener("change", update);
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
      window.removeEventListener("orientationchange", update);
      root.style.removeProperty("--food-vvh");
      root.style.removeProperty("--food-vv-top");
    };
  }, []);
}

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
  useMobileVisualViewport();

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
              paddingBottom: hideNav ? 0 : "calc(120px + env(safe-area-inset-bottom, 0px))",
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
