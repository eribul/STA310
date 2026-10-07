import { useCallback, useEffect, useState } from 'react'
import type { StudyMode } from '../content/types'

/** A parsed location in the app. */
export type Route =
  | { name: 'home' }
  | { name: 'chapter'; chapter: number; mode: StudyMode }

const DEFAULT_ROUTE: Route = { name: 'home' }

/** Parse a location hash such as "#/chapter/3/quiz". */
export function parseHash(hash: string): Route {
  const cleaned = hash.replace(/^#\/?/, '').replace(/\/+$/, '')
  if (!cleaned) return DEFAULT_ROUTE

  const parts = cleaned.split('/')
  if (parts[0] !== 'chapter') return DEFAULT_ROUTE

  const chapter = Number.parseInt(parts[1] ?? '', 10)
  if (!Number.isInteger(chapter) || chapter < 1) return DEFAULT_ROUTE

  const mode: StudyMode = parts[2] === 'quiz' ? 'quiz' : 'flashcards'
  return { name: 'chapter', chapter, mode }
}

/** Serialise a route back to a location hash. */
export function routeToHash(route: Route): string {
  if (route.name === 'home') return '#/'
  return `#/chapter/${route.chapter}/${route.mode}`
}

/**
 * Minimal hash-based router. Hash routing is used deliberately so the static
 * build works from any sub-path on GitHub Pages without server rewrites.
 */
export function useHashRoute(): readonly [Route, (route: Route) => void] {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === 'undefined' ? DEFAULT_ROUTE : parseHash(window.location.hash),
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onHashChange = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((next: Route) => {
    // Update state immediately so tests and fast clicks do not depend on the
    // asynchronous hashchange event, then keep the URL in sync.
    setRoute(next)
    if (typeof window !== 'undefined') {
      const hash = routeToHash(next)
      if (window.location.hash !== hash) {
        window.location.hash = hash
      }
    }
  }, [])

  return [route, navigate] as const
}
