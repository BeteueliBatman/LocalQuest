import { CloudSun, Thermometer, Wind } from 'lucide-react'
import { DEFAULT_CITY, getCityByName } from '../data/locations'
import useFetch from '../hooks/useFetch'
import { getWeatherUrl } from '../services/api'
import { getWeatherText } from '../utils/weather'

const WeatherCard = ({ compact = false, city = DEFAULT_CITY }) => {
  const selectedCity = getCityByName(city) || getCityByName(DEFAULT_CITY)
  const { data, loading, error, refetch } = useFetch(
    getWeatherUrl(selectedCity),
  )

  if (loading) {
    return (
      <div
        className={`weather-card weather-card--loading ${compact ? 'weather-card--compact' : ''}`}
      >
        Checking weather...
      </div>
    )
  }

  if (error) {
    return (
      <button
        className={`weather-card weather-card--error ${compact ? 'weather-card--compact' : ''}`}
        onClick={refetch}
      >
        Weather unavailable. Tap to retry.
      </button>
    )
  }

  const weather = data?.current

  if (!weather) return null

  return (
    <aside className={`weather-card ${compact ? 'weather-card--compact' : ''}`}>
      <div className="weather-card__top">
        <span>
          <CloudSun size={22} aria-hidden="true" />
          {selectedCity.name} now
        </span>
        <strong>{Math.round(weather.temperature_2m)}°C</strong>
      </div>
      <p>{getWeatherText(weather.weather_code)}</p>
      <div className="weather-card__details">
        <span>
          <Thermometer size={16} aria-hidden="true" />
          Feels {Math.round(weather.apparent_temperature)}°
        </span>
        <span>
          <Wind size={16} aria-hidden="true" />
          {Math.round(weather.wind_speed_10m)} km/h
        </span>
      </div>
    </aside>
  )
}

export default WeatherCard
