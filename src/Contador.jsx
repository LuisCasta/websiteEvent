import { useState, useEffect } from "react";
import "./styles/contador.css";

const Contador = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2025-03-10") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <div className="line" key={interval}>
        <p> {timeLeft[interval].toString().padStart(2, "0")}</p>
        <p className="title-numbers">{interval} </p>
      </div>
    );
  });

  return (
    <div className="contador">
      {timerComponents.length ? timerComponents : <span>¡Es Hoy!</span>}
    </div>
  );
};

export default Contador;
