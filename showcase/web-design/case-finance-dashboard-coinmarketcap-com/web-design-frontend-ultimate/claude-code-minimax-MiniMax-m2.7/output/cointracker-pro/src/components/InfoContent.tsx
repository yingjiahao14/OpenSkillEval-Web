export function InfoContent() {
  const sections = [
    {
      title: "Today's Cryptocurrency Prices, Charts and Data",
      content: "Welcome to CoinTracker Pro! Founded to provide up-to-date cryptocurrency prices, charts, and data about the emerging cryptocurrency markets. We take our data seriously and stand for accurate, timely, and unbiased information."
    },
    {
      title: 'All Your Crypto Market Data Needs in One Place',
      content: 'CoinTracker Pro ensures all relevant information about cryptocurrencies, coins, and tokens can be located in one easily discoverable place.'
    },
    {
      title: 'Live and Historic Crypto Charts for Free',
      content: 'Each coin data page features graphs showing current and historic price information. Professional traders can access our API, enabling millions of calls to track current and historic prices.'
    },
    {
      title: 'How Do We Calculate Cryptocurrency Prices?',
      content: 'We receive updated prices directly from exchanges based on their trading pairs, then convert to USD.'
    },
    {
      title: 'How Do We Calculate Crypto Valuations?',
      content: 'Valuations are based on total circulating supply multiplied by the currency reference price.'
    }
  ]

  return (
    <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sections.map((section, index) => (
        <div key={index} className="bg-white rounded-xl border border-[#e5e7eb] p-6">
          <h3 className="text-base font-semibold text-[#0D1421] mb-2">{section.title}</h3>
          <p className="text-sm text-[#808A9D] leading-relaxed">{section.content}</p>
        </div>
      ))}
    </section>
  )
}
