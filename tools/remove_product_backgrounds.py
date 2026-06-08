#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


def iter_images(source: Path) -> list[Path]:
    return sorted(
        path
        for path in source.rglob("*")
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    )


def output_path(source_root: Path, output_root: Path, image_path: Path) -> Path:
    relative = image_path.relative_to(source_root)
    return output_root / relative.with_suffix(".png")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Remove product image backgrounds into a separate mirrored folder."
    )
    parser.add_argument("--source", default="product-images", type=Path)
    parser.add_argument(
        "--output",
        default="product-images-processed/background-removed",
        type=Path,
    )
    parser.add_argument("--model", default="u2netp")
    parser.add_argument("--limit", type=int)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    source = args.source.resolve()
    output = args.output.resolve()

    if not source.exists():
        print(f"source folder does not exist: {source}", file=sys.stderr)
        return 1

    try:
        from PIL import Image
        from rembg import new_session, remove
    except ImportError as exc:
        print(
            "missing dependency. Run with PYTHONPATH pointing at the temporary rembg install.",
            file=sys.stderr,
        )
        print(str(exc), file=sys.stderr)
        return 1

    providers = ["CPUExecutionProvider"]
    session = new_session(args.model, providers=providers)
    images = iter_images(source)
    if args.limit is not None:
        images = images[: args.limit]

    output.mkdir(parents=True, exist_ok=True)
    total = len(images)
    processed = 0
    skipped = 0
    failed = 0

    for index, image_path in enumerate(images, start=1):
        target = output_path(source, output, image_path)
        if target.exists() and not args.force:
            skipped += 1
            print(f"[{index}/{total}] skip {target}")
            continue

        target.parent.mkdir(parents=True, exist_ok=True)
        try:
            image = Image.open(image_path).convert("RGBA")
            result = remove(
                image,
                session=session,
                alpha_matting=False,
                post_process_mask=True,
            )
            result.save(target)
            processed += 1
            print(f"[{index}/{total}] wrote {target}")
        except Exception as exc:  # noqa: BLE001 - keep the batch moving.
            failed += 1
            print(f"[{index}/{total}] failed {image_path}: {exc}", file=sys.stderr)

    print(f"done: processed={processed} skipped={skipped} failed={failed}")
    return 1 if failed else 0


if __name__ == "__main__":
    os.environ.setdefault("U2NET_HOME", "/tmp/yimei-rembg-models")
    raise SystemExit(main())
