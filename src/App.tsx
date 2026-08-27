import { config } from './config'
import { Cover } from './components/Cover'
import { Invitation } from './components/Invitation'
import { Footer } from './components/Footer'
import { LangSwitch } from './components/LangSwitch'
import { MusicToggle } from './components/MusicToggle'
import { useLang } from './i18n'
import { useBackgroundMusic } from './lib/useBackgroundMusic'

export default function App() {
  const { lang, setLang, t, date } = useLang()
  const music = useBackgroundMusic(config.music.startOnFirstTap)

  return (
    <>
      <div className="controls">
        <MusicToggle
          available={music.available}
          playing={music.playing}
          onToggle={music.toggle}
          labelOn={t.musicOn}
          labelOff={t.musicOff}
        />
        <LangSwitch lang={lang} onChange={setLang} />
      </div>

      <Cover t={t} lang={lang} date={date} />
      <Invitation t={t} lang={lang} date={date} />
      <Footer t={t} date={date} />
    </>
  )
}
