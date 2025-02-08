import "../src/styles/infoconfirm.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InformConfirm = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const confirm = () => {
    navigate("/home?step=1", { replace: true });
  };
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="confirm-section">
      <div className="container-section">
        <div className="confirm-text">
          <h3>
            Asiste a la <br /> PRIMERA CONVENCIÓN <br /> GWM FINANCE 2025,{" "}
            <br /> en alianza con BBVA
          </h3>
          <p>
            Estás a punto de ser parte de la gran experiencia, estamos muy
            emocionados por tu participación.
          </p>
          <div className="container-btn-confirm">
            <button className="confirm-btn" disabled onClick={confirm}>
              CONFIRMAR ASISTENCIA
            </button>
            <span>
              Próximamente se habilitará esta sección para que puedas confirmar
              tu asistencia, te avisaremos vía e-mail.
            </span>
          </div>
        </div>
        {!isMobile ? (
          <div className="pasos-confirm">
            <h3>
              Sigue los siguientes pasos <br /> para registrarte:
            </h3>
            <ul className="ul-confirm">
              <li>
                <p>Revisa la información general del evento.</p> <span>1</span>
              </li>
              <li>
                <p>Revisa los horarios de vuelos disponibles.</p> <span>2</span>
              </li>
              <li>
                <p>
                  Compra tus vuelos. Pero antes de hacerlo por favor revisa el
                  documento con información importante que debes considerar
                  <br /> para la compra.
                </p>
                <span>3</span>
              </li>
              <li>
                <p>
                  Una vez que cuentes con la información de tus vuelos, <br />
                  da clic en <b>CONFIRMAR ASISTENCIA</b> y regístrala.
                </p>
                <span>4</span>
              </li>
              <li>
                <p>
                  ¡Listo! Te esperamos en la <b> CONVENCIÓN GWM FINANCE</b>
                </p>
                <span>5</span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="pasos-confirm">
            <h3>
              Sigue los siguientes pasos <br /> para registrarte:
            </h3>
            <ul className="ul-confirm">
              <li>
                <span>1</span>
                <p>Revisa la información general del evento.</p>
              </li>
              <li>
                <span>2</span>
                <p>Revisa los horarios de vuelos disponibles.</p>
              </li>
              <li>
                <span>3</span>
                <p>
                  Compra tus vuelos. Pero antes de hacerlo por favor revisa el
                  documento con información importante que debes considerar
                  <br /> para la compra.
                </p>
              </li>
              <li>
                <span>4</span>
                <p>
                  Una vez que cuentes con la información de tus vuelos, <br />
                  da clic en <b>CONFIRMAR ASISTENCIA</b> y regístrala.
                </p>
              </li>
              <li>
                <span>5</span>
                <p>
                  ¡Listo! Te esperamos en la <b> CONVENCIÓN GWM FINANCE</b>
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InformConfirm;
