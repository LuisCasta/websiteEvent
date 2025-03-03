import Input from "./Input";
import BotonRegistro from "./BotonRegistro";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import "./styles/FormularioRegistro.css";
// import { useTestMode } from "./TestMode.jsx";

const FormularioRegistro = ({
  modo,
  setModo,
  onSubmit,
  error,
  message,
  formDataInput,
  handleChange,
  visible,
  date,
}) => {
  function onChange(value) {
    console.log("Captcha value:", value);
  }

  // const { isTestMode } = useTestMode();
  // Configuración de los campos y el enlace según el modo
  const obtenerCampos = () => {
    switch (modo) {
      case "crearCuenta":
        if (date == false) {
          return {
            campos: [
              { id: "email", placeholder: "Correo electrónico", type: "email" },
              { id: "password", placeholder: "Contraseña", type: "password" },
              {
                id: "confirmPassword",
                placeholder: "Confirmar tu contraseña",
                type: "password",
              },
            ],
            enlace: {
              message: "",
              texto: "¿Ya estás registrado? Inicia sesión",
              accion: () => setModo("iniciarSesion"),
            },
          };
        } else {
          return {
            campos: [],
            enlace: {
              message: "",
              texto: "Iniciar sesión",
              accion: () => {
                setModo("iniciarSesion");
              },
            },
          };
        }

      case "iniciarSesion":
        return {
          campos: [
            { id: "email", placeholder: "Correo electrónico", type: "email" },
            { id: "password", placeholder: "Contraseña", type: "password" },
          ],
          enlace: {
            message: "",
            texto: "¿Olvidaste tu contraseña?",
            accion: () => setModo("olvidoPassword"),
            text: "¿Aún no estás registrado? regístrate aquí.",
            action: () => setModo("crearCuenta"),
          },
        };
      case "olvidoPassword":
        return {
          campos: [
            { id: "email", placeholder: "Correo electrónico", type: "email" },
          ],
          enlace: {
            texto: "¿Aún no estás registrado? Regístrate",
            accion: () => setModo("crearCuenta"),
            accionIniciar: () => setModo("iniciarSesion"),
            textIniciar: "Iniciar sesión",
          },
        };
      default:
        return { campos: [], enlace: {} };
    }
  };

  const { campos, enlace } = obtenerCampos(); // Extraer campos y enlace dinámicos
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={
          modo == "crearCuenta" && date === true
            ? "no-register"
            : "contenedor-formulario-register"
        }
      >
        {modo === "crearCuenta" &&
          (date === true ? (
            <div className="message-form">
              <h3 className="title-no-register">Registro cerrado</h3>
              <p
                style={{
                  textAlign: "center",
                  marginBottom: "2.5rem",
                  color: "#ffffff",
                  fontSize: "1.8rem",
                }}
              >
                Agradecemos tu interés y aunque en
                <br />
                esta ocasión no nos acompañes, <br />
                seguro nos veremos en la próxima <br />
                <b
                  style={{
                    textAlign: "center",
                    marginBottom: "3rem",
                    color: "#ffffff",
                    fontSize: "2rem",
                  }}
                >
                  Convención GWM Finance, <br /> en alianza con BBVA.
                </b>
              </p>
            </div>
          ) : (
            <div className="message-form">
              <h3 className="call-title">Regístrate</h3>
              <p className="message-form-text">
                Conoce toda la información para participar en la
                <b> PRIMERA CONVENCIÓN GWM FINANCE 2025</b> en alianza con{" "}
                <b>BBVA.</b>
                <br /> <br /> Recuerda registrarte con tu correo de la agencia.
              </p>
            </div>
          ))}

        <form className="formulario" onSubmit={onSubmit}>
          <h2>
            {modo === "crearCuenta"
              ? ""
              : modo === "iniciarSesion"
              ? "Inicia Sesión"
              : "Recuperación de Contraseña"}
          </h2>
          {modo === "olvidoPassword" && (
            <div className="message-form">
              <p className="message-form-text-pw">
                Escribe tu correo electrónico y te llegará un e-mail con las
                indicaciones para recuperar tu contrseña.
              </p>
            </div>
          )}

          {campos.map((campo) => (
            <div key={campo.id}>
              <Input
                id={campo.id}
                type={campo.type}
                placeholder={campo.placeholder}
                value={formDataInput[campo.id] || ""} // Enlaza el valor al estado correspondiente
                onChange={handleChange} // Llama a handleChange cuando el valor cambie
                required
              />
            </div>
          ))}
          <div className="form-footer">
            {modo === "crearCuenta" &&
              (date === true ? (
                // Contenido alternativo cuando `date === true`
                <>
                  <button onClick={enlace.accion} className="btn-no-register">
                    Iniciar sesión
                  </button>
                </>
              ) : (
                // Contenido original cuando `date === false` o no está definido
                <>
                  <a
                    onClick={enlace.accion}
                    className="ready-btn-login"
                    id="login-btn-register"
                  >
                    {enlace.texto}
                  </a>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      style={{ width: "20px" }}
                      id="terms_label"
                      type="checkbox"
                      required
                    />
                    <label
                      style={{ fontSize: "0.7rem", color: "#2978b5" }}
                      htmlFor="terms_label"
                    >
                      Leí y acepto los{" "}
                      <a
                        style={{ color: "#2978b5" }}
                        target="_blank"
                        onClick={() => setIsOpen(true)}
                      >
                        <b>Términos y condiciones</b>
                      </a>
                    </label>
                  </div>
                  <p
                    style={{
                      fontWeight: "normal",
                      fontSize: "0.7rem",
                      color: "#2978b5",
                      textAlign: "left",
                    }}
                  >
                    Al continuar, otorgo mi consentimiento a BBVA México para
                    que trate mis datos personales de conformidad con el Aviso
                    de Privacidad.
                  </p>
                </>
              ))}

            {modo === "olvidoPassword" && (
              <div className="btn-init-container">
                <a
                  onClick={enlace.accionIniciar}
                  className="ready-btn-login-ini"
                  id="login-btn-init"
                >
                  {enlace.textIniciar}
                </a>
              </div>
            )}
            {modo === "iniciarSesion" && (
              <div className="btn-init-container">
                <a
                  onClick={enlace.action}
                  className="ready-btn-login-ini"
                  id="create-account"
                >
                  {enlace.text}
                </a>
                <a className="ready-btn-login-ini" onClick={enlace.accion}>
                  {enlace.texto}
                </a>
              </div>
            )}
          </div>
          <ReCAPTCHA
            sitekey="6LcnprcqAAAAAAxYMaihpvEOJGSvmfAdQYSuPjBP"
            onChange={onChange}
            size="invisible"
          />
          {!(modo === "crearCuenta" && date === true) && (
            <BotonRegistro modo={modo} date={date} />
          )}
          {error && visible && <p className="error-message">{error}</p>}
          {message && visible && (
            <p
              className={
                modo === "crearCuenta" ? "absolute-message" : "success-message"
              }
            >
              {modo === "crearCuenta"
                ? "Haz quedado registrado en nuestro sitio web Creando oportunidades 2025, en breve te haremos saber cuando puedes tener acceso para ver todas las características de este gran evento que estamos preparando para ti"
                : message}
            </p>
          )}
        </form>
      </div>
      <div className="container">
        {isOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>AVISO LEGAL Y TÉRMINOS Y CONDICIONES DEL SITIO WEB</h2>
              <p className="p-modal">
                INFORMACIÓN GENERAL: BBVA México, SA Institución de Banca
                Múltiple, (sucesivo BBVA México) es una Institución Delaware
                Banco Múltiple, que cuenta con las autorizaciones y permisos
                correspondientes para el direccionamiento de la plataforma.
                DATOS GENERALES Denominación social: AVISO LEGAL Y TÉRMINOS Y
                CONDICIONES del Sitio web (acelerandooportunidades2025.com) para
                lo Participantes de la Convención con GWN Finance PARA LOS
                PARTICIPANTES AVISO LEGAL Información general: BBVA México, SA
                Institución de Banca Múltiple, (sucesivo BBVA México) es una
                Institución de Crédito que cuenta con las autorizaciones y
                permisos correspondientes para el direccionamiento de la
                plataforma. DATOS GENERALES Denominación social: - BBVA México,
                SA Institución de Banca Múltiple, en lo sucesivo (BBVA México).
                Domicilio social: Avenida Paseo de la Reforma número 510,
                Colonia Juárez, Alcaldía Cuauhtémoc, C.P. 06600 en la Ciudad de
                México. TÉRMINOS Y CONDICIONES DEL SITIO WEB 1.- Objeto de los
                presentes Términos y Condiciones 1.1. Los presentes términos y
                condiciones (en adelante, los “Términos y Condiciones”)
                constituyen el acuerdo entre BBVA y el Participante (tal y como
                este término se define a continuación) y regulan el uso del
                Sitio Web “acelerandooportunidades2025.com” (en adelante, el
                “Sitio Web”). El Sitio Web es propiedad de (BBVA México) 1.2. El
                Sitio Web es un entorno digital creado por BBVA México para que
                el Participante pueda registrarse a la Convención celebrada por
                GMW en alianza con BBVA México, coordinar la inscripción
                hospedaje para la asistir a la Convención. 1.3. BBVA México
                informa a los Participantes que los presentes Términos y
                Condiciones han sido redactados por BBVA México, por lo que
                aquellas cuestiones que no vengan reguladas por una disposición
                de carácter general o específica que las haga de aplicación
                obligatoria, se consideran Condiciones Generales de la
                Contratación. La aceptación de los Términos y Condiciones por el
                Participante a lo indicado en el presente documento, implica que
                el Participante acepta la incorporación de dichas Condiciones
                Generales de la Contratación al presente contrato. 1.4. El sitio
                web le permitirá al Participante el acceso y uso de las
                funcionalidades que tiene BBVA México disponibles en ese momento
                (en adelante, la/s “Funcionalidad/es”), entre otras: •
                Inscribirse a la Convención, • Proporcionar los datos de los
                vuelos en los que viajaran los Participantes para llegar al
                lugar donde se va a llevar la Convención, para poder coordinar
                los traslados del aeropuerto-hotel y hotel aeropuerto, •
                Reservar su hospedaje de forma individual o con el acompañante
                con el que se coordine, • Aceptar la carta responsiva, • Acceder
                a la agenda de la Convención. 2.- Condiciones de Uso del Sitio
                Web 2.1 El Participante se obliga a hacer un buen uso del Sitio
                Web, entendiéndose por buen uso el que sea conforme con la
                legislación vigente, buena fe y orden público. Igualmente, se
                compromete a no usar el Sitio Web con conductas que pudiera
                dañar la imagen, los intereses y los derechos de BBVA México y
                de los demás Participantes. Asimismo, se compromete a no
                realizar acto alguno con objeto de dañar, inutilizar o
                sobrecargar el Sitio Web, o que impidiera, de cualquier forma,
                la normal utilización y funcionamiento del mismo modo. 2.2. Se
                informa al Participante que, en el caso, de incumplimiento al
                contenido o las obligaciones que se derivado de los presentes
                Términos y Condiciones o de cualesquiera otros términos o
                condiciones particulares recogidos en el Sitio Web, BBVA México
                se reserva el derecho a limitar, suspender o terminar su acceso
                al Sitio Web, adoptando cualquier medida técnica que sea
                necesaria con ese fin. Asimismo, BBVA México se reserva la
                posibilidad de ejercer tales medidas en el supuesto de que
                sospeche razonablemente que el Participante está vulnerando
                cualquiera de los términos recogidos en los Términos y
                Condiciones del Sitio Web o de los cualesquiera otros términos o
                condiciones particulares recogidos en el Sitio Web. 2.3. El
                Participante del Sitio Web se obliga a hacer uso del mismo de
                conformidad con lo dispuesto a continuación: (a) Hacer un buen
                uso del Sitio Web, entendiéndose por buen uso el que sea
                conforme con la legislación vigente, buena fe y orden público.
                (b) No dañar o inutilizar los equipos o sistemas informáticos de
                BBVA México o de terceros. Asimismo, sí comprometer a No impedir
                el acceso y la normal utilización de los Contenido incorporados.
                (c) No molestar, intimidar o acosar a ningún otro Participante
                del Sitio Web. (d) No utilizará el Sitio Web para actos
                ilícitos, engañosos, malintencionados o discriminatorios. (mi)
                No realizará ninguna acción que pudiera inhabilitar, sobrecargar
                o afectar al funcionamiento correcto o al aspecto del Sitio Web.
                (F) No realizará trabajos de ingeniería inversa o descompilación
                del código fuente del Sitio Web. 2.4. El Participante se
                compromete a seguir las recomendaciones de Seguridad elaboradas
                por BBVA México y accesible aquí. 3.- Contenido del Sitio Web El
                Participante mediante la aceptación de los Términos y
                Condiciones acepta que el uso de la plataforma solo es para las
                actividades mencionadas. Propiedad intelectual BBVA México es el
                legítimo licenciatario de los derechos de propiedad intelectual
                e industrial sobre el Sitio Web y los elementos que lo integran
                en cada momento, incluyendo gráficos, textos, fotografías,
                vídeos, archivos de sonido, marcas y otros signos distintivos,
                programas de ordenador y derechos sui generis sobre las bases de
                datos subyacentes, el diseño gráfico y la interfaz de
                Participante (aspecto y sensación) y los programas de ordenador
                subyacentes (incluidos los códigos fuente y objeto) (en
                adelante, los Contenidos). El uso del Sitio Web por el
                Participante NO le otorga derecho alguno sobre los derechos de
                propiedad intelectual e industrial sobre el Sitio Web y los
                Contenidos. A tal efecto, mediante las presentes Condiciones de
                Uso, salvo en aquellos supuestos en los que estén legalmente
                reproducción, transformación, distribución, comunicación
                pública, puesta a disposición, extracción y/o reutilización del
                Sitio Web y sus Contenidos. BBVA México se reserva el derecho de
                ejercer las acciones legales que corresponder contra los
                Participantes que violen o infrinjan los derechos de propiedad
                intelectual y/o industrial. Declaraciones BBVA México DECLARA lo
                siguiente: La información contenida en el Sitio Web tiene
                finalidad informativa, y no proporciona ningún tipo de
                recomendación, ni constituirá la base para una toma de decisión
                en una dirección determinada, declinando BBVA México toda
                responsabilidad por el uso que de la información contenida en el
                Sitio Web pueda hacerse en tal sentido, y de forma específica ha
                de entenderse que dicha información, sometida a la normativa
                vigente en México, no va destinada a aquellos Participante que
                actúan bajo otras jurisdicciones de otros Estados que exijan el
                cumplimiento de requisitos distintos para la puesta a
                disposición, divulgación o publicidad de dicha información, sino
                que algunas veces a los mexicanos. La información suministrada
                por BBVA México en el Sitio Web no constituye una opinión
                técnica, por lo que NO se hace responsable de que la información
                contenida en el Sitio Web responda a las expectativas del
                Participantes. BBVA México no responde de la veracidad,
                exactitud, suficiencia, integridad actualización de las
                informaciones que no sean de elaboración propia y de las que se
                indique otra fuente, en particular, de la veracidad de las
                ofertas que se muestren por los terceros ajenos al BBVA México.
                Tampoco se hace responsable BBVA México de las opiniones o
                comentarios que puedan aparecer en el Sitio Web ya que, o bien
                podrían ser realizadas por los Participantes un título personal,
                o bien provenir de las fuentes que se indican. BBVA México se
                reserva el derecho a actualizar, modificar o eliminar la
                información contenida en el Sitio Web en los términos señalados
                anteriormente, no asumiendo compromiso alguno de comunicar
                cambios ni modificar el contenido del mismo. El Participante
                RECONOCE Y ACEPTA las declaraciones anteriormente indicadas por
                BBVA México y GARANTIZA el cumplimiento de la legislación
                aplicable, así como los presentes términos y condiciones que le
                sean de aplicación en su condición de Participante de este sitio
                web. Responsabilidad Cada una de las partes será responsable
                frente a la otra de los daños y perjuicios derivados de
                incumplimientos de obligaciones asumidas en virtud de estos
                Términos y Condiciones. Ninguna de las partes será frente
                responsable a la otra en el supuesto de incumplimiento de dichas
                obligaciones basado en fuerza mayor o caso fortuito. El Sitio
                Web ha sido creado y diseñado por GRUPO MAYAMZA SA DE CV y su
                mantenimiento técnico es responsabilidad de este, por lo que
                GRUPO MAYAMZA SA DE CV dará mantenimiento y disponibilidad del
                Sitio Web directa o indirectamente generada por causas ajenas a
                GRUPO MAYAMZA SA DE CV por lo que realizará los mejores
                esfuerzos para asegurar la disponibilidad, sin interrupciones,
                del Sitio Web, así como la ausencia de errores en cualquier
                transmisión de información que pudiera tener lugar. No obstante,
                y debido a la misma naturaleza de Internet, no es posible
                garantizar tales extremos. Asimismo, tu acceso al Sitio Web
                pudiera ocasionalmente verse prohibido o restringido a efectos
                de la realización de trabajos reparación o mantenimiento. BBVA
                México no responde de la calidad de los servicios de transporte,
                hospedaje y horarios de vuelos y cancelaciones que se realicen
                por los prestadores del servicio y se tendrán que revisar de
                forma puntual con cada uno de ellos. como fuentes alternativas
                de información, ya que BBVA México ayuda en la organización a
                GWN Finance en la organización de conformidad a la Alianza
                comercial que tiene BBVA México y GWN Finance. 4.2. BBVA México
                se reserva el derecho a modificar, de forma parcial o total, los
                presentes Términos y Condiciones, así como a incluir otros
                nuevos. Los nuevos Términos y Condiciones se mostrarán al
                Participante, debiendo aceptarlos antes de poder acceder a las
                Funcionalidades. Una vez aceptadas las nuevas condiciones, el
                Participante podrá acceder a las Funcionalidades del Sitio Web.
                El Participante podrá consultar los Términos y Condiciones en
                cualquier momento, en la funcionalidad. 5.- Privacidad 5.1. Los
                datos incluidos por el Participante lo realizan de libremente al
                SitioWeb en el entendido que tienen como finalidad de que, a
                decisión de éste, haya incluido en su perfil del Sitio Web, se
                mostrarán por defecto en el perfil del Sitio Web. 5.2. El
                Participante completará su perfil, previamente a la celebración
                de la Convención siempre con información referente a su
                actividad comercial o profesional, la inclusión de los datos por
                parte del Participante al Sitio Web, está sujeto a las
                siguientes condiciones: a) No podrán incluirse en el Sitio Web
                contenidos referidos a confesiones religiosas o ideas políticas
                (incluidas declaraciones y símbolos de partidos políticos y
                organizaciones religiosas), ni antisociales, ni Ofensivos a
                valores culturales o religiosos, provocativos, despectivos,
                violentos, obscenos, sexuales y/o de grupos que no son
                socialmente aceptables o ilegales, así como cualquier otro que
                pueda herir la sensibilidad de terceras personas, vulnerar los
                derechos fundamentales y las libertades públicas reconocidas por
                la normativa aplicable y/o los establecidos en la legislación
                sobre derechos de los consumidores y Participante, sobre la
                protección de la infancia y la juventud, constituyen o suponer
                una intromisión en la intimidad personal o familiar de las
                personas físicas, La violación de su buena imagen, nombre,
                reputación y derecho al honor de terceros o del secreto de las
                comunicaciones. b) La inclusión de (i) direcciones de correo
                electrónico, nombres y apellidos, y cualquiera otro dato de
                personas físicas; (ii) Denominaciones o nombres comerciales de
                empresas, marcas, logos, logotipos, signos distintivos,
                anagramas, denominaciones, eslóganes, publicidad, material
                promocional, declaraciones sobre la autenticidad, marcas
                olímpicas y similares; el (iii) cualesquiera otros productos o
                soportes sujetos a derechos de difusión o reproducción
                (copyright) o protegidos por derechos de autor; queda
                condicionada a que el Participante correspondiente ostente la
                legitimación suficiente para que el contenido pueda ser
                utilizado tanto por él mismo como por BBVA México y el resto de
                Participantes, así como para que dicha utilización no vulnere
                ninguna previsión legal, contrato, derecho o propiedad de
                terceros, ni de ningún modo constituya competencia desleal. En
                consecuencia, por el hecho de incluir alguno de los contenidos
                anteriores, se entenderá que el Participante que lo incluye
                cuenta con la referida legitimación. El Contenido del Perfil del
                Participante reproducido en el Sitio Web y por tanto BBVA México
                no acepta responsabilidad alguna por el mismo. Queda bajo la
                responsabilidad exclusiva del Participante el uso o la confianza
                que pueda prestar al contenido o material reproducido a través
                del Sitio Web. La utilización de la información u otros
                materiales incluidos en el Sitio Web deberán ajustarse a las
                condiciones de uso que los titulares de las fuentes que se
                indican específicamente en sus correspondientes sitios web o
                ubicaciones originales. d) BBVA México no se hace responsable de
                aquellos actos de los Participante que puedan ser susceptibles
                de generar responsabilidad ni de los contenidos u opiniones que
                aquellos incorporan al Sitio web, siendo los Participantes los
                únicos responsables de la utilización que hagan del Sitio Web y
                de la información o contenidos incorporados, exonerándose
                consecuentemente BBVA México, con el alcance máximo permitido
                por la legislación aplicable, de cualquier responsabilidad
                derivada de dicha utilización. 5.4. El Participante deberá hacer
                uso diligente de la información de contacto de otros
                Participante a la que pueda acceder a través del Sitio Web. El
                Participante no podrá realizar, bajo ningún concepto, uso con
                fines de spam comercial a otros Participantes, esto será
                considerado como un incumplimiento de los Términos presentes y
                Condiciones y BBVA México se reserva el derecho de tomar las
                medidas correctoras que consideren oportunas, entre las que se
                encuentra la baja inmediata del Participantes en el Sitio Web,
                desde el mismo momento que tenga conocimiento de ello. 5.5. Los
                datos que facilite serán conservados durante el tiempo el tiempo
                del registros en el “SitioWeb” y posteriormente por el tiempo
                establecido por la legislación aplicable para el cumplimiento de
                la misma. 5.6.- BBVA México no comunicará los datos personales
                de los Participantes a terceros salvo que esté obligado por una
                ley, el Participante haya otorgado previamente su consentimiento
                o resultado necesario para la gestión de la presente relación
                contractual. 5.7.- El Sitio Web para brindar un mejor servicio
                utiliza cookies, a través de estos mecanismos se recaban datos
                de manera automática y simultánea para monitorear su
                comportamiento como Participante de nuestros servicios. Para
                mayor información respecto a las cookies, puedes consultar
                nuestra “Política de cookies” la cual se encuentra publicada en
                el Sitio Web. 5.8.- El Participante podrá modificar, actualizar
                o eliminar la información registrada en el Sitio Web en la
                siguiente dirección electrónica
                (info@acelerandooportunidades2025.com) o solicitándolo
                directamente a través desde la plataforma. 6.- Aceptación de los
                Términos y Condiciones, responsabilidad del Participante y
                resolución del contrato. 6.1. Las presentes Condiciones de Uso
                regulan la utilización del Sitio Web que BBVA México pone a
                disposición de los Participantes. Las Condiciones de Uso junto
                con el Aviso Legal, la Política de Protección de Datos
                Personales y la Política de Cookies constituyen en su conjunto
                los términos y condiciones que rigen el acceso y uso de la parte
                pública del Sitio Web (los Términos y Condiciones del Sitio
                Web). El acceso y utilización del Sitio Web por parte del
                Participante supone que éste acepta en su totalidad y se obliga
                a cumplir por completo los Términos y Condiciones del Sitio Web.
                Por lo tanto, debe leer atentamente los presentes Términos y
                Condiciones del Sitio Web en cada una de las ocasiones en que se
                proponga utilizar el Sitio Web, ya que éstos pueden sufrir
                modificaciones que serán comunicadas al Participantes con el
                nuevo acceso. BBVA México se reserva el derecho a actualizar,
                modificar o eliminar los Términos presentes y Condiciones del
                Sitio Web. Los presentes Términos y Condiciones serán
                vinculantes desde el momento de su aceptación por parte del
                Participante. 6.2. El Participante será responsable en los
                siguientes supuestos: a) Cuando no utilice el Sitio Web de
                conformidad con las condiciones establecidas en este documento.
                b) Cuando las claves de acceso a su perfil fueron utilizadas
                indebidamente por un tercero y el Participante no haya efectuado
                la notificación a BBVA México de dicha utilización no autorizada
                sin demora indebida es cuanto tenga conocimiento de ello o
                sospecha de que la misma se haya producido. 6.3. BBVA México no
                será responsable cuando se produzcan errores o fallos en la
                utilización del Sitio Web por el Participante como consecuencia
                de un funcionamiento defectuoso del hardware, software,
                dispositivos o terminales no facilitados por BBVA México. 6.4.
                Sin perjuicio de lo dispuesto en otros apartados de esté
                documento, BBVA México tendrá la facultad de resolver el
                presente acuerdo en cualquier momento, mediante comunicación
                previa al Participante con un (1) mes de antelación. 6.5. El
                Participante podrá resolver el presente contrato en cualquier
                momento. No obstante, esto no implicará automáticamente la baja
                como Participante en el Sitio Web. 7.- Otros aspectos
                importantes 7.1. En caso de que alguna de las disposiciones
                contenidas en los presentes Términos y Condiciones sea declarada
                nula, se procederá a la retirada o sustitución de la misma. En
                cualquier caso, dicha declaración de nulidad no afectará a la
                validez del resto de disposiciones recogidas en los presentes
                Términos y condiciones. 7.2 Si el Participante detecta algún
                comportamiento que vulnere los presentes Términos y Condiciones,
                deberá informar a BBVA México en la siguiente dirección:
                info@acelerandooportunidades2025.com. 8.- Ley aplicable El
                presente contrato se regirá por la ley mexicana, siendo
                competentes para la resolución de todos los conflictos o
                derivados relacionados con la presente Aplicación, los Juzgados
                y Tribunales Federales de la Ciudad de México. AVISO LEGAL Y
                TÉRMINOS Y CONDICIONES DEL SITIOWEB AVISO LEGAL Información
                general: Domicilio social: Avenida Paseo de la Reforma número
                510, Colonia Juárez, Alcaldía Cuauhtémoc, CP 06600 en la Ciudad
                de México.
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
    </>
  );
};
// Validación de props con PropTypes
FormularioRegistro.propTypes = {
  modo: PropTypes.string.isRequired, // La prop "modo" debe ser un string obligatorio
  setModo: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired, // La prop "setModo" debe ser una función obligatoria
  message: PropTypes.string,
  error: PropTypes.string,
  formDataInput: PropTypes.object.isRequired,
  handleChange: PropTypes.func,
  visible: PropTypes.bool,
  date: PropTypes.bool,
};

export default FormularioRegistro;
