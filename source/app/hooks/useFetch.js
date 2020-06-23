import { useEffect } from 'react'

const useFetch = (handler, deps) => {
  useEffect(() => {
    handler()
  }, deps)
}

export default useFetch
