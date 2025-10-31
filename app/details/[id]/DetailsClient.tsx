'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

type Slot = { _id: string; time: string; capacityTotal: number; capacityBooked: number }
type Exp = {
  _id: string
  title: string
  price: number
  heroImage: string
  slotsByDate: Record<string, Slot[]>
}

export default function ClientDetails({ exp }: { exp: Exp }) {
  const dates = useMemo(() => Object.keys(exp.slotsByDate || {}), [exp])
  const [selectedDate, setSelectedDate] = useState(dates[0])
  const times = useMemo(() => exp.slotsByDate?.[selectedDate] || [], [exp, selectedDate])
  const [selectedTimeId, setSelectedTimeId] = useState<string | null>(times[0]?._id ?? null)
  const [qty, setQty] = useState(1)

  const selectedTime = useMemo(
    () => times.find((t) => t._id === selectedTimeId) || null,
    [times, selectedTimeId]
  )

  return (
    <div className="flex gap-[24px] text-[#111827]">
      {/* LEFT */}
      <div className="flex-1">
        <div className="overflow-hidden rounded-[12px]">
          <Image
            src={exp.heroImage}
            alt={exp.title}
            width={1200}
            height={600}
            className="w-full h-[420px] object-cover"
          />
        </div>

        <h1 className="mt-[16px] text-[20px] font-semibold leading-[28px]">{exp.title}</h1>
        <p className="mt-[8px] text-[14px] text-[#6B7280] max-w-[880px] leading-[22px]">
          Curated small-group experience. Certified guide. Safety first with gear included.
          Helmet and Life jackets along with an expert will accompany in kayaking.
        </p>

        {/* Dates */}
        <div className="mt-[24px]">
          <div className="text-[14px] font-semibold">Choose date</div>
          <div className="mt-[10px] flex gap-[8px]">
            {dates.map((d) => {
              const isSelected = d === selectedDate
              return (
                <button
                  key={d}
                  onClick={() => {
                    setSelectedDate(d)
                    setSelectedTimeId(null)
                  }}
                  className={`px-[12px] py-[6px] rounded-[8px] border text-[14px] transition-colors ${
                    isSelected
                      ? 'bg-[#FACC15] border-[#FACC15] text-[#111827]'
                      : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
                  }`}
                >
                  {new Date(d).toLocaleDateString(undefined, { month: 'short', day: '2-digit' })}
                </button>
              )
            })}
          </div>
        </div>

        {/* Times */}
        <div className="mt-[16px]">
          <div className="text-[14px] font-semibold">Choose time</div>
          <div className="mt-[10px] flex flex-wrap gap-[8px]">
            {times.map((t) => {
              const remaining = t.capacityTotal - t.capacityBooked
              const disabled = remaining <= 0
              const active = selectedTimeId === t._id
              return (
                <button
                  key={t._id}
                  disabled={disabled}
                  onClick={() => setSelectedTimeId(t._id)}
                  className={`px-[12px] py-[6px] rounded-[8px] border text-[14px] transition-colors ${
                    disabled
                      ? 'bg-[#F3F4F6] text-[#9CA3AF] opacity-70 cursor-not-allowed'
                      : active
                        ? 'border-[#111827]'
                        : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
                  }`}
                >
                  {t.time}
                  {remaining > 0 && remaining <= 5 && (
                    <span className="ml-[6px] text-[12px] text-[#EF4444]">{remaining} left</span>
                  )}
                  {disabled && (
                    <span className="ml-[6px] text-[12px] text-[#6B7280]">Sold out</span>
                  )}
                </button>
              )
            })}
          </div>
          <div className="text-[12px] text-[#9CA3AF] mt-[6px]">
            All times are in IST (GMT +5:30)
          </div>
        </div>

        {/* About */}
        <div className="mt-[24px]">
          <div className="text-[14px] font-semibold mb-[6px]">About</div>
          <div className="rounded-[8px] bg-[#F7F7F7] text-[12px] text-[#6B7280] px-[12px] py-[10px]">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <aside className="w-[360px]">
        <div className="rounded-[12px] bg-[#F7F7F7] p-[16px]">
          <div className="flex justify-between py-[6px] text-[14px]">
            <span>Starts at</span>
            <span>₹{exp.price}</span>
          </div>

          <div className="flex justify-between py-[6px] text-[14px]">
            <span>Quantity</span>
            <div className="flex items-center gap-2 text-[#6B7280]">
              <button
                className="px-2 py-1 rounded border border-[#E5E7EB]"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                –
              </button>
              <span>{qty}</span>
              <button
                className="px-2 py-1 rounded border border-[#E5E7EB]"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between py-[6px] text-[14px]">
            <span>Subtotal</span>
            <span>₹{exp.price * qty}</span>
          </div>
          <div className="flex justify-between py-[6px] text-[14px]">
            <span>Taxes</span>
            <span>₹59</span>
          </div>

          <hr className="my-[10px] border-[#E5E7EB]" />

          <div className="flex justify-between font-semibold text-[14px]">
            <span>Total</span>
            <span>₹{exp.price * qty - 41}</span>
          </div>

          <Link
            href={`/checkout?exp=${exp._id}&date=${encodeURIComponent(selectedDate || '')}&time=${encodeURIComponent(
              selectedTime?.time || ''
            )}&qty=${qty}`}
            className={`mt-[12px] block h-[40px] rounded-[8px] grid place-items-center text-[14px] font-medium text-[#111827] transition-colors ${
              selectedTime
                ? 'bg-[#FFD84D] hover:bg-[#FACC15]'
                : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
            }`}
            aria-disabled={!selectedTime}
          >
            Confirm
          </Link>
        </div>
      </aside>
    </div>
  )
}
