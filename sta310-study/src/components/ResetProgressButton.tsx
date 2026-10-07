import { useEffect, useState } from 'react'

interface ResetProgressButtonProps {
  onReset: () => void
  disabled?: boolean
}

/**
 * Two-step reset. A native `confirm()` is avoided so the control behaves
 * identically in the browser and in tests.
 */
export function ResetProgressButton({ onReset, disabled = false }: ResetProgressButtonProps) {
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    if (!confirming) return
    const timer = setTimeout(() => setConfirming(false), 5000)
    return () => clearTimeout(timer)
  }, [confirming])

  if (!confirming) {
    return (
      <button
        type="button"
        className="btn btn--sm btn--ghost"
        disabled={disabled}
        onClick={() => setConfirming(true)}
      >
        Reset progress
      </button>
    )
  }

  return (
    <span className="btn-row">
      <button
        type="button"
        className="btn btn--sm btn--danger"
        onClick={() => {
          onReset()
          setConfirming(false)
        }}
      >
        Confirm reset
      </button>
      <button
        type="button"
        className="btn btn--sm btn--ghost"
        onClick={() => setConfirming(false)}
      >
        Cancel
      </button>
    </span>
  )
}
