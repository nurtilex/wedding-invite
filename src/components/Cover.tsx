import type { CSSProperties } from 'react'
import { config, type Lang } from '../config'
import type { DateParts, Dict } from '../i18n'
import { Ornament } from './Ornament'
import { Reveal } from './Reveal'

type Props = { t: Dict; lang: Lang; date: DateParts }

export function Cover({ t, lang, date }: Props) {
  return (
    <header className="cover">
      {config.coverPhoto && (
        <div
          className="cover__photo"
          aria-hidden="true"
          style={{ '--cover-photo': `url('${config.coverPhoto}')` } as CSSProperties}
        />
      )}
      <div className="cover__frame" aria-hidden="true" />

      <Reveal delay={150}>
        <p className="eyebrow">{t.eyebrow}</p>
      </Reveal>

      <Reveal delay={350}>
        <h1 className="names">
          <span>{config.groom[lang]}</span>
          <span className="names__amp" aria-hidden="true">
            &amp;
          </span>
          <span>{config.bride[lang]}</span>
        </h1>
      </Reveal>

      <Reveal delay={650}>
        <Ornament />
      </Reveal>

      <Reveal delay={820}>
        <p className="cover__date">
          <span>{date.dayMonth}</span>
          <span aria-hidden="true">•</span>
          <span>{date.year}</span>
        </p>
        <p className="cover__weekday">{date.weekday}</p>
      </Reveal>

      <Reveal delay={1020}>
        <div className="invite">
          <p className="invite__hi">{t.invitation}</p>
          <p className="invite__text">{t.invitationText}</p>
        </div>
      </Reveal>

      <a className="scroll" href="#details">
        <span>{t.scroll}</span>
        <span className="scroll__line" aria-hidden="true" />
      </a>
    </header>
  )
}
