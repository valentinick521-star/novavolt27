import { ReactNode } from "react";
import {
  PAWPRINT_URL,
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
      href={PAWPRINT_URL}
      aria-label={ariaLabel}
      rel="nofollow sponsored noopener"
      target="_blank"
      onClick={() => trackOutboundClick(location)}
    >
      {children}
    </a>
  );
}
