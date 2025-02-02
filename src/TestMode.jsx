import { createContext, useContext } from "react";
import { useIsTestMode } from "./testModeUtils.js"; // Importamos la función externa
import PropTypes from "prop-types";
const TestModeContext = createContext();

export const TestModeProvider = ({ children }) => {
  const isTestMode = useIsTestMode(); // Usamos la función para obtener el estado

  return (
    <TestModeContext.Provider value={{ isTestMode }}>
      {children}
    </TestModeContext.Provider>
  );
};
TestModeProvider.propTypes = {
  children: PropTypes.object,
};

export const useTestMode = () => useContext(TestModeContext);
