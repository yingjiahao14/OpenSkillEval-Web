import { siteConfig } from "../config/site";

export default function Footer() {
  return (
    <footer className="bg-[#0D1421] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {siteConfig.footer.products.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#808A9D] hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {siteConfig.footer.company.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#808A9D] hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {siteConfig.footer.support.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#808A9D] hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              {siteConfig.footer.community.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#808A9D] hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[#1E293B]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#3861FB] flex items-center justify-center">
                <span className="text-white font-bold text-xs">CT</span>
              </div>
              <span className="font-bold text-base">{siteConfig.name}</span>
            </div>
            <p className="text-xs text-[#808A9D]">{siteConfig.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
