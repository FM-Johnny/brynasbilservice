import logo2 from '../../assets/images/logo2.jpg'
import { FacebookIcon } from '../icons/FacebookIcon'

export function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="container">
        <div className="footer-inner">

          <div className="footer-brand">
            <a href="#" className="logo" aria-label="Brynäs Bilservice">
              <img src={logo2} alt="Brynäs Bilservice logotyp" width="80" height="76" className="logo__img" loading="lazy" />
            </a>
            <p className="footer-desc">
              Din lokala bilverkstad i Brynäs, Gävle. Vi erbjuder professionell bilservice, reparationer och däckservice för alla bilmärken.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/p/Brynäs-Bilservice-AB-100076623266130/" target="_blank" rel="noopener noreferrer" aria-label="Följ oss på Facebook">
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="footer-col-title">Tjänster</h3>
            <ul className="footer-links">
              <li><a href="#tjanster">Bilservice</a></li>
              <li><a href="#tjanster">Däckservice</a></li>
              <li><a href="#tjanster">AC-service</a></li>
              <li><a href="#tjanster">Bromsbyte</a></li>
              <li><a href="#tjanster">Felsökning</a></li>
              <li><a href="#tjanster">Bilhandel</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-col-title">Kontakt</h3>
            <ul className="footer-links">
              <li><a href="tel:0705533395">070-553 33 95</a></li>
              <li><a href="mailto:info@brynasbilservice.se">info@brynasbilservice.se</a></li>
              <li><a href="https://maps.google.com/?q=Utmarksvägen+21B+Gävle" target="_blank" rel="noopener noreferrer">Utmarksvägen 21B, Gävle</a></li>
            </ul>
            <br />
            <h3 className="footer-col-title">Öppettider</h3>
            <ul className="footer-links">
              <li>Mån–Fre: 08:00–16:00</li>
              <li>Lördag: Förfrågan</li>
              <li>Söndag: Stängt</li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2025 Brynäs Bilservice AB — Org.nr 559343-5307 — Gävle</p>
          <p className="footer-copy">Utmarksvägen 21B, 802 91 Gävle</p>
        </div>
      </div>
    </footer>
  )
}
