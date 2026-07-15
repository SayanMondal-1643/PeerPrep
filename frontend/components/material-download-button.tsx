"use client";

import type { MouseEvent } from "react";
import { Download } from "lucide-react";
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
        <Download className="h-4 w-4 mr-1" />
        Download
      </a>
    </Button>
  );
}
