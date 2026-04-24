import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export async function getWeatherPOA() {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: 'Porto Alegre,BR',
      appid: API_KEY,
      units: 'metric',
      lang: 'pt_br',
    },
  })
  return response.data
}