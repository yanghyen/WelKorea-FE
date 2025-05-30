import { useEffect, useState } from 'react'

export function useGeolocation() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation(pos)
    })
  }, [])

  return location
}
