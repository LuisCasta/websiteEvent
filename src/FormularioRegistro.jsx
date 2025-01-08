import Input from "./Input";
import BotonRegistro from "./BotonRegistro";
import "./styles/FormularioRegistro.css";
import PropTypes from "prop-types";

const FormularioRegistro = ({ modo, setModo }) => {
  // Configuración de los campos y el enlace según el modo
  const obtenerCampos = () => {
    switch (modo) {
      case "crearCuenta":
        return {
          campos: [
            { id: "email", placeholder: "Correo electrónico", type: "email" },
            { id: "password", placeholder: "Contraseña", type: "password" },
            {
              id: "comprobar-pw",
              placeholder: "Confirmar tu contraseña",
              type: "password",
            },
          ],
          enlace: {
            message: "",
            texto: "¿Ya estás registrado? Inicia sesión",
            accion: () => setModo("iniciarSesion"),
          },
        };
      case "iniciarSesion":
        return {
          campos: [
            { id: "email", placeholder: "Correo electrónico", type: "email" },
            { id: "password", placeholder: "Contraseña", type: "password" },
          ],
          enlace: {
            message: "",
            texto: "¿Olvidaste tu contraseña?",
            accion: () => setModo("olvidoPassword"),
          },
        };
      case "olvidoPassword":
        return {
          campos: [
            { id: "email", placeholder: "Correo electrónico", type: "email" },
          ],
          enlace: {
            texto: "¿Aún no estás registrado? Regístrate",
            accion: () => setModo("crearCuenta"),
          },
        };
      default:
        return { campos: [], enlace: {} };
    }
  };

  const { campos, enlace } = obtenerCampos(); // Extraer campos y enlace dinámicos

  const manejarEnvio = (e) => {
    e.preventDefault();
    alert(`Acción realizada: ${modo}`);
  };

  return (
    <div className="contenedor-formulario">
      {modo === "crearCuenta" && (
        <div className="message-form">
          <h3 className="call-title">Regístrate en nuestro sitio web</h3>
          <p className="message-form-text">
            Regístrate y conoce toda la información para poder asistir y
            participar en la <b>PRIMERA CONVENCIÓN GWM FINANCE 2025</b> que BBVA
            ha preparado para ti.
          </p>
        </div>
      )}

      <form className="formulario" onSubmit={manejarEnvio}>
        <h2>
          {modo === "crearCuenta"
            ? ""
            : modo === "iniciarSesion"
            ? "Inicia Sesión"
            : "Recuperación de Contraseña"}
        </h2>
        {modo === "olvidoPassword" && (
          <div className="message-form">
            <p className="message-form-text-pw">
              Escribe tu correo electrónico y recibirás un e-mail con las
              indicaciones para recuperar tu contraseña
            </p>
          </div>
        )}
        {campos.map((campo) => (
          <div key={campo.id}>
            <Input
              id={campo.id}
              type={campo.type}
              placeholder={campo.placeholder}
              required
            />
          </div>
        ))}
        <div className="form-footer">
          <a
            onClick={enlace.accion}
            className="ready-btn-login"
            id="login-btn-register"
          >
            {enlace.texto}
          </a>
        </div>
        <BotonRegistro modo={modo} />
      </form>
    </div>
  );
};
// Validación de props con PropTypes
FormularioRegistro.propTypes = {
  modo: PropTypes.string.isRequired, // La prop "modo" debe ser un string obligatorio
  setModo: PropTypes.func.isRequired, // La prop "setModo" debe ser una función obligatoria
};
export default FormularioRegistro;
