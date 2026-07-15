import { ArrowUpRight, Clock3, MapPin, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const QuestCard = ({ quest, completed = false }) => (
  <article className="quest-card">
    <Link className="quest-card__image-link" to={`/quests/${quest.id}`}>
      <img
        className="quest-card__image"
        src={quest.image}
        alt={`${quest.title} quest`}
        loading="lazy"
      />
      <span className="quest-card__category">{quest.category}</span>
      {completed && <span className="quest-card__done">Completed</span>}
    </Link>

    <div className="quest-card__content">
      <div className="quest-card__meta">
        <span>
          <MapPin size={15} aria-hidden="true" />
          {quest.city}
        </span>
        <span>
          <Clock3 size={15} aria-hidden="true" />
          {quest.duration}
        </span>
      </div>

      <h3>
        <Link to={`/quests/${quest.id}`}>{quest.title}</Link>
      </h3>

      <div className="quest-card__footer">
        <span className="points">
          <Sparkles size={16} aria-hidden="true" />
          {quest.points} points
        </span>
        <Link
          className="round-link"
          to={`/quests/${quest.id}`}
          aria-label={`View ${quest.title}`}
        >
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </div>
  </article>
)

export default QuestCard
