import { Compass } from 'lucide-react'
import QuestCard from './QuestCard'

const QuestGrid = ({
  quests,
  completedQuestIds = [],
  emptyTitle = 'No quests found',
  emptyText = 'Try a different search word or filter.',
}) => {
  if (!quests.length) {
    return (
      <div className="empty-state">
        <Compass size={36} aria-hidden="true" />
        <h3>{emptyTitle}</h3>
        <p>{emptyText}</p>
      </div>
    )
  }

  return (
    <div className="quest-grid">
      {quests.map((quest) => (
        <QuestCard
          key={quest.id}
          quest={quest}
          completed={completedQuestIds.includes(String(quest.id))}
        />
      ))}
    </div>
  )
}

export default QuestGrid
