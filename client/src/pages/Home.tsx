/**
 * VOIDLINK DESIGN REMINDER — Quiet Flex: personal and premium, never portfolio-like.
 * A photo-led two-part composition uses spare warm typography and near-silent motion.
 */
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Instagram, Music2, Pause, Play, Send } from "lucide-react";

const links = [
  { label: "instagram", handle: "@neco.says", href: "https://instagram.com", icon: Instagram },
  { label: "discord", handle: "neco#0101", href: "https://discord.com", icon: Send },
  { label: "playlist", handle: "after hours, always", href: "https://open.spotify.com", icon: Music2 },
];

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setLoaded(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#101010] text-[#f0eee8]">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.18)_0.7px,transparent_0.7px)] [background-size:7px_7px]" />
      <div className="pointer-events-none absolute -right-[15%] top-[12%] h-[72vh] w-[62vw] rounded-full bg-[#d8d5cd]/[0.035] blur-[90px]" />

      <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
        <a href="#home" className="group flex items-center gap-3" aria-label="Neco profile home">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-[#f0eee8]/30 p-1.5 transition-colors duration-200 group-hover:border-[#f0eee8]">
            <img src="/manus-storage/voidlink-quiet-mark_cc3f6e82.png" alt="" className="h-full w-full object-contain" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.28em] text-[#f0eee8]/65">NECO</span>
        </a>
        <button
          type="button"
          onClick={copyLink}
          className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-[#f0eee8]/50 transition-colors duration-200 hover:text-[#f0eee8] active:scale-95"
          aria-label="Copy profile link"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? "copied" : "copy link"}</span>
        </button>
      </header>

      <section id="home" className="relative z-10 mx-auto grid min-h-[calc(100vh-88px)] max-w-[1560px] items-center px-6 pb-10 sm:px-10 lg:grid-cols-[0.84fr_1.16fr] lg:gap-12 lg:px-16 lg:pb-16 xl:px-24">
        <div className={`relative order-2 py-10 lg:order-1 lg:py-0 ${loaded ? "quiet-arrive" : "opacity-0"}`}>
          <p className="font-mono text-[10px] leading-5 tracking-[0.17em] text-[#f0eee8]/43">EVERYTHING IS A LITTLE BIT MORE BEAUTIFUL<br />WHEN YOU DON’T EXPLAIN IT.</p>

          <div className="mt-9 sm:mt-12">
            <div className="flex items-end gap-3">
              <h1 className="text-[clamp(5.25rem,12vw,10.5rem)] font-semibold leading-[0.75] tracking-[-0.105em] text-[#f3f1ea]">neco</h1>
              <span className="mb-1.5 h-2 w-2 rounded-full bg-[#c9c5bc] sm:mb-3" />
            </div>
            <p className="mt-5 max-w-[330px] text-[15px] leading-7 tracking-[-0.025em] text-[#f0eee8]/62 sm:text-base">soft-spoken on the outside. a little too much going on underneath.</p>
          </div>

          <nav className="mt-11 max-w-[420px] border-t border-[#f0eee8]/15" aria-label="Social links">
            {links.map(({ label, handle, href, icon: Icon }, index) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-[#f0eee8]/15 py-4 transition-all duration-200 hover:pl-2"
                style={{ animationDelay: `${index * 65 + 90}ms` }}
              >
                <span className="flex items-center gap-3">
                  <Icon size={15} strokeWidth={1.45} className="text-[#f0eee8]/43 transition-colors group-hover:text-[#f0eee8]" />
                  <span>
                    <span className="block text-sm font-medium tracking-[-0.03em] text-[#f0eee8]/86">{label}</span>
                    <span className="mt-0.5 block font-mono text-[9px] tracking-[0.08em] text-[#f0eee8]/38">{handle}</span>
                  </span>
                </span>
                <ArrowUpRight size={17} strokeWidth={1.4} className="text-[#f0eee8]/30 transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#f0eee8]" />
              </a>
            ))}
          </nav>

          <div className="mt-10 flex items-center gap-4 text-[#f0eee8]/45">
            <span className="font-mono text-[9px] tracking-[0.13em]">ONLINE, USUALLY</span>
            <span className="h-px w-9 bg-[#f0eee8]/20" />
            <a href="mailto:hello@neco.page" className="font-mono text-[9px] tracking-[0.13em] transition-colors hover:text-[#f0eee8]">SAY HELLO</a>
          </div>
        </div>

        <div className={`relative order-1 mx-auto w-full max-w-[670px] lg:order-2 lg:max-w-none ${loaded ? "quiet-arrive" : "opacity-0"}`} style={{ animationDelay: "120ms" }}>
          <div className="absolute -left-5 top-[8%] hidden h-[76%] w-px bg-[#f0eee8]/20 lg:block" />
          <div className="relative aspect-[4/4.5] overflow-hidden bg-[#181817] sm:aspect-[4/4.3] lg:aspect-[4/5]">
            <img src="/manus-storage/voidlink-quiet-portrait_9072b93c.png" alt="Portrait of neco" className="portrait-breathe h-full w-full object-cover object-[58%_center] opacity-[0.95] contrast-[0.98] grayscale-[30%]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,16,16,0.34),transparent_55%),linear-gradient(0deg,rgba(16,16,16,0.28),transparent_36%)]" />
            <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[9px] tracking-[0.13em] text-[#f0eee8]/55"><span className="h-1 w-1 rounded-full bg-[#ebe8df]" /> 01 / 03</div>
            <span className="absolute bottom-5 right-5 font-mono text-[9px] tracking-[0.16em] text-[#f0eee8]/52">n. 24°</span>
          </div>

          <div className="relative -mt-8 ml-auto mr-4 flex w-[min(100%-1rem,290px)] items-center gap-3 bg-[#e9e6de] p-3 text-[#121212] shadow-[0_22px_45px_rgba(0,0,0,0.28)] sm:mr-7">
            <div className={`h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#171717] ${playing ? "turn-record" : ""}`}>
              <img src="/manus-storage/voidlink-quiet-track_067f7507.png" alt="Half light album artwork" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold tracking-[-0.03em]">half light</p>
              <p className="mt-0.5 truncate font-mono text-[8px] tracking-[0.12em] text-[#121212]/55">STILL CORNERS</p>
            </div>
            <button
              type="button"
              onClick={() => setPlaying((active) => !active)}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#121212] text-[#e9e6de] transition-transform duration-200 hover:scale-105 active:scale-95"
              aria-label={playing ? "Pause track" : "Play track"}
            >
              {playing ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="translate-x-px" />}
            </button>
          </div>
        </div>
      </section>

      <img src="/manus-storage/voidlink-quiet-abstract_eca0ca45.png" alt="" className="pointer-events-none absolute -bottom-44 -left-36 hidden w-[480px] opacity-[0.12] mix-blend-screen lg:block" />
      <p className="pointer-events-none absolute bottom-5 right-6 font-mono text-[8px] tracking-[0.16em] text-[#f0eee8]/25 sm:right-10">VOIDLINK / A PRIVATE CORNER</p>
    </main>
  );
}
