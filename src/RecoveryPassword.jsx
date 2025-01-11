import { useState } from "react";
import Header from "./Header";
import slogan from "./assets/Slogan.png";
import camionetaNegra from "./assets/camionetaNegra.png";
import { recovery } from "./index.js";
import "./styles/recovery-password.css";
import { useSearchParams } from "react-router-dom";
import { Turnstile } from "@marsidev/react-turnstile";

const RecoveryPassword = () => {
  const [searchParams] = useSearchParams();
  const tokenParam = searchParams.get("token"); // Recupera el token de la URL
  const [captchaToken, setCaptchaToken] = useState("");
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
    token: "",
  });

  const handleCaptchaVerify = (captchaToken) => {
    console.log("Token generado:", captchaToken);
    setCaptchaToken(captchaToken);
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
    e.preventDefault();
    if (!captchaToken) {
      alert("Por favor, completa el CAPTCHA");
      return;
    }
    // Envía el token junto con el formulario
    console.log("Formulario enviado con token:", captchaToken);
    if (!tokenParam) {
      setMessage("Token no proporcionado o inválido.");
      setTimeout(() => setMessage(""), 3000); // Limpia el mensaje después de 3 segundos
      return;
    }
    if (tokenParam == null || tokenParam == "" || tokenParam == undefined) {
      setMessage("Token no proporcionado o inválido.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    try {
      const result = await recovery({
        email: values.email,
        password: values.password,
        token: tokenParam,
      });
      result.message;
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      err.message;
      setTimeout(() => setMessage(""), 3000); // Mostrar el mensaje de error
    }
  };

  return (
    <>
      <Header />
      <main className="main">
        <div className="content-main">
          <img className="slogan-img-mov" src={slogan} alt="" />
          <div className="contenedor-formulario">
            <form className="formulario" action="" onSubmit={manejarAccion}>
              <div className="message-form">
                <h3 className="call-title">Recuperación de contraseña</h3>
                <p className="message-form-text-pw">
                  Crea una nueva contraseña
                </p>
              </div>
              <div>
                <input
                  className="input-container"
                  placeholder="Correo electrónico"
                  onChange={handleChange}
                  name="email"
                  type="text"
                  value={values.email}
                  required
                />
                <input
                  className="input-container"
                  placeholder="Nueva contraseña"
                  onChange={handleChange}
                  type="password"
                  name="password"
                  value={values.password}
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
              <div className={message ? "success-message" : ""}>
                {message ? <p>{message}</p> : ""}
              </div>
            </form>
          </div>
          <div className="main-message">
            <img className="slogan-img" src={slogan} alt="" />
            <div className="container-pickup">
              <img className="pickup" src={camionetaNegra} alt="" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default RecoveryPassword;
