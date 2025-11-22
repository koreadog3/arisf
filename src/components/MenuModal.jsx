// src/components/MenuModal.jsx
import { useEffect } from "react";
import { X, ExternalLink, MessageSquare, Github, HelpCircle } from "lucide-react";

export default function MenuModal({ open, onClose, onOpenHelp }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // 형준님 디스코드 초대 링크로 바꿔주세요
  const DISCORD_INVITE = "https://discord.gg/your-invite";
  const GITHUB_REPO = "https://github.com/koreadog3/ARIS";

  return (
    <div className="fixed inset-0 z-40">
      <button
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="close backdrop"
      />

      <div className="absolute right-4 top-4 w-[min(92vw,420px)] rounded-2xl bg-panel border border-line shadow-soft p-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-extrabold tracking-tight">ARIS 메뉴</div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5"
            aria-label="close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 space-y-2 text-sm">
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-xl bg-bg border border-line px-3 py-2 hover:border-white/20"
          >
            <span className="inline-flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              디스코드 문의/피드백
            </span>
            <ExternalLink className="h-4 w-4 text-muted" />
          </a>

          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-xl bg-bg border border-line px-3 py-2 hover:border-white/20"
          >
            <span className="inline-flex items-center gap-2">
              <Github className="h-4 w-4" />
              GitHub 저장소
            </span>
            <ExternalLink className="h-4 w-4 text-muted" />
          </a>

          <button
            onClick={() => {
              onClose?.();
              onOpenHelp?.();
            }}
            className="w-full flex items-center justify-between rounded-xl bg-bg border border-line px-3 py-2 hover:border-white/20"
          >
            <span className="inline-flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              사용방법 / 안내
            </span>
            <span className="text-muted">열기</span>
          </button>

          <div className="mt-2 text-xs text-muted px-1 leading-relaxed">
            ARIS는 EWS(주한 공관 철수) + RISK(국제 위험도) 시스템입니다.
            문제/오탐/기능 제안은 디스코드로 연락 부탁드립니다.
          </div>
        </div>
      </div>
    </div>
  );
}
