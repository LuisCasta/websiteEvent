import { useState } from "react";
import "./styles/navhome.css";
import logoGwm from "../src/assets/gwm-2.png";
const NavHome = () => {
  const [active, setActive] = useState(0);
  const menuItems = [
    "Confirma tu asistencia",
    "Generales del evento",
    "Dress code",
    "Tips para actividades",
    "Agenda",
  ]; // Opciones del menú
  const [isOpen, setIsOpen] = useState(true);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar-home">
      <div className="navbar-content-home">
        <img className="logo-bbva" src="../src/assets/bbva.png" alt="" />
        <div className="container-all">
          <img className="logo-gwm" src={logoGwm} alt="" />
          <div className="container-menu">
            <button className="btn-nav" onClick={toggleMenu}>
              <i className="bx bx-menu bx-md"></i>
            </button>
            <div className={isOpen ? "cerrar" : "abrir"}>
              <ul>
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className={`${active === index ? "active" : ""}`}
                    onClick={() => setActive(index)} // Actualiza el estado al hacer clic
                  >
                    {item}
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
