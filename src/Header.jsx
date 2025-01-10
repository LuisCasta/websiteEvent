import "./styles/header.css";
const Header = () => {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <img className="logo-bbva" src="../src/assets/bbva.png" alt="" />
        <img className="logo-gwm" src="../src/assets/gwm-2.png" alt="" />
      </div>
    </header>
  );
};

export default Header;
