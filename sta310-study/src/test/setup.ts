import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
  window.localStorage.clear()
  // Reset the URL between tests without firing a hashchange event.
  window.history.replaceState({}, '', '/')
})
