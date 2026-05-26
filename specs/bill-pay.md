# Bill Payment — Test Cases

## Page
- **URL:** `billpay.htm`
- **Auth Required:** Yes

## Page Elements

| Element Name        | Description                                             |
|---------------------|---------------------------------------------------------|
| `payee-name`        | Text field for the payee's full name                    |
| `payee-address`     | Text field for the payee's street address               |
| `payee-city`        | Text field for the payee's city                         |
| `payee-state`       | Text field for the payee's state abbreviation           |
| `payee-zip`         | Text field for the payee's ZIP code                     |
| `payee-phone`       | Text field for the payee's phone number                 |
| `account-number`    | Text field for the payee's account number               |
| `verify-account`    | Confirmation text field — must match `account-number`   |
| `amount-input`      | Text field for the payment amount in dollars            |
| `from-account`      | Dropdown to select the account to pay from              |
| `send-button`       | Submit button "Send Payment"                            |
| `success-heading`   | Heading on the confirmation page after payment          |
| `success-container` | Full confirmation area showing payment details          |
| `name-error`        | Inline validation error when payee name is missing      |

## Test Cases

### TC-BPY-001: Bill pay page renders all required fields
**Category:** Visibility
**Steps:**
1. Navigate to `billpay.htm` while authenticated
**Expected:** `payee-name`, `payee-address`, `amount-input`, and `send-button` are visible

### TC-BPY-002: Successful bill payment submission
**Category:** Happy Path
**Steps:**
1. Fill `payee-name` with "Acme Corp"
2. Fill `payee-address` with "123 Main St"
3. Fill `payee-city` with "Anytown"
4. Fill `payee-state` with "CA"
5. Fill `payee-zip` with "12345"
6. Fill `payee-phone` with "555-0100"
7. Fill `account-number` with "99001"
8. Fill `verify-account` with "99001"
9. Fill `amount-input` with "50"
10. Click `send-button`
**Expected:** `success-heading` contains "Bill Payment Complete"

### TC-BPY-003: Success confirmation includes the payee name
**Category:** Happy Path — Detail
**Steps:**
1. Complete all payee fields using "Acme Corp" for `payee-name`
2. Fill `amount-input` with "50"
3. Click `send-button`
**Expected:** `success-container` contains "Acme Corp"

### TC-BPY-004: Validation error shown when payee name is missing
**Category:** Negative
**Steps:**
1. Skip `payee-name` (leave empty)
2. Fill `amount-input` with "50"
3. Click `send-button`
**Expected:** `name-error` is visible
