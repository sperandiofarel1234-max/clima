import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

vi.mock('./api/weather', () => ({
  getWeatherPOA: vi.fn().mockResolvedValue({
    weather: [{ main: 'Clear', description: 'céu limpo' }],
    main: { temp: 25, feels_like: 24, humidity: 60, temp_min: 18, temp_max: 28 },
    wind: { speed: 3 },
    visibility: 10000,
    sys: { sunrise: 1700000000, sunset: 1700043600 },
  }),
}))

describe('Weather POA', () => {
  it('renderiza o título com Porto Alegre', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText(/Porto Alegre/i)).toBeInTheDocument()
    })
  })

  it('exibe o badge Ao vivo', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText(/Ao vivo/i)).toBeInTheDocument()
    })
  })
})