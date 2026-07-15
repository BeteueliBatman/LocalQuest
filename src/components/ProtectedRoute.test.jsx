import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from '../context/AuthProvider'
import ProtectedRoute from './ProtectedRoute'

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('redirects a guest to the login page', async () => {
    render(
      <MemoryRouter initialEntries={['/private']}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<h1>Login page</h1>} />
            <Route
              path="/private"
              element={
                <ProtectedRoute>
                  <h1>Private page</h1>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    )

    expect(
      await screen.findByRole('heading', { name: 'Login page' }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Private page')).not.toBeInTheDocument()
  })

  it('does not trust a saved user when the token is missing', async () => {
    localStorage.setItem(
      'localquest-user',
      JSON.stringify({ firstName: 'Saved user' }),
    )

    render(
      <MemoryRouter initialEntries={['/private']}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<h1>Login page</h1>} />
            <Route
              path="/private"
              element={
                <ProtectedRoute>
                  <h1>Private page</h1>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    )

    expect(
      await screen.findByRole('heading', { name: 'Login page' }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Private page')).not.toBeInTheDocument()
  })
})
