// src/components/TopBar.jsx
import { Activity, RefreshCw, Menu } from "lucide-react";

export default function TopBar({ onRefresh, refreshing, onOpenMenu }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-bg/80 border-b border-line">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMenu}
            className="p-2 rounded-xl bg-panel border border-line hover:border-white/20"
            aria-label="menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <div className="h-9 w-9 rounded-xl bg-panel border border-line grid place-items-center shadow-sm">
              <Activity className="h-5 w-5 text-white/90" />
            </div>
            <div className="min-w-0">
              <div className="text-xl font-black tracking-wide truncate">ARIS</div>
              <div className="text-xs text-muted -mt-0.5 truncate">
                Alert Risk Intelligence Sentinel | 지능형 위협 감지 시스템
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onRefresh}
          className="px-3 py-2 rounded-xl bg-panel border border-line hover:border-white/20 hover:bg-panel/80 transition flex items-center gap-2 text-sm"
          disabled={refreshing}
          aria-label="refresh"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "업데이트 중" : "새로고침"}
        </button>
      </div>
    </header>
  );
}
