# 🚀 Quick Start: Connect Your GoDaddy Domain (5 Minutes)

## What's your domain name?
Example: `saleemsnapping.com` (replace with yours)

---

## ⚡ STEP 1: Add Domain in Vercel (2 minutes)

1. **Open this link in your browser:**
   ```
   https://vercel.com/sureshs-projects-1c6ee3cb/saleem-snapping-wildlife/settings/domains
   ```

2. **Add your domain:**
   - Type: `yourdomain.com` (your actual domain)
   - Click "Add"
   - Type: `www.yourdomain.com`
   - Click "Add"

3. **Copy the DNS records shown:**
   - You'll see an **A record** (IP address like `76.76.21.21`)
   - You'll see a **CNAME record** (value like `cname.vercel-dns.com`)
   - **Write these down or screenshot!**

---

## ⚡ STEP 2: Update GoDaddy DNS (3 minutes)

1. **Open GoDaddy:**
   ```
   https://dcc.godaddy.com/control/portfolio/dns
   ```

2. **Find your domain** and click "DNS" button

3. **Add/Edit A Record:**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21` (use YOUR IP from Vercel!)
   - TTL: 600 seconds
   - Save

4. **Add/Edit CNAME Record:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com` (use YOUR CNAME from Vercel!)
   - TTL: 1 hour
   - Save

5. **Delete these if they exist:**
   - Any CNAME with name `@` - DELETE
   - Any "Parked" records - DELETE
   - GoDaddy default records - DELETE

---

## ⏰ STEP 3: Wait (10-30 minutes)

☕ Grab a coffee! DNS needs to propagate worldwide.

**Check if ready:**
1. Go to: https://dnschecker.org/
2. Type your domain
3. Wait for green checkmarks globally

---

## ✅ STEP 4: Test Your Site

Visit your domain:
- `https://yourdomain.com`
- `https://www.yourdomain.com`

**Should show your portfolio!** 🎉

---

## 🔥 DNS Records Summary

**Copy these exact values from Vercel dashboard:**

### Root Domain:
```
Type: A
Name: @
Value: [GET FROM VERCEL]
```

### www Subdomain:
```
Type: CNAME  
Name: www
Value: [GET FROM VERCEL]
```

---

## ❌ Common Mistakes to Avoid

1. ❌ Don't add CNAME for @ (use A record instead)
2. ❌ Don't keep GoDaddy parking records
3. ❌ Don't use old Vercel IP if you see different one
4. ❌ Don't forget to add BOTH root and www domains
5. ❌ Don't panic if it takes 30 minutes to work

---

## 🆘 Quick Fixes

**Site shows GoDaddy page?**
→ Delete GoDaddy parking records, wait 30 min

**"Invalid Configuration" in Vercel?**
→ Check IP and CNAME match exactly, refresh after 10 min

**www works but root doesn't?**
→ Check A record exists with correct IP

**Root works but www doesn't?**
→ Check CNAME record exists with correct value

**Still not working after 2 hours?**
→ Screenshot your GoDaddy DNS and Vercel settings, contact support

---

## 📱 Mobile Friendly Links

**Vercel Dashboard:**
https://vercel.com/sureshs-projects-1c6ee3cb/saleem-snapping-wildlife

**GoDaddy DNS:**
https://dcc.godaddy.com/control/portfolio/dns

**DNS Checker:**
https://dnschecker.org/

---

## ✨ That's It!

Once DNS propagates, your custom domain will be live with:
- ✅ HTTPS (secure padlock)
- ✅ Free SSL certificate
- ✅ Professional look
- ✅ Better SEO
- ✅ Worldwide CDN

**Need detailed instructions?** See `GODADDY_DOMAIN_SETUP.md`

---

**Current Status:**
- 🟢 GitHub: https://github.com/suresh-1-byte/saleem-snapping-wildlife
- 🟢 Vercel: https://saleem-snapping-wildlife.vercel.app
- 🟡 Custom Domain: Pending your setup!
