import "../src/styles/consejos.css";
import images from "./assets/images";
import { useEffect, useState } from "react";
const Consejos = () => {
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
      <div className="consejo-container">
        <div className="content-consejo">
          <div className="text-consejo">
            <h2>Consejos para tu estancia</h2>
            <h3>
              Estamos calentando motores para recibirte a la <br />{" "}
              <b>PRIMERA CONVENCIÓN GWM FINANCE 2025</b>, en alianza con BBVA.
            </h3>
          </div>
          <div className="container-p-consejo">
            <p className="p-consejo">
              Saca el mayor provecho durante tu estancia y disfruta en grande.
            </p>
            <p className="p-consejo">
              <b style={{ color: "#09c5c5" }}>Disfruta del clima:</b> prepárate
              con la ropa adecuada.
            </p>
            <p className="p-consejo">
              <b style={{ color: "#09c5c5" }}>
                Participa en todas la actividades:{" "}
              </b>{" "}
              interactúa con tus compañeros, mantente activo <br /> durante la
              plenaria y diviértete con las actividades para aprovechar al
              máximo.{" "}
            </p>
            <p className="p-consejo">
              <b style={{ color: "#09c5c5" }}>Tiempo libre: </b> sal a caminar
              por el hotel, conoce gente, toma una bebida refrescante o <br />{" "}
              descansa para recargar energía y continuar con las actividades.
            </p>
          </div>
          <div className="img-container-consejo">
            <img src={isMobile ? images.beach : images.consejos} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Consejos;
