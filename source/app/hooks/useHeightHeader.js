import { useState, useEffect } from 'react'

const useHeightHeader = (deps = []) => {
  const [top, setTop] = useState('0px')

  useEffect(() => {
    try {
      const element = document.getElementById('header')
      const height = element.clientHeight
      setTop(height)
    } catch (error) {
      console.error('_error_', error)
    }
  }, deps)

  return top
}

export default useHeightHeader
