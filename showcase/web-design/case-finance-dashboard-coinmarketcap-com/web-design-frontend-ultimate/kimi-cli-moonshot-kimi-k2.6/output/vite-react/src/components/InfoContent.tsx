export default function InfoContent() {
  return (
    <div className="bg-[#F8FAFD] border-t border-[#E5E7EB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-[#0D1421] mb-3">
              Today&apos;s Cryptocurrency Prices, Charts and Data
            </h2>
            <p className="text-sm text-[#58667E] leading-relaxed">
              Welcome to CoinTracker Pro! Founded to provide up-to-date cryptocurrency prices, charts, and data about the emerging cryptocurrency markets. We take our data seriously and stand for accurate, timely, and unbiased information.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0D1421] mb-3">
              All Your Crypto Market Data Needs in One Place
            </h2>
            <p className="text-sm text-[#58667E] leading-relaxed">
              CoinTracker Pro ensures all relevant information about cryptocurrencies, coins, and tokens can be located in one easily discoverable place.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0D1421] mb-3">
              Live and Historic Crypto Charts for Free
            </h2>
            <p className="text-sm text-[#58667E] leading-relaxed">
              Each coin data page features graphs showing current and historic price information. Professional traders can access our API, enabling millions of calls to track current and historic prices.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0D1421] mb-3">
              How Do We Calculate Cryptocurrency Prices?
            </h2>
            <p className="text-sm text-[#58667E] leading-relaxed">
              We receive updated prices directly from exchanges based on their trading pairs, then convert to USD.
            </p>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-lg font-bold text-[#0D1421] mb-3">
              How Do We Calculate Crypto Valuations?
            </h2>
            <p className="text-sm text-[#58667E] leading-relaxed">
              Valuations are based on total circulating supply multiplied by the currency reference price.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
