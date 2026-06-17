const KEY = "medius_cardFeeds";

export function saveFeeds(feeds: unknown[]): void {
  try { sessionStorage.setItem(KEY, JSON.stringify(feeds)); } catch {}
}

export function loadFeeds<T>(): T[] | undefined {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as T[]) : undefined;
  } catch {
    return undefined;
  }
}

export function clearFeeds(): void {
  try { sessionStorage.removeItem(KEY); } catch {}
}
