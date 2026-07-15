import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import QuestCard from './QuestCard'

const quest = {
  id: '22',
  title: 'Take a hike at a local park',
  category: 'Outdoors',
  region: 'Samtskhe-Javakheti',
  city: 'Borjomi',
  location: 'Borjomi Central Park',
  duration: '2 hours',
  points: 220,
  image: '/images/park.jpg',
}

describe('QuestCard', () => {
  it('renders the quest information from props', () => {
    render(
      <MemoryRouter>
        <QuestCard quest={quest} />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: quest.title }),
    ).toBeInTheDocument()
    expect(screen.getByText('Borjomi')).toBeInTheDocument()
    expect(screen.getByText('220 points')).toBeInTheDocument()
  })

  it('shows a completed label when the quest is done', () => {
    render(
      <MemoryRouter>
        <QuestCard quest={quest} completed />
      </MemoryRouter>,
    )

    expect(screen.getByText('Completed')).toBeInTheDocument()
  })
})
