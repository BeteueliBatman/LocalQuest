import { MapPinned } from 'lucide-react'
import Button from '../components/Button'

const NotFoundPage = () => (
  <section className="not-found">
    <MapPinned size={58} aria-hidden="true" />
    <span className="eyebrow">404 error</span>
    <h1>This path is not on our map.</h1>
    <p>The page may have moved, or this adventure does not exist yet.</p>
    <Button to="/">Go home</Button>
  </section>
)

export default NotFoundPage
