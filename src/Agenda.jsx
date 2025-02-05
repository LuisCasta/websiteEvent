import { useState } from "react";
import "./styles/agenda.css";

const Agenda = () => {
  const [checkDay, setCheckDay] = useState("lunes");
  const obtenerHorario = () => {
    switch (checkDay) {
      case "lunes":
        return {
          calendario: [
            { horario: "12:00 - 15:00", text: "Check In en Grand Velas" },
            { horario: "15:00 - 17:00", text: "Comida" },
            {
              horario: "17:00 - 17:30",
              text: "Tiempo libre para arreglo personal",
            },
            {
              horario: "17:30 - 19:30",
              text: "Plenaria",
            },
            {
              horario: "19:30 - 19:45",
              text: "Traslados a Terraza del Mar",
            },
            {
              horario: "20:00 - 21:00",
              text: "Coctel",
            },
            {
              horario: "21:00 - 22:30",
              text: "Cena",
            },
          ],
        };
      case "martes":
        return {
          calendario: [
            { horario: "12:00 - 15:00", text: "Check In en Grand Velas" },
            { horario: "15:00 - 17:00", text: "Comida" },
            {
              horario: "17:00 - 17:30",
              text: "Tiempo libre para arreglo personal",
            },
            {
              horario: "17:30 - 19:30",
              text: "Plenaria",
            },
            {
              horario: "19:30 - 19:45",
              text: "Traslados a Terraza del Mar",
            },
            {
              horario: "20:00 - 21:00",
              text: "Coctel",
            },
            {
              horario: "21:00 - 22:30",
              text: "Cena",
            },
          ],
        };
      case "miercoles":
        return {
          calendario: [
            { horario: "12:00 - 15:00", text: "Check In en Grand Velas" },
            { horario: "15:00 - 17:00", text: "Comida" },
            {
              horario: "17:00 - 17:30",
              text: "Tiempo libre para arreglo personal",
            },
            {
              horario: "17:30 - 19:30",
              text: "Plenaria",
            },
            {
              horario: "19:30 - 19:45",
              text: "Traslados a Terraza del Mar",
            },
            {
              horario: "20:00 - 21:00",
              text: "Coctel",
            },
            {
              horario: "21:00 - 22:30",
              text: "Cena",
            },
          ],
        };
      default:
        return { horario: [] };
    }
  };
  const { calendario } = obtenerHorario();
  //   console.log(calendario);
  return (
    <>
      <div className="container-agenda">
        <div className="content-agenda">
          <div className="div">
            <h2>Agenda</h2>
            <p>
              ¡Descubre las emocionantes actividades que se ha preparado para
              ti!
            </p>
          </div>
        </div>
        <div className="options-agenda">
          <div className="container-buttons">
            <button>
              Lunes <br /> 11
            </button>
            <button>
              Martes <br /> 12
            </button>
            <button>
              Miércoles <br /> 13
            </button>
          </div>
          <table>
            {/* {calendario.map((horario) => {
              //   <th>{horario.horario}</th>;
              <p>{horario.text}</p>;
            })} */}
          </table>
        </div>
      </div>
    </>
  );
};
export default Agenda;
