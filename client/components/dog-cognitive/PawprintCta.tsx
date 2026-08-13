import { ReactNode, useEffect } from "react";
import {
  buildPawprintUrl,
  trackOutboundClick,
  type CtaLocation,
} from "@/lib/pawprintCognitive";

export default function PawprintCta({
  location,
  className,
  children,
  ariaLabel,
}: {
  location: CtaLocation;
  className: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  useEffect(() => {
    if (document.getElementById("full-comparison-rewrite-script")) return;

    const script = document.createElement("script");
    script.id = "full-comparison-rewrite-script";
    script.src = "/full-comparison-rewrite.js";
    document.body.appendChild(script);
  }, []);

  return (
    <a
      className={className}
      href={buildPawprintUrl()}
      aria-label={ariaLabel}
      rel="nofollow sponsored noopener"
      target="_blank"
      onClick={() => trackOutboundClick(location)}
    >
      {children}
    </a>
  );
}
