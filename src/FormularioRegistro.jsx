import Input from "./Input";
import { useState } from "react";
import BotonRegistro from "./BotonRegistro";
import "./styles/FormularioRegistro.css";
import PropTypes from "prop-types";
import Turnstile from "react-turnstile";

const FormularioRegistro = ({
  modo,
  setModo,
  onSubmit,
  error,
  message,
  formDataInput,
  handleChange,
}) => {
  const [token, setToken] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (token) {
      // Aquí puedes enviar el token al backend para su verificación
      console.log("Token recibido:", token);
    } else {
      console.error("Captcha no completado");
    }
  };
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
          btn: [
            {
              texto: "Botón Extra: Crear Cuenta",
              accion: () => alert("Acción para Crear Cuenta"),
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
          btn: [
            {
              texto: "Botón Extra: Iniciar Sesión",
              accion: () => alert("Acción para Iniciar Sesión"),
            },
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
          btn: [
            {
              texto: "Botón Extra: Recuperar Contraseña",
              accion: () => alert("Acción para Recuperar Contraseña"),
            },
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

  return (
    <div className="contenedor-formulario">
      {modo === "crearCuenta" && (
        <div className="message-form">
          <h3 className="call-title">Regístrate</h3>
          <p className="message-form-text">
            Conoce toda la información para participar en la{" "}
            <b>PRIMERA CONVENCIÓN GWM FINANCE 2025</b> que BBVA ha preparado
            para ti.
          </p>
        </div>
      )}

      <form className="formulario" onSubmit={onSubmit}>
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
              value={formDataInput[campo.id]} // Enlaza el valor al estado correspondiente
              onChange={handleChange} // Llama a handleChange cuando el valor cambie
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
        <Turnstile
          sitekey="TU_SITE_KEY" // Usa la clave del sitio que obtuviste en Cloudflare
          onVerify={setToken}
        />
        <BotonRegistro onSubmit={handleSubmit} modo={modo} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
      </form>
    </div>
  );
};
// Validación de props con PropTypes
FormularioRegistro.propTypes = {
  modo: PropTypes.string.isRequired, // La prop "modo" debe ser un string obligatorio
  setModo: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired, // La prop "setModo" debe ser una función obligatoria
  message: PropTypes.func,
  error: PropTypes.func,
  formDataInput: PropTypes.func.isRequired,
  handleChange: PropTypes.func,
};

export default FormularioRegistro;
