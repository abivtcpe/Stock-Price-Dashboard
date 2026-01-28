# 📈 Stock Terminal - Real-Time Stock Price Dashboard

A modern, responsive stock price dashboard built with React, Tailwind CSS, and the Finnhub API. Features real-time data updates, search functionality, sortable columns, and a distinctive terminal-inspired design.

![Stock Terminal](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Core Requirements ✅
- **Real-time stock data** fetched from Finnhub API
- **Responsive table layout** displaying:
  - Stock symbol
  - Current price
  - Price change (absolute)
  - Percentage change
  - Day's trading range
- **Tailwind CSS styling** with a unique financial terminal aesthetic
- **Fully responsive design** for mobile, tablet, and desktop

### Optional Features Implemented 🎁
- **Loading states** with animated spinners and skeleton screens
- **Error handling** with user-friendly error messages
- **Search functionality** to filter stocks by symbol
- **Sortable columns** (click any column header to sort)
- **Auto-refresh** - data updates every 60 seconds automatically
- **Manual refresh button** with smooth animation
- **Staggered animations** for smooth content loading
- **Mobile-optimized card layout** for better UX on small screens
- **Visual indicators** (trending icons, color-coded changes)
- **Distinctive design** - terminal-inspired theme with emerald accents

## 🚀 Live Demo

**Deployed URL**: [Your deployed URL here]

**GitHub Repository**: [Your GitHub repo URL here]

## 🛠️ Tech Stack

- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.11
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Lucide React 0.263.1
- **API**: Finnhub Stock API
- **Deployment**: Vercel / Netlify / GitHub Pages

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/stock-dashboard.git
cd stock-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Get a free Finnhub API key**
   - Visit [Finnhub.io](https://finnhub.io/)
   - Sign up for a free account
   - Copy your API key

4. **Update the API key**
   - Open `src/App.jsx`
   - Replace the demo API key with your own:
   ```javascript
   const API_KEY = 'your_api_key_here';
   ```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
   - Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Follow the prompts** and your site will be live!

### Deploy to Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy via Netlify CLI**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

Or use the Netlify web interface:
- Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

### Deploy to GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
```json
{
  "homepage": "https://yourusername.github.io/stock-dashboard",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update vite.config.js**
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/stock-dashboard/',
});
```

4. **Deploy**
```bash
npm run deploy
```

## 🎨 Design Philosophy

The dashboard features a **terminal-inspired aesthetic** with:
- Dark gradient background (slate-950 to slate-800)
- Emerald accent colors for a financial/tech feel
- Monospace font (system font-mono)
- Animated grid background for depth
- Subtle noise texture overlay
- Smooth transitions and micro-interactions
- Glassmorphism effects (backdrop blur)

This design avoids generic AI aesthetics by choosing a bold, cohesive theme that's memorable and functional.

## 📊 API Information

This project uses the **Finnhub Stock API**:
- **Free tier**: 60 API calls per minute
- **Documentation**: [Finnhub API Docs](https://finnhub.io/docs/api)
- **Endpoints used**: `/quote` for real-time stock quotes

### Rate Limiting
The app implements smart rate limiting:
- Fetches data for 8 stocks simultaneously
- Auto-refreshes every 60 seconds
- Manual refresh available via button

## 🧪 Features Breakdown

### Search Functionality
- Real-time filtering of stocks by symbol
- Case-insensitive search
- Clear visual feedback

### Sorting System
- Click any column header to sort
- Toggle between ascending/descending
- Visual indicators (↑/↓) show current sort state

### Responsive Design
- **Desktop**: Full table with all columns
- **Tablet**: Compact table layout
- **Mobile**: Card-based layout for better readability

### Error Handling
- Network error detection
- API failure messages
- Graceful degradation
- Retry functionality

### Performance Optimizations
- Memoized sorted/filtered data
- Efficient re-renders with React.useMemo
- CSS animations over JS animations
- Optimized image/icon usage

## 🔧 Customization

### Add More Stocks
Edit the `STOCK_SYMBOLS` array in `src/App.jsx`:
```javascript
const STOCK_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'YOUR_STOCK'];
```

### Change Refresh Interval
Modify the interval in the `useEffect` hook:
```javascript
const interval = setInterval(fetchStockData, 30000); // 30 seconds
```

### Customize Colors
Edit Tailwind classes in `src/App.jsx` or extend the theme in `tailwind.config.js`.

## 📝 Project Structure

```
stock-dashboard/
├── public/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles & Tailwind
├── index.html           # HTML template
├── package.json         # Dependencies & scripts
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
├── postcss.config.js    # PostCSS configuration
└── README.md            # This file
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Stock data provided by [Finnhub.io](https://finnhub.io/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for the coding challenge**
