export function Footer() {
  const footerLinks = {
    products: ['Cryptocurrencies', 'Exchanges', 'DexScan', 'Portfolio', 'Watchlist'],
    company: ['About', 'Terms of Use', 'Privacy Policy', 'Methodology', 'Disclaimer'],
    support: ['FAQ', 'Glossary', 'Crypto Learning Center', 'API Documentation'],
    community: ['Twitter', 'Telegram', 'Discord', 'Instagram']
  }

  return (
    <footer className="bg-[#0D1421] text-white mt-16">
      <div className="max-w-[1600px] mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#3861FB] flex items-center justify-center">
                <span className="text-white font-bold text-sm">CT</span>
              </div>
              <span className="font-bold text-lg">CoinTracker Pro</span>
            </div>
            <p className="text-sm text-[#808A9D]">Professional cryptocurrency market data dashboard for investors and traders.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link}>
                  <button className="text-sm text-[#808A9D] hover:text-white transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <button className="text-sm text-[#808A9D] hover:text-white transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <button className="text-sm text-[#808A9D] hover:text-white transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Community</h4>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link}>
                  <button className="text-sm text-[#808A9D] hover:text-white transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#2a2f3c] text-center">
          <p className="text-sm text-[#808A9D]">© 2025 CoinTracker Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
