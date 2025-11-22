// src/components/RiskCharts.jsx
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

function toKSTLabel(iso) {
  try {
    const d = new Date(iso);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${mm}/${dd} ${hh}:${mi}`;
  } catch {
    return iso || "-";
  }
}

export default function RiskCharts({ risk }) {
  const series = risk
    .slice()
    .sort((a, b) => new Date(a.pub) - new Date(b.pub))
    .slice(-30) // 최근 30개만
    .map((r) => ({
      time: toKSTLabel(r.pub),
      score: Number(r.score || 0),
    }));

  const bands = ["고위험", "경계", "주의", "낮음"];
  const bandCounts = bands.map((b) => ({
    band: b,
    count: risk.filter((r) => r.band === b).length,
  }));

  return (
    <div className="grid md:grid-cols-2 gap-3">
      {/* 점수 추이 */}
      <div className="rounded-2xl bg-panel border border-line p-4">
        <div className="text-sm font-semibold mb-2">최근 RISK 점수 추이</div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
              <YAxis domain={[0, 10]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="score" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 분포 */}
      <div className="rounded-2xl bg-panel border border-line p-4">
        <div className="text-sm font-semibold mb-2">위험도 분포</div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bandCounts} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="band" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
