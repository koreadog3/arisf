// src/components/EmptyState.jsx
export default function EmptyState({ title, desc }) {
  return (
    <div className="rounded-2xl bg-panel border border-line p-8 text-center text-sm text-muted">
      <div className="text-white font-semibold">{title}</div>
      {desc && <div className="mt-2">{desc}</div>}
    </div>
  );
}
