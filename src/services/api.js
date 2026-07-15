const API_URL = 'https://dummyjson.com'

export const QUESTS_URL = `${API_URL}/todos?limit=30`
export const getQuestUrl = (id) => `${API_URL}/todos/${id}`

const readResponse = async (response) => {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong. Please try again.')
  }

  return data
}

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...credentials, expiresInMins: 60 }),
  })

  return readResponse(response)
}

export const getCurrentUser = async (token) => {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return readResponse(response)
}

export const createQuest = async (quest, userId) => {
  const response = await fetch(`${API_URL}/todos/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      todo: quest.title,
      completed: false,
      userId,
    }),
  })

  return readResponse(response)
}

export const getWeatherUrl = ({ latitude, longitude }) =>
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`
