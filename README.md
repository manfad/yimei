# Yimei Environment Protection

Marketing site for Yimei Environment Protection — industrial wastewater treatment and water recovery.

## Setup

```sh
pnpm install
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321).

## Commands

| Command        | Action                          |
| :------------- | :------------------------------ |
| `pnpm dev`     | Start dev server                |
| `pnpm build`   | Build static site to `./dist/`  |
| `pnpm preview` | Preview production build        |

## Editing content

Products and events are edited in [Keystatic](https://keystatic.com), which is only available in development:

1. Run `pnpm dev` (or `pnpm cms`) and open [http://localhost:4321/keystatic](http://localhost:4321/keystatic).
2. Edit, then commit the changed files under `src/content/` and `public/images/` and push.

| Collection | Files                         | Drives                                                                 |
| :--------- | :---------------------------- | :--------------------------------------------------------------------- |
| Products   | `src/content/products/*.json` | `/products` (cards, filtered by category) and each `/products/<id>` page |
| Events     | `src/content/events/*.md`     | `/events` (cards) and each `/events/<id>` page; the story is the body   |

Uploaded photos are stored in `public/images/<collection>/<entry>/`. Event photos go inline in the story; the cover image is optional, and when it is empty the first photo in the story is used for the card and share image. A product's first gallery photo is its card image unless a card image is set. Entries marked Draft are hidden from the site.
