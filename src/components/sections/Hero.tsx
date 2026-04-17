import { PhoneIcon } from '../icons/PhoneIcon'
import { CheckIcon } from '../icons/CheckIcon'
import { ClockIcon } from '../icons/ClockIcon'
import { MapPinIcon } from '../icons/MapPinIcon'
import { BoltIcon } from '../icons/BoltIcon'
import { DollarIcon } from '../icons/DollarIcon'
import mechImg from '../../assets/images/mech_inspects_brakes1.jpg'

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden" id="hem">
      <div className="hero-bg" />

      {/* Red stripe */}
      <div className="absolute bottom-0 left-0 right-0 z-2 bg-brand-red">
        <div className="container">
          <div className="flex items-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <InfoItem icon={<CheckIcon className="w-[13px] h-[13px] text-brand-gold shrink-0" />} text="Alla bilmärken" />
            <InfoItem icon={<ClockIcon className="w-[13px] h-[13px] text-brand-gold shrink-0" />} text="Tis–Fre 08–16" />
            <InfoItem icon={<MapPinIcon className="w-[13px] h-[13px] text-brand-gold shrink-0" />} text="Utmarksvägen 21B, 802 91 Gävle" />
            <InfoItem icon={<BoltIcon className="w-[13px] h-[13px] text-brand-gold shrink-0" />} text="Snabb service" />
            <InfoItem icon={<DollarIcon className="w-[13px] h-[13px] text-brand-gold shrink-0" />} text="Konkurrenskraftiga priser" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-1 w-full pt-[100px]">
        <div className="container">
          <div className="hero-grid grid grid-cols-[1fr_1fr] gap-12 items-center min-h-[calc(100svh-100px)] py-12">
            <div className="max-w-[560px]">
              <div className="inline-flex items-center gap-2 font-heading font-semibold text-[0.8rem] tracking-[0.25em] uppercase text-brand-gold-light mb-6 before:block before:w-8 before:h-[2px] before:bg-gradient-to-r before:from-brand-red before:to-brand-gold">
                Din bilverkstad i Brynäs, Gävle
              </div>
              <h1 className="hero-title-resp font-heading font-[800] text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] uppercase mb-6">
                Din bil
                <span className="text-brand-gold block">Förtjänar</span>
                det bästa
              </h1>
              <p className="text-[1.1rem] text-brand-muted leading-[1.6] max-w-[480px] mb-8">
                Brynäs Bilservice är din lokala, oberoende verkstad i Gävle. Vi utför all typ av service och reparation — för alla bilmärken, till konkurrenskraftiga priser.
              </p>
              <div className="hero-actions flex items-center gap-4 flex-wrap">
                <a href="tel:0705533395" className="btn btn--primary">
                  <PhoneIcon className="w-4 h-4" />
                  Ring oss nu
                </a>
                <a href="#kontakt" className="btn btn--outline">Boka tid</a>
              </div>
            </div>

            <div className="hero-image-right relative flex items-center justify-center">
              <img
                src={mechImg}
                alt="Mekaniker kontrollerar bromsskiva"
                width={467}
                height={700}
                className="w-full h-full max-h-[600px] object-cover object-[center_top] rounded-lg block"
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
    <div className="flex items-center gap-[7px] px-[18px] py-[10px] border-r border-white/18 whitespace-nowrap shrink-0 last:border-r-0">
      {icon}
      <span className="font-heading font-semibold text-[0.75rem] tracking-[0.05em] uppercase text-white">{text}</span>
    </div>
  )
}
