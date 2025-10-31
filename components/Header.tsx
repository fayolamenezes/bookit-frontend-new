'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState, useTransition } from 'react'

const DEBOUNCE_MS = 250

export default function Header() {
  const router = useRouter()
  const sp = useSearchParams()
  const [q, setQ] = useState(sp.get('q') || '')
  const [isPending, startTransition] = useTransition()

  // keep input in sync when user navigates back/forward
  useEffect(() => setQ(sp.get('q') || ''), [sp])

  // 🔹 Type-to-search (debounced)
  useEffect(() => {
    const v = q.trim()
    const current = sp.get('q') || ''
    const same = v === current

    const t = setTimeout(() => {
      if (same) return
      startTransition(() => {
        const qs = v ? `?q=${encodeURIComponent(v)}` : ''
        // replace (not push) so we don't spam history on every keystroke
        router.replace('/' + qs)
      })
    }, DEBOUNCE_MS)

    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  // Optional: still keep the button for users who like clicking
  const manualSubmit = () => {
    const v = q.trim()
    const qs = v ? `?q=${encodeURIComponent(v)}` : ''
    router.push('/' + qs)
  }

  return (
    <header className="border-b border-brand-border">
      <div className="mx-auto max-w-[1200px] px-[24px] h-[72px] flex items-center gap-[16px]">
        <Link href="/" className="flex items-center">
          <Image src="/hd-logo.png" alt="hd highway delite" width={28} height={34} />
        </Link>

        <div className="flex-1 flex justify-center">
          <div className="w-[520px] h-[40px] rounded-pill border border-brand-border px-[12px] flex items-center">
            <input
              className="flex-1 h-full outline-none"
              placeholder="Search experiences"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={manualSubmit}
          className="h-[40px] px-[16px] rounded-btn bg-brand-yellow font-medium"
          disabled={isPending}
        >
          Search
        </button>
      </div>
    </header>
  )
}
