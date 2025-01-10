import "./styles/footer.css";
import Slogan from "./assets/Slogan.png";
import FooterNav from "./FooterNav";
import fb from "./assets/fb.svg";
import ig from "./assets/ig.svg";
import ins from "./assets/in.svg";
import x from "./assets/x.svg";
import yt from "./assets/youtube.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <FooterNav />
      <div className="container-footer">
        <div className="advices">
          <div className="container-info">
            <div className="container-legal">
              <a
                target="_blank"
                href="https://www.bbva.mx/personas/aviso-legal.html"
                className="legal-advices"
              >
                Aviso legal
              </a>
              <a
                target="_blank"
                href="https://www.bbva.mx/personas/aviso-de-privacidad.html"
                className="legal-advices"
              >
                Avisos de privacidad
              </a>
            </div>
            <p className="address">
              © 2024 BBVA México, S.A., Institución de Banca Múltiple, Grupo
              Financiero BBVA México. Avenida Paseo de la Reforma 510, colonia
              Juárez <br /> código postal 06600, alcaldía Cuauhtémoc, Ciudad de
              México.
            </p>
          </div>
        </div>
        <div className="main-message-footer">
          <img className="slogan-footer" src={Slogan} alt="" />
          <div className="social-media">
            <a target="_blank" href="https://www.facebook.com/bbvaenmexico/?1">
              <img src={fb} alt="" />
            </a>
            <a target="_blank" href="https://x.com/BBVA_Mex/?1">
              <img src={x} alt="" />
            </a>
            <a target="_blank" href="https://www.instagram.com/bbva_mex/?1">
              <img src={ig} alt="" />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/bbva-mexico/"
            >
              <img src={ins} alt="" />
            </a>
            <a target="_blank" href="https://www.youtube.com/user/bbvabancomer">
              <img src={yt} alt="" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
