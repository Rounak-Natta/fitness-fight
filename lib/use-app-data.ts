"use client";

import { useMemo, useSyncExternalStore } from "react";
import { parseStoredData, STORAGE_EVENT, STORAGE_KEY, type StoredData } from "@/lib/storage";

const EMPTY_SNAPSHOT = "__lean_fighter_empty__";
const SERVER_SNAPSHOT = "__lean_fighter_server__";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(STORAGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(STORAGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT;
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

export function useAppData(): StoredData | null {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return useMemo(() => {
    if (snapshot === SERVER_SNAPSHOT) return null;
    if (snapshot === EMPTY_SNAPSHOT) return parseStoredData(null);
    return parseStoredData(snapshot);
  }, [snapshot]);
}
