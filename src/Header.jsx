import "./styles/header.css";
import logoGwm from "./assets/gwm-2.png";
import logoBbva from "./assets/bbva.png";

const Header = () => {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <img className="logo-bbva" src={logoBbva} alt="" />
        <img className="logo-gwm" src={logoGwm} alt="" />
      </div>
    </header>
  );
};

export default Header;
