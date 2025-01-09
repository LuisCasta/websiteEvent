import imgData from "./assets/datagral.png";
import dressCode from "./assets/code-dress.png";
import "./styles/generaldata.css";
import ref3 from "./assets/ref3.png";
const GeneralData = () => {
  return (
    <div>
      <div className="general-data">
        <div className="container-data">
          <div className="text-data">
            <h2>Datos generales del evento</h2>
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Lectus
              accumsan adipiscing ad volutpat felis. Magnis aliquam fusce
              consectetur torquent; ultricies vulputate laoreet. Elit fringilla
              rhoncus torquent suscipit netus class. Cursus sociosqu convallis
              facilisi pharetra nisl mollis convallis dignissim. Pulvinar
              porttitor ultricies turpis; euismod a semper. Per nulla molestie
              dolor potenti egestas. Lectus senectus posuere lectus lacus
              imperdiet litora auctor aptent. Varius augue fringilla fames
              cubilia laoreet. Interdum sociosqu amet sociosqu lobortis duis
              ornare; aliquet mi.
            </p>
          </div>
        </div>
        <img className="img-graldata" src={imgData} alt="" />
      </div>
      <div className="dress-code">
        <img className="img-dresscode" src={dressCode} alt="" />
        <div className="container-code-text">
          <div className="text-code">
            <h2>Código de vestimenta</h2>
            <ul className="list-code">
              <li>
                Te compartimos algunas recomendaciones clave para seguir un
                código de vestimenta Business Casual
              </li>
              <li>
                Nuestra recomendación para las mujeres es que puedan optar por
                blusas, camisas o tops, acompañados de pantalones, faldas o
                vestidos que sean apropiados para el evento.
              </li>
              <li>
                Para los hombres recomendamos el uso de camisas, pantalones
                informales o de vestir y zapatos apropiados para el evento.{" "}
              </li>
              <li>
                Lo más importante es que te sientas cómodo y puedas aportar a un
                ambiente profesional y armonioso.{" "}
              </li>
              <li>
                Para el rally, te recomendamos usar ropa deportiva adecuada,
                como pantalones cómodos, prendas diseñadas para hacer ejercicio
                y calzado deportivo que te brinde soporte y comodidad durante
                las actividades. Recuerda que las zonas del rally serán: Lobby
                del hotel, playa y alberca.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="general-data">
        <div className="container-data bkground-3">
          <div className="text-data">
            <h1>Tips para actividades</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ul>
              <li>Ut enim ad minim veniam, quis nostrud exercitation.</li>
              <li>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
              <li>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </li>
              <li>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </li>
            </ul>
          </div>
        </div>
        <img className="img-graldata" src={ref3} alt="" />
      </div>
    </div>
  );
};

export default GeneralData;
