/**
 * MYK.RWT DESIGN REMINDER — Completed Crest: a fully closed original talisman line pattern
 * draws slowly in five phases; the revealed same-color page stays only name, bio, and links.
 */
import { useEffect, useState } from "react";

type Stage = "ready" | "opening" | "profile";

const links = [
  { label: "instagram", href: "https://instagram.com/myk.rwt" },
  { label: "github", href: "https://github.com/mykrwt" },
  { label: "discord", href: "https://discord.com" },
  { label: "email", href: "mailto:hello@myk.rwt" },
];

function CrestArtwork({ animated = false }: { animated?: boolean }) {
  const line = (pass: string) => animated ? `crest-line ${pass}` : "crest-line-static";
  const dot = (pass: string) => animated ? `crest-dot ${pass}` : "crest-dot-static";

  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path className={line("crest-pass-one")} d="M250 22C278 68 320 86 365 70c-16 48 3 86 54 108-44 30-54 70-28 116-50-5-85 16-101 60-25-37-55-37-80 0-16-44-51-65-101-60 26-46 16-86-28-116 51-22 70-60 54-108 45 16 87-2 115-48Z" strokeWidth="2.35" />
      <path className={line("crest-pass-one")} d="M250 478c-28-46-70-64-115-48 16-48-3-86-54-108 44-30 54-70 28-116 50 5 85-16 101-60 25 37 55 37 80 0 16 44 51 65 101 60-26 46-16 86 28 116-51 22-70 60-54 108-45-16-87 2-115 48Z" strokeWidth="1.75" />

      <path className={line("crest-pass-two")} d="M250 94c32 37 57 51 92 48-7 34 6 61 38 82-35 7-57 29-66 65-23-24-43-30-64-19-21-11-41-5-64 19-9-36-31-58-66-65 32-21 45-48 38-82 35 3 60-11 92-48Z" strokeWidth="1.55" />
      <path className={line("crest-pass-two")} d="M250 406c-32-37-57-51-92-48 7-34-6-61-38-82 35-7 57-29 66-65 23 24 43 30 64 19 21 11 41 5 64-19 9 36 31 58 66 65-32 21-45 48-38 82-35-3-60 11-92 48Z" strokeWidth="1.2" />

      <path className={line("crest-pass-three")} d="M250 250c-1-51 17-90 55-116 11 43 1 78-30 106 34-12 66-9 98 12-34 18-66 21-98 9 31 28 41 63 30 105-38-26-56-65-55-116Z" strokeWidth="1.25" />
      <path className={line("crest-pass-three")} d="M250 250c51-1 90 17 116 55-43 11-78 1-106-30 12 34 9 66-12 98-18-34-21-66-9-98-28 31-63 41-105 30 26-38 65-56 116-55Z" strokeWidth="1.1" />
      <path className={line("crest-pass-three")} d="M250 250c1 51-17 90-55 116-11-43-1-78 30-106-34 12-66 9-98-12 34-18 66-21 98-9-31-28-41-63-30-105 38 26 56 65 55 116Z" strokeWidth=".95" />
      <path className={line("crest-pass-three")} d="M250 250c-51 1-90-17-116-55 43-11 78-1 106 30-12-34-9-66 12-98 18 34 21 66 9 98 28-31 63-41 105-30-26 38-65 56-116 55Z" strokeWidth=".85" />
      <path className={line("crest-pass-three")} d="M250 192c18 18 23 38 15 58 20-8 40-3 58 15-18 18-38 23-58 15 8 20 3 40-15 58-18-18-23-38-15-58-20 8-40 3-58-15 18-18 38-23 58-15-8-20-3-40 15-58Z" strokeWidth="1.15" />

      <circle className={line("crest-pass-four")} cx="250" cy="250" r="132" strokeWidth=".9" strokeDasharray="2 10" />
      <circle className={line("crest-pass-four")} cx="250" cy="250" r="168" strokeWidth=".7" strokeDasharray="3 13" />
      <path className={line("crest-pass-four")} d="M250 54v392M54 250h392M112 112l276 276M388 112 112 388" strokeWidth=".72" opacity=".8" />

      <circle className={dot("crest-pass-five")} cx="250" cy="250" r="8" strokeWidth="1.2" />
      <circle className={dot("crest-pass-five")} cx="250" cy="55" r="4" fill="currentColor" stroke="none" />
      <circle className={dot("crest-pass-five")} cx="445" cy="250" r="4" fill="currentColor" stroke="none" />
      <circle className={dot("crest-pass-five")} cx="250" cy="445" r="4" fill="currentColor" stroke="none" />
      <circle className={dot("crest-pass-five")} cx="55" cy="250" r="4" fill="currentColor" stroke="none" />
      <path className={line("crest-pass-five")} d="M250 72l5 13 13 5-13 5-5 13-5-13-13-5 13-5 5-13ZM428 250l5 13 13 5-13 5-5 13-5-13-13-5 13-5 5-13ZM250 428l5 13 13 5-13 5-5 13-5-13-13-5 13-5 5-13ZM72 250l5 13 13 5-13 5-5 13-5-13-13-5 13-5 5-13Z" strokeWidth=".8" />
    </g>
  );
}

function CompletedCrest() {
  return (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="loader-mark h-full w-full overflow-visible" aria-hidden="true">
      <g opacity=".24"><CrestArtwork /></g>
      <CrestArtwork animated />
    </svg>
  );
}

function MiniMark() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ebe8df]/54" aria-hidden="true">
      <path d="M16 3c3 5 7 6 11 4-1 5 1 8 4 10-4 2-5 5-3 9-5-1-8 1-10 4-2-3-5-3-8 0-2-3-5-5-10-4 2-4 1-7-3-9 3-2 5-5 4-10 4 2 8 1 11-4Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 7v18M7 16h18M10 10l12 12M22 10 10 22" stroke="currentColor" strokeWidth=".55" strokeLinecap="round" />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  const [stage, setStage] = useState<Stage>(() => new URLSearchParams(window.location.search).has("showcase") ? "profile" : "ready");

  useEffect(() => {
    if (stage !== "opening") return;
    const timer = window.setTimeout(() => setStage("profile"), 1250);
    return () => window.clearTimeout(timer);
  }, [stage]);

  const openProfile = () => setStage("opening");

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
              {links.map(({ label, href }, index) => <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-[#ebe8df]/15 py-4 text-sm font-medium tracking-[-0.025em] text-[#ebe8df]/82 transition-all duration-200 hover:pl-2 hover:text-[#f0eee7]"><span className="flex items-center gap-3"><span className="relative font-mono text-[8px] tracking-[0.1em] text-[#ebe8df]/32">0{index + 1}<i className="absolute left-[9px] top-1/2 h-px w-3 -translate-y-1/2 rotate-[-28deg] bg-[#ebe8df]/25" /></span>{label}</span><span className="flex items-center gap-2"><i className="h-px w-4 bg-[#ebe8df]/15 transition-all duration-200 group-hover:w-7 group-hover:bg-[#ebe8df]/42" /><span className="font-mono text-[11px] text-[#ebe8df]/30 transition-all duration-200 group-hover:text-[#ebe8df]/70">↗</span></span></a>)}
            </nav>
          </div>
        </section>
      )}

      {stage !== "profile" && (
        <section className={`loader-stage fixed inset-0 z-20 grid place-items-center bg-[#12120f] text-[#ebe8df] ${stage === "opening" ? "is-opening" : ""}`} data-ready={stage === "ready"}>
          <div className="relative z-10 flex flex-col items-center">
            <button type="button" onClick={openProfile} className="h-[min(78vw,510px)] w-[min(78vw,510px)] min-h-[260px] min-w-[260px] text-[#ebe8df]/87 transition-transform duration-500 hover:scale-[1.018] active:scale-95" aria-label="Open myk.rwt"><CompletedCrest /></button>
            {stage === "ready" && <button type="button" onClick={openProfile} className="click-control mt-8 font-mono text-[10px] lowercase tracking-[0.28em] text-[#ebe8df]/62 transition-colors hover:text-[#ebe8df]">click</button>}
          </div>
          <div className="gate-leaf gate-left opacity-0" />
          <div className="gate-leaf gate-right opacity-0" />
        </section>
      )}
    </main>
  );
}
