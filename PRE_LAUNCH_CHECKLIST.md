# Pre-Launch Checklist

Use this checklist before deploying your Saleem Snapping Wildlife Photography website to production.

---

## 📸 Content Preparation

### Images
- [ ] Hero image added (`hero.jpg`, 2560x1440px)
- [ ] Featured work images added (featured-1.jpg through featured-6.jpg)
- [ ] Portfolio gallery images added (minimum 6 images, recommended 30-60)
- [ ] Featured story images added (story-hero.jpg, story-support-1.jpg, story-support-2.jpg)
- [ ] Species category images added (species-birds.jpg, species-mammals.jpg, etc.)
- [ ] Story preview images added (story-vedanthangal.jpg, etc.)
- [ ] Species detail images added (species-painted-stork-1.jpg, etc.)
- [ ] About portrait image added (about-portrait.jpg)
- [ ] Contact background image added (contact-bg.jpg)
- [ ] Closing CTA image added (closing-cta.jpg)
- [ ] All images optimized (< 2MB each)
- [ ] All images compressed for web (80-85% quality)
- [ ] All images in correct dimensions
- [ ] All image filenames match exactly (lowercase, no spaces)

### Contact Information
- [ ] Email address updated in `/app/contact/page.tsx`
- [ ] Instagram handle updated in `/app/contact/page.tsx`
- [ ] Email link in footer updated in `/components/Footer.tsx`
- [ ] Verified email works (test sending)
- [ ] Verified Instagram link works

### Site Configuration
- [ ] Domain name configured in `/app/robots.ts`
- [ ] Domain name configured in `/app/sitemap.ts`
- [ ] Environment variables set (if using)
- [ ] Analytics ID added (if using Google Analytics)

---

## 🔍 Testing - Desktop

### Visual Testing
- [ ] Home page displays correctly
- [ ] Wildlife portfolio page displays correctly
- [ ] Stories page displays correctly
- [ ] Species page displays correctly
- [ ] About page displays correctly
- [ ] Contact page displays correctly
- [ ] All images load without errors
- [ ] No broken image icons visible
- [ ] Typography looks correct
- [ ] Spacing and layout look professional
- [ ] Colors match brand (black, charcoal, white, earthy green)

### Functionality Testing
- [ ] Navigation menu works
- [ ] All navigation links go to correct pages
- [ ] Active page indicator shows correctly
- [ ] "Explore Wildlife" button on hero works
- [ ] "View the Portfolio" button on closing CTA works
- [ ] "Read Story" links work
- [ ] Portfolio filter buttons work (All, Birds, Mammals, etc.)
- [ ] Portfolio filtering happens within 200ms
- [ ] Clicking portfolio image opens lightbox
- [ ] Lightbox displays image correctly
- [ ] Lightbox "Previous" arrow works
- [ ] Lightbox "Next" arrow works
- [ ] Lightbox "Close" button works
- [ ] Clicking outside lightbox closes it
- [ ] Contact form accepts input
- [ ] Contact form validates email format
- [ ] Contact form shows success message
- [ ] Footer links work (Instagram, Email)

### Keyboard Navigation
- [ ] Tab key moves through interactive elements
- [ ] Focus states are visible
- [ ] Enter key activates buttons/links
- [ ] Arrow keys navigate lightbox images
- [ ] Escape key closes lightbox
- [ ] Can access all navigation items via keyboard

### Hover Effects
- [ ] Navigation items show hover state
- [ ] Featured work images scale on hover
- [ ] Portfolio images scale on hover
- [ ] Story cards show hover opacity
- [ ] Species cards show hover effect
- [ ] Buttons show hover state
- [ ] Footer links show hover state

### Animations
- [ ] Hero image animates smoothly on load
- [ ] Hero text fades in smoothly
- [ ] Scroll reveals trigger at correct times
- [ ] Staggered animations work on featured work
- [ ] Story cards animate on scroll
- [ ] All transitions are smooth (not jumpy)
- [ ] No layout shift during animations

---

## 📱 Testing - Mobile

### Responsive Layout
- [ ] Mobile hamburger menu displays correctly
- [ ] Clicking hamburger opens full-screen menu
- [ ] Mobile menu navigation links work
- [ ] Clicking link closes mobile menu
- [ ] Hero section fills screen on mobile
- [ ] Featured work displays in appropriate columns
- [ ] Portfolio gallery shows single column on mobile
- [ ] Stories alternate layout works on mobile
- [ ] Species grid adjusts to mobile
- [ ] About page layout stacks correctly
- [ ] Contact form is usable on mobile
- [ ] Footer displays correctly on mobile
- [ ] No horizontal scrolling on any page
- [ ] Text is readable on mobile (not too small)
- [ ] Buttons are tap-friendly (not too small)

### Mobile Functionality
- [ ] All touch interactions work
- [ ] Swipe to close lightbox works
- [ ] Swipe to navigate lightbox images works
- [ ] Form inputs keyboard appears on tap
- [ ] No accidental link clicks (tap targets are large enough)

### Mobile Performance
- [ ] Pages load quickly on mobile
- [ ] Images load progressively
- [ ] No janky scrolling
- [ ] Animations perform well on mobile

---

## 🌐 Testing - Browsers

Test on all major browsers:

### Chrome/Edge
- [ ] All pages work
- [ ] All features work
- [ ] Animations are smooth
- [ ] Images display correctly

### Firefox
- [ ] All pages work
- [ ] All features work
- [ ] Animations are smooth
- [ ] Images display correctly

### Safari (Mac)
- [ ] All pages work
- [ ] All features work
- [ ] Animations are smooth
- [ ] Images display correctly

### Safari (iOS)
- [ ] All pages work
- [ ] All features work
- [ ] Touch interactions work
- [ ] Images display correctly

---

## ⚡ Performance Testing

### Lighthouse Audit
- [ ] Run Lighthouse on Home page
- [ ] Performance score ≥ 90 (mobile)
- [ ] Performance score ≥ 95 (desktop)
- [ ] Accessibility score = 100
- [ ] Best Practices score ≥ 95
- [ ] SEO score = 100
- [ ] No errors in console
- [ ] LCP < 2.5 seconds
- [ ] FCP < 1.5 seconds
- [ ] TTI < 3.5 seconds

### Image Optimization
- [ ] All images using Next.js Image component
- [ ] WebP format served to supporting browsers
- [ ] Images lazy load (except hero)
- [ ] No oversized images being served
- [ ] Alt text present on all images

### Loading Speed
- [ ] Home page loads in < 3 seconds
- [ ] Portfolio page loads in < 3 seconds
- [ ] Subsequent navigation is instant (prefetching works)
- [ ] Images appear quickly
- [ ] No long white screens while loading

---

## ♿ Accessibility Testing

### Screen Reader
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)
- [ ] All images have descriptive alt text
- [ ] Navigation is announced correctly
- [ ] Buttons have clear labels
- [ ] Form labels are associated correctly
- [ ] Headings follow logical hierarchy (H1 → H2 → H3)
- [ ] Focus order makes sense

### Color Contrast
- [ ] Text on black background passes contrast check
- [ ] Text on charcoal background passes contrast check
- [ ] Text on images has sufficient contrast
- [ ] Button text is readable
- [ ] Form placeholder text is visible

### Keyboard Only
- [ ] Complete navigation without mouse
- [ ] All interactive elements reachable
- [ ] Focus never gets trapped
- [ ] Lightbox can be closed with keyboard
- [ ] Form can be submitted with keyboard

### Reduced Motion
- [ ] Test with prefers-reduced-motion enabled
- [ ] Animations respect user preference
- [ ] Site remains usable without animations

---

## 🔎 SEO Verification

### Metadata
- [ ] Home page has title tag
- [ ] Home page has meta description
- [ ] All pages have unique titles
- [ ] All pages have unique descriptions
- [ ] Open Graph tags present on all pages
- [ ] Twitter Card tags present
- [ ] Canonical URLs set correctly

### Sitemap
- [ ] Visit /sitemap.xml
- [ ] Sitemap includes all pages
- [ ] URLs are absolute (include domain)
- [ ] Sitemap is properly formatted XML

### Robots.txt
- [ ] Visit /robots.txt
- [ ] Robots.txt allows crawling
- [ ] Sitemap URL is included

### Structured Data
- [ ] Schema.org markup for photographer profile
- [ ] Valid JSON-LD (test with Google's tool)

### URLs
- [ ] All URLs are clean and descriptive
- [ ] No broken links
- [ ] No 404 errors
- [ ] Internal links use relative paths

---

## 🔒 Security & Privacy

### HTTPS
- [ ] Site serves over HTTPS
- [ ] No mixed content warnings
- [ ] SSL certificate valid

### Forms
- [ ] Contact form has basic spam protection
- [ ] Form doesn't expose sensitive data
- [ ] Email addresses aren't visible in source code

### Dependencies
- [ ] All npm packages up to date
- [ ] No known security vulnerabilities (`npm audit`)

---

## 📊 Analytics & Monitoring

### Analytics Setup
- [ ] Google Analytics installed (if using)
- [ ] Vercel Analytics enabled (if using)
- [ ] Analytics tracking code works
- [ ] Test analytics with pageview

### Error Tracking
- [ ] Set up error monitoring (Sentry, etc.) if desired
- [ ] Test error reporting works

---

## 🚀 Deployment

### Pre-Deploy
- [ ] Run production build locally (`npm run build`)
- [ ] No build errors
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Test production build locally (`npm start`)
- [ ] Production build works correctly

### Domain Setup
- [ ] Domain purchased/available
- [ ] DNS records configured
- [ ] Domain connected to hosting
- [ ] SSL certificate issued
- [ ] www and non-www both work
- [ ] Redirects set up correctly

### Environment
- [ ] Environment variables set in hosting platform
- [ ] API keys are secret (not in code)
- [ ] Production URLs configured

### Post-Deploy
- [ ] Test live site on all devices
- [ ] Test all pages on live site
- [ ] Verify images load from production
- [ ] Check no local file references
- [ ] Test contact form on live site
- [ ] Verify analytics tracking on live site

---

## 📣 Launch

### Search Engines
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify domain ownership
- [ ] Request indexing of home page

### Social Media
- [ ] Test Open Graph preview (Facebook Debugger)
- [ ] Test Twitter Card preview (Card Validator)
- [ ] Verify social share images appear correctly
- [ ] Update Instagram bio with website link
- [ ] Create launch post on social media

### Monitoring
- [ ] Set up uptime monitoring (UptimeRobot, etc.)
- [ ] Set up performance monitoring
- [ ] Check Google Search Console regularly
- [ ] Monitor analytics weekly

---

## 📝 Content Updates

### Regular Maintenance
- [ ] Plan for adding new portfolio images
- [ ] Plan for adding new stories
- [ ] Plan for adding new species
- [ ] Set reminder to update copyright year
- [ ] Plan content calendar if desired

---

## ✅ Final Verification

Before announcing launch:

- [ ] Test on YOUR phone
- [ ] Test on YOUR tablet
- [ ] Test on YOUR computer
- [ ] Ask 2-3 friends to test
- [ ] Fix any issues found
- [ ] Double-check contact form works
- [ ] Verify email notifications work
- [ ] Verify social links work
- [ ] Take screenshot for portfolio/social media
- [ ] Celebrate! 🎉

---

## 🐛 Common Issues & Fixes

### Images Not Showing
**Problem**: Broken image icons
**Fix**: Check filenames match exactly (case-sensitive), verify images are in `/public/images/`

### Mobile Menu Not Working
**Problem**: Hamburger doesn't open
**Fix**: Clear browser cache, check JavaScript is enabled

### Slow Loading
**Problem**: Pages take too long to load
**Fix**: Compress images further, check hosting performance

### Form Not Submitting
**Problem**: Contact form doesn't work
**Fix**: Check form component, verify email service configured

### Layout Broken on Mobile
**Problem**: Horizontal scrolling or cut-off content
**Fix**: Check all elements have responsive widths, no fixed pixel widths

---

## 📞 Need Help?

- Check `README.md` for full documentation
- See `DEPLOYMENT.md` for hosting issues
- See `IMAGES_GUIDE.md` for image problems
- See `QUICKSTART.md` for setup issues

---

**Ready to Launch?** ✅

Once all checkboxes are marked, you're ready to share your premium wildlife photography portfolio with the world!

Good luck! 🚀🦅📸
