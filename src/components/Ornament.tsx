/** Тонкий разделитель с ромбом по центру. */
export function Ornament({ width = 132 }: { width?: number }) {
  return (
    <svg
      className="ornament"
      width={width}
      height="12"
      viewBox="0 0 132 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 6h52M80 6h52" stroke="currentColor" strokeWidth="1" />
      <path d="M66 1.5 70.5 6 66 10.5 61.5 6z" stroke="currentColor" strokeWidth="1" />
      <circle cx="55.5" cy="6" r="1" fill="currentColor" />
      <circle cx="76.5" cy="6" r="1" fill="currentColor" />
    </svg>
  )
}
