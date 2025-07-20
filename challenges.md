---

##  `CHALLENGES.md` (1-page note)

```markdown
# Challenges Faced – Shopify Middleware Assignment

### 1. Shopify Credentials & GitHub Push Block
- **Issue**: Accidentally committed `.env` file containing tokens, causing GitHub to block pushes due to detected secrets.
- **Solution**: Removed secrets from Git history, updated `.gitignore`, and ensured proper use of `.env` files going forward.

---

### 2. Webhook.site Dynamic Rendering Confusion
- **Issue**: Expected to see historical orders in Webhook.site, but only live data is shown.
- **Solution**: Realized that Webhook.site is a live logging tool, not a storage system. Confirmed incoming payloads using live tabs.

---

### 3. PowerShell Blocks NPM Scripts
- **Issue**: PowerShell restricted running `npm run` commands.
- **Solution**: Switched to regular CMD or used `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` in PowerShell.

---

### 4. Shopify Orders Not Logging
- **Issue**: Backend received no payloads initially.
- **Solution**: Created manual test orders in Shopify, ensured webhook delivery, and added logging in backend to debug.

---

### 5. React Frontend Not Updating
- **Issue**: CORS issues when calling backend from deployed frontend.
- **Solution**: Updated backend CORS config to whitelist both local and deployed frontend origins.

---

### 6. Render Static Build Issues
- **Issue**: React build failed due to missing `web-vitals` and version mismatches.
- **Solution**: Installed required packages (`web-vitals`, correct `react-toastify` version) and ran `npm run build` before deploying.

---

### Result
- Fully functional backend and frontend
- Orders flow from Shopify → Middleware → ERP (mock)
- Displayed live on frontend with Toast notifications

