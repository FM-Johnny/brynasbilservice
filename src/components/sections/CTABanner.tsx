import { PhoneIcon } from '../icons/PhoneIcon'

export function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="container">
        <div className="cta-banner__inner">
          <h2 className="cta-banner__title">Redo att boka <span className="title-accent">service?</span></h2>
          <p className="cta-banner__desc">Ring oss direkt på 070-553 33 95 — vi svarar vardagar 08–16 och hittar en tid som passar dig.</p>
          <div className="cta-banner__actions">
            <a href="tel:0705533395" className="btn btn--primary">
              <PhoneIcon className="h-4 w-4" />
              070-553 33 95
            </a>
            <a href="https://www.facebook.com/p/Bryn%C3%A4s-Bilservice-AB-100076623266130/" target="_blank" rel="noopener noreferrer" className="btn btn--outline">Hitta oss på Facebook</a>
          </div>
        </div>
      </div>
    </section>
  )
}
