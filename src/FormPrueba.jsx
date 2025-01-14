import { useRef } from "react";

const FormPrueba = () => {
  const captchaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.grecaptcha && captchaRef.current) {
      // Ejecutar reCAPTCHA invisible
      window.grecaptcha
        .execute(captchaRef.current.dataset.sitekey, { action: "submit" })
        .then((token) => {
          console.log("Captcha token:", token);

          // Enviar el token al backend para validarlo
          validateCaptcha(token);
        });
    } else {
      console.error("reCAPTCHA no está disponible.");
    }
  };

  const validateCaptcha = async (token) => {
    // Llamada al backend para validar el token
    try {
      const response = await fetch(
        "https:/apibbva.onrender.com/validate-captcha",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Captcha validado correctamente.");
      } else {
        alert("Error al validar el captcha: " + data.error);
      }
    } catch (error) {
      console.error("Error al validar el captcha:", error);
    }
  };

  return (
    <div>
      <h1>Formulario con reCAPTCHA Invisible</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" placeholder="Ingresa tu nombre" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Ingresa tu email" required />
        </div>

        {/* Contenedor del reCAPTCHA Invisible */}
        <div
          className="g-recaptcha"
          data-sitekey="6LcnprcqAAAAAAxYMaihpvEOJGSvmfAdQYSuPjBP" // Reemplaza con tu Site Key
          data-size="invisible"
          data-callback="onSubmit"
        ></div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormPrueba;
