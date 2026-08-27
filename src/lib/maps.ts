import { config } from '../config'

const { lat, lng } = config.coords

/**
 * 2ГИС: маршрут «откуда угодно → площадка».
 * Пустая первая точка перед `|` = «от моего местоположения».
 */
export const dgisUrl =
  config.mapLinks.dgis ||
  `https://2gis.kg/bishkek/directions/points/%7C${lng}%2C${lat}`

export const googleUrl =
  config.mapLinks.google ||
  `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`
