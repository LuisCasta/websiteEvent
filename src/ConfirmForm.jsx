import { useState } from "react";
import slogan from "./assets/Slogan.png";
import azul from "./assets/azul.png";
import { confirm } from "./index.js";
import "./styles/asistencia.css";
import { useSearchParams } from "react-router-dom";

const RecoveryPassword = () => {
  const [searchParams] = useSearchParams();
  const tokenParam = searchParams.get("token");
  const [message, setMessage] = useState("");

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
    },
    {
      id: "flight_number_outbound",
      label: "Número de vuelo",
      type: "text",
      class: "input",
    },
    { id: "date_outbound", label: "Fecha", type: "date", class: "input" },
    {
      id: "boarding_time_outbound",
      label: "Hora de abordaje (ida)",
      type: "time",
      class: "input",
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
    },
    {
      id: "flight_number_return",
      label: "Número de vuelo",
      type: "text",
      class: "input",
    },
    { id: "date_return", label: "Fecha", type: "date", class: "input" },
    {
      id: "boarding_time_return",
      label: "Hora de abordaje",
      type: "time",
      class: "input",
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
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const manejarAccion = async (e) => {
    e.preventDefault();
    let tokenP = tokenParam;
    if (!tokenP || tokenP.endsWith(".")) {
      tokenP = tokenP?.slice(0, -1) || "";
    }

    if (!tokenP) {
      setMessage("Token no proporcionado o inválido.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      const result = await confirm({ token: tokenP });
      setMessage(result.message || "Confirmación exitosa.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error al confirmar." + err);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <>
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
                      <div className="warning">
                        <i className="bx bx-md bxs-error-circle bx-flip-vertical"></i>
                        <p key={field.id} className="form-warning">
                          {field.label}
                        </p>
                      </div>
                    </>
                  );
                }

                return (
                  <div key={field.id} className={field.id}>
                    {field.type === "checkbox" && (
                      <label htmlFor={field.id}>{field.label}</label>
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

export default RecoveryPassword;
