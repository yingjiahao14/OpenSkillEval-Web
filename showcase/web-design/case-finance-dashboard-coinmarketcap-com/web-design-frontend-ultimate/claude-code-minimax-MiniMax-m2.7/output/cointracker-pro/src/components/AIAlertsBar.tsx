import { useState } from 'react'

const quickQuestions = [
  'Why is the market up today?',
  'Are altcoins outperforming Bitcoin?',
  'What are the trending narratives?',
  'What cryptos are showing bullish momentum?',
  'What upcoming events may impact crypto?',
  'What is the market sentiment?',
  'What are KOLs discussing?'
]

export function AIAlertsBar() {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="bg-[#f8f9fb] border-b border-[#e5e7eb]">
      <div className="max-w-[1600px] mx-auto px-4 py-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3861FB] to-[#6c8cff] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-[#0D1421]">Stablecoin issuer eyes Solana DeFi expansion 👀</span>
          </div>
          <div className="h-4 w-px bg-[#e5e7eb] hidden md:block" />
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[#808A9D]">Quick ask:</span>
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => setInputValue(q)}
                className="text-xs px-2.5 py-1 bg-white border border-[#e5e7eb] rounded-full text-[#3861FB] hover:bg-[#3861FB] hover:text-white hover:border-[#3861FB] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
