import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import CreateQuestPage from './pages/CreateQuestPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import QuestDetailsPage from './pages/QuestDetailsPage'
import QuestsPage from './pages/QuestsPage'

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="quests" element={<QuestsPage />} />
      <Route path="quests/:questId" element={<QuestDetailsPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route
        path="my-quests"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="create-quest"
        element={
          <ProtectedRoute>
            <CreateQuestPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
)

export default App
