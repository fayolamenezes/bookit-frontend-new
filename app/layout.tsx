// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BookIt',
  description: 'Experiences & Slots',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-[#F5F6F8]'}>
        {/* Top Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-black/5">
          <div className="mx-auto max-w-[1200px] px-[24px] py-[14px] flex items-center justify-between gap-4">
            {/* Logo (uses your hd-logo.png) */}
            <Link href="/" className="flex items-center gap-2 select-none">
              <Image
                src="/hd-logo.png"
                alt="hd highway delite"
                width={100}
                height={100}
                priority
              />
            </Link>

            {/* Search Bar */}
            <form action="/" className="flex items-center gap-2">
              <input
                name="q"
                placeholder="Search experiences"
                className="h-9 w-[360px] rounded-[10px] bg-[#F2F2F2] px-3 text-[14px] outline-none placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-yellow-300"
                defaultValue=""
              />
              <button
                type="submit"
                className="h-9 rounded-[10px] bg-[#F6C042] px-4 text-[14px] font-medium text-black shadow-sm active:translate-y-[1px]"
              >
                Search
              </button>
            </form>
          </div>
        </header>

        {/* Page content container */}
        <main className="mx-auto max-w-[1200px] px-[24px] py-[24px]">
          {children}
        </main>
      </body>
    </html>
  )
}
