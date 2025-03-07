import "./styles/footer.css";
import fb from "./assets/fb.svg";
import ig from "./assets/ig.svg";
import ins from "./assets/in.svg";
import x from "./assets/x.svg";
import yt from "./assets/youtube.svg";

const Footer = () => {
  return (
    <footer className="footer">
      {/* <FooterNav /> */}
      <div className="container-footer">
        <div className="advices">
          <div className="container-info">
            <div className="container-legal">
              <a className="legal-advices">Aviso legal</a>
              <a
                target="_blank"
                href="https://drive.google.com/file/d/1PWeYHJG8RF54NTkJBpACyR2n_lzdoOVB/view?usp=sharing"
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
          <div className="message-footer">
            <h6 style={{ color: "#7cc9ca", fontSize: "1rem" }}>
              Creando oportunidades
            </h6>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
