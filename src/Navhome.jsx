import { useState } from "react";
import { Link } from "react-scroll"; // Importa Link de react-scroll
import "./styles/navhome.css";
import images from "../src/assets/images";

const NavHome = () => {
  const menuItems = [
    {
      icon: <img className="icon-img" src={images.homeIco} />,
      text: "Inicio",
      section: "Inicio",
    },
    {
      icon: <img className="icon-img" src={images.generalidades} />,
      text: "Generales del evento",
      section: "Generales",
    },
    {
      icon: <img className="icon-img" src={images.agendaIco} />,
      text: "Agenda",
      section: "Agenda",
    },
    {
      icon: <img className="icon-img" src={images.confirm} />,
      text: "Confirma tu asistencia",
      section: "Confirmacion",
    },
    {
      icon: <img className="icon-img" src={images.transporteIco} />,
      text: "Transportación",
      section: "Transportacion",
    },
    {
      icon: <img className="icon-img" src={images.vestimentaIco} />,
      text: "Código de vestimenta",
      section: "Vestimenta",
    },
    {
      icon: <img className="icon-img" src={images.advices} />,
      text: "Consejos para estancia",
      section: "Consejos",
    },
    {
      icon: <img className="icon-img" src={images.galeriaIco} />,
      text: "Galería",
      section: "Galeria",
    },
    {
      icon: <img className="icon-img" src={images.logoutIco} />,
      text: "Cerrar sesión",
    },
  ];

  const [isOpen, setIsOpen] = useState(true);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar-home">
      <div className="navbar-content-home">
        <img className="logo-bbva-2" src={images.bbva} />
        <div className="container-all">
          <img className="logo-gwm-2" src={images.logoGwm} alt="" />
          <div className="container-menu">
            <button className="btn-nav" onClick={toggleMenu}>
              <i className="bx bx-menu bx-md"></i>
            </button>
            <div className={isOpen ? "cerrar" : "abrir"}>
              <ul>
                {menuItems.map((item, index) => (
                  <li className="list-nav" key={index}>
                    <Link to={item.section} smooth={true} duration={500}>
                      {item.icon} <span>{item.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavHome;
