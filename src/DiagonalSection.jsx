import "./styles/diagonalsection.css"; // Asegúrate de importar el CSS
import Contador from "./Contador";
import images from "../src/assets/images";
const DiagonalSection = () => {
  return (
    <>
      <div className="container-general">
        <div className="container-pasos">
          <div className="text-diagonal">
            <h2>Generales del Evento</h2>
            <p>Vive una experiencia única</p>
          </div>
        </div>

        <div className="info-container">
          <div className="info-general">
            <div className="date info">
              <img src={images.calendar} alt="" />
              <div className="text-date">
                <p className="small text-info-p">Del 10 al 12</p>
                <p className="middle text-info-p" style={{ fontWeight: "500" }}>
                  de marzo
                </p>
                <p className="lg text-info-p" style={{ fontWeight: "bolder" }}>
                  2025
                </p>
              </div>
            </div>
            <div className="locate info">
              <img src={images.locate} alt="" />
              <p className="text-info-p">
                Hotel Grand Velas, <br />
                Rivera Maya, México
              </p>
            </div>
            <div className="clock info">
              <img src={images.clock} alt="" />
              <p className="text-info-p">
                Horario de llegada: <br /> 13:00 hrs.
              </p>
            </div>
          </div>
          <div className="contador-container-home">
            <h2>FALTAN</h2>
            <Contador />
            <h4>
              PARA GENERAR OPORTUNIDADES CON GWM Y BBVA <br />
              ¡TE ESPERAMOS!
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiagonalSection;
