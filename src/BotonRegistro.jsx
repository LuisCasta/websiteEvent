import PropTypes from "prop-types";
const BotonRegistro = ({ modo }) => {
  return (
    <button type="submit" className="btn-registro">
      {modo == "crearCuenta"
        ? "REGÍSTRATE"
        : modo == "iniciarSesion"
        ? "INICIA SESIÓN"
        : modo == "olvidoPassword"
        ? "RECUPERAR CONTRASEÑA"
        : ""}
    </button>
  );
};
// Validación de props con PropTypes
BotonRegistro.propTypes = {
  modo: PropTypes.string.isRequired, // La prop "modo" debe ser un string obligatorio
};
export default BotonRegistro;
