import { useState } from "react";
import FormularioRegistro from "./FormularioRegistro";
import "./styles/appmain.css";
import bg1 from "./assets/haval.png";
import bg2 from "./assets/BG2.png";
import bg3 from "./assets/BG3.png";
import camionetaBlanca from "./assets/pkWhite.png";
import camionetaGris from "./assets/pkgrey.png";
import slogan from "./assets/Slogan.png";
import camionetaNegra from "./assets/camionetaNegra.png";

console.log(camionetaBlanca);

const AppMain = () => {
  const [modo, setModo] = useState("crearCuenta"); // Estado para el modo actual

  // Define los fondos para cada modo
  const fondos = {
    crearCuenta: `url(${bg1})`,
    iniciarSesion: `url(${bg2})`,
    olvidoPassword: `url(${bg3})`,
  };

  // Define los fondos para cada modo
  const camionetas = {
    crearCuenta: camionetaNegra,
    iniciarSesion: camionetaBlanca,
    olvidoPassword: camionetaGris,
  };

  return (
    <main
      className="main"
      style={{
        backgroundImage: fondos[modo], // Cambia el fondo según el modo
      }}
    >
      <div className="content-main">
        <FormularioRegistro setModo={setModo} modo={modo} />
        <div className="main-message">
          <img className="slogan-img" src={slogan} alt="" />
          <img className="pickup" src={camionetas[modo]} alt="" />
        </div>
      </div>
    </main>
  );
};

export default AppMain;
