import PropTypes from "prop-types";
const BotonRegistro = ({ modo }) => {
  return (
    <button
      type="submit"
      className={modo === "iniciarSesion" ? "btn-hidden" : "btn-registro"}
    >
      {modo == "crearCuenta"
        ? "REGÍSTRATE"
        : modo == "iniciarSesion"
        ? ""
        : modo == "olvidoPassword"
        ? "ENVIAR CORREO"
        : ""}
    </button>
  );
};
// Validación de props con PropTypes
BotonRegistro.propTypes = {
  modo: PropTypes.string.isRequired, // La prop "modo" debe ser un string obligatorio
};
export default BotonRegistro;
