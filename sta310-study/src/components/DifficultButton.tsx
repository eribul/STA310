interface DifficultButtonProps {
  /** Whether the item is currently marked as difficult. */
  active: boolean
  /** Called when the button is pressed. */
  onToggle: () => void
  /** Extra class names. */
  className?: string
}

/**
 * Star toggle used to flag a flashcard or question as difficult. The flag is
 * the single source of truth for the "only difficult" filters.
 */
export function DifficultButton({
  active,
  onToggle,
  className = '',
}: DifficultButtonProps) {
  return (
    <button
      type="button"
      className={`btn btn--sm ${active ? 'btn--danger' : ''} ${className}`.trim()}
      aria-pressed={active}
      onClick={(event) => {
        // The flashcard itself is clickable; do not flip it when starring.
        event.stopPropagation()
        onToggle()
      }}
      title={active ? 'Remove the difficult mark' : 'Mark as difficult'}
    >
      <span aria-hidden="true">{active ? '★' : '☆'}</span>
      {active ? 'Difficult' : 'Mark difficult'}
    </button>
  )
}
