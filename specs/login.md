# Login — Test Cases

## Page
- **URL:** `index.htm`
- **Auth Required:** No

## Page Elements

| Element Name     | Description                                        |
|------------------|----------------------------------------------------|
| `username-input` | Text field for username                            |
| `password-input` | Text field for password                            |
| `login-button`   | Submit button that posts the login form            |
| `error-message`  | Server-side error shown when validation fails      |
| `register-link`  | Navigation link to the registration page           |
| `account-table`  | Accounts overview table visible after login        |

## Test Cases

### TC-LGN-001: Successful login with valid credentials
**Category:** Happy Path
**Steps:**
1. Fill `username-input` with "john"
2. Fill `password-input` with "demo"
3. Click `login-button`
**Expected:** URL contains "overview" and `account-table` is visible

### TC-LGN-002: Demo environment accepts any non-empty credentials
**Category:** Known Behavior
> ParaBank's shared demo accepts any non-empty credentials — no real auth gate.
> In production this test would assert a 401 error message.
**Steps:**
1. Fill `username-input` with "notarealuser"
2. Fill `password-input` with "notarealpassword"
3. Click `login-button`
**Expected:** URL contains "overview" and `account-table` is visible

### TC-LGN-003: Error shown when username is empty
**Category:** Negative
**Steps:**
1. Leave `username-input` empty
2. Fill `password-input` with "demo"
3. Click `login-button`
**Expected:** `error-message` is visible

### TC-LGN-004: Error shown when password is empty
**Category:** Negative
**Steps:**
1. Fill `username-input` with "john"
2. Leave `password-input` empty
3. Click `login-button`
**Expected:** `error-message` is visible

### TC-LGN-005: Register link is visible on login page
**Category:** Visibility
**Steps:**
1. View the login page without logging in
**Expected:** `register-link` is visible
