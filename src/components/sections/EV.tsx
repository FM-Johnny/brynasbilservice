const brands = [
  { name: 'Aiways' },
  { name: 'Exlantix', special: true },
  { name: 'BYD' },
  { name: 'Tesla' },
  { name: 'Polestar' },
  { name: 'Xpeng' },
  { name: 'Nio' },
  { name: 'ZEEKR' },
  { name: 'MG' },
  { name: 'Hongqi' },
  { name: 'MAXUS' },
  { name: 'DFSK' },
  { name: 'Fisker' },
  { name: '+ Alla märken', more: true },
]

export function EV() {
  return (
    <section className="ev-section" id="elbilar">
      <div className="container">
        <div className="ev-inner">
          <div className="ev-text">
            <div className="section-eyebrow" style={{ justifyContent: 'flex-start' }}>
              <span style={{ display: 'block', width: 24, height: 1, background: 'linear-gradient(90deg,var(--color-red),var(--color-gold))' }} />
              Framtidens bilar
              <span style={{ display: 'block', width: 24, height: 1, background: 'linear-gradient(90deg,var(--color-gold),var(--color-red))' }} />
            </div>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Specialister på <span className="title-accent">elbilar</span></h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
              Vi är en av Gävleborgs få verkstäder med kompetens att serva nya kinesiska elbilsmärken som saknar auktoriserade verkstäder i Sverige. Våra mekaniker är utbildade att hantera högvoltssystem och moderna diagnostiksystem.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: 'var(--space-8)' }}>
              Vi samarbetar med <strong style={{ color: 'var(--color-white)' }}>Däckleader</strong> och <strong style={{ color: 'var(--color-white)' }}>Autobutler</strong> — beställ däck online och välj oss som monteringsstation, eller jämför priser via Autobutler.
            </p>
            <a href="tel:0705533395" className="btn btn--primary">Ring för offert</a>
          </div>
          <div className="ev-brands">
            <div className="ev-brands__label">Vi servar bl.a.</div>
            <div className="ev-brands__grid">
              {brands.map(b => (
                <span
                  key={b.name}
                  className={`ev-brand${b.special ? ' ev-brand--special' : ''}${b.more ? ' ev-brand--more' : ''}`}
                >
                  {b.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
