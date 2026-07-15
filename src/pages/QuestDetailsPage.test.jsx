import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from '../context/AuthProvider'
import QuestDetailsPage from './QuestDetailsPage'

describe('QuestDetailsPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows the not-found state for a missing quest', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Todo with id 999 was not found' }),
    })

    render(
      <MemoryRouter initialEntries={['/quests/999']}>
        <AuthProvider>
          <Routes>
            <Route path="/quests/:questId" element={<QuestDetailsPage />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    )

    expect(
      await screen.findByRole('heading', { name: 'Quest not found' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Back to quests' }),
    ).toHaveAttribute('href', '/quests')
  })
})
