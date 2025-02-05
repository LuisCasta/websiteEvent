import "../src/styles/dresscode.css";
import images from "../src/assets/images";
const Dresscode = () => {
  return (
    <>
      <div className="dresscode-container">
        <div className="content-dresscode">
          <h2>Código de vestimenta</h2>
          <div className="container-p">
            <p className="p-dresscode">
              Para disfrutar al máximo de las actividades, sugerimos el
              siguiente código:
            </p>
            <p className="p-dresscode">
              <b>Para el día:</b> ropa ligera, fresca y calzado cómodo.
            </p>
            <p className="p-dresscode">
              <b>Actividades en jardín:</b> ropa deportiva, tenis y gorra.{" "}
            </p>
            <p className="p-dresscode">
              <b>Cena de clausura:</b> Business casual con ropa de color negro.
            </p>
          </div>
          <div className="img-container-dresscode">
            <img src={images.vestimenta} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dresscode;
