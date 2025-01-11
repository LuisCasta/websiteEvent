// import { useEffect, useRef } from "react";
// import PropTypes from "prop-types";
// import { turnstile } from "react-turnstile";

// const Turnstile = ({ siteKey, onVerify, theme = "light" }) => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     Renderiza el widget de Turnstile
//     if (containerRef.current) {
//       turnstile.render(containerRef.current, {
//         sitekey: siteKey,
//         callback: onVerify, // Función a llamar cuando el token sea generado
//         theme: theme, // Opcional: 'light' o 'dark'
//       });
//     }
//   }, [siteKey, onVerify, theme]);

//   return <div ref={containerRef}></div>;
// };
// Turnstile.propTypes = {
//   siteKey: PropTypes.string,
//   onVerify: PropTypes.func,
//   theme: PropTypes.object,
// };
// export default Turnstile;
