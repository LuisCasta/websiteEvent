import "./styles/header.css";
const Header = () => {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <img className="logo-bbva" src="../src/assets/bbva.svg" alt="" />
        <img className="logo-gwm" src="../src/assets/gwm.svg" alt="" />
      </div>
    </header>
  );
};

export default Header;
