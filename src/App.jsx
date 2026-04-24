import { useEffect, useState } from 'react'
import { getWeatherPOA } from './api/weather'
import './App.css'

function getEmoji(main) {
  const map = {
    Clear: '☀️', Clouds: '⛅', Rain: '🌧️',
    Drizzle: '🌦️', Thunderstorm: '⛈️', Snow: '❄️',
    Mist: '🌫️', Fog: '🌫️',
  }
  return map[main] || '🌡️'
}

function formatTime(unix) {
  return new Date(unix * 1000).toLocaleTimeString('pt-BR', {
    hour: '2-digit', minute: '2-digit',
  })
}

function formatDate() {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
}

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  function fetchWeather() {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await getWeatherPOA()
        if (!cancelled) {
          setWeather(data)
          setLastUpdate(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
        }
      } catch (err) {
        if (!cancelled) setError('Não foi possível carregar o clima.')
        console.error(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }

  useEffect(() => {
    const cancel = fetchWeather()
    return cancel
  }, [])

  return (
    <div className="page">
      <div className="card">
        <div className="overlay" />

        <div className="content">
          {loading && (
            <div className="loading-state">
              <div className="spinner" />
              <p>Carregando dados...</p>
            </div>
          )}

          {error && !loading && (
            <div className="error-state">
              <p>{error}</p>
              <button onClick={fetchWeather}>Tentar novamente</button>
            </div>
          )}

          {weather && !loading && (
            <>
              <header className="header">
                <div>
                  <p className="city">Porto Alegre, RS</p>
                  <p className="date">{formatDate()}</p>
                </div>
                <span className="badge">Ao vivo</span>
              </header>

              <section className="main-temp">
                <div>
                  <div className="temp">
                    {Math.round(weather.main.temp)}<sup>°C</sup>
                  </div>
                  <div className="condition">{weather.weather[0].description}</div>
                </div>
                <div className="weather-icon">{getEmoji(weather.weather[0].main)}</div>
              </section>

              <hr className="divider" />

              <div className="stats-grid">
                <div className="stat">
                  <span className="stat-label">Umidade</span>
                  <span className="stat-value">{weather.main.humidity}%</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Vento</span>
                  <span className="stat-value">{Math.round(weather.wind.speed * 3.6)} km/h</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Sensação</span>
                  <span className="stat-value">{Math.round(weather.main.feels_like)}°C</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Mínima</span>
                  <span className="stat-value">{Math.round(weather.main.temp_min)}°C</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Máxima</span>
                  <span className="stat-value">{Math.round(weather.main.temp_max)}°C</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Visib.</span>
                  <span className="stat-value">{(weather.visibility / 1000).toFixed(1)} km</span>
                </div>
              </div>

              <div className="sun-row">
                <div className="sun-item">
                  <span className="sun-icon">🌅</span>
                  <div>
                    <span className="sun-label">Nascer</span>
                    <span className="sun-time">{formatTime(weather.sys.sunrise)}</span>
                  </div>
                </div>
                <div className="sun-item">
                  <span className="sun-icon">🌇</span>
                  <div>
                    <span className="sun-label">Pôr do sol</span>
                    <span className="sun-time">{formatTime(weather.sys.sunset)}</span>
                  </div>
                </div>
              </div>

              <footer className="footer">
                <span className="footer-txt">Atualizado às {lastUpdate}</span>
                <button onClick={fetchWeather}>Atualizar</button>
              </footer>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App