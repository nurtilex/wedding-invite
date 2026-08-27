import { useCallback, useEffect, useState } from 'react'
import { config, type Lang } from './config'

/* ────────────────────────────  ТЕКСТЫ  ──────────────────────────── */

const dict = {
  kg: {
    htmlLang: 'ky',
    docTitle: 'Үйлөнүү тою',
    eyebrow: 'Үйлөнүү тою',
    invitation: 'Урматтуу коноктор!',
    invitationText: 'Сиздерди биздин үйлөнүү тоюбузга чакырабыз.',
    inviteLong:
      'Бул күндү эң жакын жана сүйүктүү адамдарыбызсыз элестете албайбыз. ' +
      'Ошондуктан сиздерди биз үчүн эң маанилүү окуяга — үйлөнүү тоюбузга чакырабыз!',
    gatheringLabel: 'Коноктордун келиши',
    startLabel: 'Тойдун башталышы',
    hostsLabel: 'Той ээлери',
    dressLabel: 'Кийим үлгүсү',
    dressText: 'Муздак кою түстөр',
    scroll: 'ылдый жылдырыңыз',

    detailsTitle: 'Той жөнүндө',
    whenLabel: 'Качан',
    whereLabel: 'Кайда',
    addressLabel: 'Дарек',
    routeLabel: 'Жол көрсөткүч',
    timePrefix: 'саат',

    openDgis: '2ГИС менен ачуу',
    openGoogle: 'Google Maps менен ачуу',

    farewell: 'Сиздерди чын жүрөктөн күтөбүз!',

    musicOn: 'Музыканы күйгүзүү',
    musicOff: 'Музыканы өчүрүү',
  },
  ru: {
    htmlLang: 'ru',
    docTitle: 'Свадьба',
    eyebrow: 'Свадьба',
    invitation: 'Дорогие гости!',
    invitationText: 'Приглашаем вас на нашу свадьбу.',
    inviteLong:
      'Мы не представляем этот день без самых близких и любимых людей рядом. ' +
      'Именно поэтому приглашаем вас на важное событие — нашу свадьбу!',
    gatheringLabel: 'Сбор гостей',
    startLabel: 'Начало торжества',
    hostsLabel: 'Организаторы',
    dressLabel: 'Дресс-код',
    dressText: 'Холодные тёмные оттенки',
    scroll: 'листайте вниз',

    detailsTitle: 'О торжестве',
    whenLabel: 'Когда',
    whereLabel: 'Где',
    addressLabel: 'Адрес',
    routeLabel: 'Как добраться',
    timePrefix: '',

    openDgis: 'Открыть в 2ГИС',
    openGoogle: 'Открыть в Google Maps',

    farewell: 'Будем счастливы видеть вас!',

    musicOn: 'Включить музыку',
    musicOff: 'Выключить музыку',
  },
} as const satisfies Record<Lang, Record<string, string>>

export type Dict = { [K in keyof (typeof dict)['ru']]: string }

/* ─────────────────────────  ДАТЫ И МЕСЯЦЫ  ───────────────────────── */

const months = {
  // Современные (общеупотребительные) названия.
  // Хотите традиционные — раскомментируйте набор ниже.
  kg: [
    'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
    'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь',
  ],
  // kg: [
  //   'үчтүн айы', 'бирдин айы', 'жалган куран', 'чын куран', 'бугу', 'кулжа',
  //   'теке', 'баш оона', 'аяк оона', 'тогуздун айы', 'жетинин айы', 'бештин айы',
  // ],
  ru: [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ],
} satisfies Record<Lang, string[]>

// Индекс 0 = воскресенье (как у Date.getUTCDay()).
const weekdays = {
  kg: ['жекшемби', 'дүйшөмбү', 'шейшемби', 'шаршемби', 'бейшемби', 'жума', 'ишемби'],
  ru: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
} satisfies Record<Lang, string[]>

export function formatDate(lang: Lang) {
  const { year, month, day, hour, minute } = config.date
  // UTC-конструктор: день недели не «съедет» из-за часового пояса гостя.
  const weekday = weekdays[lang][new Date(Date.UTC(year, month - 1, day)).getUTCDay()]
  const time = `${hour}:${String(minute).padStart(2, '0')}`

  const gathering = config.gathering
    ? `${config.gathering.hour}:${String(config.gathering.minute).padStart(2, '0')}`
    : null

  return {
    gathering,
    // кырг.: «27-сентябрь» · рус.: «27 сентября»
    dayMonth: lang === 'kg' ? `${day}-${months.kg[month - 1]}` : `${day} ${months.ru[month - 1]}`,
    year: lang === 'kg' ? `${year}-жыл` : `${year}`,
    numeric: `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`,
    weekday,
    time,
  }
}

/* ────────────────────────  ВЫБОР ЯЗЫКА  ──────────────────────── */

const STORAGE_KEY = 'invite-lang'

function normalize(value: string | null): Lang | null {
  if (!value) return null
  const v = value.toLowerCase()
  if (v === 'kg' || v === 'ky' || v === 'kyr' || v === 'kg-kg') return 'kg'
  if (v === 'ru' || v === 'rus') return 'ru'
  return null
}

/** ?lang=ru в ссылке важнее сохранённого выбора — так язык можно зафиксировать для конкретного гостя. */
function initialLang(): Lang {
  if (typeof window === 'undefined') return config.defaultLang
  const fromQuery = normalize(new URLSearchParams(window.location.search).get('lang'))
  if (fromQuery) return fromQuery
  try {
    const stored = normalize(localStorage.getItem(STORAGE_KEY))
    if (stored) return stored
  } catch {
    // приватный режим — просто игнорируем
  }
  return config.defaultLang
}

export function useLang() {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
    // Держим ?lang= в адресе актуальным, чтобы ссылку можно было переслать «как есть».
    const url = new URL(window.location.href)
    url.searchParams.set('lang', next)
    window.history.replaceState(null, '', url)
  }, [])

  useEffect(() => {
    document.documentElement.lang = dict[lang].htmlLang
    document.title = `${config.groom[lang]} & ${config.bride[lang]} — ${dict[lang].docTitle}`
  }, [lang])

  return { lang, setLang, t: dict[lang] as Dict, date: formatDate(lang) }
}

export type DateParts = ReturnType<typeof formatDate>
