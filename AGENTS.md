# Repository Guidance

## Project Overview

- This repository publishes `fifatables-stream`, a TypeScript library for reading and writing FIFA table data with
  Node.js streams.
- `src/stream/` contains the public CSV stream helpers.
- `src/transforms/` contains the reusable stream transforms.
- `test/` contains the Vitest test suite, with fixtures under `test/mocks/`.
- `scripts/` contains package preparation scripts for npm and GitHub Package Registry publishing.
- `examples/` contains FIFA table exports used by the demo and as sample data.
- The build produces CommonJS and ES module targets under `dist/es5/` and `dist/es6/`.

## Environment and Package Manager

- Use the Node.js version declared in `.nvmrc`; run `nvm install` and `nvm use` before project commands.
- Use Bun 1.3.14 and keep `bun.lock` authoritative.
- Install dependencies with `bun install`; use `bun ci` for frozen installs.
- Do not run version, release, publish, or registry setup scripts unless the user explicitly asks.

## Common Commands

- Build both package targets: `bun run build`
- Run lint checks: `bun run lint`
- Run tests: `bun run test`
- Run tests with CI coverage: `bun run test --coverage`
- Format-check changed files: `bunx --no-install prettier --check <files>`

## Change Guidelines

- Keep changes focused and preserve the existing public API unless the task explicitly requires an API change.
- Add or update tests in `test/` when changing behavior in `src/`.
- Preserve stream backpressure, object/buffer modes, encoding behavior, and error propagation when editing stream code.
- Follow the repository's Prettier settings: two spaces, single quotes, semicolons, a 120-character print width, and no
  trailing commas.
- Do not edit generated output under `dist/` or coverage output under `coverage/`.
- Keep GitHub Actions on current supported major versions. Node setup in workflows must use
  `node-version-file: .nvmrc` rather than duplicating the Node version.

## Validation

- For source, test, packaging, or workflow changes, run `bun run lint`, `bun run build`, and
  `bun run test --coverage`.
- For documentation-only changes, validate the affected Markdown.
- Before handoff, run `git diff --check` and report the validation commands that were executed.
