# 📈 Stock Terminal - Real-Time Stock Price Dashboard

A modern, responsive stock price dashboard built with React, Tailwind CSS, and the Finnhub API. Features real-time data updates, search functionality, sortable columns, and a strikingly distinctive design.

![Stock Terminal](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

**Features**

- Real-time stock data (Finnhub API)
- Responsive table layout displaying:
  - Stock symbol
  - Current price
  - Price change
  - Percentage change
  - Day's trading range
- Tailwind CSS styling with a minimalistic easy-to-use design
- Fully responsive design for mobile, tablet, and desktop

- Loading states with sleek stock trend-line symbol
- Error handling with user-friendly error messages
- Search functionality to filter stocks by symbol
- Sortable columns (click any column header to sort)
- Auto-refresh - data updates every 60 seconds automatically
- Manual refresh button with animation
- Staggered animations for aesthetic content loading
- Mobile-optimized card layout for convenient UX on smaller screens
- Visual indicators (trending icons, color-coded changes)
- Distinctive design - calming emerald accent


**Deployed URL**: [Your deployed URL here]

**GitHub Repository**: https://github.com/abivtcpe/Stock-Price-Dashboard

##  Tech Stack

- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.11
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Lucide React 0.263.1
- **API**: Finnhub
- **Deployment**: Vercel / GitHub


 **Design Philosophy**

The dashboard features a minimalistic design with a prominent dark background complemented by emerald accent colors. Furthermore, the utilized font is monospace to make the displayed information more uniform and visually appealing. All transitions between screens such as the loading or initializing screen have smooth transitions and micro-transitions. Put simply, this design rejects AI aesthetics through a cohesive theme that is intuitive and user-oriented.


## API Information

This project uses the **Finnhub Stock API**:
- **Free tier**: 60 API calls per minute
- **Documentation**: [Finnhub API Docs](https://finnhub.io/docs/api)
- **Endpoints used**: `/quote` for real-time stock quotes

### Rate Limiting
The app implements smart rate limiting: simultaneously fetches data for eight stocks. Auto-refreshe occurs every 60 seconds. Manual refresh available via refresh button.

##  Features Breakdown

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

## License

This project is open source.

## Acknowledgments

- Stock data provided by [Finnhub.io](https://finnhub.io/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
