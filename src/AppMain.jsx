import { useState, useEffect } from "react";
import FormularioRegistro from "./FormularioRegistro";
import PropTypes from "prop-types";
import Header from "./Header.jsx";
import "./styles/appmain.css";
import bg1 from "./assets/haval.png";
import bg2 from "./assets/BG2.png";
import bg3 from "./assets/BG3.png";
import camionetaBlanca from "./assets/Capa_16.png";
import camionetaGris from "./assets/pkgrey.png";
import slogan from "./assets/Slogan.png";
import camionetaNegra from "./assets/camionetaNegra.png";
import { UseAuth } from "./UseAuth";
import { useNavigate } from "react-router-dom";
import camionetaResponsiveNegra from "./assets/camionetaNegra.png";
// import camionetaResponsiveBlanca from "./assets/auto02.png";
import camionetaResponsiveGris from "./assets/pkgrey.png";
import bckMobile from "./assets/bkmov1.png";
import { registerUser } from "./index.js";
import { emailToken } from "./index.js";
import { loginUser } from "./index.js";
import { useSearchParams } from "react-router-dom";

const AppMain = () => {
  const [user, setUser] = useState(null);
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step");
  const inicio = searchParams.get("iniciarsesion");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [visible, setVisible] = useState(false); // Estado para controlar la visibilidad
  const { login } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && step) {
      navigate(`/home?step=${step}`, { replace: true });
    }
  }, [login, navigate, step]);
  // Al cargar la app, revisar si hay usuario en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Guarda el usuario en el estado
      login(); // Simula el inicio de sesión automático
      navigate("/home", { replace: true }); // Redirige a /home
    }
  }, [login, navigate]);
  // console.log(recovery);
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

  // console.log(UseAuth());
  // Función para manejar la acción del botón
  const manejarAccion = async (e) => {
    const mostrarMensaje = () => {
      setVisible(true); // Muestra el mensaje
      setTimeout(() => {
        setVisible(false); // Oculta el mensaje después de 3 segundos
      }, 7000); // Tiempo en milisegundos (3 segundos)
    };
    if (modo === "crearCuenta") {
      e.preventDefault();
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setError(null); // Limpiar errores previos
      setSuccessMessage(null); // Limpiar mensajes previos
      if (formDataInput.password != formDataInput.confirmPassword) {
        // setFormDataInput({ email: "", password: "", confirmPassword: "" }); // Limpiar inputs
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
        setFormDataInput({ email: "", password: "", confirmPassword: "" }); // Limpiar inputs
        login();
        navigate("/home", { replace: true }); // Redirigir a la página de inicio
        // Guardar datos relevantes en Local Storage
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
      } catch (err) {
        setError(err.message);
        mostrarMensaje(); // Mostrar el mensaje de error
      }
    } else if (modo === "iniciarSesion") {
      // alert("Inicio de sesión exitoso");
      e.preventDefault();
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setError(null); // Limpiar errores previos
      setSuccessMessage(null); // Limpiar mensajes previos
      if (
        formDataInput.email == "" ||
        formDataInput.email == undefined ||
        formDataInput.email == null
      )
        if (
          formDataInput.password == "" ||
          formDataInput.password == undefined ||
          formDataInput.password == null
        ) {
          setFormDataInput({ email: "", password: "" }); // Limpiar inputs
          setError("Hubo un error, inténtalo de nuevo");
          mostrarMensaje();
          return; // Limpiar mensajes previos;
        }
      try {
        const result = await loginUser({
          email: formDataInput.email,
          password: formDataInput.password,
        });
        setSuccessMessage(result.message);
        mostrarMensaje();
        login();
        if (step == "1") {
          navigate("/home?step=1");
        } else if (step == "2") {
          navigate("/home?step=2");
        } else {
          navigate("/home", { replace: true }); // Redirigir a la página de inicio
        }
        // Guardar datos relevantes en Local Storage
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setFormDataInput({ email: "", password: "" }); // Limpiar inputs
      } catch (err) {
        setError(err.message);
        mostrarMensaje(); // Mostrar el mensaje de error
        // setTimeout(() => {
        //   setFormDataInput({ email: "", password: "" }); // Limpiar inputs
        // }, 5000);
      }
    } else if (modo === "olvidoPassword") {
      e.preventDefault();
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setError(null); // Limpiar errores previos
      setSuccessMessage(null); // Limpiar mensajes previos
      if (
        formDataInput.email == "" ||
        formDataInput.email == undefined ||
        formDataInput.email == null
      ) {
        setError("Hubo un error, inténtalo de nuevo");
        mostrarMensaje();
        return; // Limpiar mensajes previos;
      }
      try {
        const result = await emailToken({
          email: formDataInput.email,
        });
        setSuccessMessage(result.message);
        setFormDataInput({ email: "" }); // Limpiar inputs
        mostrarMensaje();
        navigate("/", { replace: true });
      } catch (err) {
        setTimeout(() => {
          setFormDataInput({ email: "" }); // Limpiar inputs
        }, 5000);
        // Limpiar inputs
        setError(err.message);
        mostrarMensaje(); // Mostrar el mensaje de error
      }
    }
  };

  const [modo, setModo] = useState("crearCuenta"); // Estado para el modo actual

  useEffect(() => {
    if (inicio === "true" || step == "1" || step == "2") {
      setModo("iniciarSesion");
    }
  }, [inicio, step]);

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
    iniciarSesion: isMobile ? camionetaBlanca : camionetaBlanca,
    olvidoPassword: isMobile ? camionetaResponsiveGris : camionetaGris,
  };

  return (
    <>
      <Header />
      {user ? (
        <></>
      ) : (
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
      )}
    </>
  );
};
AppMain.propTypes = {
  formDataInput: PropTypes.func,
};
export default AppMain;
