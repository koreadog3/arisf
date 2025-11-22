import { useEffect } from "react";
import { X, HelpCircle } from "lucide-react";

export default function InfoModal({ open, onClose }) {
  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경(클릭하면 닫힘) */}
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close help"
      />

      {/* 모달 본체 */}
      <div className="relative w-[min(92vw,900px)] max-h-[85vh] overflow-y-auto rounded-2xl border border-line bg-panel p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-extrabold tracking-tight">
              ARIS 사용 방법
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted hover:bg-white/5 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-6 text-sm leading-relaxed text-zinc-200">
          {/* ARIS 소개 */}
          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">ARIS가 뭐예요?</h3>
            <p>
              ARIS는 <b>EWS</b>와 <b>RISK</b>를 합친 시스템입니다.
              <br />
              - EWS: “한국 안에서 외국 공관/대사관이 철수·업무중단·대피 권고” 같은
              <b>직접적 위험 신호</b>만 골라냅니다.
              <br />
              - RISK: 전세계 뉴스에서 전쟁·충돌·불안정 신호를 점수로 계산해
              <b>위험도 추세</b>를 보여줍니다.
            </p>
          </section>

          {/* EWS 설명 */}
          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">EWS(대사관 철수 경보)</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                “주한 ○○대사관/영사관 철수·대피·업무중단·휴관·폐쇄” 같은
                <b>한국 내 공관 변화</b>가 감지되면 올라옵니다.
              </li>
              <li>
                단순 해외 전쟁 기사(예: 중동 분쟁, 아프리카 내전)는 EWS가 아니라
                대부분 RISK로 들어가야 합니다.
              </li>
              <li>
                EWS 항목에는 GPT가 만든 <b>요약/번역</b>이 붙습니다
                (현재는 gpt-5-nano 기반).
              </li>
            </ul>
          </section>

          {/* RISK 설명 */}
          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">RISK(국제 위험도 신호)</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                전쟁, 군사충돌, 대규모 시위/쿠데타, 제재, 테러, 난민 대량이동,
                에너지·해운 충격 등 <b>불안정 신호</b>를 점수화합니다.
              </li>
              <li>
                점수는 0~10 범위로 표시됩니다. 최근 기사일수록 점수가 더 큽니다.
              </li>
              <li>
                여러 나라가 동시에 얽힌 기사면 “국가A | 국가B” 형태로 키가 잡힙니다.
              </li>
            </ul>
          </section>

          {/* 시그널 */}
          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">시그널(분류) 읽는 법</h3>
            <p>RISK에는 다음 신호가 붙습니다.</p>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="rounded-xl border border-line bg-bg/40 p-3">
                <div className="font-bold text-white">military</div>
                <div className="text-xs text-muted">
                  미사일·공습·전투·동원령 등 군사적 움직임
                </div>
              </div>
              <div className="rounded-xl border border-line bg-bg/40 p-3">
                <div className="font-bold text-white">diplomacy</div>
                <div className="text-xs text-muted">
                  휴전·협상·제재·대사 추방/소환 등 외교적 충돌
                </div>
              </div>
              <div className="rounded-xl border border-line bg-bg/40 p-3">
                <div className="font-bold text-white">civil</div>
                <div className="text-xs text-muted">
                  폭동·대규모 시위·테러·난민 급증 등 사회 불안
                </div>
              </div>
              <div className="rounded-xl border border-line bg-bg/40 p-3">
                <div className="font-bold text-white">economy</div>
                <div className="text-xs text-muted">
                  유가·환율 충격, 해운/항만 차질, 전쟁 보험료 급등 등
                </div>
              </div>
            </div>
          </section>

          {/* 위험 등급 */}
          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">위험 등급</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li><b>고위험</b> (7.0~) : 실제 충돌/확전 가능성이 매우 높음</li>
              <li><b>경계</b> (4.0~6.9): 확전·대규모 사건 위험이 상승 중</li>
              <li><b>주의</b> (2.0~3.9): 불안정 신호가 나타나기 시작</li>
              <li><b>낮음</b> (0.0~1.9): 단발성·약한 신호</li>
            </ul>
          </section>

          {/* 주의문 */}
          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">주의</h3>
            <p>
              이 시스템은 “조기 경보 도구”입니다.  
              자동 분류 특성상 오탐/누락이 있을 수 있으니,
              중요한 판단은 반드시 원문과 여러 출처를 함께 확인해 주세요.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
