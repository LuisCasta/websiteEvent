import "./styles/diagonalsection.css"; // Asegúrate de importar el CSS
import paso1 from "./assets/paso1.svg"; // Importa la imagen
import paso2 from "./assets/paso2.svg"; // Importa la imagen
import triangulo from "./assets/triangulo.svg"; // Importa la imagen
const DiagonalSection = () => {
  return (
    <>
      <div className="diagonal-section">
        <img className="triangulo" src={triangulo} alt="" />
        <div className="container-pasos">
          <img className="paso1" src={paso1} alt="" />
          <img className="paso2" src={paso2} alt="" />
        </div>
      </div>
    </>
  );
};

export default DiagonalSection;
