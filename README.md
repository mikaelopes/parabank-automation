# ParaBank QA Automation

End-to-end test suite for [ParaBank](https://parabank.parasoft.com/parabank/), a realistic banking demo app. Built with Playwright + TypeScript to practice production-grade test automation patterns.

## Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev) | Browser automation + test runner |
| TypeScript | Type-safe page objects and fixtures |
| [Biome](https://biomejs.dev) | Linting and formatting |

## Project Structure

```
├── pages/               Page Object Model — one class per page
├── tests/               Spec files — hand-written or generated via /automate
├── specs/               Test case descriptions used as input for /automate
├── fixtures/            Shared test data
├── biome.json           Linter + formatter config
└── playwright.config.ts
```

## Test Coverage

| Feature | Tests | Categories |
|---------|-------|------------|
| Login | 5 | Happy path, negative, visibility, known behavior |
| Fund Transfer | 4 | Happy path, negative, visibility |
| Bill Payment | 4 | Happy path, negative, visibility |

## Setup

```bash
npm install
npx playwright install chromium
```

## Running Tests

```bash
# All tests
npm test

# Single spec
npx playwright test tests/transfer.spec.ts --reporter=list

# HTML report
npm run test:report
```

## Linting

```bash
npm run lint      # check
npm run format    # auto-fix
```

## Patterns Used

**Page Object Model** — one class per page with `readonly` locators, typed action methods, and `expect*()` assertion methods. No `expect()` in action methods.

**Two ways to create tests** — write a spec directly in `tests/` by hand, or author a `specs/*.md` file describing the page elements and test cases and run `/automate specs/<feature>.md` in Claude Code. The skill browses the live page, resolves locators, then generates the page object and test file in `tests/`.

**Fixture-driven data** — all test data lives in `fixtures/users.ts`. No hard-coded strings in spec files.

**Locator strategy** — selectors follow a strict priority order: `name` attribute → `id` → `value` on submit inputs → role + accessible name → stable CSS class. XPath and positional selectors are never used.

## Test Credentials

Default: `john` / `demo`.
