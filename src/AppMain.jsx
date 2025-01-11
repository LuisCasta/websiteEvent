import { useState, useEffect } from "react";
import FormularioRegistro from "./FormularioRegistro";
import PropTypes from "prop-types";
import Header from "./Header.jsx";
import "./styles/appmain.css";
import bg1 from "./assets/haval.png";
import bg2 from "./assets/BG2.png";
import bg3 from "./assets/BG3.png";
import camionetaBlanca from "./assets/pkWhite.png";
import camionetaGris from "./assets/pkgrey.png";
import slogan from "./assets/Slogan.png";
import camionetaNegra from "./assets/camionetaNegra.png";
import { UseAuth } from "./UseAuth";
import { useNavigate } from "react-router-dom";
import camionetaResponsiveNegra from "./assets/auto01.png";
import camionetaResponsiveBlanca from "./assets/auto02.png";
import camionetaResponsiveGris from "./assets/auto03.png";
import bckMobile from "./assets/bkmov1.png";
import { registerUser } from "./index.js";

const AppMain = () => {
  // Auí empieza el código para comnsumir la api register
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const campos = [
    { id: "email", type: "email", placeholder: "Email" },
    { id: "password", type: "password", placeholder: "Contraseña" },
    {
      id: "confirmPassword",
      type: "password",
      placeholder: "Confirmar Contraseña",
    },
  ];
  const [formDataInput, setFormDataInput] = useState(
    campos.reduce((acc, campo) => {
      acc[campo.id] = ""; // Inicializa los valores de los inputs en vacío
      return acc;
    }, {})
  );
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormDataInput({
      ...formDataInput,
      [id]: value,
    });
    // console.log(id, value);
  };
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [visible, setVisible] = useState(false); // Estado para controlar la visibilidad
  const { login } = UseAuth();
  const navigate = useNavigate();
  // console.log(UseAuth());
  // Función para manejar la acción del botón
  const manejarAccion = async (e) => {
    const mostrarMensaje = () => {
      setVisible(true); // Muestra el mensaje
      setTimeout(() => {
        setVisible(false); // Oculta el mensaje después de 3 segundos
      }, 3000); // Tiempo en milisegundos (3 segundos)
    };
    if (modo === "crearCuenta") {
      e.preventDefault();
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setError(null); // Limpiar errores previos
      setSuccessMessage(null); // Limpiar mensajes previos
      if (formDataInput.password != formDataInput.confirmPassword) {
        setError("Las contraseñas no coinciden");
        mostrarMensaje();
        return; // Limpiar mensajes previos;
      }
      try {
        const result = await registerUser({
          email: formDataInput.email,
          password: formDataInput.password,
        });
        setSuccessMessage(result.message);
        mostrarMensaje();
      } catch (err) {
        setError(err.message);
        mostrarMensaje(); // Mostrar el mensaje de error
      }
    } else if (modo === "iniciarSesion") {
      alert("Inicio de sesión exitoso");
      e.preventDefault();
      login();
      navigate("/home", { replace: true }); // Redirigir a la página de inicio
    } else if (modo === "olvidoPassword") {
      alert("Instrucciones enviadas al correo");
    }
  };

  const [modo, setModo] = useState("crearCuenta"); // Estado para el modo actual
  const [isMobile, setIsMobile] = useState(false); // Estado para detectar dispositivos móviles

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Define el límite para vistas móviles
    };

    handleResize(); // Comprobar al cargar
    window.addEventListener("resize", handleResize); // Escuchar cambios de tamaño
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fondos = {
    crearCuenta: isMobile ? `url(${bckMobile})` : `url(${bg1})`, // Cambia el fondo según el modo
    iniciarSesion: isMobile ? `url(${bckMobile})` : `url(${bg2})`,
    olvidoPassword: isMobile ? `url(${bckMobile})` : `url(${bg3})`,
  };

  const camionetas = {
    crearCuenta: isMobile ? camionetaResponsiveNegra : camionetaNegra,
    iniciarSesion: isMobile ? camionetaResponsiveBlanca : camionetaBlanca,
    olvidoPassword: isMobile ? camionetaResponsiveGris : camionetaGris,
  };

  return (
    <>
      <Header />
      <main
        className="main"
        style={{
          backgroundImage: fondos[modo], // Cambia el fondo según el modo
        }}
      >
        <div className="content-main">
          <img className="slogan-img-mov" src={slogan} alt="" />
          <FormularioRegistro
            setModo={setModo}
            modo={modo}
            onSubmit={manejarAccion}
            error={error}
            message={successMessage}
            formDataInput={formDataInput}
            handleChange={handleChange}
            visible={visible} // Pasa la función de manejar cambios
          />
          <div className="main-message">
            <img className="slogan-img" src={slogan} alt="" />
            <div className="container-pickup">
              <img className="pickup" src={camionetas[modo]} alt="" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
AppMain.propTypes = {
  formDataInput: PropTypes.func,
};
export default AppMain;
