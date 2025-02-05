import { useState } from "react";
import "./styles/navhome.css";
import images from "../src/assets/images";
const NavHome = () => {
  const menuItems = [
    {
      icon: <img className="icon-img" src={images.homeIco} />,
      text: "Inicio",
    },
    {
      icon: <img className="icon-img" src={images.confirm} />,
      text: "Confirma tu asistencia",
    },
    {
      icon: <img className="icon-img" src={images.generalidades} />,
      text: "Generales del evento",
    },
    {
      icon: <img className="icon-img" src={images.vestimentaIco} />,
      text: "Código de vestimenta",
    },
    {
      icon: <img className="bx bx-home icon-img" src={images.advices} />,
      text: "Consejos para estancia",
    },
    {
      icon: <img className="icon-img" src={images.agendaIco} />,
      text: "Agenda",
    },
    {
      icon: <img className="icon-img" src={images.transporteIco} />,
      text: "Transportación",
    },
    {
      icon: <img className="icon-img" src={images.galeriaIco} />,
      text: "Galería",
    },
    {
      icon: <img className="icon-img" src={images.logoutIco} />,
      text: "Cerrar sesión",
    },
  ];
  // Opciones del menú
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
                  <li className="" key={index}>
                    {item.icon}
                    <span>{item.text}</span>
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
