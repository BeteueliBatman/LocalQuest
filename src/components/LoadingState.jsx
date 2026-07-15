const LoadingState = ({ text = 'Loading quests...' }) => (
  <div className="loading-state" role="status">
    <span className="loading-state__spinner" aria-hidden="true" />
    <p>{text}</p>
  </div>
)

export default LoadingState
