import { Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-grid">
      <div>
        <Link className="brand brand--footer" to="/">
          <span className="brand__icon">
            <Compass size={20} aria-hidden="true" />
          </span>
          LocalQuest
        </Link>
        <p>Small challenges. Better days. More of Georgia to discover.</p>
      </div>

      <div className="footer-links">
        <Link to="/quests">Explore quests</Link>
        <Link to="/my-quests">My progress</Link>
        <Link to="/create-quest">Add a quest</Link>
      </div>

      <div className="footer-credit">
        <p>
          Weather data by{' '}
          <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
            Open-Meteo.com
          </a>
        </p>
        <p>
          Photography from{' '}
          <a href="https://unsplash.com/" target="_blank" rel="noreferrer">
            Unsplash
          </a>
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
