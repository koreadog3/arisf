// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import { HelpCircle } from "lucide-react";

import TopBar from "./components/TopBar.jsx";
import Tabs from "./components/Tabs.jsx";
import EventCard from "./components/EventCard.jsx";
import Pagination from "./components/Pagination.jsx";
import EmptyState from "./components/EmptyState.jsx";
import RiskCharts from "./components/RiskCharts.jsx";
import InfoModal from "./components/InfoModal.jsx";

import { fetchEws, fetchRisk, manualRun } from "./api.js";

const PAGE_SIZE = 5;

export default function App() {
  const [tab, setTab] = useState("ews");
  const [ews, setEws] = useState([]);
  const [risk, setRisk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [pageEws, setPageEws] = useState(1);
  const [pageRisk, setPageRisk] = useState(1);

  // 도움말 모달
  const [infoOpen, setInfoOpen] = useState(false);

  async function loadAll({ showSpinner = true } = {}) {
    try {
      if (showSpinner) setLoading(true);
      setError("");
      const [e, r] = await Promise.all([fetchEws(), fetchRisk()]);
      setEws(Array.isArray(e) ? e : []);
      setRisk(Array.isArray(r) ? r : []);
    } catch (err) {
      setError(String(err?.message || err));
    } finally {
      if (showSpinner) setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (tab === "ews") setPageEws(1);
    if (tab === "risk") setPageRisk(1);
  }, [tab]);

  const ewsPaged = useMemo(() => {
    const start = (pageEws - 1) * PAGE_SIZE;
    return ews.slice(start, start + PAGE_SIZE);
  }, [ews, pageEws]);

  const riskPaged = useMemo(() => {
    const start = (pageRisk - 1) * PAGE_SIZE;
    return risk.slice(start, start + PAGE_SIZE);
  }, [risk, pageRisk]);

  const totalPagesEws = Math.max(1, Math.ceil(ews.length / PAGE_SIZE));
  const totalPagesRisk = Math.max(1, Math.ceil(risk.length / PAGE_SIZE));

  async function handleRefresh() {
    setRefreshing(true);
    try {
      await manualRun().catch(() => null);
      await loadAll({ showSpinner: false });
    } finally {
      setRefreshing(false);
    }
  }

  const list = tab === "ews" ? ewsPaged : riskPaged;
  const totalCount = tab === "ews" ? ews.length : risk.length;

  return (
    <div className="min-h-screen bg-bg text-white">
      <TopBar onRefresh={handleRefresh} refreshing={refreshing} />

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        {/* 탭 + 도움말 버튼 줄 */}
        <div className="flex items-center justify-between gap-3">
          <Tabs tab={tab} setTab={setTab} />

          <button
            onClick={() => setInfoOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-3 py-2 text-sm hover:bg-white/5 active:scale-[0.98]"
            aria-label="ARIS 사용방법"
          >
            <HelpCircle className="h-4 w-4" />
            사용방법
          </button>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
            불러오는 중 오류가 발생했습니다: {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl bg-panel border border-line p-6 text-sm text-muted">
            데이터 불러오는 중…
          </div>
        ) : totalCount === 0 ? (
          <EmptyState
            title={tab === "ews" ? "EWS 신호가 없습니다" : "RISK 신호가 없습니다"}
            desc="새 기사들이 들어오면 자동으로 표시됩니다."
          />
        ) : (
          <div className="space-y-3">
            {/* RISK 탭일 때만 그래프 */}
            {tab === "risk" && risk.length > 0 && (
              <RiskCharts risk={risk} />
            )}

            {list.map((it, idx) => (
              <EventCard key={it.link || it.pub || idx} mode={tab} item={it} />
            ))}

            {tab === "ews" ? (
              <Pagination
                page={pageEws}
                totalPages={totalPagesEws}
                onPrev={() => setPageEws((p) => Math.max(1, p - 1))}
                onNext={() =>
                  setPageEws((p) => Math.min(totalPagesEws, p + 1))
                }
              />
            ) : (
              <Pagination
                page={pageRisk}
                totalPages={totalPagesRisk}
                onPrev={() => setPageRisk((p) => Math.max(1, p - 1))}
                onNext={() =>
                  setPageRisk((p) => Math.min(totalPagesRisk, p + 1))
                }
              />
            )}
          </div>
        )}

        <footer className="pt-6 text-center text-xs text-muted">
          Powered by Logo&apos;s Studio · {new Date().toISOString().slice(0, 10)}
        </footer>
      </main>

      {/* 도움말 모달 */}
      <InfoModal open={infoOpen} onClose={() => setInfoOpen(false)} />
    </div>
  );
}
