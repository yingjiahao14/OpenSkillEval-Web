export function Navigation() {
  return (
    <header className="bg-white border-b border-[#e5e7eb] sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#3861FB] flex items-center justify-center">
                <span className="text-white font-bold text-sm">CT</span>
              </div>
              <span className="font-bold text-[#0D1421] text-lg">CoinTracker Pro</span>
            </div>
            <nav className="hidden lg:flex items-center gap-1">
              {['Cryptocurrencies', 'Dashboards', 'Exchanges', 'DexScan', 'More'].map((item) => (
                <button
                  key={item}
                  className="px-3 py-2 text-sm font-medium text-[#808A9D] hover:text-[#0D1421] hover:bg-[#f8f9fb] rounded-lg transition-colors"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-[#3861FB] hover:bg-[#3861FB]/5 rounded-lg transition-colors">
              Log In
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-[#3861FB] hover:bg-[#2d4edb] rounded-lg transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
