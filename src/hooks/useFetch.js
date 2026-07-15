import { useCallback, useEffect, useState } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(Boolean(url))
  const [error, setError] = useState('')
  const [requestNumber, setRequestNumber] = useState(0)

  useEffect(() => {
    if (!url) {
      setData(null)
      setError('')
      setLoading(false)
      return undefined
    }

    const controller = new AbortController()

    const getData = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(url, { signal: controller.signal })
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || 'Could not load the data.')
        }

        setData(result)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Could not load the data.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    getData()

    return () => controller.abort()
  }, [url, requestNumber])

  const refetch = useCallback(() => {
    setRequestNumber((current) => current + 1)
  }, [])

  return { data, loading, error, refetch }
}

export default useFetch
