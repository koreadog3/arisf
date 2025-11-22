// src/components/Pagination.jsx
export default function Pagination({ page, totalPages, onPrev, onNext }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4">
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className="px-3 py-2 rounded-lg bg-panel border border-line text-sm disabled:opacity-40"
      >
        이전
      </button>
      <div className="text-sm text-muted">
        {page} / {totalPages}
      </div>
      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className="px-3 py-2 rounded-lg bg-panel border border-line text-sm disabled:opacity-40"
      >
        다음
      </button>
    </div>
  );
}
