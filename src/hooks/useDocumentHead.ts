import { useEffect } from 'react'

const DEFAULT_TITLE = 'FortWayneBusinesses.com — Support Local. Find It Here First.'
const DEFAULT_DESCRIPTION =
  'The go-to directory for Fort Wayne, Indiana. Discover and support local businesses in your community.'

export function useDocumentHead(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ?? DEFAULT_TITLE

    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = description ?? DEFAULT_DESCRIPTION

    return () => {
      document.title = DEFAULT_TITLE
      if (metaDesc) metaDesc.content = DEFAULT_DESCRIPTION
    }
  }, [title, description])
}
