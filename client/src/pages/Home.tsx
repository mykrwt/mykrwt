/**
 * VOIDLINK DESIGN REMINDER — Chrome Shrine: an off-axis personal signal artifact,
 * built from black glass, metallic rules, controlled #B7FF3C accents, and sharp tactile motion.
 */
import { useEffect, useState } from "react";
import {
  BadgeCheck,
  Check,
  Copy,
  Disc3,
  ExternalLink,
  Github,
  Instagram,
  Link2,
  Mail,
  Music2,
  Pause,
  Play,
  Radio,
  Share2,
  Sparkles,
  Volume2,
  Youtube,
} from "lucide-react";

const profileLinks = [
  { label: "discord", value: "@nyx.archive", icon: Radio, href: "https://discord.com" },
  { label: "instagram", value: "@nyx.afterdark", icon: Instagram, href: "https://instagram.com" },
  { label: "youtube", value: "watch the cut", icon: Youtube, href: "https://youtube.com" },
  { label: "github", value: "source / fragments", icon: Github, href: "https://github.com" },
];

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}

export default function Home() {
  const [entered, setEntered] = useState(() => new URLSearchParams(window.location.search).has("showcase"));
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(74);
  const duration = 214;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setElapsed((current) => (current >= duration ? 0 : current + 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing]);

  const copyProfileLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090a09] text-[#eeeee5]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-45"
        style={{ backgroundImage: "url('/manus-storage/voidlink-hero_3318046e.png')" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_20%,rgba(78,104,78,0.19),transparent_31%),linear-gradient(90deg,rgba(9,10,9,0.96)_0%,rgba(9,10,9,0.76)_41%,rgba(9,10,9,0.45)_100%)]" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(238,238,229,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(238,238,229,0.07)_1px,transparent_1px)] [background-size:46px_46px]" />
      <div className="ambient-signal absolute -right-[12%] top-[30%] h-px w-[60%] bg-[#b7ff3c] blur-[1px]" />
      <div className="scan-line absolute left-0 h-px w-full bg-[#b7ff3c]/[0.08]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(238,238,229,0.06)_0_1px,transparent_1px)] [background-size:5px_5px] opacity-35 mix-blend-soft-light" />

      <aside className="absolute bottom-0 left-0 top-0 z-20 hidden w-[88px] border-r border-[#eeeee5]/10 bg-[#090a09]/55 backdrop-blur-xl lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-7">
        <a href="#profile" className="group relative grid h-12 w-12 place-items-center" aria-label="Voidlink profile home">
          <span className="absolute inset-0 border border-[#eeeee5]/20 transition-transform duration-200 group-hover:rotate-45 group-hover:border-[#b7ff3c]" />
          <img src="/manus-storage/voidlink-mark_a741b9e8.png" alt="" className="relative h-9 w-9 object-contain" />
        </a>
        <div className="flex -rotate-90 items-center gap-3 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.28em] text-[#eeeee5]/35">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b7ff3c]" />
          channel live
        </div>
        <button
          type="button"
          onClick={copyProfileLink}
          className="grid h-10 w-10 place-items-center border border-[#eeeee5]/15 text-[#eeeee5]/65 transition-all duration-200 hover:border-[#b7ff3c] hover:bg-[#b7ff3c] hover:text-[#090a09] active:scale-95"
          aria-label="Copy profile link"
        >
          {copied ? <Check size={15} /> : <Share2 size={15} />}
        </button>
      </aside>

      <header className="relative z-20 flex items-center justify-between px-5 py-5 sm:px-8 lg:ml-[88px] lg:px-10 lg:py-7">
        <a href="#profile" className="flex items-center gap-2 lg:hidden" aria-label="Voidlink profile home">
          <img src="/manus-storage/voidlink-mark_a741b9e8.png" alt="Voidlink" className="h-9 w-9 object-contain" />
          <span className="font-mono text-[10px] tracking-[0.22em] text-[#eeeee5]/60">VOIDLINK</span>
        </a>
        <div className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-[#eeeee5]/45 lg:block">profile / selected signal</div>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#eeeee5]/50 sm:flex">
            <span className="status-dot h-1.5 w-1.5 rounded-full bg-[#b7ff3c]" /> online
          </span>
          <button
            type="button"
            onClick={copyProfileLink}
            className="flex h-9 items-center gap-2 border border-[#eeeee5]/15 px-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[#eeeee5]/70 transition-all duration-200 hover:border-[#b7ff3c] hover:bg-[#b7ff3c] hover:text-[#090a09] active:scale-[0.97]"
          >
            {copied ? <Check size={13} /> : <Link2 size={13} />}
            <span>{copied ? "copied" : "link"}</span>
          </button>
        </div>
      </header>

      <section id="profile" className="relative z-10 mx-auto flex min-h-[calc(100vh-76px)] w-full max-w-[1400px] items-center px-5 pb-12 pt-5 sm:px-8 lg:ml-[88px] lg:w-[calc(100%-88px)] lg:px-[8vw] lg:pb-20 lg:pt-10">
        <div className="grid w-full max-w-[1050px] gap-8 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-end">
          <article className={`relative border border-[#eeeee5]/15 bg-[#111310]/78 p-4 shadow-[0_26px_90px_rgba(0,0,0,0.52)] backdrop-blur-xl sm:p-6 ${entered ? "enter-item" : ""}`}>
            <div className="absolute left-0 top-0 h-9 w-9 border-l border-t border-[#b7ff3c]" />
            <div className="absolute bottom-0 right-0 h-9 w-9 border-b border-r border-[#b7ff3c]" />
            <div className="absolute left-5 right-5 top-[58%] h-px bg-[#eeeee5]/10 sm:left-7 sm:right-7" />

            <div className="relative flex flex-col gap-7 sm:gap-9">
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="relative grid h-[76px] w-[76px] place-items-center border border-[#eeeee5]/20 bg-[#090a09] sm:h-[94px] sm:w-[94px]">
                    <div className="absolute inset-[5px] overflow-hidden bg-[#171b17]">
                      <img src="/manus-storage/voidlink-portrait_654cedba.png" alt="Portrait of nyx" className="h-full w-full object-cover grayscale-[18%]" />
                    </div>
                    <div className="orbit-line absolute -inset-1 border border-dashed border-[#b7ff3c]/30" />
                    <span className="status-dot absolute -bottom-1 -right-1 h-3 w-3 border-2 border-[#111310] rounded-full bg-[#b7ff3c]" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#b7ff3c]">
                      <Sparkles size={11} strokeWidth={1.8} /> verified signal
                    </div>
                    <h1 className="flex items-center gap-2 text-4xl font-bold leading-none tracking-[-0.085em] text-[#f2f2e9] sm:text-5xl">nyx <BadgeCheck className="h-5 w-5 text-[#b7ff3c] sm:h-6 sm:w-6" fill="#b7ff3c" stroke="#090a09" /></h1>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#eeeee5]/48">@nyx.archive</p>
                  </div>
                </div>
                <div className="hidden text-right font-mono text-[9px] uppercase leading-5 tracking-[0.16em] text-[#eeeee5]/38 sm:block">signal / 01<br />est. 2024</div>
              </div>

              <div className="max-w-[570px]">
                <p className="text-[clamp(1.1rem,2vw,1.45rem)] font-medium leading-[1.34] tracking-[-0.035em] text-[#eeeeE5]">broadcasting from the quiet side. collecting strange sounds, making systems, leaving the light on.</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#eeeee5]/46">
                  <span className="flex items-center gap-2"><span className="h-1 w-1 bg-[#b7ff3c]" /> system thinker</span>
                  <span>utc +05:30</span>
                  <span>they/them</span>
                </div>
              </div>

              <div className="grid gap-px overflow-hidden border border-[#eeeee5]/10 bg-[#eeeee5]/10 sm:grid-cols-2">
                {profileLinks.map(({ label, value, icon: Icon, href }, index) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-[70px] items-center justify-between bg-[#111310]/95 px-4 py-3 transition-all duration-200 hover:bg-[#b7ff3c] hover:text-[#090a09] active:scale-[0.985] sm:px-5"
                    style={{ animationDelay: `${index * 45 + 80}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} strokeWidth={1.7} className="text-[#b7ff3c] transition-colors group-hover:text-[#090a09]" />
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-[#eeeee5]/48 group-hover:text-[#090a09]/58">{label}</p>
                        <p className="mt-0.5 text-sm font-medium tracking-[-0.025em]">{value}</p>
                      </div>
                    </div>
                    <ExternalLink size={15} className="opacity-40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-[#eeeee5]/10 pt-4">
                <a href="mailto:hello@voidlink.dev" className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#eeeee5]/50 transition-colors hover:text-[#b7ff3c]"><Mail size={13} /> open for select work</a>
                <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#eeeee5]/30">42,016 views</div>
              </div>
            </div>
          </article>

          <aside className={`relative self-end border border-[#eeeee5]/15 bg-[#0e100e]/85 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-5 lg:translate-y-10 ${entered ? "enter-item" : ""}`} style={{ animationDelay: "110ms" }}>
            <div className="mb-5 flex items-center justify-between border-b border-[#eeeee5]/10 pb-3">
              <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#eeeee5]/50"><Music2 size={13} className="text-[#b7ff3c]" /> now playing</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#b7ff3c]">v.001</span>
            </div>

            <div className="flex gap-4">
              <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden border border-[#eeeee5]/15 bg-[#090a09]">
                <img src="/manus-storage/voidlink-track-art_52b16628.png" alt="Null Vector album art" className={`h-full w-full object-cover ${playing ? "animate-[spin_8s_linear_infinite]" : ""}`} />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#090a09]/45 to-transparent" />
              </div>
              <div className="min-w-0 pt-1">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#b7ff3c]">n.p. / 04</p>
                <h2 className="mt-1 truncate text-lg font-bold tracking-[-0.055em]">Null Vector</h2>
                <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-[0.1em] text-[#eeeee5]/45">rising trace</p>
                <div className="mt-2 flex h-3 items-end gap-[3px]">
                  {[0, 1, 2, 3].map((bar) => <span key={bar} className={`equalizer-bar w-[2px] bg-[#b7ff3c] ${playing ? "" : "!h-[25%]"}`} />)}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="relative h-px bg-[#eeeee5]/15">
                <span className="absolute left-0 top-0 h-px bg-[#b7ff3c]" style={{ width: `${(elapsed / duration) * 100}%` }} />
                <span className="absolute top-1/2 h-2 w-2 -translate-y-1/2 -translate-x-1/2 bg-[#b7ff3c]" style={{ left: `${(elapsed / duration) * 100}%` }} />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#eeeee5]/42">{formatTime(elapsed)}</span>
                <button
                  type="button"
                  onClick={() => setPlaying((active) => !active)}
                  className="grid h-9 w-9 place-items-center border border-[#b7ff3c] bg-[#b7ff3c] text-[#090a09] transition-all duration-200 hover:scale-105 hover:shadow-[0_0_22px_rgba(183,255,60,0.28)] active:scale-95"
                  aria-label={playing ? "Pause track" : "Play track"}
                >
                  {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" className="translate-x-px" />}
                </button>
                <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#eeeee5]/42"><Volume2 size={11} /> {formatTime(duration)}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#eeeee5]/10 pt-4">
              <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#eeeee5]/30">playlist / in motion</span>
              <Disc3 size={14} className="text-[#eeeee5]/30" />
            </div>
          </aside>
        </div>
      </section>

      <div className="pointer-events-none absolute bottom-5 right-5 z-20 hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#eeeee5]/35 lg:flex">
        <span>scroll / read</span>
        <span className="h-px w-12 bg-[#eeeee5]/25" />
      </div>

      {!entered && (
        <button
          type="button"
          onClick={() => setEntered(true)}
          className="group absolute inset-0 z-50 grid place-items-center bg-[#090a09]/95 p-5 backdrop-blur-md transition-opacity duration-500"
          aria-label="Enter Voidlink profile"
        >
          <div className="relative flex flex-col items-center">
            <div className="absolute -inset-10 border border-[#b7ff3c]/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45" />
            <img src="/manus-storage/voidlink-mark_a741b9e8.png" alt="Voidlink" className="relative h-24 w-24 object-contain transition-transform duration-500 group-hover:scale-105" />
            <span className="relative mt-7 font-mono text-[10px] uppercase tracking-[0.32em] text-[#eeeee5]/70">tap to enter</span>
            <span className="relative mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-[#b7ff3c]">channel / 01</span>
          </div>
        </button>
      )}
    </main>
  );
}
