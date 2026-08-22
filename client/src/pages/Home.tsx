/**
 * MYK.RWT DESIGN REMINDER — Expanded Original Pattern: a large original orbital crest builds
 * in layered hand-drawn passes before click; the final page remains only name, bio, and links.
 */
import { useEffect, useState, type CSSProperties } from "react";

type Stage = "ready" | "opening" | "profile";

const links = [
  { label: "instagram", href: "https://instagram.com/myk.rwt" },
  { label: "github", href: "https://github.com/mykrwt" },
  { label: "discord", href: "https://discord.com" },
  { label: "email", href: "mailto:hello@myk.rwt" },
];

function CrestPaths({ animated = false }: { animated?: boolean }) {
  const classFor = (pass: string) => animated ? `loader-stroke ${pass}` : "loader-stroke-static";
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path className={classFor("loader-stroke-one")} d="M250 36C215 106 152 120 65 87c49 58 56 112 14 163 76-23 132 1 171 63 39-62 95-86 171-63-42-51-35-105 14-163-87 33-150 19-185-51Z" strokeWidth="2.1" />
      <path className={classFor("loader-stroke-one")} d="M250 464c35-70 98-84 185-51-49-58-56-112-14-163-76 23-132-1-171-63-39 62-95 86-171 63 42 51 35 105-14 163 87-33 150-19 185 51Z" strokeWidth="1.7" />
      <path className={classFor("loader-stroke-two")} d="M250 96c-34 54-73 77-117 70 11 46 1 83-32 112 41 8 68 33 81 75 25-27 48-37 68-31 20-6 43 4 68 31 13-42 40-67 81-75-33-29-43-66-32-112-44 7-83-16-117-70Z" strokeWidth="1.5" />
      <path className={classFor("loader-stroke-two")} d="M112 184c59-5 100 18 138 66 38-48 79-71 138-66-31 43-36 83-14 120-47-4-84 15-124 54-40-39-77-58-124-54 22-37 17-77-14-120Z" strokeWidth="1.2" />
      <path className={classFor("loader-stroke-three")} d="M250 66v368M66 250h368M118 118l132 132 132-132M118 382l132-132 132 132" strokeWidth=".9" />
      <path className={classFor("loader-stroke-three")} d="M102 250c33-27 60-36 80-28 24 9 34 34 30 75m156-47c-33 27-60 36-80 28-24-9-34-34-30-75M250 102c27 33 36 60 28 80-9 24-34 34-75 30m47 156c-27-33-36-60-28-80 9-24 34-34 75-30" strokeWidth="1.05" />
      <circle className={classFor("loader-stroke-four")} cx="250" cy="250" r="110" strokeWidth=".85" strokeDasharray="2 10" />
      <circle className={classFor("loader-stroke-four")} cx="250" cy="250" r="154" strokeWidth=".7" strokeDasharray="3 14" />
      <circle className={classFor("loader-stroke-four")} cx="250" cy="250" r="10" strokeWidth="1.1" />
      <circle cx="250" cy="250" r="3.8" fill="currentColor" stroke="none" />
      <circle cx="250" cy="96" r="3.3" fill="currentColor" stroke="none" />
      <circle cx="404" cy="250" r="3.3" fill="currentColor" stroke="none" />
      <circle cx="250" cy="404" r="3.3" fill="currentColor" stroke="none" />
      <circle cx="96" cy="250" r="3.3" fill="currentColor" stroke="none" />
    </g>
  );
}

function OriginalCrest() {
  return (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="loader-mark h-full w-full overflow-visible" aria-hidden="true">
      <g opacity=".23"><CrestPaths /></g>
      <CrestPaths animated />
    </svg>
  );
}

function MiniMark() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ebe8df]/54" aria-hidden="true">
      <path d="M5 16c3-7 8-10 12-10 5 0 8 3 10 9-4-3-8-3-11-1-3 1-5 4-7 8-2-2-3-4-4-6ZM9 24c3-4 6-6 9-6 3 0 5 2 7 6-3-1-5-1-7 0-2 1-4 3-6 5l-3-5Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 4v24M4 16h24" stroke="currentColor" strokeWidth=".9" strokeLinecap="round" />
      <circle cx="16" cy="16" r="1.7" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  const [stage, setStage] = useState<Stage>(() => new URLSearchParams(window.location.search).has("showcase") ? "profile" : "ready");

  useEffect(() => {
    if (stage !== "opening") return;
    const timer = window.setTimeout(() => setStage("profile"), 1540);
    return () => window.clearTimeout(timer);
  }, [stage]);

  const playDoorSound = () => {
    if (!("AudioContext" in window)) return;

    const context = new AudioContext();
    const now = context.currentTime;
    const master = context.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.038, now + 0.08);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 1.18);
    master.connect(context.destination);

    const lowBody = context.createOscillator();
    lowBody.type = "sine";
    lowBody.frequency.setValueAtTime(116, now);
    lowBody.frequency.exponentialRampToValueAtTime(72, now + 1.08);
    lowBody.connect(master);

    const softCreak = context.createOscillator();
    const creakGain = context.createGain();
    softCreak.type = "triangle";
    softCreak.frequency.setValueAtTime(286, now + 0.04);
    softCreak.frequency.exponentialRampToValueAtTime(174, now + 0.88);
    creakGain.gain.setValueAtTime(0.0001, now);
    creakGain.gain.exponentialRampToValueAtTime(0.13, now + 0.13);
    creakGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);
    softCreak.connect(creakGain).connect(master);

    lowBody.start(now);
    softCreak.start(now + 0.04);
    lowBody.stop(now + 1.2);
    softCreak.stop(now + 1.02);
    window.setTimeout(() => context.close(), 1450);
  };

  const openProfile = () => {
    if (stage !== "ready") return;
    playDoorSound();
    setStage("opening");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#12120f] text-[#ebe8df]">
      <div className="deep-paper pointer-events-none absolute inset-0 opacity-30" />

      {stage === "profile" && (
        <section className="minimal-page flex min-h-screen items-center px-7 py-16 sm:px-12 lg:px-20">
          <div className="w-full max-w-[580px]">
            <p className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] text-[#ebe8df]/42"><MiniMark /> Mayank Rawat</p>
            <h1 className="mt-6 text-[clamp(4.6rem,10vw,8.5rem)] font-semibold leading-[0.78] tracking-[-0.10em] text-[#f0eee7]">myk.rwt</h1>
            <p className="mt-7 max-w-[360px] text-[15px] leading-7 tracking-[-0.02em] text-[#ebe8df]/60 sm:text-base">making small things, collecting better questions, and spending too long on the details.</p>
            <nav className="mt-12 max-w-[420px] border-t border-[#ebe8df]/15" aria-label="Social links">
              {links.map(({ label, href }, index) => <a key={label} href={href} target="_blank" rel="noreferrer" className="social-link-reveal group flex items-center justify-between border-b border-[#ebe8df]/15 py-4 text-sm font-medium tracking-[-0.025em] text-[#ebe8df]/82 transition-all duration-200 hover:pl-2 hover:text-[#f0eee7]" style={{ "--social-delay": `${index * 130}ms` } as CSSProperties}>{label}<span className="font-mono text-[11px] text-[#ebe8df]/30 transition-all duration-200 group-hover:text-[#ebe8df]/70">↗</span></a>)}
            </nav>
          </div>
        </section>
      )}

      {stage !== "profile" && (
        <section className={`loader-stage fixed inset-0 z-20 grid place-items-center bg-[#12120f] text-[#ebe8df] ${stage === "opening" ? "is-opening" : ""}`} data-ready={stage === "ready"}>
          <div className="relative z-10 flex flex-col items-center">
            <button type="button" onClick={openProfile} className="h-[min(76vw,480px)] w-[min(76vw,480px)] min-h-[250px] min-w-[250px] text-[#ebe8df]/85 transition-transform duration-500 hover:scale-[1.025] active:scale-95" aria-label="Open myk.rwt"><OriginalCrest /></button>
            {stage === "ready" && <button type="button" onClick={openProfile} className="click-control mt-7 font-mono text-[10px] lowercase tracking-[0.28em] text-[#ebe8df]/62 transition-colors hover:text-[#ebe8df]">click</button>}
          </div>
          <div className="gate-leaf gate-left opacity-0" />
          <div className="gate-leaf gate-right opacity-0" />
        </section>
      )}
    </main>
  );
}
