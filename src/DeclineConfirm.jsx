import { useState, useEffect } from "react";
import slogan from "./assets/Slogan.png";
import azul from "./assets/azul.png";
import { confirmDecline } from "./index.js";
import "./styles/decline.css";
import PropTypes from "prop-types";
import Header from "./Header.jsx";

const DeclineConfirm = ({ onComplete }) => {
  const [message, setMessage] = useState("");
  const [tokenUser, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userData) {
      const user = JSON.parse(userData);
      setUserId(user.id);
    }
    if (token) {
      setUserToken(token);
    }
  }, []);

  const manejarAccion = async (e) => {
    e.preventDefault();
    if (response === null) {
      alert("Por favor, selecciona una opción antes de continuar.");
      return;
    }

    const responseValue = response === "accept" ? 1 : 0;

    try {
      const result = await confirmDecline({
        userId,
        isConfirm: responseValue,
        token: tokenUser,
      });

      if (!userId) {
        setMessage("Usuario no proporcionado o inválido.");
        setTimeout(() => setMessage(""), 5000);
        return;
      }

      if (!tokenUser) {
        setMessage("Token no válido o no proporcionado.");
        setTimeout(() => setMessage(""), 5000);
        return;
      }

      setMessage(result.message || "Confirmación exitosa.");
      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      setMessage(err.toString());
      setTimeout(() => setMessage(""), 5000);
    }

    onComplete(responseValue);
  };

  return (
    <>
      <Header />
      <main className="main">
        <div className="content-main">
          <img className="slogan-img-mov" src={slogan} alt="Slogan" />
          <div className="contenedor-formulario-decline">
            <form className="formulario-2" onSubmit={manejarAccion}>
              <div className="message-form">
                <h4 className="call-title-form">
                  Solicitud para compartir habitación
                </h4>
                <p>Una persona ha solicitado compartir habitación contigo</p>
              </div>
              <div>
                <div className="confirm-container">
                  <label>
                    <input
                      type="radio"
                      name="response"
                      value="accept"
                      checked={response === "accept"}
                      onChange={(e) => setResponse(e.target.value)}
                    />
                  </label>
                  <span>Acepto la invitación a compartir habitación</span>
                </div>
                <div className="decline-container">
                  <label>
                    <input
                      className="radio"
                      type="radio"
                      name="response"
                      value="decline"
                      checked={response === "decline"}
                      onChange={(e) => setResponse(e.target.value)}
                    />
                  </label>
                  <span>Declino la invitación a compartir habitación</span>
                </div>
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
