import type { Lang } from '../config'

type Props = {
  lang: Lang
  onChange: (lang: Lang) => void
}

const OPTIONS: { value: Lang; label: string; title: string }[] = [
  { value: 'kg', label: 'кырг', title: 'Кыргызча' },
  { value: 'ru', label: 'рус', title: 'Русский' },
]

export function LangSwitch({ lang, onChange }: Props) {
  return (
    <div className="lang" role="group" aria-label="Тил / Язык">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className="lang__btn"
          lang={option.value === 'kg' ? 'ky' : 'ru'}
          title={option.title}
          aria-pressed={lang === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
