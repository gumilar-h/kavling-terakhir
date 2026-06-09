"use client";

import { Suspense, type ReactNode } from "react";
import BottomNav, { type AppView } from "./BottomNav";

interface MobileAppFrameProps {
  children: ReactNode;
  activeView?: AppView;
  onViewChange?: (view: AppView) => void;
}

const MobileAppFrame = ({
  children,
  activeView,
  onViewChange,
}: MobileAppFrameProps) => {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1 overflow-y-auto pb-2">{children}</main>
      <Suspense fallback={null}>
        <BottomNav activeView={activeView} onViewChange={onViewChange} />
      </Suspense>
    </div>
  );
};

export default MobileAppFrame;
