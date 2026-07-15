import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import LoadingState from './LoadingState'

const ProtectedRoute = ({ children }) => {
  const { user, token, authLoading } = useAuth()
  const location = useLocation()

  if (authLoading) {
    return <LoadingState text="Checking your session..." />
  }

  if (!user || !token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
