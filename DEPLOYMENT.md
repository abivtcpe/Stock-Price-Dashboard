# Deployment Guide

This guide provides detailed instructions for deploying the Stock Terminal dashboard to various platforms.

## Quick Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel offers the smoothest deployment experience for React/Vite projects.

**Via Vercel Website:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com/)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel auto-detects Vite settings
6. Click "Deploy"
7. Your site is live! 🎉

**Via Vercel CLI:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? stock-dashboard (or your choice)
# - Directory? ./
# - Override settings? No

# For production deployment
vercel --prod
```

Your site will be available at: `https://your-project.vercel.app`

### Option 2: Netlify

**Via Netlify Website (Drag & Drop):**
1. Build your project:
   ```bash
   npm run build
   ```
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist` folder onto the page
4. Your site is live!

**Via Netlify CLI:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy

# For production
netlify deploy --prod --dir=dist
```

**Via Git (Continuous Deployment):**
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [app.netlify.com](https://app.netlify.com/)
3. Click "New site from Git"
4. Connect your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 3: GitHub Pages

**Setup:**

1. Install gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Update `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/stock-dashboard",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.js`:
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/stock-dashboard/', // Replace with your repo name
});
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages:
   - Go to your repository settings
   - Navigate to "Pages"
   - Select source: "gh-pages" branch
   - Save

Your site will be available at: `https://yourusername.github.io/stock-dashboard`

## Environment Variables

If you're using environment variables for your API key (recommended for production):

1. Create a `.env` file:
```env
VITE_FINNHUB_API_KEY=your_api_key_here
```

2. Update `src/App.jsx`:
```javascript
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'demo_key';
```

3. Add environment variables in your deployment platform:
   - **Vercel**: Project Settings → Environment Variables
   - **Netlify**: Site Settings → Build & Deploy → Environment
   - **GitHub Pages**: Use GitHub Secrets (requires GitHub Actions)

## Post-Deployment Checklist

After deploying, verify:

- ✅ Site loads without errors
- ✅ Stock data is fetching correctly
- ✅ Table displays all columns
- ✅ Search functionality works
- ✅ Sorting works on all columns
- ✅ Refresh button updates data
- ✅ Mobile responsive layout works
- ✅ No console errors
- ✅ API key is working (not rate limited)

## Troubleshooting

### Build Fails

**Issue**: Build command fails with errors

**Solution**: 
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Blank Page After Deployment

**Issue**: Deployed site shows blank page

**Solutions**:
1. Check browser console for errors
2. Verify base URL in `vite.config.js` matches your deployment path
3. Ensure `dist` folder is being deployed
4. Check if API key is configured correctly

### API Key Not Working

**Issue**: "Failed to fetch stock data" error

**Solutions**:
1. Verify API key is valid at [finnhub.io](https://finnhub.io/)
2. Check if you've exceeded rate limits (60 calls/minute)
3. Ensure API key is properly configured in environment variables
4. Test API key with curl:
   ```bash
   curl "https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_KEY"
   ```

### CORS Errors

**Issue**: CORS policy errors in console

**Solution**: Finnhub API supports CORS. If you see CORS errors:
1. Verify you're using `https://finnhub.io` not `http://`
2. Check if your API key is valid
3. Try with a different browser

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown
4. Wait for SSL certificate (automatic)

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records
4. SSL is automatic via Let's Encrypt

### GitHub Pages
1. Add a `CNAME` file to `public/` directory with your domain
2. Configure DNS A records to GitHub's IPs
3. Enable HTTPS in repository settings

## Performance Optimization

For production deployments:

1. **Enable compression** (Gzip/Brotli) - automatic on Vercel/Netlify
2. **Use CDN** - automatic on all platforms
3. **Monitor API usage** to stay within rate limits
4. **Consider caching** stock data client-side for 1 minute

## Monitoring

After deployment, monitor:
- Response times
- API usage/rate limits
- Error rates
- User traffic

Most platforms (Vercel, Netlify) provide built-in analytics.

## Support

If you encounter issues:
1. Check the platform's status page
2. Review deployment logs
3. Test locally with `npm run build && npm run preview`
4. Open an issue on GitHub

---

**Deployment times:**
- Vercel: ~30 seconds
- Netlify: ~1 minute
- GitHub Pages: ~2-3 minutes
