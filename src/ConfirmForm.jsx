import { useState, useEffect } from "react";
import slogan from "./assets/Slogan.png";
import azul from "./assets/azul.png";
import { confirm } from "./index.js";
import "./styles/asistencia.css";
import PropTypes from "prop-types";
// import { useSearchParams } from "react-router-dom";
import Header from "./Header.jsx";

const ConfirmForm = ({ onComplete }) => {
  // const [searchParams] = useSearchParams();
  // const tokenParam = searchParams.get("token");
  const [message, setMessage] = useState("");
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

  // console.log(userId);
  const fields = [
    // Título entre vuelos
    {
      id: "title_go",
      label: "Información del vuelo de ida",
      type: "title",
    },
    // Información del vuelo de ida
    {
      id: "airline_outbound",
      label: "Nombre de la aerolínea",
      type: "text",
      class: "input",
      isRequired: "required",
    },
    {
      id: "flight_number_outbound",
      label: "Número de vuelo",
      type: "text",
      class: "input",
      isRequired: "required",
    },
    {
      id: "date_outbound",
      label: "Fecha",
      type: "date",
      class: "input",
      isRequired: "required",
    },
    {
      id: "boarding_time_outbound",
      label: "Hora de abordaje (ida)",
      type: "time",
      class: "input",
      isRequired: "required",
    },
    // Título entre vuelos
    {
      id: "title_return",
      label: "Información del vuelo de regreso",
      type: "title",
    },
    // Información del vuelo de regreso
    {
      id: "airline_return",
      label: "Nombre de la aerolínea",
      type: "text",
      class: "input",
      isRequired: "required",
    },
    {
      id: "flight_number_return",
      label: "Número de vuelo",
      type: "text",
      class: "input",
      isRequired: "required",
    },
    {
      id: "date_return",
      label: "Fecha",
      type: "date",
      class: "input",
      isRequired: "required",
    },
    {
      id: "boarding_time_return",
      label: "Hora de abordaje",
      type: "time",
      class: "input",
      isRequired: "required",
    },
    // Aviso antes de las preguntas adicionales
    {
      id: "notice_questions",
      label:
        " Las habitaciones reservadas serán compartidas con los asistentes del evento. En caso de preferir una habitación individual, tendrá un cargo adicional que correrá por cuenta de los asistentes.",
      type: "notice",
    },
    {
      id: "notice_price",
      label: "La habitación individual tendrá un costo adicional de $0.00 MXN",
      type: "warning",
    },
    // Preguntas adicionales
    {
      id: "individual_room",
      label: "¿Te gustaría que reservemos una habitación individual para ti?",
      type: "checkbox",
      class: "input",
    },
    {
      id: "shared_room",
      label:
        "¿Te gustaría compartir tu habitación con algún asistente específico?",
      type: "checkbox",
      class: "input",
    },
    // Información del acompañante
    {
      id: "companion_name",
      label: "Nombre del acompañante",
      type: "text",
      condition: "shared_room",
      class: "input",
    },
    {
      id: "companion_email",
      label: "Correo electrónico del acompañante",
      type: "email",
      condition: "shared_room",
      class: "input",
    },
  ];

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.id] = field.type === "checkbox" ? false : "";
      return acc;
    }, {})
  );

  const handleInputChange = (e) => {
    const { id, type, value, checked } = e.target;
    console.log(e.target);
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const manejarAccion = async (e) => {
    e.preventDefault();
    const firstNameAirline = formData.airline_outbound; // Nombre de la aerolínea de ida
    const firstFlightNumber = formData.flight_number_outbound; // Número de vuelo de ida
    const firstDate = formData.date_outbound; // Fecha de vuelo de ida
    const firstBoardingTime = formData.boarding_time_outbound; // Hora de abordaje de ida
    const lastNameAirline = formData.airline_return; // Nombre de la aerolínea de regreso
    const lastFlightNumber = formData.flight_number_return; // Número de vuelo de regreso
    const lastDate = formData.date_return; // Fecha de vuelo de regreso
    const lastBoardingTime = formData.boarding_time_return; // Hora de abordaje de regreso
    const wantsRoom = formData.individual_room ? 1 : 0; // Si quiere habitación individual
    const wantsToShare = formData.shared_room ? 1 : 0; // Si quiere compartir habitación
    const emailCompanion = formData.companion_email; // Correo electrónico del acompañante
    // const nameCompanion = formData.companion_email; // Correo electrónico del acompañante

    try {
      const result = await confirm({
        userId,
        firstNameAirline,
        firstFlightNumber,
        firstDate,
        firstBoardingTime,
        lastNameAirline,
        lastFlightNumber,
        lastDate,
        lastBoardingTime,
        wantsRoom,
        wantsToShare,
        emailCompanion,
      });

      // VALIDACIÓN DE IDA
      if (
        firstNameAirline == "" ||
        firstNameAirline == undefined ||
        firstNameAirline == null
      ) {
        setMessage("Nombre de la Aerolínea(ida) no proporcionado o inválido.");
        setTimeout(() => setMessage(""), 5000);
        return;
      }

      if (
        firstFlightNumber == "" ||
        firstFlightNumber == undefined ||
        firstFlightNumber == null
      ) {
        setMessage("Número de vuelo(ida) no proporcionado o inválido.");
        setTimeout(() => setMessage(""), 5000);
        return;
      }

      if (firstDate == "" || firstDate == undefined || firstDate == null) {
        setMessage("Fecha de vuelo(ida) no proporcionado o inválido.");
        setTimeout(() => setMessage(""), 5000);
        return;
      }

      if (
        firstBoardingTime == "" ||
        firstBoardingTime == undefined ||
        firstBoardingTime == null
      ) {
        setMessage("Hora de vuelo(ida) no proporcionado o inválido.");
        setTimeout(() => setMessage(""), 5000);
        return;
      }
      // VALIDACIÓN DE VUELOS DE VUELTA
      if (
        lastNameAirline == "" ||
        lastNameAirline == undefined ||
        lastNameAirline == null
      ) {
        setMessage(
          "Nombre de la Aerolínea(vuelta) no proporcionado o inválido."
        );
        setTimeout(() => setMessage(""), 5000);
        return;
      }

      if (
        lastFlightNumber == "" ||
        lastFlightNumber == undefined ||
        lastFlightNumber == null
      ) {
        setMessage("Número de vuelo(vuelta) no proporcionado o inválido.");
        setTimeout(() => setMessage(""), 5000);
        return;
      }

      if (lastDate == "" || lastDate == undefined || lastDate == null) {
        setMessage("Fecha de vuelo(vuelta) no proporcionado o inválido.");
        setTimeout(() => setMessage(""), 5000);
        return;
      }

      if (
        lastBoardingTime == "" ||
        lastBoardingTime == undefined ||
        lastBoardingTime == null
      ) {
        setMessage("Hora de vuelo(vuelta) no proporcionado o inválido.");
        setTimeout(() => setMessage(""), 5000);
        return;
      }
      if (
        wantsToShare == "" ||
        wantsToShare == undefined ||
        wantsToShare == null
      ) {
        setMessage(
          "Información sobre compartir habitación no proporcionado o inválido."
        );
        setTimeout(() => setMessage(""), 5000);
        return;
      }
      if (wantsRoom == "" || wantsRoom == undefined || wantsRoom == null) {
        setMessage(
          "Información sobre habitación individual no proporcionado o inválido."
        );
        setTimeout(() => setMessage(""), 5000);
        return;
      }

      setMessage(result.message || "Confirmación exitosa.");
      setTimeout(() => setMessage(""), 5000);
      setTimeout(() => resetForm(), 5000);
    } catch (err) {
      setMessage(err.toString());
      setTimeout(() => setMessage(""), 5000);
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
                // if (
                //   field.type === "text" ||
                //   field.type === "date" ||
                //   field.type === "time"
                // ) {

                // }
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
                    />
                  </div>
                );
              })}
              <button className="btn-registro">CONFIRMAR ASISTENCIA</button>
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
ConfirmForm.propTypes = {
  onComplete: PropTypes.func,
};

export default ConfirmForm;
