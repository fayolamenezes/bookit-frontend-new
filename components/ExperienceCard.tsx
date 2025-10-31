'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ExperienceCard({ exp }: { exp: any }) {
  const router = useRouter()
  const priceDisplay =
    (typeof exp.price === 'number' ? exp.price : parseInt(exp.price, 10)) || 0

  return (
    <div className="rounded-[12px] bg-[#EDEDED] shadow-[0_1px_8px_rgba(0,0,0,0.08)] overflow-hidden">
      {/* Image: top, full width */}
      <div className="relative">
        <Image
          src={exp.heroImage}
          alt={exp.title}
          width={624}
          height={376}
          className="h-[188px] w-full object-cover"
        />
      </div>

      {/* Gray info section (same as card background) */}
      <div className="p-[16px]">
        {/* Title + location inline */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[16px] leading-[24px] font-semibold text-[#111827] line-clamp-1">
            {exp.title}
          </h3>
          {exp.location && (
            <span className="shrink-0 rounded-full bg-[#D1D5DB] px-[10px] py-[2px] text-[12px] leading-[16px] text-[#111827]">
              {exp.location}
            </span>
          )}
        </div>

        <p className="mt-[6px] text-[14px] leading-[20px] text-[#6B7280]">
          Curated small-group experience. Certified guide. Safety first with gear included.
        </p>

        <div className="mt-[12px] flex items-center justify-between">
          <span className="text-[14px] text-[#111827]">
            From <span className="font-semibold">₹{priceDisplay}</span>
          </span>

          <button
            onClick={() => router.push(`/details/${exp._id}`)}
            className="h-[32px] px-[12px] rounded-[10px] bg-[#F6C042] text-[14px] font-medium text-black shadow-[0_1px_0_rgba(0,0,0,0.05)] active:translate-y-[1px]"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
