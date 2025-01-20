import { useState, useEffect } from "react";
import slogan from "./assets/Slogan.png";
import azul from "./assets/azul.png";
import { confirmDecline } from "./index.js";
import "./styles/decline.css";
import PropTypes from "prop-types";
import Header from "./Header.jsx";

const DeclineConfirm = ({ onComplete }) => {
  // const [searchParams] = useSearchParams();
  // const tokenParam = searchParams.get("token");
  const [message, setMessage] = useState("");
  const [tokenUser, setUserToken] = useState(null);
  // Estado para almacenar el userId
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Recuperar el dato de localStorage
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userData) {
      // Parsear el JSON y obtener el id
      const user = JSON.parse(userData);
      setUserId(user.id); // Almacena el id en el estado
    }
    if (token) {
      // Parsear el JSON y obtener el id
      const tokenUsuario = JSON.parse(token);
      setUserToken(tokenUsuario); // Almacena el id en el estado
    }
  }, []);

  const [response, setResponse] = useState(null); // `null` significa que no hay selección aún

  const handleAccept = () => {
    setResponse(true); // Valor `true` para aceptar
  };

  const handleDecline = () => {
    setResponse(false); // Valor `false` para declinar
  };

  const manejarAccion = async (e) => {
    e.preventDefault();
    if (response === null) {
      alert("Por favor, selecciona una opción antes de continuar.");
    } else {
      // Llamar la función `onSubmit` pasando la respuesta seleccionada
      const responseValue = response ? 1 : 0;
      onComplete(responseValue);

      try {
        const result = await confirmDecline({
          userId,
          isConfirm: responseValue,
          token: tokenUser,
        });

        // VALIDACIÓN DE IDA
        if (userId == "" || userId == undefined || userId == null) {
          setMessage("Usuario no proporcionado o inválido.");
          setTimeout(() => setMessage(""), 3000);
          return;
        }

        setMessage(result.message || "Confirmación exitosa.");
        setTimeout(() => setMessage(""), 3000);
      } catch (err) {
        setMessage(err.toString());
        setTimeout(() => setMessage(""), 3000);
      }
      onComplete();
    }
  };

  return (
    <>
      <Header />
      <main className="main">
        <div className="content-main">
          <img className="slogan-img-mov" src={slogan} alt="Slogan" />
          <div className="contenedor-formulario-decline">
            <form className="formulario" onSubmit={manejarAccion}>
              <div className="message-form">
                <h4 className="call-title-form">¿Aceptas la invitación?</h4>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={response === true}
                    onChange={handleAccept}
                  />
                  Aceptar
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={response === false}
                    onChange={handleDecline}
                  />
                  Declinar
                </label>
              </div>
              <button type="submit" className="btn-registro">
                CONFIRMAR ASISTENCIA
              </button>
              {message && (
                <div className="success-message">
                  <p>{message}</p>
                </div>
              )}
            </form>
          </div>
          <div className="main-message">
            <img className="slogan-img" src={slogan} alt="Slogan" />
            <div className="container-pickup">
              <img className="pickup" src={azul} alt="Pickup" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
DeclineConfirm.propTypes = {
  onComplete: PropTypes.func,
};

export default DeclineConfirm;
