import { ArrowLeft, Check, Clock3, Gauge, MapPin, Sparkles } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import WeatherCard from '../components/WeatherCard'
import { normalizeQuest } from '../data/quests'
import useAuth from '../hooks/useAuth'
import useFetch from '../hooks/useFetch'
import { getQuestUrl } from '../services/api'
import useQuestStore from '../store/useQuestStore'

const QuestDetailsPage = () => {
  const { questId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const createdQuests = useQuestStore((state) => state.createdQuests)
  const joinedQuestIds = useQuestStore((state) => state.joinedQuestIds)
  const completedQuestIds = useQuestStore((state) => state.completedQuestIds)
  const joinQuest = useQuestStore((state) => state.joinQuest)
  const toggleQuestComplete = useQuestStore(
    (state) => state.toggleQuestComplete,
  )
  const createdQuest = createdQuests.find((quest) => quest.id === questId)
  const { data, loading, error, refetch } = useFetch(
    createdQuest ? null : getQuestUrl(questId),
  )
  const quest = createdQuest || (data ? normalizeQuest(data) : null)
  const joined = joinedQuestIds.includes(String(questId))
  const completed = completedQuestIds.includes(String(questId))
  const questNotFound = Boolean(error && /not found|404/i.test(error))

  const handleBack = () => {
    if (location.key === 'default') {
      navigate('/quests')
      return
    }

    navigate(-1)
  }

  const handleJoin = () => {
    if (!user) {
      navigate('/login', { state: { from: location } })
      return
    }

    joinQuest(questId)
  }

  if (loading) {
    return (
      <div className="container state-page">
        <LoadingState text="Loading quest details..." />
      </div>
    )
  }

  if (questNotFound || (!error && !quest)) {
    return (
      <div className="container state-page empty-state">
        <h1>Quest not found</h1>
        <p>This challenge is not part of our collection.</p>
        <Button to="/quests">Back to quests</Button>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container state-page">
        <ErrorState message={error} onRetry={refetch} />
      </div>
    )
  }

  return (
    <>
      <section className="details-hero">
        <img src={quest.image} alt="" />
        <span className="details-hero__overlay" />
        <div className="container details-hero__content">
          <div className="details-hero__top">
            <button className="back-button" type="button" onClick={handleBack}>
              <ArrowLeft size={18} aria-hidden="true" /> Back
            </button>
            <span className="hero-label">
              {quest.city} · {quest.category}
            </span>
          </div>
          <h1>{quest.title}</h1>
          <p>{quest.description}</p>
        </div>
      </section>

      <div className="container details-layout">
        <div className="details-main">
          {location.state?.message && (
            <div className="success-message" role="status">
              <Check size={20} aria-hidden="true" />
              {location.state.message}
            </div>
          )}

          <div className="quest-facts">
            <span>
              <MapPin aria-hidden="true" />
              <small>{quest.region}</small>
              <strong>{quest.location}</strong>
            </span>
            <span>
              <Clock3 aria-hidden="true" />
              <small>Time</small>
              <strong>{quest.duration}</strong>
            </span>
            <span>
              <Gauge aria-hidden="true" />
              <small>Difficulty</small>
              <strong>{quest.difficulty}</strong>
            </span>
            <span>
              <Sparkles aria-hidden="true" />
              <small>Reward</small>
              <strong>{quest.points} points</strong>
            </span>
          </div>

          <section className="details-copy">
            <span className="eyebrow">Quest guide</span>
            <h2>How to complete it</h2>
            <ol className="quest-steps">
              {quest.steps.map((step, index) => (
                <li key={step}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="details-sidebar">
          <div className="join-card">
            <span className="eyebrow">Ready when you are</span>
            <h2>
              {completed ? 'Quest completed!' : 'Make this your next plan'}
            </h2>
            <p>
              {joined
                ? 'This quest is in your list. Mark it complete when you finish.'
                : 'Join the quest to save it in your personal dashboard.'}
            </p>
            {!joined ? (
              <Button className="button--full" onClick={handleJoin}>
                Join this quest
              </Button>
            ) : (
              <Button
                className="button--full"
                variant={completed ? 'outline' : 'primary'}
                onClick={() => toggleQuestComplete(questId)}
              >
                {completed ? 'Mark as not completed' : 'Mark as completed'}
              </Button>
            )}
          </div>
          <WeatherCard city={quest.city} />
        </aside>
      </div>
    </>
  )
}

export default QuestDetailsPage
