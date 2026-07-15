export const getWeatherText = (code) => {
  if (code === 0) return 'Clear sky'
  if ([1, 2, 3].includes(code)) return 'Partly cloudy'
  if ([45, 48].includes(code)) return 'Foggy'
  if (code >= 51 && code <= 67) return 'Light rain'
  if (code >= 71 && code <= 77) return 'Snowy'
  if (code >= 80 && code <= 82) return 'Rain showers'
  if (code >= 95) return 'Thunderstorm'
  return 'Changing weather'
}
