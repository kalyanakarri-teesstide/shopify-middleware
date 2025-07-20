# Challenges Faced – Shopify Middleware Assignment

### 1. Shopify Credentials & GitHub Push Block
- **Issue**: Accidentally committed the `.env` file with sensitive credentials. GitHub flagged the push due to exposed secrets.
- **Solution**: Removed secrets from Git history using tools like `git filter-repo`, added `.env` to `.gitignore`, and restructured workflow to load credentials securely.

---

### 2. Webhook.site Misunderstanding
- **Issue**: Expected to see old order data in Webhook.site logs.
- **Solution**: Learned that Webhook.site only displays **live** incoming webhooks. Verified real-time payloads using the Live tab.

---

### 3. PowerShell Blocking NPM Scripts
- **Issue**: PowerShell restricted script execution, causing `npm run dev` to fail.
- **Solution**: Used `CMD` or ran `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` to allow scripts during development sessions.

---

### 4. No Payload from Shopify Webhooks
- **Issue**: Middleware wasn’t receiving order data.
- **Solution**: Manually triggered test orders in Shopify. Ensured correct webhook registration and added logging to confirm incoming data.

---

### 5. CORS Errors Between Frontend & Backend
- **Issue**: React frontend couldn't access backend APIs due to CORS policy errors.
- **Solution**: Updated CORS middleware in Express backend to allow requests from both local (`localhost:3000`) and deployed frontend domains.

---

### 6. React Build Errors on Render
- **Issue**: Deployment on Render failed due to missing dependencies (`web-vitals`, `react-toastify`) and mismatched versions.
- **Solution**: Installed missing dependencies, fixed version conflicts, and ensured `npm run build` succeeded locally before pushing.

---

### Outcome
- Secure and functional codebase
- Orders flow from Shopify → Node.js Middleware → Mock ERP
- Frontend receives real-time updates with toast notifications
- Deployed successfully using Render (backend) and Netlify/Vercel (frontend)
