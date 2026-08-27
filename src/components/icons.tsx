/** Тонкие линейные иконки — под остальную графику сайта. */

export function PinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 15s5-4.6 5-8.4A5 5 0 0 0 3 6.6C3 10.4 8 15 8 15Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="6.5" r="1.8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function NavIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M14 2 2 7.1l5 1.9 1.9 5L14 2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function GuestsIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 20" fill="none" aria-hidden="true">
      <circle cx="14" cy="6" r="3.4" stroke="currentColor" strokeWidth="1.1" />
      <path d="M8.4 17.2a5.8 5.8 0 0 1 11.2 0" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="5" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1 16.4a4.2 4.2 0 0 1 4.9-3.7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="23" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.1" />
      <path d="M27 16.4a4.2 4.2 0 0 0-4.9-3.7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

export function HangerIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 20" fill="none" aria-hidden="true">
      <path
        d="M14 7.4V6.6a2.1 2.1 0 1 1 2.1-2.1"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M14 7.4 3.4 14.6c-.9.6-.5 2 .6 2h20c1.1 0 1.5-1.4.6-2L14 7.4Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  )
}
