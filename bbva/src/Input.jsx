import PropTypes from "prop-types";

const Input = ({ required = false, ...props }) => {
  return (
    <div className="input-container">
      {/* <label>{required}</label> */}
      <input {...props} required={required} />
    </div>
  );
};

// Definición de tipos de propiedades
Input.propTypes = {
  // label: PropTypes.string.isRequired, // Se asegura que 'label' sea una cadena y requerida
  required: PropTypes.bool, // Opcional, indica si el campo es requerido
};

export default Input;
