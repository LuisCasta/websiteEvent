import "./styles/footer.css";
import Header from "./Header";

const Footer = () => {
  return (
    <footer className="footer">
      <Header />
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
          <h2>
            CONVENCIÓN <br /> GWM FINANCE 2025
          </h2>
          <p>ACELERANDO OPORTUNIDADES</p>
          <div className="social-media">
            <i className="bx bxl-facebook-circle"></i>
            <i className="bx bxl-instagram"></i>
            <i className="bx bxl-youtube"></i>
            <i className="bx bxl-linkedin-square"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
