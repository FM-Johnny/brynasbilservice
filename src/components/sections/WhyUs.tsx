const cards = [
  {
    icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    title: 'Personlig service',
    desc: 'Du möter alltid samma mekaniker. Ingen nummerlapp, ingen callcenter — bara en ärlig person som bryr sig om din bil.',
  },
  {
    icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    title: 'Snabb service',
    desc: 'Vi vet att du behöver din bil. Vi eftersträvar att utföra arbetet samma dag eller dagen efter — utan lång väntetid.',
  },
  {
    icon: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    title: 'Schyssta priser',
    desc: 'Utan kedjemarginaler och stora overheadkostnader kan vi erbjuda konkurrenskraftiga priser. Du betalar för arbetet — inget annat.',
  },
  {
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    title: 'Ärlighet först',
    desc: 'Vi utför aldrig arbete utan att ha pratat med dig först. Inget görs "för säkerhets skull" om det inte behövs.',
  },
]

export function WhyUs() {
  return (
    <section className="why-us">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">Varför Brynäs Bilservice</div>
          <h2 className="section-title">Det lilla extra som <span className="title-accent">gör skillnad</span></h2>
        </div>
        <div className="why-grid">
          {cards.map(c => (
            <div className="why-card fade-up" key={c.title}>
              <div className="why-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">{c.icon}</svg>
              </div>
              <h3 className="why-card__title">{c.title}</h3>
              <p className="why-card__desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
