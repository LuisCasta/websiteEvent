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
      // console.log(user.id);
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
                  <label htmlFor="opcion1">
                    Llegaré en avión al aeropuerto de Cancún
                  </label>
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
                    Llegaré en otro Transporte al aeropuerto de Cancún
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
                <h2>Deslinde de responsabilidades</h2>
                <p className="p-modal">
                  Quien suscribe, por mi propio derecho, declaro tener plena
                  capacidad física y jurídica, así como consentimiento libre
                  para obligarme en los siguientes términos: 1 . Acepto y
                  reconozco que durante los eventos a los que he sido invitado
                  podré, bajo mi propia y exclusiva responsabilidad, llevar a
                  cabo ciertas actividades que pudieran poner en riesgo mi salud
                  e integridad física y mental, así como la de las personas que
                  me acompañan, tales como (de manera enunciativa más no
                  limitativa) andar en bicicleta, bicicleta de montaña, correr o
                  trail running , practicar kayak, esquí acuático, senderismo,
                  asistir a eventos sociales y clubes nocturnos, pruebas de
                  manejo de patrocinadores entre otras, independientemente de si
                  las mismas son proporcionadas por BBVA BANCOMER, S.A.,
                  INSTITUCIÓN DE BANCA MÚLTIPLE, GRUPO FINANCIERO BBVA BANCOMER
                  (en lo sucesivo BBVA), terceros ajenos a BBVA, o decido
                  llevarlas a cabo por mí mismo. Al respecto, acepto los riesgos
                  inherentes que conlleva la realización de cada una de dichas
                  actividades, ya sea de manera directa o indirecta, y asumo
                  cualquier riesgo y responsabilidad, de cualquier naturaleza
                  (incluyendo civil, administrativa o incluso penal), que
                  derivada de las mismas pudiera surgir, aun si estos son
                  causados en todo o en parte por: a) la negligencia de las
                  personas a quienes en este acto libero de cualquier
                  responsabilidad; b) por la acción, omisión, actividad o
                  inactividad de otras personas que se hospedan en el evento
                  organizado por BBVA o las personas que me acompañan; c) por
                  las condiciones y distribución, en su caso, de los
                  establecimientos y equipos; d) por las condiciones climáticas
                  o, e) por la realización propia de cualquier actividad que el
                  suscrito quiera realizar. 2 . Asumo la responsabilidad
                  exclusiva de utilizar equipo necesario y adecuado para la
                  realización de cualquier actividad física, durante todo el
                  tiempo que dura la misma, así como a acatar cualquier y toda
                  regla o política, así como cualquier instrucción o limitación
                  que BBVA o el patrocinador o el personal de estos imponga para
                  llevarlas a cabo, incluso de manera verbal y al momento. 3 .
                  Declaro de forma honesta y bajo protesta de decir verdad, que:
                  (i) gozo de buena salud y no tengo ningún tipo de impedimento
                  físico o mental, así como que tampoco me encuentro o me
                  encontraré bajo la influencia de medicamentos, sustancias
                  tóxicas, embriagantes, enervantes o psicotrópicos que pudieran
                  agravar, complicar o limitar mis habilidades para desempeñar
                  cualquier actividad que se realice durante mi estancia en el
                  evento organizado por BBVA; y (ii) cuento con los
                  conocimientos básicos para poder desarrollar cualquiera de las
                  actividades que, en su caso pudiera realizar durante mi
                  estancia en el evento organizado por BBVA. En caso de no
                  contar con los conocimientos necesarios para realizar alguna
                  actividad me abstendré de efectuarla. 4 . Reconozco y acepto
                  que, en caso de contar con aparatos para la movilidad asistida
                  (muletas, sillas de ruedas, entre otros), aparatos
                  ortopédicos, yeso o férula, es y será en todo momento mi
                  responsabilidad el acceso y traslado o recorrido dentro o
                  fuera de las instalaciones del evento organizado por BBVA. 5 .
                  Me comprometo y obligo a no ingresar en ningún momento durante
                  mi estancia a ninguna área denominada, catalogada o acordonada
                  como “restringida(s)”. Comprendo y reconozco que el ingreso a
                  dichas áreas en contravención a lo anterior, pueden o pudieran
                  ocasionarme daños físicos o mentales, incluidos la invalidez
                  parcial o total, parálisis o incluso la muerte. 6 . Me
                  comprometo y obligo a no ingresar a las instalaciones
                  sustancias peligrosas, armas de fuego, armas blancas, bebidas
                  alcohólicas, sustancias nocivas o ilícitas tales como drogas o
                  sustancias que dañen o contaminen el medio ambiente. En caso
                  de ser sorprendido por BBVA o su personal con cualquiera de
                  las sustancias o armas enunciadas anteriormente, en caso de
                  ser aplicable, BBVA, sus representantes o personal, me podrán
                  poner a disposición de las autoridades correspondientes. 7 .
                  Reconozco y acepto que pueden existir otros riesgos que se
                  presenten durante mi estancia en el evento organziado por
                  BBVA, los cuales pueden ser o no conocidos por mí, inclusive
                  aquellos que se deriven por caso fortuito o fuerza mayor.
                  Desde este momento reconozco y acepto ser el único y completo
                  responsable y asumo todos los riesgos. Asimismo, reconozco y
                  acepto que BBVA no asumirá responsabilidad por ninguna
                  reclamación, costo o gasto producido por heridas personales o
                  de terceras personas, accidentes o deceso, lesiones de
                  cualquier tipo, pérdida o daños de objetos personales. 8 .
                  Reconozco y acepto que BBVA no asumirá responsabilidad alguna
                  y libero de toda responsabilidad a BBVA, así como de toda
                  reclamación, costo, gasto o pérdida que pudiera sufrir
                  incluyendo cualquier herida personal o de terceras personas,
                  accidentes o decesos, lesiones de cualquier tipo, daños o
                  pérdidas de pertenencias personales, resultado de cualquier
                  falla, falta o negligencia al no observar o no cumplir los
                  Términos y Condiciones, políticas, instrucciones,
                  recomendaciones y medias de seguridad proporcionadas en el
                  local del evento organizado por BBVA. Asimismo, asumo toda y
                  cualquier responsabilidad de naturaleza civil, administrativa
                  o penal por cualquier daño o perjuicio que se cause a
                  cualquier tercero, ya sea persona física o moral, por
                  cualquier acción en contrario u omisión a las reglas y
                  políticas establecidas en el local del evento organizado por
                  BBVA, así como a las instrucciones dadas, incluso de manera
                  verbal por el personal del local del evento organizado por
                  BBVA para llevar a cabo cualquier actividad dentro de las
                  instalaciones de BBVA. 9 . Conozco y acepto que dentro de las
                  instalaciones donde se llevara a cabo el evento organizado por
                  BBVA, por su naturaleza y ubicación, pudieran encontrarse
                  animales salvajes tales como víboras, alacranes, arañas entre
                  muchos otros. BBVA no es responsable por cualquier picadura o
                  mordedura que pudiera sufrir yo o en su caso la mascota que me
                  acompaña, de dichos animales, y no es su obligación
                  suministrar algún medicamento ya sea como prevención o
                  remedio. No obstante lo anterior, en caso de que BBVA cuente
                  en sus instalaciones con determinadas medicinas, el suministro
                  de las mismas es y será siempre mi responsabilidad, deslinando
                  a BBVA desde este momento por cualquier efecto primario o
                  secundario adverso o dañino para mi salud. 10 . Autorizo en
                  este acto a BBVA o a quienes ésta o sus empleados, directivos
                  o demás personal designen a que en caso que sufra algún
                  accidente o percance durante mi estancia en el local del
                  evento organizado por BBVA, se me brinde la atención médica
                  necesaria, así como que se me traslade al hospital más cercano
                  que BBVA designe, con la finalidad de que se me atienda, se me
                  suministre el medicamento que consideren conveniente para mi
                  salud o en su caso que se me realice la intervención
                  quirúrgica o los procedimientos médicos necesarios, haciendo
                  su mejor esfuerzo para salvaguardar mi salud y vida ,
                  deslindando de toda responsabilidad a BBVA, sus accionistas,
                  socios, subsidiarias, o cualquier persona física o moral parte
                  del mismo grupo empresarial, así como a cualquier persona que
                  actúe como empleado, guía, vigilancia o personal de BBVA (“
                  Terceros ”), por las acciones aquí referidas o por las
                  consecuencias inmediatas o futuras que se pudieran derivar de
                  cualquier accidente, lesión o percance durante mi estancia en
                  BBVA. 11 . Desde este momento renuncio expresamente a
                  cualquier reclamación, demanda o denuncia de naturaleza civil,
                  administrativa o incluso penal, por cualquier daño, perjuicio,
                  lesiones, daño moral o daño punitivo o incluso muerte que
                  pudiera sufrir durante mi estancia en BBVA, deslindando desde
                  ahora de toda y cualquier responsabilidad a BBVA y a los
                  Terceros arriba enunciados. Consecuentemente por medio de la
                  presente otorgo el finiquito más amplio que en derecho
                  corresponda a BBVA así como a los Terceros arriba mencionados
                  por cualquier inconveniente que pudiera surgir o sufrir
                  durante mi estancia en BBVA. 12 . Me comprometo expresamente
                  en instruir a mis familiares, acompañantes o representantes a
                  no ejercer acción legal alguna en contra de BBVA y demás
                  Terceros, así como a las personas de rescate, cualquier
                  personal que se encuentre en el área restringida, promotores,
                  patrocinadores, anunciantes, dueños y licenciatarios de los
                  permisos que estén directa o indirectamente relacionadas con
                  BBVA, vigilantes, consultores y cualquier otra persona o
                  entidad que tenga participación o emita recomendaciones,
                  indicaciones o instrucciones o que tomen parte en evaluación
                  de riesgos o actividades, de toda responsabilidad hacia mi
                  persona, hacia mis representantes, cesionarios, herederos y
                  familiares cercanos, de cualquier reclamación o acción legal
                  relativo a cualquier daño hacia mi persona, incluido pero no
                  limitado a la muerte, o al daño en propiedad, causadas o
                  supuestamente causadas en todo o en parte, incluso por
                  negligencia. 14 . Deslindo a BBVA y demás Terceros de
                  cualquier daño o perjuicio que pudiera sufrir en mi persona o
                  bienes por cualquier evento o caso fortuito que ocurra durante
                  mi estancia, señalando de manera enunciativa más no
                  limitativa, huracanes, tornados, tormentas, huelgas, ataques
                  terroristas. 13. Acepto que he leído y estoy de acuerdo con
                  los términos del Aviso de Privacidad, el cual he consultado en
                  la página web de www.BBVA.mx. 14. Reconozco que es mi
                  responsabilidad en caso de ser padre/madre o tutor del (los)
                  menor(es) de edad a mi cargo o que me acompañen, supervisar,
                  vigilar y atender en todo momento a los mismos, con la
                  finalidad de evitar accidentes, extravíos o cualquier tipo de
                  incidente que pudiera suscitarse por mi falta de atención,
                  supervisión y vigilancia, lo cual, en caso de originarse,
                  asumiré a mi entera y absoluta responsabilidad, deslindado de
                  toda responsabilidad que se pudiera atribuir a BBVA o a
                  cualquier tercero. 15 . Si derivado de lo estipulado en esta
                  liberación, yo o mi familia, herederos, sucesores cualquier
                  tercero relacionado con mi persona, realizamos alguna
                  reclamación en contra BBVA o los demás personas liberadas
                  mencionadas anteriormente, acordamos indemnizar y mantener en
                  paz y a salvo a BBVA y a cada uno de ellos de cualquier
                  responsabilidad judicial o extrajudicial, así como de
                  cualquier, gastos, honorarios de abogados o peritos
                  involucrados; en que pudieran incurrir debido a las acciones
                  legales o de cualquier otro tipo, realizadas en contra de los
                  liberados anteriormente mencionados. 16. Entiendo y acepto que
                  la presente carta de Deslinde de Responsabilidad tiene por
                  objeto ser tan extenso e inclusivo como la legislación
                  mexicana lo permita. 17. Acepto y reconozco que en caso de que
                  exista algún tipo de controversia la misma deberá ser dirimida
                  e interpretada de conformidad a la legislación aplicable en
                  México, bajo la jurisdicción y competencia de los tribunales
                  que corresponden ubicados en la Ciudad de México, Estados
                  Unidos Mexicanos, renunciando a cualquier otro fuero o
                  jurisdicción que pudiera corresponder en razón de domicilio,
                  presente o futuro o por cualquier otra razón. Habiendo leído y
                  estando al tanto de todos los términos y condiciones, habiendo
                  aceptado todos y cada uno de ellos, reconociendo no haber mala
                  fe, dolo o cualquier vicio de voluntad en la suscripción de la
                  presente.
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
