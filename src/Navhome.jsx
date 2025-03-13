import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import "./styles/navhome.css";
import images from "../src/assets/images";

const NavHome = () => {
  const [user, setUser] = useState(null);
  user;
  const navigate = useNavigate();
  const menuRef = useRef(null); // Añadir el ref al menú
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/"); // Si no hay usuario, manda a login
    }

    // Añadir event listener al hacer clic fuera del menú
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/?iniciarsesion=true");
  };

  const backToHome = () => {
    navigate("/home", { replace: true });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    toggleMenu();
    backToHome();
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
      action: handleLogout,
    },
  ];

  return (
    <nav className="navbar-home">
      <div className="navbar-content-home">
        <img className="logo-bbva-2" src={images.bbva} />
        <div className="container-all">
          <img className="logo-gwm-2" src={images.logoGwm} alt="" />
          <div className="container-menu" ref={menuRef}>
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
                        offset={-70}
                        onClick={handleClick}
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
