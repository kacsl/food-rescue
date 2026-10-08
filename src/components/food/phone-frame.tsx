import type { ReactNode } from "react";
import { BottomNav } from "@/components/ds/bottom-nav";
import { IconButton } from "valere-DS";
import { StatusBar } from "./status-bar";
import "./food-phone.css";

export type FoodScreen = "nearby" | "donations";

type PhoneFrameProps = {
  screen: FoodScreen;
  onScreen: (screen: FoodScreen) => void;
  showCreate?: boolean;
  onCreate?: () => void;
  overlay?: ReactNode;
  children: ReactNode;
};

export function PhoneFrame({ screen, onScreen, showCreate, onCreate, overlay, children }: PhoneFrameProps) {
  return (
    <div className="food-stage">
      <div className="food-phone">
        <img className="food-blob food-blob--bottom" src="/food/blob-bottom.svg" width={595} height={583.19} alt="" />
        <img className="food-blob food-blob--top" src="/food/blob-top.svg" width={629} height={618} alt="" />

        <div className="food-phone__scroll">
          <StatusBar />
          {children}
        </div>

        {showCreate ? (
          <div className="food-phone__fab">
            <IconButton variant="Primary" size="LG" aria-label="New donation" onClick={onCreate} icon={<img src="/food/plus.svg" width={20} height={20} alt="" />} />
          </div>
        ) : null}

        <div className="food-phone__nav">
          <BottomNav activeId={screen} onSelect={(id) => onScreen(id as FoodScreen)} />
        </div>

        {overlay}
      </div>
    </div>
  );
}
