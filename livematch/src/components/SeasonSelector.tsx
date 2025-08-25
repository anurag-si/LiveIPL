"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { getAvailableSeasons, SeasonOption } from "@/lib/api"

export default function SeasonSelector() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSeason = searchParams?.get('season') || "2025"
  const [seasons, setSeasons] = useState<SeasonOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        setLoading(true)
        const availableSeasons = await getAvailableSeasons()
        setSeasons(availableSeasons)
        setError(null)
      } catch (err) {
        setError('Failed to load seasons')
        console.error('Error loading seasons:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSeasons()
  }, [])

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSeason = e.target.value
    const params = new URLSearchParams(searchParams || '')
    params.set('season', newSeason)
    router.push(`?${params.toString()}`)
  }

  if (loading) {
    return (
      <select
        disabled
        className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-500 w-full sm:w-auto"
      >
        <option>Loading seasons...</option>
      </select>
    )
  }

  if (error) {
    return (
      <select
        disabled
        className="bg-red-50 border border-red-300 rounded-lg px-3 py-2 text-sm text-red-500 w-full sm:w-auto"
      >
        <option>Error loading seasons</option>
      </select>
    )
  }

  return (
    <select
      id="season"
      name="season"
      value={currentSeason}
      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto text-gray-900"
      onChange={handleSeasonChange}
    >
      {seasons.map((season) => (
        <option key={season.value} value={season.value}>
          {season.label}
        </option>
      ))}
    </select>
  )
}
