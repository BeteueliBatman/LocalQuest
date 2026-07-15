export const ALL_REGIONS = 'All regions'
export const DEFAULT_CITY = 'Tbilisi'

export const regions = [
  {
    name: 'Tbilisi',
    cities: [{ name: 'Tbilisi', latitude: 41.7151, longitude: 44.8271 }],
  },
  {
    name: 'Adjara',
    cities: [
      { name: 'Batumi', latitude: 41.6168, longitude: 41.6367 },
      { name: 'Kobuleti', latitude: 41.82, longitude: 41.7753 },
    ],
  },
  {
    name: 'Imereti',
    cities: [{ name: 'Kutaisi', latitude: 42.2679, longitude: 42.6946 }],
  },
  {
    name: 'Kakheti',
    cities: [
      { name: 'Telavi', latitude: 41.9198, longitude: 45.4732 },
      { name: 'Sighnaghi', latitude: 41.6205, longitude: 45.9219 },
    ],
  },
  {
    name: 'Mtskheta-Mtianeti',
    cities: [{ name: 'Mtskheta', latitude: 41.8451, longitude: 44.7188 }],
  },
  {
    name: 'Shida Kartli',
    cities: [{ name: 'Gori', latitude: 41.9842, longitude: 44.1158 }],
  },
  {
    name: 'Samegrelo-Zemo Svaneti',
    cities: [
      { name: 'Zugdidi', latitude: 42.5088, longitude: 41.8709 },
      { name: 'Mestia', latitude: 43.0458, longitude: 42.7297 },
    ],
  },
  {
    name: 'Guria',
    cities: [{ name: 'Ozurgeti', latitude: 41.9244, longitude: 42.0068 }],
  },
  {
    name: 'Racha-Lechkhumi and Kvemo Svaneti',
    cities: [{ name: 'Ambrolauri', latitude: 42.5211, longitude: 43.1622 }],
  },
  {
    name: 'Samtskhe-Javakheti',
    cities: [{ name: 'Borjomi', latitude: 41.8414, longitude: 43.3845 }],
  },
  {
    name: 'Kvemo Kartli',
    cities: [{ name: 'Rustavi', latitude: 41.5495, longitude: 44.9932 }],
  },
]

export const getRegionNames = () => [
  ALL_REGIONS,
  ...regions.map(({ name }) => name),
]

export const getCitiesForRegion = (regionName) => {
  if (regionName === ALL_REGIONS) {
    return regions.flatMap(({ cities }) => cities)
  }

  return regions.find(({ name }) => name === regionName)?.cities || []
}

export const getCityByName = (cityName) =>
  regions.flatMap(({ cities }) => cities).find(({ name }) => name === cityName)
