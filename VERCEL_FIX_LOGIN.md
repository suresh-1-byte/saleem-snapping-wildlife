# 🔐 Fix Admin Login on Vercel - Quick Guide

## ⚠️ Problem
Admin login shows "Invalid credentials" on Vercel because environment variables aren't set.

## ✅ Fixed Issues (Just Pushed)
1. ✅ Synced JWT secret between login and auth verification
2. ✅ Fixed default password to match (admin/admin123)
3. ✅ Fixed admin navigation redirects
4. ✅ Fixed wildlife page fonts
5. ✅ Fixed watermark positioning

## 🚀 What You Need to Do

### **Step 1: Add Environment Variables to Vercel**

1. Go to: https://vercel.com/
2. Click your project: **saleem-snapping-wildlife**
3. Click **Settings** → **Environment Variables**
4. Add these 3 variables:

```
Variable 1:
Name: ADMIN_USERNAME
Value: admin
Select: Production, Preview, Development (all 3)
Click "Save"

Variable 2:
Name: ADMIN_PASSWORD
Value: admin123
Select: Production, Preview, Development (all 3)
Click "Save"

Variable 3:
Name: JWT_SECRET
Value: your-super-secret-jwt-key-change-this-in-production-123456789
Select: Production, Preview, Development (all 3)
Click "Save"
```

### **Step 2: Redeploy**

Vercel will automatically redeploy after the git push, but if not:
- Click "Deployments" tab
- Wait for automatic deployment to finish (1-2 minutes)

### **Step 3: Test Login**

1. Go to: https://www.saleemsnappings.in/admin/login
2. Enter:
   - Username: **admin**
   - Password: **admin123**
3. Click Login → Should work! ✅

---

## 🎯 What Was Fixed

### 1. **JWT Secret Mismatch** 
- Login was creating tokens with one secret
- Dashboard was verifying with a different secret
- **Fixed**: Both now use same secret

### 2. **Default Credentials**
- Changed from admin/wildlife123 → admin/admin123
- Matches your .env.local file

### 3. **Admin Navigation**
- Stories/Images tabs won't redirect to homepage
- Created separate admin layout without main site navigation

### 4. **Wildlife Fonts**
- Headers now use Caveat (handwritten font)
- Matches photo caption style

### 5. **Watermark Position**
- Fixed to stay inside photo boundaries
- Works on vertical photos too

---

## 🔒 Change Password Later

After confirming login works:

1. Go to Vercel → Settings → Environment Variables
2. Edit `ADMIN_PASSWORD` 
3. Change to your secure password
4. Save (will auto-redeploy)
5. Use new password to login

---

## 📞 Test These After Deployment

✅ Login works (admin/admin123)
✅ Dashboard loads
✅ Stories tab doesn't redirect
✅ Images tab doesn't redirect  
✅ Wildlife page fonts match
✅ Watermarks stay inside photos

---

**Direct link to environment variables:**
https://vercel.com/sureshs-projects-1c6ee3cb/saleem-snapping-wildlife/settings/environment-variables
