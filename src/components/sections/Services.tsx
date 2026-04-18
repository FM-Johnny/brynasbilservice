import mechBrakes2 from '../../assets/images/mech_inspects_brakes2.jpg'
import tiresOnShelves from '../../assets/images/workshop_with_tires_on_shelves.jpg'
import serviceTiles from '../../assets/images/service_tiles.jpg'
import trailerWinter from '../../assets/images/trailer_in_winter.jpg'
import { ArrowRightIcon } from '../icons/ArrowRightIcon'
import { CarSaleIcon } from '../icons/CarSaleIcon'
import { MonitorIcon } from '../icons/MonitorIcon'
import { TireIcon } from '../icons/TireIcon'
import { WrenchIcon } from '../icons/WrenchIcon'
import { SectionHeader } from '../ui/SectionHeader'

const cards = [
  {
    img: mechBrakes2,
    alt: 'Mekaniker inspekterar bromsar och hjulupphängning',
    w: 597, h: 800,
    icon: <WrenchIcon />,
    title: 'Bilservice & Reparationer',
    desc: 'Oljebyte, bromsar, koppling, kamrem, avgassystem och mycket mer. Vi arbetar med alla bilmärken och följer tillverkarens rekommendationer.',
    linkText: 'Boka tid',
    linkHref: 'tel:0705533395',
  },
  {
    img: tiresOnShelves,
    alt: 'Däckverkstad med däck på hyllor',
    w: 900, h: 674,
    icon: <TireIcon />,
    title: 'Däckservice & Däckhotell',
    desc: 'Däckbyte, montering, balansering och hjulinställning. Vi erbjuder även däckhotell — vi förvarar dina däck säkert och tvättar dem inför säsongsskiftet.',
    linkText: 'Boka tid',
    linkHref: 'tel:0705533395',
  },
  {
    img: serviceTiles,
    alt: '',
    w: 900, h: 502,
    icon: <MonitorIcon />,
    title: 'Felsökning & Diagnostik',
    desc: 'Modern diagnostikutrustning för alla bilmärken. Vi läser av felkoder, analyserar elektronik och identifierar problem snabbt och säkert.',
    linkText: 'Boka tid',
    linkHref: 'tel:0705533395',
  },
  {
    img: trailerWinter,
    alt: 'Husvagn och fordon till salu',
    w: 900, h: 600,
    icon: <CarSaleIcon />,
    title: 'Bilar till salu',
    desc: 'Vi säljer kvalitetskontrollerade begagnade bilar. Varje bil har gåtts igenom av våra mekaniker — du vet vad du köper.',
    linkText: 'Se våra bilar',
    linkHref: '#kontakt',
    isRedVariant: true,
  },
]

export function Services() {
  return (
    <section className="services" id="tjanster">
      <div className="container">
        <div className="section-header">
          <SectionHeader
            eyebrow="Vad vi erbjuder"
            title={<span>Våra <span className="title-accent">tjänster</span></span>}
            description="Vi utför alla typer av bilarbeten — från enkel service till komplexa motorreparationer. Alltid märkesoberoende, alltid ärliga priser."
          />
        </div>

        <div className="services__grid">
          {cards.map(c => (
            <article className="service-card fade-up" key={c.title}>
              <img src={c.img} alt={c.alt} width={c.w} height={c.h} loading="lazy" className="service-card__image" />
              <div className="service-card__body">
                <div className={`service-card__icon${c.isRedVariant ? ' border-[rgba(204,20,23,0.4)] bg-[rgba(204,20,23,0.08)] text-(--color-red)' : ''}`}>
                  {c.icon}
                </div>
                <h3 className="service-card__title">{c.title}</h3>
                <p className="service-card__desc">{c.desc}</p>
                <a href={c.linkHref} className={`service-card__link${c.isRedVariant ? ' text-(--color-red-light)!' : ''}`}>
                  {c.linkText}{' '}
                  <ArrowRightIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
