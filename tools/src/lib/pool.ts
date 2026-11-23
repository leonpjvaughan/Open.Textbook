export async function mapPool<T>(
  items: readonly T[],
  limit: number,
  run: (item: T, index: number) => Promise<void>,
): Promise<void> {
  const workers = Math.max(1, Math.min(limit, items.length));
  let next = 0;
  const work = async () => {
    for (;;) {
      const index = next;
      next += 1;
      if (index >= items.length) return;
      await run(items[index] as T, index);
    }
  };
  await Promise.all(Array.from({ length: workers }, work));
}
