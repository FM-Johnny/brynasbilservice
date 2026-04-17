export function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="container">
        <div className="cta-banner__inner">
          <h2 className="cta-banner__title">Redo att boka <span className="title-accent">service?</span></h2>
          <p className="cta-banner__desc">Ring oss direkt på 070-553 33 95 — vi svarar vardagar 08–16 och hittar en tid som passar dig.</p>
          <div className="cta-banner__actions">
            <a href="tel:0705533395" className="btn btn--primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.36h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.04z"/></svg>
              070-553 33 95
            </a>
            <a href="https://www.facebook.com/p/Bryn%C3%A4s-Bilservice-AB-100076623266130/" target="_blank" rel="noopener noreferrer" className="btn btn--outline">Hitta oss på Facebook</a>
          </div>
        </div>
      </div>
    </section>
  )
}
