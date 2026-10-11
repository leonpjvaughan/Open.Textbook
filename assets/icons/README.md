# Icons

Three files, one motif. They are the one place in this repository where a colour
is allowed to be fixed: a launcher tile and a browser tab are drawn by the
operating system, not by the page, so they cannot follow the reader's bundle or
colour scheme. Everything else reads `--tb-*` tokens.

| File | Where it is used |
|---|---|
| `app-icon.svg` | The home-screen and installable-app icon, named by the manifest. Full-bleed and inside the maskable safe circle, so the same file is both `any` and `maskable`. |
| `favicon.svg` | The browser tab. The same book, redrawn for 16 pixels. |
| `apple-touch-icon.png` | iOS home-screen tiles. **Committed, not generated** — see below. |

## Why the PNG is in git

iOS ignores the manifest's `icons` and asks for `<link rel="apple-touch-icon">`
pointing at a PNG it can size itself. Without one, an iPhone home screen gets a
screenshot of the page.

Rasterising it at build time is the tidier shape and there is no dependable
rasteriser in the build. `rsvg-convert` is not guaranteed on a CI runner, and
ImageMagick's SVG support depends on a delegate that may or may not be there.
`sharp` is present only as a transitive dependency of `wrangler`, so using it
means taking a direct dependency on a native module and pinning it in the lock
file for one 2 kB image. A build step that silently produces a missing or blank
icon is worse than a committed raster, so the file is an asset like the two SVGs
beside it.

The cost of that choice is drift — a committed raster is the one place a
generated file can go stale without anything noticing — so it is guarded rather
than trusted: `tests/test_pwa.py` pins the SHA-256 of `app-icon.svg`, and
changing the SVG fails that test with the command below. There is no silent
path from a new icon to an old PNG.

## Redrawing it

```bash
rsvg-convert -w 180 -h 180 assets/icons/app-icon.svg -o assets/icons/apple-touch-icon.png
```

180×180 is the size iOS asks for. Keep it RGB with no alpha: iOS applies no mask
to an `apple-touch-icon`, so transparency leaves it guessing at the background,
and the icon is already full-bleed. Then update the hash in
`tests/test_pwa.py` — that is the whole procedure.
