"use client";

import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";

interface MaterialDownloadButtonProps {
  href: string;
  className?: string;
}

export function MaterialDownloadButton({
  href,
  className,
}: MaterialDownloadButtonProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  return (
    <Button size="sm" asChild className={className}>
      <a href={href} download onClick={handleClick}>
        View / Download
      </a>
    </Button>
  );
}
