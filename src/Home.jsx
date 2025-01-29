import Nav from "./Nav";
import portada from "./assets/BG_Largo.png";
import slogan from "./assets/Slogan.png";
import pickgris from "./assets/pkgrey.png";
import "./styles/login.css";
import DiagonalSection from "./DiagonalSection";
import Contador from "./Contador";
import GeneralData from "./GeneralData";
import ConfirmForm from "./ConfirmForm";
import DeclineConfirm from "./DeclineConfirm";
import { useSearchParams } from "react-router-dom";
// import { useState } from "react";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Verificar si existe el parámetro step1
  const step = searchParams.get("step");
  const handleFormCompleted = () => {
    // Eliminar el parámetro 'step' de la URL
    // console.log("Formulario enviado");

    // Eliminar step1 de los parámetros
    if (step == "1") {
      searchParams.delete("step");
    }
    if (step == "2") {
      searchParams.delete("step");
    }
    setTimeout(() => {
      setSearchParams(searchParams);
    }, 9000);
  };

  // Si el parámetro "confirm" está presente, renderiza el componente

  // Renderizado condicional
  if (step == "1") {
    return <ConfirmForm onComplete={handleFormCompleted} />;
  }

  if (step == "2") {
    return <DeclineConfirm onComplete={handleFormCompleted} />;
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
