type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

export class APICache {
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private readonly TTL: number = 1000 * 60 * 60; // 1 hour cache

  async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key) as CacheEntry<T> | undefined;
    const now = Date.now();

    if (cached && now - cached.timestamp < this.TTL) {
      return cached.data;
    }

    // Relevant tem not found in cache
    const data = await fetcher();
    this.cache.set(key, { data, timestamp: now });
    return data;
  }
}

// Global cache instance (singleton)
export const apiCache = new APICache();
