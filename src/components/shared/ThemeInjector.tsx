import { TenantConfig } from "@/types/tenant";

/**
 * Injects CSS variables and global styles derived from TenantConfig.
 * All templates share this — no template-specific logic here.
 */
export default function ThemeInjector({ config }: { config: TenantConfig }) {
  const { tokens, effects, button } = config;

  const btnLetterSpacing =
    button.letterSpacing === "tight" ? "0.04em" :
    button.letterSpacing === "wide"  ? "0.14em" : "0.08em";

  const btnRadius =
    button.variant === "rounded" ? "9999px" :
    button.variant === "square"  ? "0px" : "2px";

  const btnClipPath =
    button.variant === "angular"
      ? "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))"
      : "none";

  const isGhost = button.variant === "outline" || button.variant === "underline";
  const btnBg       = isGhost ? "transparent" : "var(--interactive)";
  const btnColor    = isGhost ? "var(--interactive)" : "var(--interactive-fg)";
  const btnBorder   = button.variant === "outline" ? "1px solid var(--interactive)" : "none";
  const btnUnderline = button.variant === "underline" ? "underline" : "none";

  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=${tokens.fontDisplay}&family=${tokens.fontBody}&display=swap');

      :root {
        --surface:           ${tokens.surface};
        --surface-raised:    ${tokens.surfaceRaised};
        --surface-overlay:   ${tokens.surfaceOverlay};
        --text-heading:      ${tokens.textHeading};
        --text-body:         ${tokens.textBody};
        --text-subtle:       ${tokens.textSubtle};
        --text-inverse:      ${tokens.textInverse};
        --interactive:       ${tokens.interactive};
        --interactive-hover: ${tokens.interactiveHover};
        --interactive-fg:    ${tokens.interactiveFg};
        --decorative:        ${tokens.decorative};
        --border:            ${tokens.border};
        --border-strong:     ${tokens.borderStrong};
        --font-display:      '${tokens.fontDisplayFamily}', serif;
        --font-body:         '${tokens.fontBodyFamily}', sans-serif;
      }

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }

      body {
        background: var(--surface);
        color: var(--text-body);
        font-family: var(--font-body);
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }

      /* Grain overlay */
      body::after {
        content: '';
        position: fixed; inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
        opacity: ${effects.grainOpacity};
        pointer-events: none;
        z-index: 9997;
      }

      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: var(--surface); }
      ::-webkit-scrollbar-thumb { background: var(--decorative); }

      /* Typography */
      .font-display { font-family: var(--font-display); }
      h1, h2, h3   { color: var(--text-heading); font-family: var(--font-display); }

      /* Animations */
      @keyframes fadeUp   { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeIn   { from { opacity: 0; } to { opacity: 1; } }
      @keyframes marquee  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes pulseDot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

      .anim-fade-up  { animation: fadeUp 0.8s ease forwards; opacity: 0; }
      .anim-fade-in  { animation: fadeIn 1.2s ease forwards; opacity: 0; }
      .anim-marquee  { animation: marquee 22s linear infinite; }
      .d1 { animation-delay: 0.12s; }
      .d2 { animation-delay: 0.26s; }
      .d3 { animation-delay: 0.40s; }
      .d4 { animation-delay: 0.56s; }

      /* ── Primary button ── */
      .btn-primary {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 13px 28px;
        font-family: var(--font-body);
        font-size: 13px; font-weight: 500;
        letter-spacing: ${btnLetterSpacing};
        text-transform: ${button.uppercase ? "uppercase" : "none"};
        text-decoration: ${btnUnderline};
        background: ${btnBg};
        color: ${btnColor};
        border: ${btnBorder};
        border-radius: ${btnRadius};
        clip-path: ${btnClipPath};
        cursor: pointer;
        white-space: nowrap;
        transition: background 0.2s, color 0.2s, transform 0.2s;
      }
      .btn-primary:hover {
        background: ${isGhost ? "transparent" : "var(--interactive-hover)"};
        color: ${isGhost ? "var(--interactive-hover)" : "var(--interactive-fg)"};
        transform: translateY(-2px);
      }

      /* ── Ghost button ── */
      .btn-ghost {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 12px 24px;
        font-family: var(--font-body);
        font-size: 13px;
        letter-spacing: ${btnLetterSpacing};
        text-transform: ${button.uppercase ? "uppercase" : "none"};
        background: transparent;
        color: var(--text-subtle);
        border: 1px solid var(--border);
        border-radius: ${btnRadius};
        cursor: pointer;
        text-decoration: none;
        transition: border-color 0.2s, color 0.2s;
      }
      .btn-ghost:hover { border-color: var(--border-strong); color: var(--text-heading); }

      /* ── Nav link ── */
      .nav-link {
        position: relative; text-decoration: none;
        color: var(--text-subtle);
        font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
        font-family: var(--font-body);
        transition: color 0.2s;
      }
      .nav-link::after {
        content: ''; position: absolute; bottom: -3px; left: 0;
        width: 0; height: 1px; background: var(--decorative);
        transition: width 0.3s ease;
      }
      .nav-link:hover { color: var(--text-heading); }
      .nav-link:hover::after { width: 100%; }

      /* ── Gallery ── */
      .gallery-item { position: relative; overflow: hidden; cursor: pointer; }
      .gallery-item img { transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); }
      .gallery-item:hover img { transform: scale(1.07); }
      .g-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%);
        opacity: 0; transition: opacity 0.4s ease;
      }
      .gallery-item:hover .g-overlay { opacity: 1; }
      .g-overlay-content {
        position: absolute; bottom: 0; left: 0; right: 0; padding: 18px 16px;
        transform: translateY(6px); transition: transform 0.4s ease;
      }
      .gallery-item:hover .g-overlay-content { transform: translateY(0); }

      /* ── Artist card ── */
      .artist-card { border: 1px solid var(--border); transition: border-color 0.3s, transform 0.3s; }
      .artist-card:hover { border-color: var(--decorative); transform: translateY(-4px); }

      /* ── Filter pill ── */
      .filter-pill {
        padding: 6px 16px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
        border: 1px solid var(--border); color: var(--text-subtle);
        background: transparent; cursor: pointer;
        font-family: var(--font-body);
        transition: all 0.2s;
        border-radius: ${btnRadius};
      }
      .filter-pill:hover, .filter-pill.active {
        border-color: var(--interactive); color: var(--interactive-fg); background: var(--interactive);
      }

      /* ── Lightbox ── */
      .lightbox {
        position: fixed; inset: 0; background: var(--surface-overlay);
        z-index: 1000; display: flex; align-items: center; justify-content: center;
        animation: fadeIn 0.2s ease;
      }
    `}</style>
  );
}
