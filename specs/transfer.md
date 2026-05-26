# Fund Transfer — Test Cases

## Page
- **URL:** `transfer.htm`
- **Auth Required:** Yes

## Page Elements

| Element Name        | Description                                              |
|---------------------|----------------------------------------------------------|
| `amount-input`      | Text field for the dollar amount to transfer             |
| `from-account`      | Dropdown to select the source account                    |
| `to-account`        | Dropdown to select the destination account               |
| `transfer-button`   | Submit button that executes the transfer                 |
| `success-heading`   | Heading on the confirmation page after transfer          |
| `success-container` | Full confirmation area showing all transfer details      |
| `error-message`     | Error shown when transfer fails (e.g. empty amount)      |

## Test Cases

### TC-TRF-001: Transfer page renders required elements
**Category:** Visibility
**Steps:**
1. Navigate to `transfer.htm` while authenticated
**Expected:** `amount-input`, `from-account`, `to-account`, and `transfer-button` are all visible

### TC-TRF-002: Successful fund transfer between accounts
**Category:** Happy Path
**Steps:**
1. Fill `amount-input` with "100"
2. Select index 0 in `from-account`
3. Select index 1 in `to-account`
4. Click `transfer-button`
**Expected:** `success-heading` contains "Transfer Complete!"

### TC-TRF-003: Success confirmation includes the transferred amount
**Category:** Happy Path — Detail
**Steps:**
1. Fill `amount-input` with "100"
2. Select index 0 in `from-account`
3. Select index 1 in `to-account`
4. Click `transfer-button`
**Expected:** `success-container` contains the text "100"

### TC-TRF-004: Error shown when amount field is empty
**Category:** Negative
> ParaBank has no client-side validation — empty amount POSTs to the server
> and returns a generic error page rather than an inline validation message.
**Steps:**
1. Leave `amount-input` empty
2. Click `transfer-button`
**Expected:** `error-message` with text matching "internal error" is visible
