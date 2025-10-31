import { getExperience } from '../../../lib/api'
import DetailsClient from './DetailsClient'

export default async function Details({ params }: { params: { id: string } }) {
  const exp = await getExperience(params.id)
  return <DetailsClient exp={exp} />
}
