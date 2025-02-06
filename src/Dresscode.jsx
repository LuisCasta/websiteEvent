import "../src/styles/dresscode.css";
import images from "../src/assets/images";
import { useEffect, useState } from "react";
const Dresscode = () => {
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="dresscode-container">
        <div className="content-dresscode">
          <h2>Código de vestimenta</h2>
          <div className="container-p">
            <p className="p-dresscode">
              Para disfrutar al máximo de las actividades, sugerimos el
              siguiente código:
            </p>
            <p className="p-dresscode">
              <b>Para el día:</b> ropa ligera, fresca y calzado cómodo.
            </p>
            <p className="p-dresscode">
              <b>Actividades en jardín:</b> ropa deportiva, tenis y gorra.{" "}
            </p>
            <p className="p-dresscode">
              <b>Cena de clausura:</b> Business casual con ropa de color negro.
            </p>
          </div>
          <div className="img-container-dresscode">
            <img
              src={isMobile ? images.mobilvestimenta : images.vestimenta}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dresscode;
