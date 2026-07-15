import { CircleAlert } from 'lucide-react'
import Button from './Button'

const ErrorState = ({ message, onRetry }) => (
  <div className="error-state" role="alert">
    <CircleAlert size={32} aria-hidden="true" />
    <h3>We could not load this part</h3>
    <p>{message}</p>
    {onRetry && <Button onClick={onRetry}>Try again</Button>}
  </div>
)

export default ErrorState
