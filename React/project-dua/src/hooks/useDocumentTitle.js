import { useEffect } from 'react'

export function useDocumentTitle(pageName) {
  useEffect(() => {
    document.title = pageName ? `OXIGEN | ${pageName}` : 'OXIGEN'
    window.scrollTo(0, 0)
  }, [pageName])
}
