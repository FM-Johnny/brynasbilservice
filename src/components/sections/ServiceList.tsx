const items = [
  { name: 'Bilservice & oljebyte' },
  { name: 'Bromsbyte & bromskontroll' },
  { name: 'Däckbyte & montering' },
  { name: 'Hjulinställning & balansering' },
  { name: 'AC-service & reparation' },
  { name: 'Motorservice & motorbyten' },
  { name: 'Felsökning & diagnostik' },
  { name: 'Kamremsbyten' },
  { name: 'Kopplingsbyten' },
  { name: 'Elarbete & elsystem' },
  { name: 'Avgassystem' },
  { name: 'Besiktning & förkontroll' },
  { name: 'Batteribyte & kontroll' },
  { name: 'Dragkroksmontage' },
  { name: 'Däckhotell — förvaring' },
  { name: 'Elbilsservice — alla märken', dotColor: 'var(--color-gold)' },
  { name: 'Högvoltssystem & diagnostik', dotColor: 'var(--color-gold)' },
  { name: 'Växellådsreparationer' },
  { name: 'Bilar till salu — begagnat', dotColor: 'var(--color-red)', borderColor: 'rgba(204,20,23,0.2)' },
]

export function ServiceList() {
  return (
    <section className="service-list-section" id="alla-tjanster">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">Komplett utbud</div>
          <h2 className="section-title">Allt vi <span className="title-accent">utför</span></h2>
        </div>
        <div className="service-list-grid">
          {items.map(item => (
            <div
              className="service-item fade-up"
              key={item.name}
              style={item.borderColor ? { borderColor: item.borderColor } : undefined}
            >
              <div
                className="service-item__dot"
                style={item.dotColor ? { background: item.dotColor } : undefined}
              />
              <span className="service-item__name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
