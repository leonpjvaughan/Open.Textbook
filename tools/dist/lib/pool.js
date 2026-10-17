/*
 * Run a bounded number of tasks at once.
 *
 * The browser commands spend their time waiting — for a page load, for a paint, for a
 * figure to mount — so running one page at a time leaves the machine idle. The figure
 * audit was 284 seconds of wall clock for about 40 seconds of work.
 *
 * `limit` is the number of **workers**, not a rate: each takes the next item when it
 * finishes, so a slow page does not hold up the queue behind it. Order of completion is
 * therefore not order of input, and a caller that needs stable output must key it — the
 * audit does, by slug and scheme.
 */
export async function mapPool(items, limit, run) {
    const workers = Math.max(1, Math.min(limit, items.length));
    let next = 0;
    const work = async () => {
        for (;;) {
            const index = next;
            next += 1;
            if (index >= items.length)
                return;
            await run(items[index], index);
        }
    };
    await Promise.all(Array.from({ length: workers }, work));
}
