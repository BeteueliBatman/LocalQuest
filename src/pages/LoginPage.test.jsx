import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AuthProvider from '../context/AuthProvider'
import LoginPage from './LoginPage'

describe('LoginPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows validation messages for an empty form', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'Log in' }))

    expect(await screen.findByText('Username is required.')).toBeInTheDocument()
    expect(screen.getByText('Password is required.')).toBeInTheDocument()
  })
})
