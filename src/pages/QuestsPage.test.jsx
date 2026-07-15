import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import useQuestStore from '../store/useQuestStore'
import QuestsPage from './QuestsPage'

const todos = [
  { id: 1, todo: 'Tbilisi quest', completed: false, userId: 1 },
  { id: 2, todo: 'Batumi quest', completed: false, userId: 1 },
]

describe('QuestsPage', () => {
  beforeEach(() => {
    localStorage.clear()
    useQuestStore.setState({
      joinedQuestIds: [],
      completedQuestIds: [],
      createdQuests: [],
    })
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ todos }),
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('filters quests using the region from the URL', async () => {
    render(
      <MemoryRouter initialEntries={['/quests?region=Adjara']}>
        <Routes>
          <Route path="/quests" element={<QuestsPage />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(
      await screen.findByRole('heading', {
        name: 'Find three hidden details in Old Batumi',
      }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', {
        name: 'Leave a kind note in your neighborhood',
      }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Region' })).toHaveValue(
      'Adjara',
    )
    expect(
      screen.queryByRole('combobox', { name: 'City' }),
    ).not.toBeInTheDocument()
  })
})
