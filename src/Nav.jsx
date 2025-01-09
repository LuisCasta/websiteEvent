import { useState } from "react";
import "./styles/nav.css";
const Nav = () => {
  const [active, setActive] = useState(0);
  const menuItems = [
    "Confirma tu asistencia",
    "Generales del evento",
    "Dress code",
    "Tips para actividades",
    "Agenda",
  ]; // Opciones del menú
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img className="logo-bbva" src="../src/assets/bbva.svg" alt="" />
        <div className="navbar-title">
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
        <img className="logo-gwm" src="../src/assets/gwm.svg" alt="" />
      </div>
    </nav>
  );
};

export default Nav;
