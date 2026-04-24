import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

vi.mock('./api/weather', () => ({
  getWeatherPOA: vi.fn().mockResolvedValue({
    weather: [{ main: 'Clear', description: 'céu limpo' }],
    main: { temp: 25, feels_like: 24, humidity: 60, temp_min: 18, temp_max: 28 },
    wind: { speed: 3 },
    visibility: 10000,
  }),
}))

describe('Weather POA', () => {
  it('renderiza o título principal', () => {
    render(<App />)
    expect(screen.getByText(/Clima em Porto Alegre/i)).toBeInTheDocument()
  })

  it('exibe subtítulo com Rio Grande do Sul', () => {
    render(<App />)
    expect(screen.getByText(/Rio Grande do Sul/i)).toBeInTheDocument()
  })
})