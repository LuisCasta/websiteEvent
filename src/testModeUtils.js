// testModeUtils.js
import { useSearchParams } from "react-router-dom";

// Función para obtener el estado de test mode
export const useIsTestMode = () => {
  const [searchParams] = useSearchParams();
  return searchParams.get("test") === "true";
};
