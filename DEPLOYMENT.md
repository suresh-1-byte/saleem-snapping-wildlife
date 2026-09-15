# Deployment Guide

## Quick Deploy to Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications.

### Steps:

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Git**
   - Push your code to GitHub, GitLab, or Bitbucket
   - Visit [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will auto-detect Next.js and configure everything

3. **Deploy via CLI**
   ```bash
   vercel
   ```

4. **Environment Variables**
   - Add environment variables in Vercel dashboard
   - Update `NEXT_PUBLIC_SITE_URL` with your domain

### Custom Domain Setup

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., saleemsnapping.com)
4. Update DNS records as instructed by Vercel

## Alternative: Deploy to Netlify

1. Build the application:
   ```bash
   npm run build
   ```

2. Connect your Git repository to Netlify

3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

## Alternative: Deploy to Your Own Server

### Requirements
- Node.js 18+ installed
- PM2 or similar process manager

### Steps:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Use PM2 for production** (recommended)
   ```bash
   npm install -g pm2
   pm2 start npm --name "saleem-snapping" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx as reverse proxy**
   ```nginx
   server {
       listen 80;
       server_name saleemsnapping.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Pre-Deployment Checklist

- [ ] Add all wildlife photography images to `/public/images/`
- [ ] Update contact email and Instagram in `/app/contact/page.tsx`
- [ ] Update site URL in `/app/robots.ts` and `/app/sitemap.ts`
- [ ] Test all pages on mobile, tablet, and desktop
- [ ] Test all navigation links
- [ ] Verify all images load correctly
- [ ] Test lightbox functionality
- [ ] Test contact form
- [ ] Run Lighthouse audit (target: 90+ performance score)
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Verify SEO metadata on all pages
- [ ] Test reduced motion preferences

## Performance Optimization

### Image Optimization
- Use Next.js Image component (already implemented)
- Images automatically served in WebP/AVIF format
- Lazy loading enabled by default
- Responsive images at multiple sizes

### Additional Optimizations
```bash
# Analyze bundle size
npm run build
```

Check the output for bundle sizes and ensure:
- First Load JS < 200 KB
- Individual page chunks are optimized

## Monitoring

### Vercel Analytics (Recommended)
Enable in Vercel dashboard for:
- Core Web Vitals monitoring
- Real User Monitoring
- Performance insights

### Google Analytics (Optional)
Add to `app/layout.tsx`:

```typescript
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

## Post-Deployment

1. **Submit sitemap to Google Search Console**
   - URL: `https://saleemsnapping.com/sitemap.xml`

2. **Test Open Graph tags**
   - Use [Open Graph Debugger](https://www.opengraph.xyz/)
   - Share on social media to verify preview cards

3. **Monitor Core Web Vitals**
   - Use Google Search Console
   - Monitor Vercel Analytics
   - Check PageSpeed Insights regularly

## Troubleshooting

### Images not loading
- Verify images exist in `/public/images/`
- Check file names match exactly (case-sensitive)
- Ensure images are web-optimized (< 2MB each)

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Performance issues
- Compress images further (use tools like TinyPNG)
- Enable Vercel Edge Network (automatic on Vercel)
- Check bundle size with `npm run build`

## Support

For deployment issues:
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- GitHub Issues: Create an issue in your repository
