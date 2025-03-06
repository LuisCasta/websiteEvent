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
import Dresscode from "./Dresscode";
import Consejos from "./Consejos";
import { Element } from "react-scroll";
import Footer from "./Footer";
const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step");

  const handleFormCompleted = () => {
    if (step == "1") {
      searchParams.delete("step");
    }
    if (step == "2") {
      searchParams.delete("step");
    }
    setTimeout(() => {
      setSearchParams(searchParams);
    }, 12000);
  };

  if (step == "1") {
    return <ConfirmForm onComplete={handleFormCompleted} />;
  }
  if (step == "2") {
    return <DeclineConfirm onComplete={handleFormCompleted} />;
  }

  return (
    <>
      <div>
        <Element name="Inicio">
          <header>
            <NavHome />
            <div className="container-portada-2">
              <div className="portada-content-2">
                <div className="content-slogan">
                  <img className="slogan-home" src={slogan} alt="" />
                </div>
                <div className="msg-h2">
                  <h2>Evento dirigido a Dueños, Directores de Marca y F&I</h2>
                </div>
                <div className="content-pickup">
                  <img className="pickup-gris-home" src={pickgris} alt="" />
                </div>
              </div>
            </div>
          </header>
        </Element>

        <Element name="Generales">
          <DiagonalSection />
        </Element>
        <Element name="Agenda">
          <Agenda />
        </Element>
        <Element name="Confirmacion">
          <InformConfirm />
        </Element>
        <Element name="Transportacion">
          <Transport />
        </Element>
        <Element name="Vestimenta">
          {" "}
          <Dresscode />
        </Element>
        <Element name="Consejos">
          <Consejos />
        </Element>
      </div>
      <Footer />
    </>
  );
};

export default Home;
