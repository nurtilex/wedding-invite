import type { CSSProperties } from 'react'
import { config, type Lang } from '../config'
import type { DateParts, Dict } from '../i18n'
import { dgisUrl, googleUrl } from '../lib/maps'
import { GuestsIcon, HangerIcon, NavIcon, PinIcon } from './icons'
import { Reveal } from './Reveal'

type Props = { t: Dict; lang: Lang; date: DateParts }

/**
 * Вторая страница: монограмма, обращение к гостям, площадка и время.
 * Занимает целый экран, как и обложка, — гость листает её как отдельный лист.
 */
export function Invitation({ t, lang, date }: Props) {
  const groom = config.groom[lang]
  const bride = config.bride[lang]


  return (
    <section className="invitation" id="details">
      {config.invitePhoto && (
        <div
          className="invitation__photo"
          aria-hidden="true"
          style={{ '--invitation-photo': `url('${config.invitePhoto}')` } as CSSProperties}
        />
      )}

      <div className="invitation__inner">
        <Reveal>
          {/* Инициалы берём из имён, чтобы монограмма не разъезжалась с конфигом */}
          <p className="crest" aria-label={`${groom} & ${bride}`}>
            <span className="crest__letter">{groom.charAt(0)}</span>
            <span className="crest__letter crest__letter--second">{bride.charAt(0)}</span>
          </p>
        </Reveal>

        <Reveal delay={120}>
          <p className="invitation__text">{t.inviteLong}</p>
        </Reveal>

        {config.hosts[lang] && (
          <Reveal delay={180}>
            <div className="hosts">
              <span className="hosts__label">{t.hostsLabel}</span>
              <span className="hosts__names">{config.hosts[lang]}</span>
            </div>
          </Reveal>
        )}

        <Reveal delay={220}>
          <div className="invitation__block">
            <span className="invitation__icon">
              <PinIcon size={22} />
            </span>
            <h2 className="invitation__venue">{config.venue.name[lang]}</h2>
            <p className="invitation__address">{config.venue.address[lang]}</p>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="invitation__block">
            <span className="invitation__icon">
              <GuestsIcon />
            </span>

            <div className="times">
              {date.gathering && (
                <>
                  <div className="times__col">
                    <span className="times__label">{t.gatheringLabel}</span>
                    <span className="times__value">{date.gathering}</span>
                  </div>
                  <span className="times__sep" aria-hidden="true" />
                </>
              )}

              <div className="times__col">
                <span className="times__label">{t.startLabel}</span>
                <span className="times__value">{date.time}</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="invitation__block">
            <span className="invitation__icon">
              <HangerIcon />
            </span>
            <p className="dress__label">{t.dressLabel}</p>
            <p className="dress__text">{t.dressText}</p>

            {config.dressColors.length > 0 && (
              <div className="dress__swatches" aria-hidden="true">
                {config.dressColors.map((color) => (
                  <span
                    key={color.hex}
                    className="dress__swatch"
                    title={color.title}
                    style={{ background: color.hex }}
                  />
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={500}>
          <p className="invitation__label">{t.routeLabel}</p>
          <div className="actions">
            <a className="btn" href={dgisUrl} target="_blank" rel="noopener noreferrer">
              <PinIcon />
              {t.openDgis}
            </a>
            <a className="btn" href={googleUrl} target="_blank" rel="noopener noreferrer">
              <NavIcon />
              {t.openGoogle}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
