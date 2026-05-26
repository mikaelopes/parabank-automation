# ParaBank QA Automation

Playwright + TypeScript test suite against [ParaBank](https://parabank.parasoft.com/parabank/) — a personal project to practice end-to-end test automation on a realistic banking demo.

**Test credentials:** `john` / `demo`  
**Base URL:** `https://parabank.parasoft.com/parabank/`

---

## Folder Structure

```
├── pages/               Page Object Model — one class per page
├── tests/manual/        Hand-written + agent-generated specs (source-controlled)
├── specs/               Human-authored test case descriptions (see specs/README.md)
├── fixtures/            Shared test data (users, amounts, payee info)
└── playwright.config.ts
```

---

## Locator Strategy

Stop at the first level that produces a **unique, stable** selector.

| Priority | Strategy | Example |
|----------|----------|---------|
| 1 | `name` attribute | `input[name="username"]` |
| 2 | `id` attribute | `#amount`, `#fromAccountId` |
| 3 | `value` on submit inputs | `input[value="Transfer"]` |
| 4 | Role + accessible name | `page.getByRole('link', { name: 'Register' })` |
| 5 | Stable CSS class | `page.locator('p.error').filter({ hasText: '...' })` |

**Avoid:** XPath, `:nth-child`, auto-generated or hashed class names.

---

## POM Conventions

One class per page in `pages/<Name>Page.ts`. See `pages/TransferPage.ts` as the canonical example.

- `Page` and `Locator` imported as `type` — erased at compile time
- All locators are `readonly`, initialized in the constructor only
- No `expect()` in action methods — keep actions and assertions separate
- Assertion methods start with `expect`, navigation method is always `goto()`
- No hard-coded test data — pass values as parameters

---

## Test File Conventions

One spec per feature in `tests/manual/<feature>.spec.ts`. See `tests/manual/transfer.spec.ts` as the canonical example.

- One `describe` block per file, named after the feature
- `beforeEach`: login first (if auth required), then navigate
- Test names: plain English, lowercase — describe behavior, not what to check
- Tests are independent — no shared state between them
- Import all test data from `fixtures/users.ts`, never hard-code in the spec
- Never import `expect` directly in a spec — all assertions go through `expect*()` page object methods

---

## Linting

`npm run lint` — check · `npm run format` — auto-fix. Config: `biome.json`.

---

## Known ParaBank Behaviors

| Behavior | Detail |
|----------|--------|
| Any non-empty login works | Shared demo accepts any credentials — no real auth gate |
| Empty fields → server error | Submitting empty amount returns a generic server error, not inline validation |
| Angular error spans never fire | `<p id="amount.errors">` stays hidden — server validates instead |
| `baseURL` trailing slash | `goto()` paths must NOT start with `/` |
| Login error locator | `p.error` on the same page |
| Transfer error locator | `page.locator('p.error').filter({ hasText: 'internal error' })` |
| Bill pay validation | Missing payee name: `#validationModel-name` becomes visible (client-side) |
