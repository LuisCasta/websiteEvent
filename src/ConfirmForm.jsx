import { useState, useEffect } from "react";
import slogan from "./assets/Slogan.png";
import azul from "./assets/auto_verde.png";
import { confirm } from "./index.js";
import "./styles/asistencia.css";
import PropTypes from "prop-types";
import { fields } from "./fields.js";
// import Header from "./Header.jsx";
import NavHome from "./Navhome.jsx";

const ConfirmForm = ({ onComplete }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChangeRadio = (e) => {
    setSelectedOption(e.target.value);
  };
  const [isOpen, setIsOpen] = useState(false);
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
    // // console.log(e.target);
    // setFormData((prev) => ({
    //   ...prev,
    //   [id]: type === "checkbox" ? checked : value,
    // }));
    setFormData((prev) => {
      // Lógica para checkboxes exclusivos
      if (id === "individual_room" && checked) {
        return {
          ...prev,
          individual_room: true,
          shared_room: false,
        };
      }
      if (id === "shared_room" && checked) {
        return {
          ...prev,
          shared_room: true,
          individual_room: false,
        };
      }

      return {
        ...prev,
        [id]: type === "checkbox" ? checked : value,
      };
    });
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
    if (!selectedOption) {
      setMessageData({
        text: "Por favor, selecciona un medio de llegada antes de continuar.",
        type: "error",
      });
      setTimeout(() => setMessageData(""), 5000);
      return;
    }

    // Validación 8: Fecha del vuelo de ida no debe ser mayor al 10 de marzo de 2025
    if (selectedFirstDate > limitDate) {
      setMessageData({
        text: "La fecha del vuelo de ida no deberá ser posterior al 10 de marzo, de lo contrario te perderás la convención.",
        type: "error",
      });

      setTimeout(() => setMessageData(""), 5000);
      // setTimeout(() => resetForm(), 4000);
      return;
    }
    // Validación 8: Fecha del vuelo de regreso no debe ser menor al 10 de marzo de 2025
    if (selectedLastDate < limitDate) {
      setMessageData({
        text: "La fecha del vuelo de regreso no debe ser menor al 10 de marzo, de lo contrario se perderá del evento.",
        type: "error",
      });

      setTimeout(() => setMessageData(""), 5000);
      // setTimeout(() => resetForm(), 4000);
      return;
    }
    // Validación específica: Hora del vuelo de ida antes de la 1:00 PM el 10 de marzo
    if (selectedFirstDate.toDateString() === limitDate.toDateString()) {
      const [hours, minutes] = firstBoardingTime.split(":").map(Number);
      if (hours >= 13 || (hours === 13 && minutes > 0)) {
        setMessageData({
          text: "Te recomendamos llegar al aeropuerto de Cancún antes de las 13:00 horas para tomar el transporte que te llevará hacia el hotel, de lo contrario el traslado será por su",
          type: "error",
        });
        setTimeout(() => setMessageData(""), 5000);
        // setTimeout(() => resetForm(), 4000);

        // return;
      }
    }
    // Validación específica: Hora del vuelo de ida antes de la 1:00 PM el 10 de marzo
    if (selectedFirstDate.toDateString() === limitDate.toDateString()) {
      const [hours, minutes] = firstBoardingTime.split(":").map(Number);
      if (hours > 13 || (hours === 13 && minutes > 0)) {
        setMessageData({
          text: "Te recomendamos llegar al aeropuerto de Cancún antes de las 13:00 horas para tomar el transporte que te llevará hacia el hotel, de lo contrario el traslado será por tu cuenta",
          type: "error",
        });
        setTimeout(() => setMessageData(""), 5000);
        // setTimeout(() => resetForm(), 4000);
      }
    }
    // Validación 10: Fecha del vuelo de regreso no menor a la de ida
    if (selectedLastDate < selectedFirstDate) {
      setMessageData({
        text: "La fecha del vuelo de regreso no puede ser anterior a la fecha del vuelo de ida.",
        type: "error",
      });
      setTimeout(() => setMessageData({ text: "", type: "" }), 5000);
      // setTimeout(() => resetForm(), 4000);
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
        arrivalType: selectedOption,
      });
      setTimeout(
        () =>
          setMessageData({
            text: "Espera un momento estamos confirmando tu asistencia...",
            type: "success",
          }),
        1000
      );
      setTimeout(() => {
        setMessageData({
          text: "Confirmación de asistencia exitosa. Si has solicitado una habitación compartida, en breve te notificaremos la respuesta.",
          type: "success",
        });
      }, 10000);

      setTimeout(
        () =>
          setMessageData({
            text: "Te rediccionaremos a la página de inicio",
            type: "success",
          }),
        17000
      );
      setTimeout(() => {
        setTimeout(() => setMessageData({ text: "", type: "" }), 17000);
        onComplete();
      }, 2000);

      setTimeout(() => resetForm(), 5000);
    } catch (err) {
      setTimeout(
        () => setMessageData({ text: err.message, type: "error" }),
        100
      );
      // setTimeout(() => resetForm(), 5000);
      setTimeout(() => setMessageData({ text: "", type: "" }), 5000);
      // setTimeout(() => resetForm(), 5000);
    }
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
      <NavHome />
      <main className="main">
        <div className="content-main">
          <img className="slogan-img-mov" src={slogan} alt="Slogan" />
          <div className="contenedor-formulario-confirm">
            <form className="formulario" onSubmit={manejarAccion}>
              <div className="message-form">
                <h4 className="call-title-form">Confirma tu asistencia</h4>
              </div>
              <h5>Por favor, seleccione el medio de su llegada</h5>
              <div className="type-form-choose">
                <div className="content-checkbox">
                  {" "}
                  <input
                    type="radio"
                    id="opcion1"
                    name="opcion"
                    value="1"
                    checked={selectedOption === "1"}
                    onChange={handleChangeRadio}
                  />
                  <label htmlFor="opcion1">Llegaré en avión</label>
                </div>
                <div className="content-checkbox">
                  <input
                    type="radio"
                    id="opcion2"
                    name="opcion"
                    value="2"
                    checked={selectedOption === "2"}
                    onChange={handleChangeRadio}
                  />
                  <label htmlFor="opcion2">Llegaré directo al Hotel</label>
                </div>
                <div className="content-checkbox">
                  <input
                    type="radio"
                    id="opcion3"
                    name="opcion"
                    value="3"
                    checked={selectedOption === "3"}
                    onChange={handleChangeRadio}
                  />{" "}
                  <label htmlFor="opcion3">
                    Llegaré en otro Transporte al aeropuerto
                  </label>
                </div>
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
                    <div key={field.id} className="warning">
                      <i className="bx bx-md bxs-error-circle bx-flip-vertical"></i>
                      <p className="form-warning">{field.label}</p>
                    </div>
                  );
                }

                // Determinar si el campo debe estar deshabilitado
                const isDisabled =
                  selectedOption !== "1" &&
                  ![
                    "date_outbound",
                    "boarding_time_outbound",
                    "date_return",
                    "boarding_time_return",
                    "individual_room",
                    "shared_room",
                    "companion_name",
                    "companion_email",
                  ].includes(field.id);

                return (
                  <div
                    key={field.id}
                    className={`${field.id} ${
                      isDisabled ? "disabled-field" : ""
                    }`}
                  >
                    {field.type === "checkbox" && (
                      <label key={field.label} htmlFor={field.id}>
                        {field.label}
                      </label>
                    )}
                    <input
                      className={field.class}
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
                      disabled={isDisabled}
                    />
                  </div>
                );
              })}

              <div className="label-terms">
                <input
                  required
                  className="create-type"
                  type="checkbox"
                  id="terminos"
                />
                <label htmlFor="terminos" onClick={() => setIsOpen(true)}>
                  Leí y acepto el{" "}
                  <b style={{ borderBottom: "1px solid #000" }}>
                    deslinde de responsabilidades
                  </b>
                </label>
              </div>
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
        <div className="container">
          {isOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Términos y condiciones</h2>
                <p>
                  Lorem ipsum odor amet, consectetuer adipiscing elit. Magna
                  quisque aliquam imperdiet quisque; nisl ultricies inceptos.
                  Sagittis auctor vitae sem; primis turpis congue vel? Vel
                  senectus vitae donec ipsum pellentesque eleifend fames. Nulla
                  orci ullamcorper nibh commodo egestas aliquet nascetur velit?
                  Lacinia fames ex a semper faucibus mauris faucibus. Gravida
                  curabitur facilisis venenatis felis phasellus placerat
                  vehicula. Efficitur est enim litora dolor nisi vestibulum. Est
                  sollicitudin faucibus blandit sapien ornare potenti cubilia.
                  Taciti sem nisi consequat ad curae platea tortor cubilia
                </p>
                <button
                  className="open-modal-btn"
                  onClick={() => setIsOpen(false)}
                >
                  continuar
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
ConfirmForm.propTypes = {
  onComplete: PropTypes.func,
};

export default ConfirmForm;
