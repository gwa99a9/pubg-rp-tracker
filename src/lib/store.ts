/**
 * Per-visitor progress, saved outside the page.
 *
 * Prefers the artifact storage API (private to each viewer, survives reloads).
 * Falls back to localStorage when this file is opened straight from disk or
 * hosted somewhere plain. Both paths are guarded, so a blocked or full store
 * degrades to an in-memory session instead of breaking the page.
 */

const KEY = "pubg-rp-weeks-1-2";

export type Saved = {
  v: 1;
  done: string[];
  reps: Record<string, number>;
  /** RP level the player typed in from the game. */
  level?: number;
};

type Backend = "cloud" | "local" | "memory";

let backend: Backend = "memory";
let memory: string | null = null;

function artifactStore(): any | null {
  const w = window as any;
  return w.storage && typeof w.storage.get === "function" ? w.storage : null;
}

function localOk(): boolean {
  try {
    const probe = "__rp_probe__";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

export function whereItSaves(): Backend {
  return backend;
}

export async function loadProgress(): Promise<Saved | null> {
  const store = artifactStore();
  if (store) {
    backend = "cloud";
    try {
      const hit = await store.get(KEY, false);
      return hit?.value ? (JSON.parse(hit.value) as Saved) : null;
    } catch {
      // Nothing saved yet, or a read error — start clean either way.
      return null;
    }
  }

  if (localOk()) {
    backend = "local";
    try {
      const raw = window.localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as Saved) : null;
    } catch {
      return null;
    }
  }

  backend = "memory";
  return memory ? (JSON.parse(memory) as Saved) : null;
}

export async function saveProgress(data: Saved): Promise<boolean> {
  const body = JSON.stringify(data);
  const store = artifactStore();

  if (store) {
    try {
      const res = await store.set(KEY, body, false);
      return !!res;
    } catch {
      return false;
    }
  }

  if (backend === "local") {
    try {
      window.localStorage.setItem(KEY, body);
      return true;
    } catch {
      return false;
    }
  }

  memory = body;
  return true;
}

export async function clearProgress(): Promise<void> {
  const store = artifactStore();
  if (store) {
    try {
      await store.delete(KEY, false);
    } catch {
      /* already gone */
    }
    return;
  }
  if (backend === "local") {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
    return;
  }
  memory = null;
}
