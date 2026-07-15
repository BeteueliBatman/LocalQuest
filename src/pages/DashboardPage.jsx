import { Award, CheckCircle2, Compass, PlusCircle, Target } from 'lucide-react'
import { useMemo } from 'react'
import Button from '../components/Button'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import QuestGrid from '../components/QuestGrid'
import { normalizeQuestList } from '../data/quests'
import useAuth from '../hooks/useAuth'
import useFetch from '../hooks/useFetch'
import { QUESTS_URL } from '../services/api'
import useQuestStore from '../store/useQuestStore'

const DashboardPage = () => {
  const { user } = useAuth()
  const { data, loading, error, refetch } = useFetch(QUESTS_URL)
  const joinedQuestIds = useQuestStore((state) => state.joinedQuestIds)
  const completedQuestIds = useQuestStore((state) => state.completedQuestIds)
  const createdQuests = useQuestStore((state) => state.createdQuests)

  const allQuests = useMemo(
    () => [...createdQuests, ...normalizeQuestList(data?.todos)],
    [createdQuests, data],
  )
  const joinedQuests = allQuests.filter((quest) =>
    joinedQuestIds.includes(String(quest.id)),
  )
  const completedQuests = joinedQuests.filter((quest) =>
    completedQuestIds.includes(String(quest.id)),
  )
  const points = completedQuests.reduce(
    (total, quest) => total + quest.points,
    0,
  )
  const progress = joinedQuests.length
    ? Math.round((completedQuests.length / joinedQuests.length) * 100)
    : 0

  return (
    <>
      <section className="dashboard-hero">
        <div className="container dashboard-heading">
          <div>
            <span className="eyebrow">Personal dashboard</span>
            <h1>Hi, {user.firstName}. Ready for a new quest?</h1>
            <p>Keep your plans, progress and points in one simple place.</p>
          </div>
          <Button to="/quests">Find a quest</Button>
        </div>
      </section>

      <section className="dashboard-content">
        <div className="container">
          <div className="dashboard-stats">
            <article>
              <span className="stat-icon">
                <Compass aria-hidden="true" />
              </span>
              <div>
                <strong>{joinedQuests.length}</strong>
                <span>Joined quests</span>
              </div>
            </article>
            <article>
              <span className="stat-icon">
                <CheckCircle2 aria-hidden="true" />
              </span>
              <div>
                <strong>{completedQuests.length}</strong>
                <span>Completed</span>
              </div>
            </article>
            <article>
              <span className="stat-icon">
                <Award aria-hidden="true" />
              </span>
              <div>
                <strong>{points}</strong>
                <span>Total points</span>
              </div>
            </article>
          </div>

          <div className="progress-card">
            <div>
              <span className="stat-icon">
                <Target aria-hidden="true" />
              </span>
              <div>
                <h2>Your progress</h2>
                <p>{progress}% of joined quests completed</p>
              </div>
            </div>
            <div
              className="progress-track"
              aria-label={`${progress}% completed`}
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={progress}
            >
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="dashboard-section-heading">
            <div>
              <span className="eyebrow">Your list</span>
              <h2>Joined quests</h2>
            </div>
            <Button to="/create-quest" variant="outline">
              <PlusCircle size={17} aria-hidden="true" /> Add quest
            </Button>
          </div>

          {loading && <LoadingState />}
          {error && !createdQuests.length && (
            <ErrorState message={error} onRetry={refetch} />
          )}
          {!loading && (!error || createdQuests.length > 0) && (
            <QuestGrid
              quests={joinedQuests}
              completedQuestIds={completedQuestIds}
              emptyTitle="No joined quests yet"
              emptyText="Explore the quest list and add your first adventure."
            />
          )}
        </div>
      </section>
    </>
  )
}

export default DashboardPage
