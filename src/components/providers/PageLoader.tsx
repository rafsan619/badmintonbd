"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function PageLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 1100);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className={`page-loader ${done ? "is-done" : ""}`} aria-hidden={done}>
      <div className="flex flex-col items-center gap-5">
        <Image
          src="/images/bbf-logo.png"
          alt="Bangladesh Badminton Federation"
          width={88}
          height={110}
          priority
          className="animate-pulse"
        />
        <p className="eyebrow">Bangladesh Badminton Federation</p>
      </div>
    </div>
  );
}
