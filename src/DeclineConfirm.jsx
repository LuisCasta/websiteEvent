import { useState, useEffect } from "react";
import slogan from "./assets/Slogan.png";
import azul from "./assets/azul.png";
import { confirmDecline, dataUserCompanion } from "./index.js";
import "./styles/decline.css";
import PropTypes from "prop-types";
import Header from "./Header.jsx";

const DeclineConfirm = ({ onComplete }) => {
  const [message, setMessage] = useState({ text: "", type: "" });
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

  const [companionData, setCompanionData] = useState(null); // Almacena los datos obtenidos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchCompanionData = async () => {
      try {
        // Aquí puedes definir el objeto que enviarás a la API
        const data = await dataUserCompanion({ userId }); // Llamada a la API
        setCompanionData(data.hostUser);
        // console.log(companionData.name);
        // Almacena los datos obtenidos
      } catch (err) {
        setError(err.message); // Almacena el mensaje de error
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    if (userId) {
      fetchCompanionData(); // Solo se ejecuta si userId tiene valor
    }
  }, [userId]); // Agrega userId como dependencia

  const manejarAccion = async (e) => {
    e.preventDefault();
    if (response === null) {
      setMessage({
        text: "Por favor selecciona una opción antes de continuar",
        type: "error",
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 5000);
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
        setMessage({
          text: "Usuario no proporcionado o inválido.",
          type: "error",
        });
        setTimeout(() => ({ text: "", type: "" }), 5000);
        return;
      }

      if (!tokenUser) {
        setMessage({
          text: "Token no válido o no proporcionado.",
          type: "error",
        });
        setTimeout(() => ({ text: "", type: "" }), 5000);
        return;
      }
      setTimeout(
        () =>
          setMessage({
            text: "Espera un momento estamos confirmando...",
            type: "success",
          }),
        100
      );
      setTimeout(() => {
        setMessage({
          text: result.message || "Confirmación exitosa.",
          type: "success",
        });
      }, 2000);

      setTimeout(
        () =>
          setMessage({
            text: "Te rediccionaremos a la página de inicio",
            type: "success",
          }),
        12000
      );
      setTimeout(() => {
        setMessage({ text: "", type: "" });
        onComplete();
      }, 12000);

      // setTimeout(() => ({ text: "", type: "" }), 5000);
    } catch (err) {
      setMessage({ text: err.toString(), type: "" });
      setTimeout(() => ({ text: "", type: "" }), 5000);
    }
    // onComplete(responseValue);
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
                <p className="p-host">
                  Una persona ha solicitado compartir habitación contigo:
                </p>
              </div>
              <div className="container-data-host">
                <p className="tilte-host">
                  <b>Nombre: </b>
                  {"" + companionData?.name}
                </p>
                <p className="tilte-host">
                  <b>Empresa: </b>
                  {"" + companionData?.company}
                </p>
                <p className="tilte-host">
                  <b>Puesto: </b>
                  {"" + companionData?.position}
                </p>
                <p className="tilte-host">
                  <b>Correo electrónico: </b>
                  {"" + companionData?.email}
                </p>
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
                  <span className="room-title">
                    Acepto la invitación a compartir habitación
                  </span>
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
                  <span className="room-title">
                    Declino la invitación a compartir habitación
                  </span>
                </div>
                <button type="submit" className="btn-registro-decline">
                  CONFIRMAR ASISTENCIA
                </button>
                <div className="container-message-decline">
                  {message.text && (
                    <p
                      className={
                        message.type == "success"
                          ? "success-message-2"
                          : "error-message-2"
                      }
                    >
                      {message.text}
                    </p>
                  )}
                  {/* {
                    // Renderizado condicional
                    (loading ? <p>Cargando datos...</p> : "",
                    error ? <p>Error: {error}</p> : "",
                    !companionData ? (
                      <p className="error-message-2">
                        No se encontraron datos del acompañante.
                      </p>
                    ) : (
                      ""
                    ))
                  } */}
                </div>
              </div>
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
