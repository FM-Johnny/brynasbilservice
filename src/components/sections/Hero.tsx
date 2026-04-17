import { PhoneIcon } from '../icons/PhoneIcon'
import { CheckIcon } from '../icons/CheckIcon'
import { ClockIcon } from '../icons/ClockIcon'
import { MapPinIcon } from '../icons/MapPinIcon'
import { BoltIcon } from '../icons/BoltIcon'
import { DollarIcon } from '../icons/DollarIcon'
import mechImg from '../../assets/images/mech_inspects_brakes1.jpg'

export function Hero() {
  return (
    <section className="hero" id="hem">
      <div className="hero__bg" />

      {/* Red stripe */}
      <div className="hero__red-stripe">
        <div className="container">
          <div className="hero__info-bar">
            <InfoItem icon={<CheckIcon />} text="Alla bilmärken" />
            <InfoItem icon={<ClockIcon />} text="Tis–Fre 08–16" />
            <InfoItem icon={<MapPinIcon />} text="Utmarksvägen 21B, 802 91 Gävle" />
            <InfoItem icon={<BoltIcon />} text="Snabb service" />
            <InfoItem icon={<DollarIcon />} text="Konkurrenskraftiga priser" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="hero__content">
        <div className="container">
          <div className="hero__inner">
            <div className="hero__text">
              <div className="hero__eyebrow">
                Din bilverkstad i Brynäs, Gävle
              </div>
              <h1 className="hero__title">
                Din bil
                <span className="line-gold">Förtjänar</span>
                det bästa
              </h1>
              <p className="hero__subtitle">
                Brynäs Bilservice är din lokala, oberoende verkstad i Gävle. Vi utför all typ av service och reparation — för alla bilmärken, till konkurrenskraftiga priser.
              </p>
              <div className="hero__actions">
                <a href="tel:0705533395" className="btn btn--primary">
                  <PhoneIcon className="w-4 h-4" />
                  Ring oss nu
                </a>
                <a href="#kontakt" className="btn btn--outline">Boka tid</a>
              </div>
            </div>

            <div className="hero__image-right">
              <img
                src={mechImg}
                alt="Mekaniker kontrollerar bromsskiva"
                width={467}
                height={700}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="hero__info-item">
      {icon}
      <span>{text}</span>
    </div>
  )
}
