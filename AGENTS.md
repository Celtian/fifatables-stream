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
- Use Yarn 1.22.22 and keep `yarn.lock` authoritative.
- Install dependencies with `yarn install --frozen-lockfile`.
- Do not run version, release, publish, or registry setup scripts unless the user explicitly asks.

## Common Commands

- Build both package targets: `yarn build`
- Run lint checks: `yarn lint`
- Run tests: `yarn test`
- Run tests with CI coverage: `yarn test --coverage`
- Format-check changed files: `yarn prettier --check <files>`

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

- For source, test, packaging, or workflow changes, run `yarn lint`, `yarn build`, and `yarn test --coverage`.
- For documentation-only changes, validate the affected Markdown.
- Before handoff, run `git diff --check` and report the validation commands that were executed.
