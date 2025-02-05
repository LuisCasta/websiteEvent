import "../src/styles/transport.css";
import images from "../src/assets/images";
const Transport = () => {
  return (
    <>
      <div className="container-transport">
        <div className="content-transport">
          <h2>Transportación</h2>
          <p>
            Ponemos a tu servicio un transporte privado que te llevará desde el
            aeropuerto de Cancún <br /> hasta el hotel y el último día te
            llevará del hotel al aeropuerto.
            <br /> <br />
            Considera que para el día de llegadas, la última salida de
            transporte es a las 13:00 horas.
          </p>
        </div>
        <div className="img-transport">
          <img src={images.van} alt="" />
        </div>
      </div>
    </>
  );
};

export default Transport;
