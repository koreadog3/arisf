// src/components/EventCard.jsx
import { ExternalLink, MapPin, SignalHigh, Globe2 } from "lucide-react";

const signalNameKR = {
  military: "군사",
  diplomacy: "외교",
  civil: "민간",
  economy: "경제",
};

function bandStyle(band) {
  switch (band) {
    case "고위험":
      return "bg-red-500/15 text-red-200 border-red-400/30";
    case "경계":
      return "bg-orange-500/15 text-orange-200 border-orange-400/30";
    case "주의":
      return "bg-yellow-500/15 text-yellow-100 border-yellow-400/30";
    default:
      return "bg-emerald-500/15 text-emerald-200 border-emerald-400/30";
  }
}

function fmtKST(iso) {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: "Asia/Seoul",
    }).format(d);
  } catch {
    return iso || "-";
  }
}

function safeJSON(x, fallback) {
  if (!x) return fallback;
  if (typeof x === "object") return x;
  try {
    return JSON.parse(x);
  } catch {
    return fallback;
  }
}

export default function EventCard({ mode, item }) {
  const pub = fmtKST(item.pub);
  const link = item.link || "";
  const domain = (() => {
    try {
      return new URL(link).hostname;
    } catch {
      return "";
    }
  })();

  // -----------------------------
  // EWS 카드
  // -----------------------------
  if (mode === "ews") {
    const countries = safeJSON(item.countries, item.countries) || ["미상"];

    return (
      <article className="rounded-2xl bg-panel border border-line p-4 hover:border-white/20 transition">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold leading-snug">
            {item.title || "(제목 없음)"}
          </h3>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 p-2 rounded-lg bg-bg border border-line hover:border-white/30"
              aria-label="원문 보기"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Globe2 className="h-3 w-3" />
            {domain || "source"}
          </span>
          <span>· {pub}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {(Array.isArray(countries) ? countries : [countries]).map((c, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-lg bg-bg border border-line"
            >
              {c}
            </span>
          ))}
        </div>

        {/* AI 요약/번역 표시 */}
        {item.summary && (
          <p className="mt-3 text-sm leading-relaxed text-white/90 whitespace-pre-line">
            {item.summary}
          </p>
        )}
      </article>
    );
  }

  // -----------------------------
  // RISK 카드
  // -----------------------------
  const signals = safeJSON(item.signals, {});
  const sigEntries = Object.entries(signals || {}).filter(([, v]) => v > 0);

  return (
    <article className="rounded-2xl bg-panel border border-line p-4 hover:border-white/20 transition">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold leading-snug">
          {item.title || "(제목 없음)"}
        </h3>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 p-2 rounded-lg bg-bg border border-line hover:border-white/30"
            aria-label="원문 보기"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <Globe2 className="h-3 w-3" />
          {domain || "source"}
        </span>
        <span>· {pub}</span>
        {item.key && (
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {item.key}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded-lg border ${bandStyle(item.band)}`}>
          {item.band || "낮음"}
        </span>
        <span className="text-sm font-semibold">
          점수 {Number(item.score || 0).toFixed(2)}
        </span>
        <div className="ml-auto w-28 h-2 rounded-full bg-bg border border-line overflow-hidden">
          <div
            className="h-full bg-white/80"
            style={{
              width: `${Math.min(
                100,
                (Number(item.score || 0) / 10) * 100
              )}%`,
            }}
          />
        </div>
      </div>

      {sigEntries.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {sigEntries.map(([k, v]) => (
            <span
              key={k}
              className="text-xs px-2 py-1 rounded-lg bg-bg border border-line inline-flex items-center gap-1"
              title={k}
            >
              <SignalHigh className="h-3 w-3" />
              {signalNameKR[k] || k}:{v}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
