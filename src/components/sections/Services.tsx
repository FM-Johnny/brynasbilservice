import mechBrakes2 from '../../assets/images/mech_inspects_brakes2.jpg'
import tiresOnShelves from '../../assets/images/workshop_with_tires_on_shelves.jpg'
import serviceTiles from '../../assets/images/service_tiles.jpg'
import trailerWinter from '../../assets/images/trailer_in_winter.jpg'

const cards = [
  {
    img: mechBrakes2,
    alt: 'Mekaniker inspekterar bromsar och hjulupphängning',
    w: 597, h: 800,
    icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>,
    title: 'Bilservice & Reparationer',
    desc: 'Oljebyte, bromsar, koppling, kamrem, avgassystem och mycket mer. Vi arbetar med alla bilmärken och följer tillverkarens rekommendationer.',
    linkText: 'Boka tid',
    linkHref: 'tel:0705533395',
  },
  {
    img: tiresOnShelves,
    alt: 'Däckverkstad med däck på hyllor',
    w: 900, h: 674,
    icon: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></>,
    title: 'Däckservice & Däckhotell',
    desc: 'Däckbyte, montering, balansering och hjulinställning. Vi erbjuder även däckhotell — vi förvarar dina däck säkert och tvättar dem inför säsongsskiftet.',
    linkText: 'Boka tid',
    linkHref: 'tel:0705533395',
  },
  {
    img: serviceTiles,
    alt: '',
    w: 900, h: 502,
    icon: <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></>,
    title: 'Felsökning & Diagnostik',
    desc: 'Modern diagnostikutrustning för alla bilmärken. Vi läser av felkoder, analyserar elektronik och identifierar problem snabbt och säkert.',
    linkText: 'Boka tid',
    linkHref: 'tel:0705533395',
  },
  {
    img: trailerWinter,
    alt: 'Husvagn och fordon till salu',
    w: 900, h: 600,
    icon: <><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="19" r="1" fill="currentColor"/><circle cx="20" cy="19" r="1" fill="currentColor"/></>,
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
          <div className="section-eyebrow">Vad vi erbjuder</div>
          <h2 className="section-title">Våra <span className="title-accent">tjänster</span></h2>
          <p className="section-desc">Vi utför alla typer av bilarbeten — från enkel service till komplexa motorreparationer. Alltid märkesoberoende, alltid ärliga priser.</p>
        </div>

        <div className="services__grid">
          {cards.map(c => (
            <article className="service-card fade-up" key={c.title}>
              <img src={c.img} alt={c.alt} width={c.w} height={c.h} loading="lazy" className="service-card__image" />
              <div className="service-card__body">
                <div className={`service-card__icon${c.isRedVariant ? ' border-[rgba(204,20,23,0.4)] bg-[rgba(204,20,23,0.08)] text-(--color-red)' : ''}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">{c.icon}</svg>
                </div>
                <h3 className="service-card__title">{c.title}</h3>
                <p className="service-card__desc">{c.desc}</p>
                <a href={c.linkHref} className={`service-card__link${c.isRedVariant ? ' text-(--color-red-light)!' : ''}`}>
                  {c.linkText}{' '}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
