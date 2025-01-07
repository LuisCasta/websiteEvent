import { useState } from "react";
import FormularioRegistro from "./FormularioRegistro";
import "./styles/AppMain.css";
import gris from "./assets/gris.png";
import black from "./assets/haval.png";
import blanca from "./assets/blanca.png";

const AppMain = () => {
  const [modo, setModo] = useState("crearCuenta"); // Estado para el modo actual

  // Define los fondos para cada modo
  const fondos = {
    crearCuenta: `url(${black})`,
    iniciarSesion: `url(${blanca})`,
    olvidoPassword: `url(${gris})`,
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
          <h2>
            CONVENCIÓN <br /> GWM FINANCE 2025
          </h2>
          <p>ACELERANDO OPORTUNIDADES</p>
        </div>
      </div>
    </main>
  );
};

export default AppMain;
