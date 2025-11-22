// src/components/Tabs.jsx
import { Shield, Flame } from "lucide-react";

export default function Tabs({ tab, setTab }) {
  const common =
    "flex-1 px-4 py-2 rounded-xl border border-line text-sm font-semibold transition flex items-center justify-center gap-2";
  const active = "bg-white text-black border-white";
  const inactive = "bg-panel text-white hover:bg-panel/80";

  return (
    <div className="grid grid-cols-2 gap-2 bg-bg p-1 rounded-2xl border border-line">
      <button
        className={`${common} ${tab === "ews" ? active : inactive}`}
        onClick={() => setTab("ews")}
      >
        <Shield className="h-4 w-4" />
        EWS
      </button>
      <button
        className={`${common} ${tab === "risk" ? active : inactive}`}
        onClick={() => setTab("risk")}
      >
        <Flame className="h-4 w-4" />
        RISK
      </button>
    </div>
  );
}
