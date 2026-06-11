import { useState, useEffect, useCallback } from "react";

interface UseMockFetchResult<T> {
  data:    T | null;
  loading: boolean;
  error:   string | null;
  refetch: () => void;
}

/**
 * useMockFetch — simulates an async API call with a realistic delay.
 *
 * Wraps synchronous mock data so pages render with a loading state first,
 * making prototypes feel like real applications.
 *
 * Usage:
 *   const { data, loading, error, refetch } = useMockFetch(() => USERS, []);
 *
 * Parameters:
 *   fetcher     — function that returns mock data (called after the delay)
 *   deps        — dependency array (re-fetches when these change, like useEffect)
 *   delay       — simulated network latency in ms (default: 800)
 *   errorRate   — 0–1 probability of simulating a random error (default: 0)
 *
 * Example with error simulation:
 *   const { data, loading, error, refetch } = useMockFetch(() => USERS, [], 800, 0.2);
 *   // 20% chance of throwing an error — useful for testing error states
 */
export function useMockFetch<T>(
  fetcher: () => T,
  deps: unknown[] = [],
  delay = 800,
  errorRate = 0,
): UseMockFetchResult<T> {
  const [data,    setData]    = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [tick,    setTick]    = useState(0);

  const refetch = useCallback(() => {
    setTick((t) => t + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      if (cancelled) return;

      if (errorRate > 0 && Math.random() < errorRate) {
        setError("Failed to load data. Please try again.");
        setLoading(false);
        return;
      }

      try {
        const result = fetcher();
        setData(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, delay, errorRate, ...deps]);

  return { data, loading, error, refetch };
}
