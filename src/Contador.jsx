import { useState, useEffect } from "react";
import "./styles/contador.css";

const Contador = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-03-10T10:00:00"); // 10 de marzo, 1 PM
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / (1000 * 60)) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Limpiar intervalo al desmontar
  }, []);

  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <div className="line" key={interval}>
      <p>{timeLeft[interval].toString().padStart(2, "0")}</p>
      <p className="title-numbers">{interval}</p>
    </div>
  ));

  return (
    <div className="contador">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span style={{ color: "white", fontSize: "3rem", fontWeight: "900" }}>
          ¡Es Hoy!
        </span>
      )}
    </div>
  );
};

export default Contador;
