// app/page.tsx
export const dynamic = 'force-dynamic'; // or: export const revalidate = 0

import ExperienceCard from '../components/ExperienceCard'
import { getExperiences } from '../lib/api'

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const q = searchParams?.q ?? ''
  const list = await getExperiences(q)

  return (
    <div className="grid grid-cols-4 gap-[24px]">
      {list.map((e: any) => (
        <ExperienceCard key={e._id} exp={e} />
      ))}
      {list.length === 0 && (
        <div className="col-span-4 text-center text-[#6B7280] py-10">
          No experiences found{q ? ` for “${q}”` : ''}.
        </div>
      )}
    </div>
  )
}
