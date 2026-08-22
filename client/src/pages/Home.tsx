/**
 * MYK.RWT DESIGN REMINDER — Stillroom is a fresh clean technical loading chamber made of
 * calibration planes and an optical sphere. The post-loading page remains intentionally sparse.
 */
import { useEffect, useState } from "react";

type Stage = "calibrating" | "ready" | "opening" | "profile";

const links = [
  { label: "instagram", href: "https://instagram.com/myk.rwt" },
  { label: "github", href: "https://github.com/mykrwt" },
  { label: "discord", href: "https://discord.com" },
  { label: "email", href: "mailto:hello@myk.rwt" },
];

function StillroomCore() {
  const markers = [
    { x: 300, y: 94, delay: "0s" }, { x: 506, y: 300, delay: "0.5s" },
    { x: 300, y: 506, delay: "1s" }, { x: 94, y: 300, delay: "1.5s" },
  ];

  return (
    <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id="roomCore"><stop stopColor="#EDE9DD" stopOpacity=".24" /><stop offset="1" stopColor="#EDE9DD" stopOpacity="0" /></radialGradient>
        <linearGradient id="roomBeam" x1="300" y1="300" x2="524" y2="300"><stop stopColor="#C2E886" stopOpacity="0" /><stop offset=".72" stopColor="#C2E886" stopOpacity=".82" /><stop offset="1" stopColor="#C2E886" stopOpacity="0" /></linearGradient>
      </defs>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <g className="room-plane-a" opacity=".38"><rect x="166" y="166" width="268" height="268" strokeWidth="1.1" /><path d="M166 300h268M300 166v268" strokeWidth=".65" strokeDasharray="2 10" /></g>
        <g className="room-plane-b" opacity=".30"><rect x="194" y="194" width="212" height="212" strokeWidth="1" /><path d="M194 194 406 406M406 194 194 406" strokeWidth=".7" /></g>
        <g className="room-plane-c" opacity=".34"><rect x="220" y="220" width="160" height="160" strokeWidth=".85" strokeDasharray="4 7" /></g>
        <g className="room-orbit" opacity=".45"><circle cx="300" cy="300" r="207" strokeWidth=".8" strokeDasharray="2 11" /><circle cx="300" cy="300" r="177" strokeWidth=".6" strokeDasharray="3 15" /></g>
        <g className="room-sphere">
          <circle cx="300" cy="300" r="105" fill="url(#roomCore)" strokeWidth="1.2" opacity=".92" />
          <ellipse cx="300" cy="300" rx="105" ry="43" strokeWidth=".85" opacity=".7" />
          <ellipse cx="300" cy="300" rx="48" ry="105" strokeWidth=".85" opacity=".55" />
          <path d="M195 300h210M212 253c54 26 122 26 176 0M212 347c54-26 122-26 176 0" strokeWidth=".65" opacity=".6" />
          <circle cx="300" cy="300" r="31" strokeWidth="1.1" />
          <circle cx="300" cy="300" r="4.5" fill="currentColor" stroke="none" />
        </g>
        <g className="room-scan"><path d="M300 300 515 300" stroke="url(#roomBeam)" strokeWidth="1.4" /><circle cx="515" cy="300" r="4" fill="#C2E886" stroke="none" /></g>
        {markers.map(({ x, y, delay }) => <g key={`${x}-${y}`} className="room-marker" style={{ "--marker-delay": delay } as React.CSSProperties}><circle cx={x} cy={y} r="5" fill="#C2E886" stroke="none" /><circle cx={x} cy={y} r="11" stroke="#C2E886" strokeWidth=".7" /></g>)}
        <path d="M300 69v47M531 300h-47M300 531v-47M69 300h47" strokeWidth="1.05" opacity=".64" />
      </g>
    </svg>
  );
}

function MiniMonogram() {
  return <span className="relative grid h-5 w-5 place-items-center border border-[#ebe8df]/35 text-[8px] font-medium text-[#ebe8df]/65"><i className="absolute inset-[4px] border border-[#ebe8df]/25" /><i className="absolute h-1 w-1 rounded-full bg-[#c2e886]" /></span>;
}

export default function Home() {
  const [stage, setStage] = useState<Stage>(() => new URLSearchParams(window.location.search).has("showcase") ? "profile" : "calibrating");

  useEffect(() => {
    if (stage !== "calibrating") return;
    const timer = window.setTimeout(() => setStage("ready"), 800);
    return () => window.clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "opening") return;
    const timer = window.setTimeout(() => setStage("profile"), 980);
    return () => window.clearTimeout(timer);
  }, [stage]);

  const openProfile = () => setStage("opening");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#11110f] text-[#ebe8df]">
      <div className="deep-paper pointer-events-none absolute inset-0 opacity-30" />

      {stage === "profile" && (
        <section className="minimal-page relative flex min-h-screen items-center overflow-hidden px-7 py-16 sm:px-12 lg:px-20">
          <div className="profile-optic pointer-events-none absolute -right-44 top-1/2 h-[540px] w-[540px] -translate-y-1/2 opacity-45" />
          <div className="pointer-events-none absolute bottom-10 left-7 h-px w-16 bg-[#c2e886]/45 sm:left-12 lg:left-20" />
          <div className="w-full max-w-[580px]">
            <p className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] text-[#ebe8df]/42"><MiniMonogram /> Mayank Rawat</p>
            <h1 className="mt-6 text-[clamp(4.6rem,10vw,8.5rem)] font-semibold leading-[0.78] tracking-[-0.10em] text-[#f0eee7]">myk.rwt</h1>
            <p className="mt-7 max-w-[360px] text-[15px] leading-7 tracking-[-0.02em] text-[#ebe8df]/60 sm:text-base">making small things, collecting better questions, and spending too long on the details.</p>
            <nav className="mt-12 max-w-[420px] border-t border-[#ebe8df]/15" aria-label="Social links">
              {links.map(({ label, href }, index) => <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-[#ebe8df]/15 py-4 text-sm font-medium tracking-[-0.025em] text-[#ebe8df]/82 transition-all duration-200 hover:pl-2 hover:text-[#f0eee7]"><span className="flex items-center gap-3"><span className="relative font-mono text-[8px] tracking-[0.1em] text-[#c2e886]/58">0{index + 1}<i className="absolute left-[10px] top-1/2 h-px w-3 -translate-y-1/2 bg-[#c2e886]/30" /></span>{label}</span><span className="flex items-center gap-2"><i className="h-px w-4 bg-[#ebe8df]/15 transition-all duration-200 group-hover:w-7 group-hover:bg-[#c2e886]/50" /><span className="font-mono text-[11px] text-[#ebe8df]/30 transition-all duration-200 group-hover:text-[#c2e886]">↗</span></span></a>)}
            </nav>
          </div>
        </section>
      )}

      {stage !== "profile" && (
        <section className={`calibration fixed inset-0 z-20 bg-[#11110f] ${stage === "opening" ? "is-opening" : ""}`} data-ready={stage === "ready"}>
          <div className="calibration-chrome absolute left-6 top-6 font-mono text-[9px] tracking-[0.16em] text-[#ebe8df]/42 sm:left-10 sm:top-9">MYK.RWT / STILLROOM</div>
          <div className="calibration-chrome absolute right-6 top-6 font-mono text-[9px] tracking-[0.14em] text-[#ebe8df]/42 sm:right-10 sm:top-9">CALIBRATION / 01</div>
          <div className="calibration-chrome absolute bottom-6 left-6 font-mono text-[8px] tracking-[0.14em] text-[#ebe8df]/32 sm:bottom-9 sm:left-10">FRAME: 600 × 600</div>
          <div className="calibration-chrome absolute bottom-6 right-6 font-mono text-[8px] tracking-[0.14em] text-[#ebe8df]/32 sm:bottom-9 sm:right-10">STATUS: ALIGNING</div>
          <div className="room-core absolute left-1/2 top-1/2 h-[min(88vw,660px)] w-[min(88vw,660px)] min-h-[320px] min-w-[320px] -translate-x-1/2 -translate-y-1/2 text-[#ebe8df]/95">
            <StillroomCore />
          </div>
          {stage === "ready" && <button type="button" onClick={openProfile} className="enter-control absolute bottom-[13%] left-1/2 -translate-x-1/2 font-mono text-[10px] lowercase tracking-[0.28em] text-[#ebe8df]/68 transition-colors hover:text-[#ebe8df]">enter</button>}
        </section>
      )}
    </main>
  );
}
