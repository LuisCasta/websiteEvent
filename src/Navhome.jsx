import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll"; // Importa Link de react-scroll
import "./styles/navhome.css";
import images from "../src/assets/images";

const NavHome = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  user;
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Recupera los datos del usuario
    } else {
      navigate("/"); // Si no hay usuario, manda a login
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Borra los datos del usuario
    setUser(null); // Limpia el estado
    navigate("/"); // Redirige al login
  };
  const backToHome = () => {
    navigate("/home", { replace: true });
  };

  const menuItems = [
    {
      icon: <img className="icon-img" src={images.homeIco} />,
      text: "Inicio",
      section: "Inicio",
      back: backToHome,
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
      action: handleLogout, // Agregar función para logout
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
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
            <div className={isOpen ? "abrir" : "cerrar"}>
              <ul>
                {menuItems.map((item, index) => (
                  <li className="list-nav" key={index}>
                    {item.action ? (
                      <a onClick={item.action} className="logout-btn">
                        {item.icon} <span>{item.text}</span>
                      </a>
                    ) : (
                      <Link
                        to={item.section}
                        smooth={true}
                        duration={500}
                        onClick={(toggleMenu, backToHome)}
                      >
                        {item.icon} <span>{item.text}</span>
                      </Link>
                    )}
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
