"use client";

import { useEffect } from "react";
import { loadAccessibilitySettings } from "@/lib/accessibility/storage";

export function AccessibilityLoader() {
  useEffect(() => {
    document.documentElement.dataset.textSize = loadAccessibilitySettings().textSize;
  }, []);

  return null;
}
