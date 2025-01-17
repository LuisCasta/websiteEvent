import AppMain from "./AppMain";
import Footer from "./Footer";
import Home from "./Home";
import RecoveryPassword from "./RecoveryPassword";
import { Routes, Route } from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter";
import "./styles/App.css";

const App = () => {
  return (
    <div className="app">
      {/* Manejo de rutas */}
      <Routes>
        {/* Ruta protegida */}
        <Route
          path="/home"
          element={
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          }
        />
        <Route path="/recovery-password" element={<RecoveryPassword />} />

        {/* Ruta principal */}
        <Route path="/" element={<AppMain />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
