import axios from "axios";

const API_URL = "https://apibbva.onrender.com/api/auth/register";

// Función para registrar un usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData, {
      headers: {
        "Content-Type": "application/json", // Si la API requiere JSON
      },
    });
    return response.data; // Devolver los datos de la respuesta
  } catch (error) {
    // Manejar errores y devolver un mensaje adecuado
    if (error.response) {
      // Errores que vienen del servidor
      throw new Error(
        error.response.data.message || "Error al registrar usuario"
      );
    } else if (error.request) {
      // No se recibió respuesta del servidor
      throw new Error("No se pudo conectar al servidor");
    } else {
      // Otros errores
      throw new Error("Error desconocido: " + error.message);
    }
  }
};

const API_URL_RECOVERY_EMAIL =
  "https://apibbva.onrender.com/api/auth/forgot-password";

// Función para recuperar password 1er vista
export const emailToken = async (userData) => {
  try {
    const response = await axios.post(API_URL_RECOVERY_EMAIL, userData, {
      headers: {
        "Content-Type": "application/json", // Si la API requiere JSON
      },
    });
    return response.data; // Devolver los datos de la respuesta
  } catch (error) {
    // Manejar errores y devolver un mensaje adecuado
    if (error.response) {
      // Errores que vienen del servidor
      throw new Error(
        error.response.data.message || "Error al cambiar contraseña"
      );
    } else if (error.request) {
      // No se recibió respuesta del servidor
      throw new Error("No se pudo conectar al servidor");
    } else {
      // Otros errores
      throw new Error("Error desconocido: " + error.message);
    }
  }
};

const API_URL_RECOVERY =
  "https://apibbva.onrender.com/api/auth/update-password";

// Función para recuperar 2da vista
export const recovery = async (userData) => {
  try {
    const response = await axios.patch(API_URL_RECOVERY, userData, {
      headers: {
        "Content-Type": "application/json", // Si la API requiere JSON
      },
    });
    return response.data; // Devolver los datos de la respuesta
  } catch (error) {
    // Manejar errores y devolver un mensaje adecuado
    if (error.response) {
      // Errores que vienen del servidor
      throw new Error(
        error.response.data.message || "Error al cambiar contraseña"
      );
    } else if (error.request) {
      // No se recibió respuesta del servidor
      throw new Error("No se pudo conectar al servidor");
    } else {
      // Otros errores
      throw new Error("Error desconocido: " + error.message);
    }
  }
};
