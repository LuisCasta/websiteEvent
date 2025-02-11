// console.log(userId);
export const fields = [
  // Título entre vuelos
  {
    id: "title_go",
    label: "Información de llegada",
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
    label: "Información de salida",
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
    label:
      "La habitación individual tendrá un costo adicional de $16,900.00 MXN",
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
      "¿Te gustaría compartir tu habitación con algún asistente específico? Al hacerlo autorizas que tu nombre y correo sea compartido con el destinatario",
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
