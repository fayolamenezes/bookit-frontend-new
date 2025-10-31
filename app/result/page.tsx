'use client'
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function ResultInner() {
  const params = useSearchParams()
  const ref = params.get('ref')
  const router = useRouter()

  return (
    <div className="min-h-[70vh] grid place-items-center">
      <div className="text-center">
        <div className="mx-auto w-[56px] h-[56px] rounded-full bg-brand-green grid place-items-center">
          <span className="text-white text-[28px]">✓</span>
        </div>
        <h1 className="mt-[16px] text-[24px] leading-[32px] font-semibold">Booking Confirmed</h1>
        <div className="mt-[6px] text-brand-gray">Ref ID: {ref}</div>
        <button
          onClick={() => router.push('/')}
          className="mt-[12px] h-[32px] px-[12px] rounded-btn border border-brand-border"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default function Result() {
  // Suspense wrapper satisfies Next’s CSR bailout warning
  return (
    <Suspense fallback={<div />}>
      <ResultInner />
    </Suspense>
  )
}
