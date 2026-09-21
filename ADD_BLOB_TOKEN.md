# 🔑 Add BLOB_READ_WRITE_TOKEN Environment Variable

## Problem:
The upload API needs `BLOB_READ_WRITE_TOKEN` but Vercel created different variable names.

## Solution: Add the token manually

### **Step 1: Get the Blob Token**

1. Go to: https://vercel.com/sureshs-projects-1c6ee3cb/saleem-snapping-wildlife
2. Click **"Storage"** tab
3. Click on your Blob store: **"saleem-snapping-wildlife-blob"**
4. Look for **"Read-Write Token"** or **"Access Token"** on that page
5. Click **"Copy"** or copy the token value

### **Step 2: Add Environment Variable**

1. Go to: **Settings** → **Environment Variables**
2. Click **"Add Environment Variable"** (top right)
3. Fill in:
   ```
   Key: BLOB_READ_WRITE_TOKEN
   Value: [paste the token you copied]
   Environments: ✅ Production ✅ Preview ✅ Development (check all 3)
   ```
4. Click **"Save"**

### **Step 3: Redeploy**

1. Go to **"Deployments"** tab
2. Click **⋮** on latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes

### **Step 4: Test Upload**

Go to: https://www.saleemsnappings.in/admin/dashboard
- Upload should work! ✅

---

## Alternative: Use Existing Token

If you can't find the Read-Write token, you can use the webhook token:

1. Go to Environment Variables
2. Click **"Add Environment Variable"**
3. Fill in:
   ```
   Key: BLOB_READ_WRITE_TOKEN
   Value: vercel_blob_rw_[your-token-here]
   ```

The token format should be: `vercel_blob_rw_XXXXXXXXXX`

---

## Where to Find Token

On the Blob Store page, look for one of these:
- "Read-Write Token"
- "Access Token"  
- "API Token"
- "Connection String"

It might be under:
- A "Copy Token" button
- Settings/Configuration section
- API Access section

---

## If You Can't Find Token

Try this command in your terminal to get it:

```bash
vercel env ls
```

Look for `BLOB_READ_WRITE_TOKEN` in the output and copy its value.

Then add it manually to Vercel Environment Variables.
