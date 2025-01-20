import Nav from "./Nav";
import portada from "./assets/BG_Largo.png";
import slogan from "./assets/Slogan.png";
import pickgris from "./assets/pkgrey.png";
import "./styles/login.css";
import DiagonalSection from "./DiagonalSection";
import Contador from "./Contador";
import GeneralData from "./GeneralData";
import ConfirmForm from "./ConfirmForm";
import { useLocation } from "react-router-dom";
// import { useState } from "react";

const Home = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const step = queryParams.get("step");

  const handleFormCompleted = () => {
    // Eliminar el parámetro 'step' de la URL
    const urlParams = new URLSearchParams(location.search);
    urlParams.delete("step");
    window.history.replaceState({}, "", `/home?${urlParams.toString()}`);
  };

  // Si el parámetro "confirm" está presente, renderiza el componente
  if (step == "2") {
    return <ConfirmForm onConplete={handleFormCompleted} />;
  }
  return (
    <div>
      <header>
        <Nav />
        <div className="container-portada">
          <img src={portada} alt="" />
          <div className="portada-content">
            <img className="slogan" src={slogan} alt="" />
            <img className="pickup-gris" src={pickgris} alt="" />
          </div>
        </div>
      </header>
      <div>
        <DiagonalSection />
        <div className="contador-container">
          <h2 className="count-title">Faltan</h2>
          <Contador />
          <h2 className="message-count">
            PARA <strong>ACELERAR OPORTUNIDADES CON GWM Y BBVA</strong>, ¡TE
            ESPERAMOS!
          </h2>
        </div>
      </div>
      <div>
        <GeneralData />
      </div>
    </div>
  );
};

export default Home;
