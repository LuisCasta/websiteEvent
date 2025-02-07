import { useState, useEffect } from "react";
import "./styles/agenda.css";

const Agenda = () => {
  const [checkDay, setCheckDay] = useState("lunes");
  const [isVip, setIsVip] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.isVip === 1) {
      setIsVip(true);
    }
  }, []);
  const obtenerHorarioNoVip = () => {
    switch (checkDay) {
      case "lunes":
        return {
          horarios: [
            {
              horario: "12:00 - 15:00",
              text: <p className="p-horario">Check In en Grand Velas</p>,
            },
            {
              horario: "15:00 - 17:00",
              text: <p className="p-horario">Comida</p>,
            },
            {
              horario: "17:30 - 19:30",
              text: (
                <p className="p-horario">
                  Plenaria:
                  <br />
                  Pablo Sadek - Director Banca Automotriz BBVA México
                  <br />
                  Carlos Serrano - Economista en Jefe BBVA México
                </p>
              ),
            },
            {
              horario: "20:00 - 21:00",
              text: <p className="p-horario">Cóctel</p>,
            },
            {
              horario: "21:00 - 22:30",
              text: <p className="p-horario">Cena</p>,
            },
          ],
        };
      case "martes":
        return {
          horarios: [
            {
              horario: "08:00 - 09:00",
              text: <p className="p-horario">Desayuno</p>,
            },
            {
              horario: "09:00 - 10:00",
              text: <p className="p-horario">Presentación nuevos productos</p>,
            },
            {
              horario: "10:00 - 12:00",
              text: <p className="p-horario">Rally</p>,
            },
            {
              horario: "12:00 - 17:30",
              text: <p className="p-horario">Tiempo libre</p>,
            },
            {
              horario: "17:30 - 18:00",
              text: <p className="p-horario">Foto grupal</p>,
            },
            {
              horario: "18:00 - 18:30",
              text: <p className="p-horario">Cocktail</p>,
            },
            {
              horario: "18:30 - 23:00",
              text: <p className="p-horario">Cena de clausura y premiación</p>,
            },
          ],
        };
      case "miercoles":
        return {
          horarios: [
            {
              horario: "7:00 - 12:00",
              text: (
                <p className="p-horario">
                  Desayuno <br /> Check out <br /> Traslados de regreso
                </p>
              ),
            },
          ],
        };
      default:
        return { horario: [] };
    }
  };

  const obtenerHorarioVip = () => {
    switch (checkDay) {
      case "lunes":
        return {
          horarios: [
            {
              horario: "12:00 - 15:00",
              text: <p className="p-horario">Check In en Grand Velas</p>,
            },
            {
              horario: "15:00 - 17:00",
              text: <p className="p-horario">Comida</p>,
            },
            {
              horario: "17:30 - 19:30",
              text: (
                <p className="p-horario">
                  Plenaria:
                  <br />
                  Pablo Sadek - Director Banca Automotriz BBVA México
                  <br />
                  Carlos Serrano - Economista en Jefe BBVA México
                </p>
              ),
            },
            {
              horario: "20:00 - 21:00",
              text: <p className="p-horario">Cóctel</p>,
            },
            {
              horario: "21:00 - 22:30",
              text: <p className="p-horario">Cena Vip</p>,
            },
          ],
        };
      case "martes":
        return {
          horarios: [
            {
              horario: "09:00 - 11:00",
              text: (
                <p className="p-horario">
                  Desayuno. Ponencia Perspectivas Económicas. <br />
                  Carlos Serrano - Economista en Jefe BBVA México
                </p>
              ),
            },
            {
              horario: "11:00 - 15:00",
              text: <p className="p-horario">Experiencia con chef Michelin</p>,
            },
            {
              horario: "15:00 - 17:30",
              text: <p className="p-horario">Tiempo Libre</p>,
            },
            {
              horario: "17:30 - 18:00",
              text: <p className="p-horario">Foto grupal</p>,
            },
            {
              horario: "18:00 - 18:30",
              text: <p className="p-horario">Cóctel</p>,
            },
            {
              horario: "18:30 - 23:00",
              text: <p className="p-horario">Cena de clausura y premiación</p>,
            },
          ],
        };
      case "miercoles":
        return {
          horarios: [
            {
              horario: "7:00 - 12:00",
              text: (
                <p className="p-horario">
                  Desayuno <br /> Check out <br /> Traslados de regreso
                </p>
              ),
            },
          ],
        };
      default:
        return { horarios: [] };
    }
  };

  const { horarios } = isVip ? obtenerHorarioVip() : obtenerHorarioNoVip();

  return (
    <div className="container-agenda">
      <div className="content-agenda">
        <div className="div">
          <h2>{isVip ? "Agenda VIP" : "Agenda"} </h2>
          <p>
            ¡Descubre las emocionantes actividades que se han preparado para ti!
          </p>
        </div>
      </div>
      <div className="options-agenda">
        <div className="container-buttons">
          <button
            onClick={() => setCheckDay("lunes")}
            className={checkDay === "lunes" ? "active-color" : "color-grey"}
          >
            LUNES <br /> 10
          </button>
          <button
            onClick={() => setCheckDay("martes")}
            className={checkDay === "martes" ? "active-color" : "color-grey"}
          >
            MARTES <br /> 11
          </button>
          <button
            onClick={() => setCheckDay("miercoles")}
            className={checkDay === "miercoles" ? "active-color" : "color-grey"}
          >
            MIÉRCOLES <br /> 12
          </button>
        </div>
        <div className="horario">
          {horarios.map((horario, index) => (
            <div className="container-horario-check" key={index}>
              <p className="horario-class">{horario.horario}</p>
              {horario.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Agenda;
