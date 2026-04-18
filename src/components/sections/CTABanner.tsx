import { PhoneIcon } from '../icons/PhoneIcon'
import { Button } from '../ui/Button'

export function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="container">
        <div className="cta-banner__inner">
          <h2 className="cta-banner__title">Redo att boka <span className="title-accent">service?</span></h2>
          <p className="cta-banner__desc">Ring oss direkt på 070-553 33 95 — vi svarar vardagar 08–16 och hittar en tid som passar dig.</p>
          <div className="cta-banner__actions">
            <Button href="tel:+4605533395" variant="primary">
              <PhoneIcon className="h-4 w-4" />
              070-553 33 95
            </Button>
            <Button href="https://www.facebook.com/p/Bryn%C3%A4s-Bilservice-AB-100076623266130/"  variant="outline">
              Hitta oss på Facebook
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
