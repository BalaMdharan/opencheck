import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Ad placements. Paste each ad network script (HTML snippet) into AD_CODES
 * for the matching size. Empty codes render nothing, so no blank boxes ship.
 */
export type AdSize = "300x250" | "728x90" | "320x50" | "160x600";

export const AD_CODES: Record<AdSize, string> = {
  "300x250": '<script src="https://www.highrevenueformat.com/286215266d13a23084cfd5c0543bf49d/invoke.js"></script>',
  "728x90": '<script src="https://www.highrevenueformat.com/1763e7ceae9503beafdfc5b5cae90810/invoke.js"></script>',
  "320x50": '<script src="https://www.highrevenueformat.com/f2438b5215ac7417b73dffeeff6daaf2/invoke.js"></script>',
  "160x600": '<script src="https://www.highrevenueformat.com/54c55d0e77c2c3d8080bfbd212763090/invoke.js"></script>',
};

const DIMENSIONS: Record<AdSize, { w: number; h: number }> = {
  "300x250": { w: 300, h: 250 },
  "728x90": { w: 728, h: 90 },
  "320x50": { w: 320, h: 50 },
  "160x600": { w: 160, h: 600 },
};

function AdUnit({ size, className }: { size: AdSize; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const code = AD_CODES[size];

  useEffect(() => {
    const el = ref.current;
    if (!el || !code) return;
    el.innerHTML = "";
    const tpl = document.createElement("div");
    tpl.innerHTML = code;
    // Re-create scripts so the browser executes them.
    Array.from(tpl.childNodes).forEach((node) => {
      if (node instanceof HTMLScriptElement) {
        const s = document.createElement("script");
        Array.from(node.attributes).forEach((a) => s.setAttribute(a.name, a.value));
        s.text = node.text;
        el.appendChild(s);
      } else {
        el.appendChild(node.cloneNode(true));
      }
    });
    return () => {
      el.innerHTML = "";
    };
  }, [code]);

  if (!code) return null;
  const { w, h } = DIMENSIONS[size];
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <span className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        Advertisement
      </span>
      <div ref={ref} style={{ width: w, minHeight: h }} className="overflow-hidden" />
    </div>
  );
}

/** Single fixed size. */
export function AdSlot({ size, className }: { size: AdSize; className?: string }) {
  return <AdUnit size={size} className={cn("my-8", className)} />;
}

/** 728x90 on desktop, 320x50 on mobile. */
export function AdBanner({ className }: { className?: string }) {
  return (
    <div className={cn("my-8", className)}>
      <AdUnit size="728x90" className="hidden md:flex" />
      <AdUnit size="320x50" className="md:hidden" />
    </div>
  );
}
