import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Search, AlertCircle, Activity } from 'lucide-react';


const App = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [lastUpdate, setLastUpdate] = useState(new Date());


  // Display popular stocks
  const STOCK_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM', 'TM', 'EADSY'];
 
  // Free API key courtesy of finnhub.io
  const API_KEY = 'd5t8h6hr01qt62nhtpugd5t8h6hr01qt62nhtpv0';


  const fetchStockData = async () => {
    setLoading(true);
    setError(null);
   
    try {
      const promises = STOCK_SYMBOLS.map(async (symbol) => {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
        );
       
        if (!response.ok) throw new Error('API request failed');
       
        const data = await response.json();
       
        return {
          symbol,
          price: data.c || 0,
          change: data.d || 0,
          percentChange: data.dp || 0,
          high: data.h || 0,
          low: data.l || 0,
          open: data.o || 0,
          prevClose: data.pc || 0
        };
      });


      const results = await Promise.all(promises);
      setStocks(results);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Failed to fetch stock data. Please try again.');
      console.error('Error fetching stock data:', err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchStockData();
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchStockData, 60000);
    return () => clearInterval(interval);
  }, []);


  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };


  const sortedStocks = React.useMemo(() => {
    let sortableStocks = [...stocks];
   
    if (searchTerm) {
      sortableStocks = sortableStocks.filter(stock =>
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }


    if (sortConfig.key) {
      sortableStocks.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }


    return sortableStocks;
  }, [stocks, sortConfig, searchTerm]);


  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };


  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 font-mono">
      {/* Animated background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"></div>
     
      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
           }}>
      </div>


      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-emerald-500/30 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Activity className="w-8 h-8 text-emerald-400 animate-pulse" />
                  <div className="absolute inset-0 blur-lg bg-emerald-400/50"></div>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight">
                    STOCK.TERMINAL
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    REAL-TIME MARKET DATA
                  </p>
                </div>
              </div>
             
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="hidden sm:inline">LAST UPDATE:</span>
                <span className="text-emerald-400 font-semibold tabular-nums">{formatTime(lastUpdate)}</span>
                <button
                  onClick={fetchStockData}
                  disabled={loading}
                  className="ml-2 p-2 hover:bg-emerald-500/10 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
                  title="Refresh data"
                >
                  <RefreshCw className={`w-4 h-4 text-emerald-400 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                </button>
              </div>
            </div>
          </div>
        </header>


        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="SEARCH SYMBOLS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-emerald-500/30 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 backdrop-blur-sm font-mono text-sm"
              />
            </div>
          </div>


          {/* Error state */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}


          {/* Loading state */}
          {loading && stocks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
              <div className="relative">
                <Activity className="w-16 h-16 text-emerald-400 animate-pulse" />
                <div className="absolute inset-0 blur-2xl bg-emerald-400/50 animate-pulse"></div>
              </div>
              <p className="mt-6 text-slate-400 text-sm tracking-wider">LOADING MARKET DATA...</p>
            </div>
          ) : (
            <div className="bg-slate-900/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl overflow-hidden shadow-2xl shadow-emerald-500/5">
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900/50 border-b border-emerald-500/30">
                    <tr>
                      <th
                        className="px-6 py-4 text-left text-xs font-semibold text-emerald-400 uppercase tracking-wider cursor-pointer hover:text-emerald-300 transition-colors"
                        onClick={() => handleSort('symbol')}
                      >
                        <div className="flex items-center gap-2">
                          SYMBOL
                          {sortConfig.key === 'symbol' && (
                            <span className="text-emerald-400">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-4 text-right text-xs font-semibold text-emerald-400 uppercase tracking-wider cursor-pointer hover:text-emerald-300 transition-colors"
                        onClick={() => handleSort('price')}
                      >
                        <div className="flex items-center justify-end gap-2">
                          PRICE
                          {sortConfig.key === 'price' && (
                            <span className="text-emerald-400">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-4 text-right text-xs font-semibold text-emerald-400 uppercase tracking-wider cursor-pointer hover:text-emerald-300 transition-colors"
                        onClick={() => handleSort('change')}
                      >
                        <div className="flex items-center justify-end gap-2">
                          CHANGE
                          {sortConfig.key === 'change' && (
                            <span className="text-emerald-400">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th
                        className="px-6 py-4 text-right text-xs font-semibold text-emerald-400 uppercase tracking-wider cursor-pointer hover:text-emerald-300 transition-colors"
                        onClick={() => handleSort('percentChange')}
                      >
                        <div className="flex items-center justify-end gap-2">
                          % CHANGE
                          {sortConfig.key === 'percentChange' && (
                            <span className="text-emerald-400">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                        DAY RANGE
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-500/10">
                    {sortedStocks.map((stock, index) => (
                      <tr
                        key={stock.symbol}
                        className="hover:bg-emerald-500/5 transition-all duration-300 group animate-in fade-in slide-in-from-bottom-2"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${stock.percentChange >= 0 ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`}></div>
                            <span className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                              {stock.symbol}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="text-lg font-semibold text-slate-100 tabular-nums">
                            {formatPrice(stock.price)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            {stock.change >= 0 ? (
                              <TrendingUp className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-400" />
                            )}
                            <span className={`font-semibold tabular-nums ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold tabular-nums ${
                            stock.percentChange >= 0
                              ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                              : 'bg-red-400/20 text-red-300 border border-red-400/30'
                          }`}>
                            {stock.percentChange >= 0 ? '+' : ''}{stock.percentChange.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-slate-400 tabular-nums">
                            <span className="text-slate-300">{formatPrice(stock.low)}</span>
                            <span className="mx-2 text-emerald-400/50">—</span>
                            <span className="text-slate-300">{formatPrice(stock.high)}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>


              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-emerald-500/10">
                {sortedStocks.map((stock, index) => (
                  <div
                    key={stock.symbol}
                    className="p-4 hover:bg-emerald-500/5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${stock.percentChange >= 0 ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`}></div>
                        <span className="text-lg font-bold text-slate-100">{stock.symbol}</span>
                      </div>
                      <span className="text-xl font-semibold text-slate-100 tabular-nums">
                        {formatPrice(stock.price)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        {stock.change >= 0 ? (
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-400" />
                        )}
                        <span className={`font-semibold tabular-nums ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                        </span>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold tabular-nums ${
                        stock.percentChange >= 0
                          ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                          : 'bg-red-400/20 text-red-300 border border-red-400/30'
                      }`}>
                        {stock.percentChange >= 0 ? '+' : ''}{stock.percentChange.toFixed(2)}%
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-emerald-500/10 text-xs text-slate-400">
                      <span>DAY RANGE: </span>
                      <span className="text-slate-300 tabular-nums">{formatPrice(stock.low)}</span>
                      <span className="mx-2 text-emerald-400/50">—</span>
                      <span className="text-slate-300 tabular-nums">{formatPrice(stock.high)}</span>
                    </div>
                  </div>
                ))}
              </div>


              {/* No results state */}
              {sortedStocks.length === 0 && !loading && (
                <div className="text-center py-12 px-4">
                  <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">NO STOCKS FOUND</p>
                  <p className="text-slate-500 text-sm mt-2">Try adjusting your search</p>
                </div>
              )}
            </div>
          )}


          {/* Footer info */}
          <div className="mt-8 text-center text-xs text-slate-500 space-y-1">
            <p>Data provided by Finnhub API • Updated every 60 seconds</p>
            <p className="text-slate-600">This is a demo application for educational purposes only</p>
          </div>
        </main>
      </div>
    </div>
  );
};


export default App;



