# Quick Start Guide

Get your stock dashboard running in 5 minutes! ⚡

## 🚀 Fastest Path to Running

```bash
# 1. Clone and enter directory
git clone https://github.com/yourusername/stock-dashboard.git
cd stock-dashboard

# 2. Install dependencies (takes ~30 seconds)
npm install

# 3. Start development server
npm run dev
```

**Open browser:** http://localhost:5173

That's it! 🎉

## 🔑 Using Your Own API Key (Recommended)

The demo key has rate limits. Get your free key:

1. **Sign up:** https://finnhub.io/register
2. **Copy your API key** from the dashboard
3. **Update the key** in `src/App.jsx`:
   ```javascript
   const API_KEY = 'your_key_here';
   ```
4. **Restart dev server**

## 📦 Deploy in 1 Minute

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```
Follow prompts. Done! 🚀

### Netlify
```bash
npm run build
# Drag 'dist' folder to app.netlify.com/drop
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run deploy
```

## 🎨 Customize

### Add Stocks
Edit `src/App.jsx`:
```javascript
const STOCK_SYMBOLS = ['AAPL', 'MSFT', 'YOUR_STOCK'];
```

### Change Refresh Time
```javascript
// In useEffect (line ~61)
const interval = setInterval(fetchStockData, 30000); // 30s
```

### Modify Colors
Change Tailwind classes from `emerald-*` to:
- `blue-*` for tech vibe
- `purple-*` for modern look
- `amber-*` for warm tone

## 📱 Test Responsive Design

```bash
npm run dev
```

Open Chrome DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)

Test on:
- iPhone SE (375px)
- iPad (768px)
- Desktop (1920px)

## 🐛 Troubleshooting

### "Failed to fetch stock data"
- Check internet connection
- Verify API key is valid
- Wait 60s if rate limited

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port already in use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
npm run dev
```

## 📚 Learn More

- **Full docs:** See README.md
- **Deployment:** See DEPLOYMENT.md
- **Features:** See FEATURES.md
- **API docs:** https://finnhub.io/docs/api

## ✅ Checklist

Before submission:
- [ ] Code on GitHub
- [ ] App deployed (Vercel/Netlify/Pages)
- [ ] README has live URL
- [ ] Tested on mobile
- [ ] API key updated (if shared publicly)
- [ ] No console errors

## 🎯 Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Deployment
vercel               # Deploy to Vercel
netlify deploy       # Deploy to Netlify
npm run deploy       # Deploy to GitHub Pages

# Maintenance
npm install          # Install dependencies
npm update           # Update packages
```

## 💡 Tips

1. **Use the demo key** for testing, your own for production
2. **Deploy early** to catch deployment issues
3. **Test mobile first** - most users are on mobile
4. **Monitor API usage** to avoid rate limits
5. **Add error boundaries** for production robustness

## 🆘 Need Help?

1. Check the [Finnhub API docs](https://finnhub.io/docs/api)
2. Review deployment platform docs
3. Open an issue on GitHub
4. Check browser console for errors

---

**Time to first working version: 5 minutes** ⏱️

**Time to deployed version: 10 minutes** 🚀

**Time to customized version: 30 minutes** 🎨
