import { useState, useEffect } from 'react'
import { X, Heart, Lock, Check } from 'lucide-react'

interface DonateModalProps {
  open: boolean
  onClose: () => void
}

const presetAmounts = [25, 50, 100, 250, 500]

export default function DonateModal({ open, onClose }: DonateModalProps) {
  const [amount, setAmount] = useState<number | 'custom'>(50)
  const [customValue, setCustomValue] = useState('')
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      window.addEventListener('keydown', handleEsc)
    }
    return () => window.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  if (!open) return null

  const displayAmount =
    amount === 'custom'
      ? customValue
        ? `$${customValue}`
        : 'Custom'
      : `$${amount}`

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Donate to Global Aid Alliance"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-navy px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Make a Donation</h3>
              <p className="text-white/70 text-xs">
                Secure, tax-deductible contribution
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Frequency */}
          <div>
            <label className="block text-sm font-semibold text-warm-800 mb-2">
              Donation Frequency
            </label>
            <div className="flex rounded-lg border border-warm-200 overflow-hidden">
              <button
                onClick={() => setFrequency('once')}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  frequency === 'once'
                    ? 'bg-primary text-white'
                    : 'bg-white text-warm-600 hover:bg-warm-50'
                }`}
              >
                One-time
              </button>
              <button
                onClick={() => setFrequency('monthly')}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  frequency === 'monthly'
                    ? 'bg-primary text-white'
                    : 'bg-white text-warm-600 hover:bg-warm-50'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-warm-800 mb-2">
              Select Amount
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
              {presetAmounts.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    setAmount(a)
                    setCustomValue('')
                  }}
                  className={`py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                    amount === a
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-warm-700 border-warm-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  ${a}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-400 font-semibold">
                $
              </span>
              <input
                type="number"
                placeholder="Custom amount"
                value={customValue}
                onChange={(e) => {
                  setCustomValue(e.target.value)
                  setAmount('custom')
                }}
                className="w-full pl-7 pr-4 py-2.5 border border-warm-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          </div>

          {/* Impact */}
          <div className="bg-warm-50 rounded-xl p-4 border border-warm-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-warm-800">
                  Your {displayAmount} {frequency} donation
                </p>
                <p className="text-xs text-warm-500 mt-0.5">
                  91 cents of every dollar goes directly to humanitarian services.
                </p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={() => {
              alert(
                `Thank you for your ${displayAmount} ${frequency} donation to Global Aid Alliance!`
              )
              onClose()
            }}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold text-base px-8 py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Donate {displayAmount} {frequency === 'monthly' ? '/month' : ''}
          </button>

          <p className="text-center text-xs text-warm-400">
            Secure payment processing. Your information is protected.
          </p>
        </div>
      </div>
    </div>
  )
}
