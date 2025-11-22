// src/api.js
const RAW_BASE = import.meta.env.VITE_API_BASE || "";

// 사용자가 실수로 끝에 /ews, /risk 같은 경로를 붙여도 자동 보정
function normalizeBase(raw) {
  let b = (raw || "").trim();
  b = b.replace(/\/+$/g, "");               // 끝 슬래시 제거
  b = b.replace(/\/(ews|risk|run)$/i, "");  // 잘못 붙은 경로 제거
  return b;
}

const API_BASE = normalizeBase(RAW_BASE);

async function fetchJSON(path, options = {}) {
  if (!API_BASE) {
    throw new Error("VITE_API_BASE가 비어있습니다. 환경변수를 확인해주세요.");
  }

  const url = `${API_BASE}${path}`;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`${res.status} ${res.statusText} ${text}`.trim());
    }
    return await res.json();
  } finally {
    clearTimeout(id);
  }
}

export function fetchEws() {
  return fetchJSON("/ews");
}

export function fetchRisk() {
  return fetchJSON("/risk");
}

export function manualRun() {
  return fetchJSON("/run", { method: "POST" });
}

