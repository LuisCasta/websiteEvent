import Input from "./Input";
// import { useState } from "react";
import BotonRegistro from "./BotonRegistro";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";
import "./styles/FormularioRegistro.css";
// import { useTestMode } from "./TestMode.jsx";

const FormularioRegistro = ({
  modo,
  setModo,
  onSubmit,
  error,
  message,
  formDataInput,
  handleChange,
  visible,
}) => {
  function onChange(value) {
    console.log("Captcha value:", value);
  }
  // const { isTestMode } = useTestMode();
  // Configuración de los campos y el enlace según el modo
  const obtenerCampos = () => {
    switch (modo) {
      case "crearCuenta":
        return {
          campos: [
            { id: "email", placeholder: "Correo electrónico", type: "email" },
            { id: "password", placeholder: "Contraseña", type: "password" },
            {
              id: "confirmPassword",
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
            text: "¿Aún no estás registrado? regístrate aquí.",
            action: () => setModo("crearCuenta"),
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
            accionIniciar: () => setModo("iniciarSesion"),
            textIniciar: "Inicia sesión",
          },
        };
      default:
        return { campos: [], enlace: {} };
    }
  };

  const { campos, enlace } = obtenerCampos(); // Extraer campos y enlace dinámicos

  return (
    <div className="contenedor-formulario-register">
      {modo === "crearCuenta" && (
        <div className="message-form">
          <h3 className="call-title">Regístrate</h3>
          <p className="message-form-text">
            Conoce toda la información para participar en la
            <b> PRIMERA CONVENCIÓN GWM FINANCE 2025</b> en alianza con{" "}
            <b>BBVA.</b>
            <br /> <br /> Recuerda registrarte con tu correo de la agencia.
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
              Escribe tu correo electrónico y te llegará un e-mail con las
              indicaciones para recuperar tu contrseña.
            </p>
          </div>
        )}
        {campos.map((campo) => (
          <div key={campo.id}>
            <Input
              id={campo.id}
              type={campo.type}
              placeholder={campo.placeholder}
              value={formDataInput[campo.id] || ""} // Enlaza el valor al estado correspondiente
              onChange={handleChange} // Llama a handleChange cuando el valor cambie
              required
            />
          </div>
        ))}
        <div className="form-footer">
          {modo === "crearCuenta" && (
            <>
              <a
                onClick={enlace.accion}
                className="ready-btn-login"
                id="login-btn-register"
              >
                {enlace.texto}
              </a>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  style={{ width: "20px" }}
                  id="terms_label"
                  type="checkbox"
                  required
                />
                <label
                  style={{ fontSize: "0.7rem", color: "#2978b5" }}
                  htmlFor="terms_label"
                >
                  Leí y acepto los{""}
                  <a
                    style={{ color: "#2978b5" }}
                    target="_blank"
                    href="https://drive.google.com/file/d/1vtUGxUrAbeNZKE40oeC39q3wf7R6nsL-/view"
                  >
                    <b>Términos y condiciones</b>
                  </a>
                </label>
              </div>
            </>
          )}
          {modo === "olvidoPassword" && (
            <div className="btn-init-container">
              <a
                onClick={enlace.accionIniciar}
                className="ready-btn-login-ini"
                id="login-btn-init"
              >
                {enlace.textIniciar}
              </a>
            </div>
          )}
          {modo === "iniciarSesion" && (
            <div className="btn-init-container">
              <a
                onClick={enlace.action}
                className="ready-btn-login-ini"
                id="create-account"
              >
                {enlace.text}
              </a>
              <a className="ready-btn-login-ini" onClick={enlace.accion}>
                {enlace.texto}
              </a>
            </div>
          )}
        </div>
        <ReCAPTCHA
          sitekey="6LcnprcqAAAAAAxYMaihpvEOJGSvmfAdQYSuPjBP"
          onChange={onChange}
          size="invisible"
        />
        <BotonRegistro modo={modo} />
        {error && visible && <p className="error-message">{error}</p>}
        {message && visible && (
          <p
            className={
              modo === "crearCuenta" ? "absolute-message" : "success-message"
            }
          >
            {modo === "crearCuenta"
              ? "Haz quedado registrado en nuestro sitio web Creando oportunidades 2025, en breve te haremos saber cuando puedes tener acceso para ver todas las características de este gran evento que estamos preparando para ti"
              : message}
          </p>
        )}
      </form>
    </div>
  );
};
// Validación de props con PropTypes
FormularioRegistro.propTypes = {
  modo: PropTypes.string.isRequired, // La prop "modo" debe ser un string obligatorio
  setModo: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired, // La prop "setModo" debe ser una función obligatoria
  message: PropTypes.string,
  error: PropTypes.string,
  formDataInput: PropTypes.object.isRequired,
  handleChange: PropTypes.func,
  visible: PropTypes.bool,
};

export default FormularioRegistro;
