const InformConfirm = () => {
  return (
    <div className="confirm-section">
      <div className="container-setion">
        <div className="confirm-text">
          <h3>
            Asiste a la <br /> PRIMERA CONVENCIÓN <br /> GWM FINANCE 2025,{" "}
            <br /> en alianza con BBVA
          </h3>
          <p>
            Estás a punto de ser parte de la gran experiencia, estamos muy
            emocionados por tu participación.
          </p>
          <button className="confirm-btn">CONFIRMAR ASISTENCIA</button>
        </div>
        <div className="pasos-confirm">
          <h3>
            Sigue los siguientes pasos <br /> para registrarte:
          </h3>
          <ul className="ul-confirm">
            <li>
              <p>Revisa la información general del evento.</p> <span>1</span>
            </li>
            <li>
              <p>Revisa las fechas de vuelos disponibles.</p> <span>2</span>
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
                da clic en CONFIRMAR ASISTENCIA y regístrala.
              </p>
              <span>4</span>
            </li>
            <li>
              <p>¡Listo! Te esperamos en la CONVENCIÓN GWM FINANCE</p>
              <span>5</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InformConfirm;
