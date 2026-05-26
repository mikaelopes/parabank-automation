# Spec Files

Each file is the human-authored source of truth for one page feature. The agent reads these during `/automate` to discover locators and generate tests.

## Format

```markdown
# <Feature> — Test Cases

## Page
- **URL:** `<relative>.htm`
- **Auth Required:** Yes | No

## Page Elements
| Element Name   | Description                      |
|----------------|----------------------------------|
| `element-name` | what it is / what it does        |

## Test Cases

### TC-XXX-NNN: Short title
**Category:** Happy Path | Negative | Visibility | Known Behavior
**Steps:**
1. Action using `element-name`
2. ...
**Expected:** Observable outcome
```

Element names in backticks are **logical names**, not selectors. The agent maps them to real locators during `/automate`.

## Naming

- File name matches the feature: `transfer.md`, `bill-pay.md`, `login.md`
- Test case IDs: `TC-<3-letter-feature-code>-<3-digit-number>` (e.g. `TC-TRF-001`)
