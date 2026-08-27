import { config } from '../config'
import type { DateParts, Dict } from '../i18n'
import { Reveal } from './Reveal'

type Props = { t: Dict; date: DateParts }

export function Footer({ t, date }: Props) {
  return (
    <footer className="footer">
      <Reveal>
        <p className="monogram">{config.monogram}</p>
      </Reveal>
      <Reveal delay={140}>
        <p className="footer__text">{t.farewell}</p>
      </Reveal>
      <Reveal delay={260}>
        <p className="footer__date">{date.numeric}</p>
      </Reveal>

      {config.music.credit.text && (
        <p className="credit">
          <a href={config.music.credit.url} target="_blank" rel="noopener noreferrer">
            {config.music.credit.text}
          </a>
        </p>
      )}
    </footer>
  )
}
