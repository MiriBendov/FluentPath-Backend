# Scripts

This folder contains development and debug scripts that are not part of the production app.

---

## ✅ testSendSMS.ts

Manual test script to check SMS sending via Twilio.  
Used during development to verify SMS functionality (2FA, notifications, etc.)

---

### 📦 Requirements

- Valid Twilio credentials in `.env`:
  - TWILIO_ACCOUNT_SID
  - TWILIO_AUTH_TOKEN
  - TWILIO_PHONE_NUMBER
- Verified phone number (for trial accounts)

---

### ▶️ How to run

**Windows (PowerShell / CMD):**

```bash
npx ts-node .\src\scripts\testSendSMS.ts
```

**Unix (Linux / macOS / Git Bash):**

```bash
npx ts-node src/scripts/testSendSMS.ts
```
