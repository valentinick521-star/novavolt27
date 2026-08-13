import "../../../dog-cognitive-page/full-comparison-rewrite.js";
import "../../../dog-cognitive-page/lower-page-cleanup.js";
import { ReactNode } from "react";
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
