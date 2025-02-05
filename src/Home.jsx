import NavHome from "./Navhome";
import slogan from "./assets/Slogan.png";
import pickgris from "./assets/pkgrey.png";
import "./styles/login.css";
import DiagonalSection from "./DiagonalSection";
import ConfirmForm from "./ConfirmForm";
import DeclineConfirm from "./DeclineConfirm";
import { useSearchParams } from "react-router-dom";
import Agenda from "./Agenda";
import InformConfirm from "./Infoconfirm";
import Transport from "./Transport";
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

    setSearchParams(searchParams);
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
        <NavHome />
        <div className="container-portada-2">
          <div className="portada-content-2">
            <div className="content-slogan">
              <img className="slogan-home" src={slogan} alt="" />
            </div>
            <div className="msg-h2">
              <h2>Evento dirigido a Dueños, Directores de Marca y F&J</h2>
            </div>
            <div className="content-pickup">
              <img className="pickup-gris-home" src={pickgris} alt="" />
            </div>
          </div>
        </div>
      </header>
      <DiagonalSection />
      <Agenda />
      <InformConfirm />
      <Transport />
    </div>
  );
};

export default Home;
