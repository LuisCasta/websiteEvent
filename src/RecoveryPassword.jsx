import { useState } from "react";
import slogan from "./assets/Slogan.png";
import images from "./assets/images.js";
import { recovery } from "./index.js";
import "./styles/recovery-password.css";
import { useSearchParams } from "react-router-dom";
import Turnstile from "react-turnstile";
import { useNavigate } from "react-router-dom";

const RecoveryPassword = () => {
  const navigate = useNavigate();
  const [messageData, setMessageData] = useState({
    text: "",
    type: "", // "success" o "error"
  }); // Estado para controlar la visibilidad
  const [visible, setVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const tokenParam = searchParams.get("token");
  // console.log(tokenParam); // Recupera el token de la URL
  // const [captchaToken, setCaptchaToken] = useState("");
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    token: "",
  });

  const handleCaptchaVerify = (captchaToken) => {
    console.log("Token generado:", captchaToken);
    // setCaptchaToken(captchaToken);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Función para manejar la acción del botón
  const manejarAccion = async (e) => {
    e.preventDefault();
    setVisible(true);
    let tokenP = tokenParam;

    if (tokenP == null || tokenP == undefined || tokenP == "") {
      setMessageData({
        text: "No hay token para validar la contraseña",
        type: "error",
      });
      setTimeout(() => setVisible(false), 5000);
      setTimeout(
        () => setValues({ password: "", confirmPassword: "" }), // Limpiar inputs
        5000
      );
      return;
    }

    if (tokenParam.endsWith(".")) {
      tokenP = tokenParam.slice(0, -1); // Eliminar el último carácter
    }

    // Envía el token junto con el formulario
    // console.log("Formulario enviado con token:", captchaToken);
    if (values.confirmPassword !== values.password) {
      setMessageData({
        text: "Las contraseñas no coinciden",
        type: "error",
      });
      setTimeout(() => setVisible(false), 5000);
      // setTimeout(() => setErrorMessage(""), 5000); // Limpia el mensaje después de 3 segundos
      return;
    }
    if (tokenP == null || tokenP == "" || tokenP == undefined) {
      setMessageData({
        text: "Token no proporcionado o inválido.",
        type: "error",
      });
      setTimeout(() => setVisible(false), 5000);
      setTimeout(
        () => setValues({ password: "", confirmPassword: "" }), // Limpiar inputs
        5000
      );
      return;
    }
    setMessageData({
      text: "Validando...",
      type: "success",
    });
    try {
      await recovery({
        password: values.password,
        token: tokenP,
      });

      // console.log(result);
      setTimeout(() => {
        setMessageData({
          text: "Contraseña actualizada con éxito",
          type: "success",
        });
      }, 100);
      setTimeout(() => {
        setMessageData({
          text: "Se te redigirá a la panatalla de Inicio de sesión",
          type: "success",
        });
      }, 4000);

      setTimeout(() => setVisible(false), 8000);
      setTimeout(
        () => setValues({ password: "", confirmPassword: "" }), // Limpiar inputs
        5000
      );

      setTimeout(() => navigate("/?iniciarsesion=true"), 8000);
    } catch (err) {
      setMessageData({
        text: err.message,
        type: "error",
      });
      setTimeout(() => setVisible(false), 5000);
      setTimeout(
        () => setValues({ password: "", confirmPassword: "" }), // Limpiar inputs
        5000
      );
    }
  };

  return (
    <>
      <main className="main-recovery">
        <div className="content-main-recovery">
          <img className="slogan-img-mov" src={slogan} alt="" />
          <div className="contenedor-formulario">
            <form className="formulario" onSubmit={manejarAccion}>
              <div className="message-form">
                <h3 className="call-title">Recuperación de contraseña</h3>
                <p className="message-form-text-pw">
                  Crea una nueva contraseña
                </p>
              </div>
              <div>
                <input
                  key="1"
                  className="input-container-recovery"
                  placeholder="Contraseña"
                  onChange={handleChange}
                  name="password"
                  type="password"
                  value={values.password}
                  required
                />
                <input
                  key="2"
                  className="input-container-recovery"
                  placeholder="Nueva contraseña"
                  onChange={handleChange}
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  required
                />
              </div>
              <Turnstile
                siteKey="0x4AAAAAAA5HdJNb8hGl-r8p" // Reemplaza con tu Site Key
                onVerify={handleCaptchaVerify}
                options={{
                  theme: "light", // Opcional: "light" o "dark"
                  size: "normal", // Opcional: "normal", "compact", "invisible"
                }}
              />
              <button className="btn-registro">CREAR NUEVA CONTRASEÑA</button>
              <div>
                {visible && messageData.text && (
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
              </div>
            </form>
          </div>
          <div className="main-message">
            <img className="slogan-img" src={slogan} alt="" />
            <div className="container-pickup">
              <img className="pickup" src={images.auto} alt="" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default RecoveryPassword;
