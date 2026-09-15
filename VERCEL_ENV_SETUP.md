# 🔐 Fix Admin Login - Add Environment Variables to Vercel

## ⚠️ Problem:
Your admin login shows "Invalid credentials" because environment variables are not set in Vercel.

## ✅ Solution: Add Environment Variables

### **Step 1: Open Vercel Environment Variables**

Click this link to go directly to your project settings:
```
https://vercel.com/sureshs-projects-1c6ee3cb/saleem-snapping-wildlife/settings/environment-variables
```

Or manually:
1. Go to https://vercel.com/
2. Click on your project: `saleem-snapping-wildlife`
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in left sidebar

### **Step 2: Add These 3 Variables**

Add these one by one:

#### Variable 1:
```
Name: ADMIN_USERNAME
Value: admin
Environment: Production, Preview, Development (select all 3)
```
Click **"Save"**

#### Variable 2:
```
Name: ADMIN_PASSWORD
Value: admin123
Environment: Production, Preview, Development (select all 3)
```
Click **"Save"**

#### Variable 3:
```
Name: JWT_SECRET
Value: your-super-secret-jwt-key-change-this-in-production-123456789
Environment: Production, Preview, Development (select all 3)
```
Click **"Save"**

### **Step 3: Redeploy**

After adding all variables:

**Option A: Automatic (Recommended)**
- Vercel will show a banner saying "Redeploy required"
- Click **"Redeploy"** button

**Option B: Manual**
- Go to "Deployments" tab
- Click the three dots ⋮ next to the latest deployment
- Click **"Redeploy"**

**Option C: Push a commit** (from your computer)
```bash
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

### **Step 4: Wait & Test**

1. Wait 1-2 minutes for deployment to complete
2. Go to: https://www.saleemsnappings.in/admin/login
3. Enter:
   - Username: `admin`
   - Password: `admin123`
4. Click Login
5. Should work now! ✅

---

## 🎯 Quick Copy-Paste Values

```
ADMIN_USERNAME = admin
ADMIN_PASSWORD = admin123
JWT_SECRET = your-super-secret-jwt-key-change-this-in-production-123456789
```

---

## 📸 Visual Guide

### Where to add variables:

1. **Vercel Dashboard** → Your Project
2. **Settings** tab → **Environment Variables**
3. Click **"Add New"**
4. Fill:
   - **Key**: Variable name (e.g., ADMIN_USERNAME)
   - **Value**: Variable value (e.g., admin)
   - **Environments**: Check all 3 boxes ☑️
5. Click **"Save"**
6. Repeat for all 3 variables

---

## ⚠️ Important Notes

- **All 3 environments must be selected** (Production, Preview, Development)
- Variables are case-sensitive: `ADMIN_USERNAME` not `admin_username`
- After adding, you MUST redeploy for changes to take effect
- Changes are NOT instant - wait for redeployment to complete

---

## 🔍 How to Verify It's Working

After redeploying:

1. Check Vercel deployment logs:
   - Go to "Deployments" tab
   - Click latest deployment
   - Check if it says "Ready"

2. Test login at: https://www.saleemsnappings.in/admin/login

3. If still not working:
   - Check browser console (F12) for errors
   - Verify all 3 variables are added correctly
   - Try clearing browser cache
   - Wait 5 minutes and try again

---

## 🆘 Still Not Working?

If login still fails after adding variables and redeploying:

1. Double-check spelling of variable names
2. Ensure no extra spaces in values
3. Verify all 3 environments are checked
4. Wait 5 minutes after redeployment
5. Try logging in with:
   - Username: admin (lowercase, no spaces)
   - Password: admin123 (no spaces)

---

## 🔒 Security Note

After you confirm login works, you should change the password!

1. Update `ADMIN_PASSWORD` in Vercel
2. Change to a strong password
3. Redeploy
4. Use new password to login

---

**Direct link to add variables:**
https://vercel.com/sureshs-projects-1c6ee3cb/saleem-snapping-wildlife/settings/environment-variables
