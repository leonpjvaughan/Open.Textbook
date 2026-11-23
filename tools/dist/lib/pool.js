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
