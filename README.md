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
├── tests/manual/        Hand-written specs (source-controlled)
├── specs/               Human-authored test case descriptions
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

# Manual specs only
npm run test:manual

# Single spec
npx playwright test tests/manual/transfer.spec.ts --reporter=list

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

**Spec-first workflow** — each feature starts as a human-authored `specs/*.md` file describing elements and test cases. The `/automate` command in Claude Code reads the spec, browses the live page to discover locators, then generates the page object and test file.

**Fixture-driven data** — all test data lives in `fixtures/users.ts`. No hard-coded strings in spec files.

**Locator strategy** — selectors follow a strict priority order: `name` attribute → `id` → `value` on submit inputs → role + accessible name → stable CSS class. XPath and positional selectors are never used.

## Test Credentials

The ParaBank demo accepts any non-empty credentials. Default: `john` / `demo`.
