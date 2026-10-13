import { useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const code = AD_CODES[size];
  if (!code) return null;
  const key = code.match(/com\/([a-f0-9]+)\//)?.[1];
  if (!key) return null;
  const { w, h } = DIMENSIONS[size];
  const doc = `<!DOCTYPE html><html><head><style>html,body{margin:0;padding:0;overflow:hidden;}</style></head><body><script type="text/javascript">atOptions={'key':'${key}','format':'iframe','height':${h},'width':${w},'params':{}};</script><script type="text/javascript" src="https://www.highrevenueformat.com/${key}/invoke.js"></script></body></html>`;
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <span className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        Advertisement
      </span>
      <div style={{ width: w, height: h }} className="overflow-hidden">
        {mounted && (
          <iframe
            title="Advertisement"
            srcDoc={doc}
            width={w}
            height={h}
            scrolling="no"
            style={{ border: 0, display: "block" }}
          />
        )}
      </div>
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
