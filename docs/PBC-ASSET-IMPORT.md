# Parallax Builder Curriculum: poster import guide

FieldManual369 v0.2 maps **21 visual posters** across **six collections** onto **19 original, interactive learning chapters**.

The source ZIP `Parallax_Builder_Curriculum_Renamed.zip` (SHA-256: `dcdfa9b064bbe0dd8bb8a270e7780aad8fba8c20ce4f096c1fab5276ac5906b6`) was integrity-checked and left unchanged.

## Why are the binaries separate?

The GitHub write connection used to open this pull request supports UTF-8 source files, but not direct uploads of local binary images. Publishing a poster URL before the image exists would be misleading, so the app shows an explicit "awaiting publication" placeholder.

## Fast import (GitHub web UI)

1. Download the prepared **FieldManual369_PR2_Poster_Assets.zip** from the ChatGPT conversation and extract it locally.
2. Open the PR's **feat/parallax-curriculum-posters-v0-2** branch on GitHub.
3. Go to `public/posters/` (contains this README).
4. Use **Add file → Upload files** and drag in all **21 WebP** files from the extracted `public/posters/` folder.
5. Commit to the PR feature branch, not directly to `main`.
6. Inspect the PR diff and rerun CI. After merging, verify the poster reader on GitHub Pages, including zoom, navigation and offline behavior for previously visited images.

**Optional:** Add the `docs/archive/PBC_manifest.csv` and `posters-integrity.json` from the asset bundle to preserve detailed per-image hashes and original filenames in the repo.

## Public release checks

- Confirm you have rights to distribute the images and that no third-party artwork was inadvertently embedded.
- Proofread image text. AI-generated diagrams are educational references, not verified standards or scientific findings.
- Confirm every poster loads at its expected path with correct title and usable zoom.
- Preserve the original archive and source-name mapping for provenance.
- The source-code MIT license does not automatically extend to artwork with uncertain licensing.
