import { useEffect, useRef } from 'react'

const days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag']
const hours = [
  ['Måndag', 'Stängt / Förfrågan'],
  ['Tisdag', '08:00–16:00'],
  ['Onsdag', '08:00–16:00'],
  ['Torsdag', '08:00–16:00'],
  ['Fredag', '08:00–16:00'],
  ['Lördag', 'Stängt / Förfrågan'],
  ['Söndag', 'Stängt'],
]

export function Contact() {
  const tableRef = useRef<HTMLTableSectionElement>(null)

  useEffect(() => {
    if (!tableRef.current) return
    const todayName = days[new Date().getDay()]
    const rows = tableRef.current.querySelectorAll('tr')
    rows.forEach(row => {
      const firstCell = row.querySelector('td')
      if (firstCell && firstCell.textContent === todayName) {
        row.classList.add('today')
      }
    })
  }, [])

  return (
    <section className="contact-section" id="kontakt">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">Hitta oss</div>
          <h2 className="section-title" id="oppettider">Kontakt &amp; <span className="title-accent">Öppettider</span></h2>
          <p className="section-desc">Vi finns i Brynäs, Gävle. Välkommen att ringa eller komma förbi!</p>
        </div>
        <div className="contact-grid">

          <div className="contact-card">
            <div className="contact-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <h3 className="contact-card__title">Hitta oss</h3>
            <div className="contact-card__content">
              <p>Utmarksvägen 21B</p>
              <p>802 91 Gävle</p>
              <p className="mt-2 text-[0.85rem] text-(--color-text-muted)">Brynäs industriområde</p>
              <br />
              <a href="https://maps.google.com/?q=Utmarksvägen+21B+Gävle" target="_blank" rel="noopener noreferrer">Öppna i Google Maps →</a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <h3 className="contact-card__title">Öppettider</h3>
            <div className="contact-card__content">
              <table className="hours-table" aria-label="Öppettider per dag">
                <tbody ref={tableRef}>
                  {hours.map(([day, time]) => (
                    <tr key={day}><td>{day}</td><td>{time}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.36h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.04z"/></svg>
            </div>
            <h3 className="contact-card__title">Ring oss</h3>
            <div className="contact-card__content">
              <p className="mb-2">Telefon:</p>
              <p className="mb-4"><a href="tel:0705533395" className="font-heading text-[1.2rem] font-bold">070-553 33 95</a></p>
              <p className="mb-4 text-[0.85rem] text-(--color-text-muted)">Vi svarar vardagar 08:00–16:00</p>
              <a href="https://www.facebook.com/p/Bryn%C3%A4s-Bilservice-AB-100076623266130/" target="_blank" rel="noopener noreferrer" className="text-[0.85rem] text-(--color-gold)">Följ oss på Facebook →</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
