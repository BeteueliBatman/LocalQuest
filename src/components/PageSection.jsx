const PageSection = ({ children, eyebrow, title, text, className = '' }) => (
  <section className={`page-section ${className}`.trim()}>
    <div className="container">
      {(eyebrow || title || text) && (
        <div className="section-heading">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {text && <p>{text}</p>}
        </div>
      )}
      {children}
    </div>
  </section>
)

export default PageSection
