import "./styles/footer.css";
import social from "./assets/social.svg";
import Slogan from "./assets/Slogan.png";
import FooterNav from "./FooterNav";

const Footer = () => {
  return (
    <footer className="footer">
      <FooterNav />
      <div className="container-footer">
        <div className="advices">
          <div className="container-info">
            <div className="container-legal">
              <p className="legal-advices">Aviso legal</p>
              <p className="legal-advices">Avisos de privacidad</p>
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
            <img src={social} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
