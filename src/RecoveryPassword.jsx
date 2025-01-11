import { useState } from "react";
import Header from "./Header";
import slogan from "./assets/Slogan.png";
import camionetaNegra from "./assets/camionetaNegra.png";
import { recovery } from "./index.js";
import "./styles/recovery-password.css";
import { useSearchParams } from "react-router-dom";

const RecoveryPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Recupera el token de la URL
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
    token: "",
  });

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
    if (token == null || token == "" || token == undefined) {
      setMessage("Token no proporcionado o inválido.");
      return;
    }
    try {
      const result = await recovery({
        email: values.email,
        password: values.password,
        token: token,
      });
      result.message;
    } catch (err) {
      err.message; // Mostrar el mensaje de error
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
              <button className="btn-registro">CREAR NUEVA CONTRASEÑA</button>
              <p className={message ? "success-message" : ""}>
                {message ? <p>{message}</p> : ""}
              </p>
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
