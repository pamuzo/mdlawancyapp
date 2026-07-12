// Adsterra banner component (no JSX to keep file valid as .ts)
"use client";

import { createElement, Fragment } from "react";
import Script from "next/script";
import type { ReactElement } from "react";

export default function AdsterraBanner(): ReactElement {
  return createElement(
    Fragment,
    null,
    createElement(Script, {
      id: "adsterra-banner",
      src: "https://pl30319985.effectivecpmnetwork.com/a2ea7bcabf5991b9ed7f883535245f5b/invoke.js",
      strategy: "afterInteractive",
      "data-cfasync": "false",
    }),
    createElement("div", {
      id: "container-a2ea7bcabf5991b9ed7f883535245f5b",
    }),
  );
}
