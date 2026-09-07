"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Download } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

const subscribeToDisplayMode = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia("(display-mode: standalone)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
};

const getIsStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches;

const getIsIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) && !("MSStream" in window);

const noOpSubscribe = () => () => {};

export default function PWAInstall() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const isInstalled = useSyncExternalStore(
    subscribeToDisplayMode,
    getIsStandalone,
    () => false,
  );
  const isIOS = useSyncExternalStore(noOpSubscribe, getIsIOS, () => false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();

      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) {
      setShowInstructions(true);
      return;
    }

    await installPrompt.prompt();

    const { outcome } = await installPrompt.userChoice;

    if (outcome === "accepted") {
      setInstallPrompt(null);
    }
  };

  if (isInstalled || (!installPrompt && !isIOS)) {
    return null;
  }

  return (
    <>
      <Button
        onClick={installApp}
        className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
      >
        <Download className="h-4 w-4" />
        {isIOS ? "Add to Home Screen" : "Install App"}
      </Button>
      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Install MD Lawancy</DialogTitle>
            <DialogDescription>
              Tap the Share button in Safari, then choose Add to Home Screen.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
