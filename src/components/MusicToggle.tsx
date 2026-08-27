type Props = {
  available: boolean
  playing: boolean
  onToggle: () => void
  labelOn: string
  labelOff: string
}

export function MusicToggle({ available, playing, onToggle, labelOn, labelOff }: Props) {
  if (!available) return null

  return (
    <button
      type="button"
      className={`music${playing ? ' is-playing' : ''}`}
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? labelOff : labelOn}
      title={playing ? labelOff : labelOn}
    >
      <span className="music__bars" aria-hidden="true">
        <span className="music__bar" />
        <span className="music__bar" />
        <span className="music__bar" />
        <span className="music__bar" />
      </span>
    </button>
  )
}
