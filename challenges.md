# Challenges Faced – Shopify Middleware Assignment

### 1. **Shopify API Credentials and Authentication**
- Issue: Initially, Shopify access tokens were accidentally committed, causing GitHub to block the push.
- Solution: Used `.gitignore` to exclude `.env`, cleaned Git history, and followed secure credential management best practices.

---

### 2. **Webhook.site – Understanding Response & Request Behavior**
- Issue: Webhook.site didn't show expected order content.
- Solution: Realized Webhook.site only shows request bodies dynamically. Used `{{request.body}}` for dynamic rendering, and understood it doesn’t persist order history.

---

### 3. **PowerShell Script Blocking NPM**
- Issue: `npm` commands didn’t run due to PowerShell execution policies.
- Solution: Switched to regular Command Prompt (`cmd`) instead of PowerShell for Node/NPM commands.

---

### 4. **Shopify Orders Not Appearing Initially**
- Issue: Middleware was not logging orders at first.
- Solution: Created new test orders manually inside the Shopify admin, verified fulfillment, and order visibility using API and webhook log.

---

### 5. **Git & GitHub Errors**
- Issue: GitHub rejected push due to secret detection.
- Solution: Cleaned `.env` from commits and followed GitHub’s guidance on push protection rules.

---

### ✅ Final Note:
The project now correctly:
- Fetches Shopify orders
- Transforms and posts them to a mock ERP system (Webhook.site)
- Handles logging and error messages

