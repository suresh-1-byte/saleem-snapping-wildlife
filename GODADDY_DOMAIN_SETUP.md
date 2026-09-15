# 🌐 Connect GoDaddy Domain to Vercel

## Step-by-Step Guide

---

## 📋 What You'll Need

- Your GoDaddy domain name (e.g., `saleemsnapping.com`)
- Access to GoDaddy account
- Access to Vercel dashboard

---

## 🎯 PART 1: Add Domain in Vercel

### Step 1: Go to Vercel Domains Settings

1. **Open your Vercel project:**
   - Go to: https://vercel.com/sureshs-projects-1c6ee3cb/saleem-snapping-wildlife

2. **Click "Settings"** in the top navigation

3. **Click "Domains"** in the left sidebar

### Step 2: Add Your Domain

1. **In the "Add Domain" field, type your domain:**
   ```
   saleemsnapping.com
   ```
   (Replace with your actual domain)

2. **Click "Add"**

3. **Add www subdomain too:**
   ```
   www.saleemsnapping.com
   ```

4. **Click "Add"**

### Step 3: Get DNS Records from Vercel

After adding the domain, Vercel will show you DNS records. You'll see something like:

**For root domain (saleemsnapping.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain (www.saleemsnapping.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**⚠️ KEEP THIS PAGE OPEN** - You'll need these values for GoDaddy!

---

## 🔧 PART 2: Configure DNS in GoDaddy

### Step 1: Login to GoDaddy

1. Go to: https://www.godaddy.com/
2. Click "Sign In"
3. Enter your credentials

### Step 2: Open DNS Management

1. Click on your **profile icon** (top right)
2. Click **"My Products"**
3. Find your domain (e.g., saleemsnapping.com)
4. Click **"DNS"** button next to it
   - Or click the three dots ⋮ → **"Manage DNS"**

### Step 3: Add A Record (Root Domain)

1. Scroll to **"DNS Records"** section

2. **Find existing A Record** (if any):
   - Type: `A`
   - Name: `@`
   - If it exists, click the **pencil icon** (Edit)
   - If not, click **"Add New Record"**

3. **Enter these values:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 600 seconds (or default)
   ```
   **⚠️ Use the actual IP from Vercel, not this example!**

4. **Click "Save"**

### Step 4: Add CNAME Record (www Subdomain)

1. **Find existing CNAME Record** for www:
   - Type: `CNAME`
   - Name: `www`
   - If it exists, click the **pencil icon** (Edit)
   - If not, click **"Add New Record"**

2. **Enter these values:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 1 hour (or default)
   ```
   **⚠️ Use the actual CNAME from Vercel!**

3. **Click "Save"**

### Step 5: Remove Conflicting Records (Important!)

**GoDaddy often has default records that conflict. Remove these:**

1. **Look for CNAME with name `@`** - DELETE IT
   - Root domain should use A record, not CNAME

2. **Look for any "Parked" records** - DELETE THEM
   - Usually points to GoDaddy parking page

3. **Look for duplicate www records** - Keep only the Vercel one

---

## ⏰ PART 3: Wait for DNS Propagation

### Timeframe:
- **Minimum**: 10-30 minutes
- **Average**: 1-2 hours
- **Maximum**: 24-48 hours (rare)

### Check Status:

#### Option 1: In Vercel Dashboard
1. Go back to Vercel → Settings → Domains
2. Look for green checkmark ✓ next to your domain
3. Status will show "Valid Configuration"

#### Option 2: Use DNS Checker Tool
1. Go to: https://dnschecker.org/
2. Enter your domain: `saleemsnapping.com`
3. Select record type: `A`
4. Click "Search"
5. Green checkmarks = DNS propagated!

#### Option 3: Use Command Line
```bash
# Check A record
nslookup saleemsnapping.com

# Check CNAME record
nslookup www.saleemsnapping.com
```

---

## ✅ PART 4: Verify Everything Works

### Test Your Domain:

1. **Open browser and visit:**
   - `https://saleemsnapping.com`
   - `https://www.saleemsnapping.com`

2. **Both should redirect to your Vercel site!**

3. **Check SSL Certificate:**
   - Click the padlock 🔒 icon in browser
   - Should show "Connection is secure"
   - Vercel auto-provisions SSL (may take 10 minutes)

---

## 🔐 PART 5: Update Environment Variables

After domain is connected:

1. **Go to Vercel → Settings → Environment Variables**

2. **Update or add:**
   ```
   NEXT_PUBLIC_SITE_URL=https://saleemsnapping.com
   ```

3. **Click "Save"**

4. **Redeploy** (Vercel will do automatically)

---

## 🚨 Troubleshooting

### Problem: "Domain not verified" in Vercel

**Solution:**
- Wait 30 minutes for DNS propagation
- Check DNS records in GoDaddy are exactly as Vercel specified
- Remove any conflicting CNAME @ records
- Clear browser cache

### Problem: Site shows GoDaddy parking page

**Solution:**
- Remove GoDaddy's default parking CNAME record
- Wait for DNS propagation (up to 2 hours)
- Clear browser cache (Ctrl + Shift + R)

### Problem: www works but root domain doesn't (or vice versa)

**Solution:**
- Check both A and CNAME records are added correctly
- In Vercel, make sure both domains are added
- Wait for DNS propagation

### Problem: "Invalid Configuration" in Vercel

**Solution:**
- Double-check IP address and CNAME values match exactly
- Remove any @ CNAME records (use A record instead)
- Wait 10 minutes and click "Refresh" in Vercel

### Problem: SSL Certificate not working

**Solution:**
- Wait 10-15 minutes after DNS propagation
- Vercel auto-provisions SSL - be patient
- Visit https:// (not http://) to trigger SSL
- Hard refresh browser (Ctrl + Shift + R)

---

## 📊 Quick Reference Table

| Setting | Type | Name | Value | Where |
|---------|------|------|-------|-------|
| Root Domain | A | @ | `76.76.21.21` | GoDaddy DNS |
| www Subdomain | CNAME | www | `cname.vercel-dns.com` | GoDaddy DNS |
| Environment | Variable | NEXT_PUBLIC_SITE_URL | `https://yourdomain.com` | Vercel Settings |

**⚠️ Replace values with actual ones from YOUR Vercel dashboard!**

---

## 🎯 Complete Checklist

- [ ] Added domain in Vercel (root + www)
- [ ] Copied DNS records from Vercel
- [ ] Logged into GoDaddy DNS management
- [ ] Added/Updated A record (@) with Vercel IP
- [ ] Added/Updated CNAME record (www) with Vercel CNAME
- [ ] Removed conflicting records (CNAME @, parking)
- [ ] Waited for DNS propagation (30 min - 2 hours)
- [ ] Verified domain shows green checkmark in Vercel
- [ ] Tested https://yourdomain.com works
- [ ] Tested https://www.yourdomain.com works
- [ ] Updated NEXT_PUBLIC_SITE_URL in Vercel
- [ ] SSL certificate is active (🔒 padlock shows)

---

## 🌟 What You'll Have After Setup

✅ Your own custom domain (e.g., saleemsnapping.com)  
✅ www subdomain automatically redirects to root  
✅ Free SSL certificate (HTTPS 🔒)  
✅ Professional email possible (youremail@saleemsnapping.com)  
✅ Better SEO with custom domain  
✅ Automatic deployment on git push  

---

## 📞 Need Help?

### Vercel Support:
- https://vercel.com/support

### GoDaddy Support:
- https://www.godaddy.com/help

### DNS Check Tools:
- https://dnschecker.org/
- https://www.whatsmydns.net/

### Common GoDaddy DNS Settings:
- https://www.godaddy.com/help/add-an-a-record-19238
- https://www.godaddy.com/help/add-a-cname-record-19236

---

## 🎉 Your Custom Domain Will Be Live!

Once DNS propagates, your website will be accessible at:
- **https://saleemsnapping.com** (or your domain)
- **https://www.saleemsnapping.com**

Both will show your beautiful wildlife photography portfolio! 📸🌿

---

**Pro Tip**: Bookmark your Vercel dashboard for easy access:
https://vercel.com/sureshs-projects-1c6ee3cb/saleem-snapping-wildlife
