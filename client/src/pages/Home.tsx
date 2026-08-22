/**
 * MYK.RWT DESIGN REMINDER — Sigil Gate: loading is only the supplied ink sigil on parchment
 * plus one small “click” prompt; opening becomes a medieval two-leaf gate reveal into the profile.
 */
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Pause, Play } from "lucide-react";

type Stage = "loading" | "opening" | "profile";

const links = [
  { title: "instagram", caption: "small traces", href: "https://instagram.com/myk.rwt" },
  { title: "github", caption: "things i make", href: "https://github.com/mykrwt" },
  { title: "discord", caption: "myk.rwt", href: "https://discord.com" },
  { title: "email", caption: "if it matters", href: "mailto:hello@myk.rwt" },
];

function RouteGlyph({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="11.3" stroke="currentColor" strokeWidth="1.15" strokeDasharray="2 2.7" />
      <path d="M7 19c3.6-7.8 10.2-10.8 18-6.8M10.6 24.2c4.2-4.4 8.8-5.7 14.3-4.1M13.1 7.4l2.1 3.3-3.9.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="22.4" cy="12.2" r="1.65" fill="currentColor" />
    </svg>
  );
}

function FieldSketch() {
  return (
    <svg viewBox="0 0 680 680" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full overflow-visible" aria-hidden="true">
      <g className="slow-spin origin-center" style={{ transformOrigin: "340px 340px" }}>
        <path d="M107 304C68 206 175 95 314 83c168-15 295 92 278 226-11 87-89 155-210 168-154 16-242-65-233-173 8-91 105-137 206-116 95 20 146 91 125 160-17 57-94 87-169 65-62-18-86-75-50-120 32-39 101-45 143-9" stroke="currentColor" strokeWidth="1.15" opacity=".76" />
        <path d="M101 252c52-110 216-155 348-79 119 69 152 214 71 328-75 106-226 136-343 60-113-74-134-224-44-340 63-82 185-104 273-44 79 54 95 162 38 236-49 63-142 77-204 30-56-42-58-119-8-163 42-38 113-30 143 21" stroke="currentColor" strokeWidth="1" opacity=".44" />
        <path d="M328 20c75 62 113 99 112 111 1 18-48 56-147 113-71 40-122 84-151 132m443-88c-58 45-84 77-80 94 4 19 60 59 166 121M290 592c65-57 100-94 105-111 7-27-28-67-108-121M64 427c73-34 122-51 146-50 28 2 61 43 100 125" stroke="currentColor" strokeWidth=".9" opacity=".45" />
      </g>
      <g className="reverse-spin origin-center" style={{ transformOrigin: "340px 340px" }}>
        <circle cx="340" cy="340" r="264" stroke="currentColor" strokeWidth=".8" strokeDasharray="3 12" opacity=".45" />
        <circle cx="340" cy="340" r="197" stroke="currentColor" strokeWidth=".75" strokeDasharray="2 10" opacity=".38" />
      </g>
      <path d="M37 432c80-45 133-62 157-52 26 12 55 73 87 183M438 82c17 76 45 124 82 144 35 19 88 26 159 21M113 152c49 43 96 56 141 41 43-14 78-57 106-130" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" opacity=".63" />
      <circle cx="340" cy="340" r="5" fill="currentColor" opacity=".75" />
      <circle cx="252" cy="231" r="3" fill="currentColor" opacity=".55" />
      <circle cx="488" cy="441" r="3" fill="currentColor" opacity=".55" />
      <path d="M94 106l11 15-18 4 7-19ZM556 545l17 8-12 13-5-21Z" fill="currentColor" opacity=".6" />
    </svg>
  );
}

export default function Home() {
  const [stage, setStage] = useState<Stage>(() => new URLSearchParams(window.location.search).has("showcase") ? "profile" : "loading");
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (stage !== "opening") return;
    const timer = window.setTimeout(() => setStage("profile"), 1620);
    return () => window.clearTimeout(timer);
  }, [stage]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#10110e] text-[#eeeadd]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(rgba(238,234,221,0.9)_0.75px,transparent_0.75px)] [background-size:6px_6px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(238,234,221,0.07),transparent_23%),radial-gradient(circle_at_16%_90%,rgba(153,171,115,0.08),transparent_20%)]" />

      <section className={`relative z-10 min-h-screen transition-opacity duration-700 ${stage !== "loading" ? "opacity-100" : "opacity-0"}`} aria-hidden={stage === "loading"}>
        <header className="flex items-center justify-between px-6 py-6 sm:px-10 sm:py-9 lg:px-14">
          <a href="#profile" className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] text-[#eeeadd]/70"><RouteGlyph className="h-6 w-6 text-[#d3dcc0]" /><span>myk.rwt</span></a>
          <button type="button" onClick={copyLink} className="flex items-center gap-2 font-mono text-[9px] tracking-[0.15em] text-[#eeeadd]/50 transition-colors hover:text-[#eeeadd]" aria-label="Copy profile link">
            {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "copied" : "copy link"}
          </button>
        </header>

        <div id="profile" className="relative mx-auto grid min-h-[calc(100vh-84px)] max-w-[1440px] items-center gap-10 px-6 pb-16 pt-6 sm:px-10 lg:grid-cols-[1fr_0.95fr] lg:gap-20 lg:px-14 lg:pb-24 xl:px-20">
          <div className="relative max-w-[630px] profile-in">
            <p className="font-mono text-[9px] tracking-[0.18em] text-[#eeeadd]/38">001 / NOT A PORTFOLIO. JUST A CORNER.</p>
            <div className="relative mt-9 sm:mt-12"><span className="absolute -left-4 top-0 h-10 w-px bg-[#eeeadd]/30 sm:-left-7 sm:h-14" /><h1 className="text-[clamp(4.8rem,10vw,9.5rem)] font-semibold leading-[0.78] tracking-[-0.10em] text-[#f0ede3]">myk.rwt</h1><p className="mt-4 font-['Caveat'] text-2xl tracking-[0.02em] text-[#d3dcc0] sm:text-3xl">a small world made by Mayank Rawat</p></div>
            <p className="mt-8 max-w-[430px] text-[15px] leading-7 tracking-[-0.02em] text-[#eeeadd]/62 sm:text-base">somewhere between late-night ideas, made-up systems, and an unreasonable number of open tabs.</p>
            <div className="mt-12 grid max-w-[530px] border-t border-[#eeeadd]/15">
              {links.map(({ title, caption, href }, index) => <a key={title} href={href} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-[#eeeadd]/15 py-4 transition-all duration-200 hover:translate-x-1"><span className="flex items-baseline gap-4"><span className="relative font-mono text-[9px] text-[#d3dcc0]/62">0{index + 1}<i className="absolute -right-2 top-2 h-px w-2 rotate-[-24deg] bg-[#d3dcc0]/45" /></span><span><span className="block text-sm font-semibold tracking-[-0.04em] text-[#eeeadd]/90">{title}</span><span className="mt-0.5 flex items-center gap-1.5 font-mono text-[8px] tracking-[0.13em] text-[#eeeadd]/35"><span className="h-1 w-1 rounded-full border border-[#d3dcc0]/55" />{caption}</span></span></span><ArrowUpRight size={17} strokeWidth={1.25} className="text-[#eeeadd]/35 transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#d3dcc0]" /></a>)}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[9px] tracking-[0.13em] text-[#eeeadd]/43"><span>India / UTC +05:30</span><span className="h-1 w-1 rounded-full bg-[#d3dcc0]" /><span>currently thinking</span><span className="h-px w-9 bg-[#eeeadd]/20" /><a href="mailto:hello@myk.rwt" className="transition-colors hover:text-[#d3dcc0]">say hello</a></div>
          </div>

          <div className="relative h-[min(66vh,620px)] min-h-[420px] overflow-visible profile-in" style={{ animationDelay: "180ms" }}>
            <div className="absolute inset-0 text-[#d3dcc0]/90"><FieldSketch /></div>
            <div className="absolute left-[3%] top-[6%] rotate-[-8deg] font-['Caveat'] text-xl text-[#d3dcc0]/55">route / loose<br />but intentional</div>
            <div className="absolute left-[16%] top-[16%] font-['Caveat'] text-2xl text-[#eeeadd]/65">i keep returning<br />to this line</div>
            <div className="absolute right-[11%] top-[20%] rotate-[8deg] rounded-full border border-[#eeeadd]/25 px-4 py-2 font-mono text-[8px] tracking-[0.14em] text-[#eeeadd]/45">keep moving, softly</div>
            <div className="absolute bottom-[15%] left-[17%] max-w-[125px] rotate-[-4deg] border-l border-[#d3dcc0]/45 pl-3 font-mono text-[8px] leading-4 tracking-[0.08em] text-[#eeeadd]/42">there is no final version of a person</div>
            <div className="absolute bottom-[12%] right-[13%] flex items-center gap-3 border border-[#eeeadd]/20 bg-[#151610]/90 p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-md"><button type="button" onClick={() => setPlaying((active) => !active)} className="grid h-8 w-8 place-items-center rounded-full border border-[#d3dcc0]/55 text-[#d3dcc0] transition-transform hover:scale-105 active:scale-95" aria-label={playing ? "Pause sound" : "Play sound"}>{playing ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="translate-x-px" />}</button><span><span className="block font-mono text-[8px] tracking-[0.14em] text-[#eeeadd]/78">soft noise</span><span className="mt-0.5 block font-mono text-[7px] tracking-[0.12em] text-[#eeeadd]/35">FOR THE OPEN TABS</span></span></div>
          </div>
        </div>
      </section>

      {stage !== "profile" && (
        <section className={`sigil-loading fixed inset-0 z-30 overflow-hidden bg-white text-[#171712] ${stage === "opening" ? "is-opening" : ""}`}>
          <div className="absolute inset-0 opacity-[0.018] [background-image:radial-gradient(rgba(23,23,18,0.25)_0.65px,transparent_0.65px)] [background-size:5px_5px]" />
          <button type="button" onClick={() => setStage("opening")} className="absolute inset-0 z-10 grid place-items-center" aria-label="Open myk.rwt">
            <span className="sigil-focus relative block h-[min(62vw,560px)] w-[min(62vw,560px)] min-h-[250px] min-w-[250px] max-h-[66vh] max-w-[66vh]">
              <img src="/manus-storage/mykrwt-ink-sigil_7a80c7ca.jpg" alt="Ornamental ink sigil" className="sigil-ink h-full w-full object-cover object-center mix-blend-multiply" />
              <span className="sigil-click absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 font-mono text-[10px] lowercase tracking-[0.22em] text-[#171712]/70">click</span>
            </span>
          </button>
          <div className="gate-door gate-left"><span className="gate-band gate-band-one" /><span className="gate-band gate-band-two" /></div>
          <div className="gate-door gate-right"><span className="gate-band gate-band-one" /><span className="gate-band gate-band-two" /></div>
          <div className="gate-seam" />
        </section>
      )}
    </main>
  );
}
