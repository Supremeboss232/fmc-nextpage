# Contributing

Thank you for considering contributing to CapitalFlowX UI Clone.

- Code style: Prettier + ESLint are used. Run `npm run lint` and `npm run typecheck` before submitting.
- Commit messages: use Conventional Commits (feat|fix|chore|docs|refactor).
- Branch naming: feature/<short-desc> or fix/<short-desc>.
- PR template:
  - Summary of changes
  - How to test locally
  - Screenshots (if UI)
- Run tests: `npm test`
- Run dev: `npm run dev`

If replacing the mock adapter (src/api/adapter.ts):
- Use axios and VITE_API_BASE_URL env variable.
- Keep response shapes consistent with types in src/types/global.d.ts.
