import { useState, useEffect } from "react";
import FormularioRegistro from "./FormularioRegistro";
import Header from "./Header";
import "./styles/appmain.css";
import bg1 from "./assets/haval.png";
import slogan from "./assets/Slogan.png";
import camionetaNegra from "./assets/camionetaNegra.png";
import { UseAuth } from "./UseAuth";
import { useNavigate } from "react-router-dom";
import camionetaResponsiveNegra from "./assets/auto01.png";
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
  };
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { login } = UseAuth();
  const navigate = useNavigate();
  console.log(UseAuth());
  // Función para manejar la acción del botón
  const manejarAccion = async (e) => {
    if (modo === "crearCuenta") {
      e.preventDefault();
      // Auí empieza el código para comnsumir la api register
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setError(null); // Limpiar errores previos
      setSuccessMessage(null); // Limpiar mensajes previos
      if (formData.password !== formData.confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }
      try {
        const result = await registerUser({
          email: formDataInput.email,
          password: formDataInput.password,
        });
        setSuccessMessage("Registro exitoso: " + result.message);
      } catch (err) {
        setError(err.message); // Mostrar el mensaje de error
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

  const [modo, setModo] = useState("recoveryPassword"); // Estado para el modo actual
  const [isMobile, setIsMobile] = useState(false); // Estado para detectar dispositivos móviles

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Define el límite para vistas móviles
    };

    handleResize(); // Comprobar al cargar
    window.addEventListener("resize", handleResize); // Escuchar cambios de tamaño
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const camionetas = {
    recoveryPassword: isMobile ? camionetaResponsiveNegra : camionetaNegra,
  };

  return (
    <>
      <Header />
      <main
        className="main"
        style={{
          backgroundImage: { bg1 }, // Cambia el fondo según el modo
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
            handleChange={handleChange} // Pasa la función de manejar cambios
          />
          <div className="main-message">
            <img className="slogan-img" src={slogan} alt="" />
            <img className="pickup" src={camionetas[modo]} alt="" />
          </div>
        </div>
      </main>
    </>
  );
};

export default AppMain;
