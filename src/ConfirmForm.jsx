import { useState, useEffect } from "react";
import slogan from "./assets/Slogan.png";
import azul from "./assets/azul.png";
import { confirm } from "./index.js";
import "./styles/asistencia.css";
import PropTypes from "prop-types";
import { fields } from "./fields.js";
import Header from "./Header.jsx";

const ConfirmForm = ({ onComplete }) => {
  // const [searchParams] = useSearchParams();
  // const tokenParam = searchParams.get("token");
  const [messageData, setMessageData] = useState({
    text: "",
    type: "", // "success" o "error"
  }); // Estado para controlar la visibilidad

  // Estado para almacenar el userId
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Recuperar el dato de localStorage
    const userData = localStorage.getItem("user");

    if (userData) {
      // Parsear el JSON y obtener el id
      const user = JSON.parse(userData);
      setUserId(user.id); // Almacena el id en el estado
    }
  }, []);

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.id] = field.type === "checkbox" ? false : "";
      return acc;
    }, {})
  );

  const handleInputChange = (e) => {
    const { id, type, value, checked } = e.target;
    // console.log(e.target);
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const manejarAccion = async (e) => {
    e.preventDefault();
    const firstDate = formData.date_outbound; // Fecha de vuelo de ida
    const firstBoardingTime = formData.boarding_time_outbound; // Hora de abordaje de ida
    const lastDate = formData.date_return; // Fecha de vuelo de regreso

    // Fecha límite: 10 de marzo de 2025
    const limitDate = new Date("2025-03-10");
    const selectedFirstDate = new Date(firstDate);
    const selectedLastDate = new Date(lastDate);

    // Validación 8: Fecha del vuelo de ida no debe ser mayor al 10 de marzo de 2025
    if (selectedFirstDate > limitDate) {
      setMessageData({
        text: "La fecha del vuelo de ida no debe ser mayor al 10 de marzo, de lo contrario se perderá del evento.",
        type: "error",
      });

      setTimeout(() => setMessageData(""), 5000);
      setTimeout(() => resetForm(), 4000);

      return;
    }

    // Validación específica: Hora del vuelo de ida antes de la 1:00 PM el 10 de marzo
    if (selectedFirstDate.toDateString() === limitDate.toDateString()) {
      const [hours, minutes] = firstBoardingTime.split(":").map(Number);
      if (hours > 13 || (hours === 13 && minutes > 0)) {
        setMessageData({
          text: "Recuerde que debe estar antes de la 1:00 pm para poder asistir al evento.",
          type: "error",
        });
        setTimeout(() => setMessageData(""), 5000);
        setTimeout(() => resetForm(), 4000);

        return false;
      }
    }

    // Validación 10: Fecha del vuelo de regreso no menor a la de ida
    if (selectedLastDate < selectedFirstDate) {
      setMessageData({
        text: "La fecha del vuelo de regreso no puede ser anterior a la fecha del vuelo de ida.",
        type: "error",
      });
      setTimeout(() => setMessageData({ text: "", type: "" }), 5000);
      setTimeout(() => resetForm(), 4000);

      return;
    }

    try {
      await confirm({
        userId,
        firstNameAirline: formData.airline_outbound,
        firstFlightNumber: formData.flight_number_outbound,
        firstDate,
        firstBoardingTime,
        lastNameAirline: formData.airline_return,
        lastFlightNumber: formData.flight_number_return,
        lastDate,
        lastBoardingTime: formData.boarding_time_return,
        wantsRoom: formData.individual_room ? 1 : 0,
        wantsToShare: formData.shared_room ? 1 : 0,
        emailCompanion: formData.companion_email,
      });

      setMessageData({
        text: "Confirmación de asistencia exitosa. Si haz solicitado una habitación compartida, en breve te notificaremos la respuesta",
        type: "success",
      });
      setTimeout(() => setMessageData({ text: "", type: "" }), 5000);
      setTimeout(() => resetForm(), 5000);
    } catch (err) {
      setTimeout(
        () => setMessageData({ text: err.message, type: "error" }),
        100
      );
      setTimeout(() => resetForm(), 5000);
      setTimeout(
        () =>
          setMessageData({
            text: "Te rediccionaremos a la página de inicio",
            type: "success",
          }),
        3000
      );
      setTimeout(() => setMessageData({ text: "", type: "" }), 5000);
      setTimeout(() => resetForm(), 5000);
    }
    onComplete();
  };

  const resetForm = () => {
    setFormData(
      fields.reduce((acc, field) => {
        acc[field.id] = field.type === "checkbox" ? false : "";
        return acc;
      }, {})
    );
  };

  return (
    <>
      <Header />
      <main className="main">
        <div className="content-main">
          <img className="slogan-img-mov" src={slogan} alt="Slogan" />
          <div className="contenedor-formulario-confirm">
            <form className="formulario" onSubmit={manejarAccion}>
              <div className="message-form">
                <h4 className="call-title-form">Confirma tu asistencia</h4>
              </div>
              {fields.map((field) => {
                if (field.condition && !formData[field.condition]) {
                  return null;
                }

                if (field.type === "title") {
                  return (
                    <h4 key={field.id} className="form-title">
                      {field.label}
                    </h4>
                  );
                }

                if (field.type === "notice") {
                  return (
                    <p key={field.id} className="form-notice">
                      <b>Importante:</b>
                      {field.label}
                    </p>
                  );
                }

                if (field.type === "warning") {
                  return (
                    <>
                      <div key={field.id} className="warning">
                        <i className="bx bx-md bxs-error-circle bx-flip-vertical"></i>
                        <p className="form-warning">{field.label}</p>
                      </div>
                    </>
                  );
                }

                return (
                  <div key={field.id} className={field.id}>
                    {field.type === "checkbox" && (
                      <label key={field.label} htmlFor={field.id}>
                        {field.label}
                      </label>
                    )}
                    <input
                      className={field.class}
                      key={field.id}
                      id={field.id}
                      type={field.type}
                      value={
                        field.type === "checkbox"
                          ? undefined
                          : formData[field.id]
                      }
                      checked={
                        field.type === "checkbox"
                          ? formData[field.id]
                          : undefined
                      }
                      placeholder={field.label}
                      onChange={handleInputChange}
                      required={
                        ["text", "time", "date"].includes(field.type)
                          ? field.isRequired
                          : false
                      }
                    />
                  </div>
                );
              })}
              <button className="btn-registro">CONFIRMAR ASISTENCIA</button>
              {messageData.text && (
                <p
                  className={
                    messageData.type == "error"
                      ? "error-message-2"
                      : "success-message"
                  }
                >
                  {messageData.text}
                </p>
              )}
            </form>
          </div>
          <div className="main-message">
            <img className="slogan-img" src={slogan} alt="Slogan" />
            <div className="container-pickup">
              <img className="pickup-confirm" src={azul} alt="Pickup" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
ConfirmForm.propTypes = {
  onComplete: PropTypes.func,
};

export default ConfirmForm;
