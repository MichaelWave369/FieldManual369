# ✳ FieldManual369

**The Interactive Field Manual for Building Intelligent Systems**

> Learn the concept. Test the claim. Build the system. Verify the result.

A free, original React/TypeScript reference and experiment environment for thoughtful technology builders. Built around ten disciplines: agent architecture, UX, product strategy, evidence, information architecture, systems thinking, governance, research design, cybersecurity, and data modeling.

## v0.1: What works

- Search, filter, and explore all ten chapters, each with three core lessons, an exercise, guiding principle and primary reading link.
- Evidence Lab with explicit provenance, source, evidence quality, independent signals, testability, risk and assumptions. Transparent 1–5 **heuristic ceiling**, not a truth classifier or statistical confidence interval.
- Download a locally generated, clearly labeled JSON evidence receipt. No account, API key, remote submission or hidden verification.
- Local chapter completion tracking and a suggested three-stage learning map.
- Responsive, keyboard-aware interface with reduced-motion support.
- Service-worker app shell caching for repeat offline visits once successfully cached.
- GitHub Actions test/build checks and Pages deployment.

## Local development

Requires Node.js 22+.

```bash
npm install
npm run dev
npm run check
```

## Deployment

Merge the feature PR after CI passes. In **Settings → Pages**, select **GitHub Actions** as the deployment source. The `Deploy GitHub Pages` workflow builds with `GITHUB_PAGES=true`, automatically using the `/FieldManual369/` base path.

Expected URL after a successful Pages deploy:
https://michaelwave369.github.io/FieldManual369/

The deployed site and offline mode are **not** validated until the deployment workflow succeeds and the live URL is tested. On first visit, the page requires connectivity; the service worker then attempts to cache the shell and built assets for future use. External source links and fonts still require internet.

## Repository rules

- Independently authored code and summaries. Original inspiration images are intentionally **not distributed** because their reuse permissions have not been established.
- Reference links are for further reading, not automatic validation or endorsement.
- The Evidence Lab does **not** fetch documents, verify claimed provenance, identify actual independent sources, or adjudicate truth. Values are entered by the user. High-stakes use requires domain-specific review.
- Progress stays in browser localStorage; lab inputs remain in page memory until exported. Avoid entering secrets or sensitive personal information into shared-device browsers.
- No backend, keys, wallet connections, unapproved side effects or external agents.
- Every material enhancement should include testing and accessible failure states.

## Planned (not shipped)

Evidence receipt import and comparison, interactive diagram exercises, domain-specific rubric calibration, advanced search, additional original chapter lessons, and integration adapters that are off by default.

## License

Original repository source and written content: [MIT](LICENSE). External linked sources retain their owners' rights.
