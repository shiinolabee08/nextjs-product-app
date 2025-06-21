import { useCallback, useEffect, useState } from 'react';

interface FetchState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export function useFetch<T = unknown>(
  url: string,
  method: HttpMethod = 'GET',
  autoFetch = true
) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: false,
  })

  const fetchData = useCallback(async () => {
    if (method !== 'GET') return

    setState((prev) => ({ ...prev, loading: true }))
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Error ${res.status}`)
      const data = (await res.json()) as T
      setState({ data, error: null, loading: false })
    } catch (err: any) {
      setState({ data: null, error: err.message, loading: false })
    }
  }, [url, method])

  useEffect(() => {
    if (autoFetch && method === 'GET') fetchData()
  }, [autoFetch, fetchData, method])

  // POST / PUT / DELETE support
  const sendRequest = useCallback(
    async (body?: any, customUrl?: string, customMethod?: HttpMethod) => {
      setState((prev) => ({ ...prev, loading: true }))

      try {
        const res = await fetch(customUrl || url, {
          method: customMethod || method,
          headers: { 'Content-Type': 'application/json' },
          body: body ? JSON.stringify(body) : undefined,
        })

        const data = await res.json()

        if (!res.ok) throw new Error(data?.message || `Request failed (${res.status})`)

        setState({ data, error: null, loading: false })
        return data
      } catch (err: any) {
        setState({ data: null, error: err.message, loading: false })
        throw err
      }
    },
    [url, method]
  );

  return {
    ...state,
    refetch: fetchData,
    sendRequest,
  };
}
