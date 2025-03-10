import axios from "axios";

const API_URL = "https://events-production-4a8f.up.railway.app/api/auth/register";

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
  "https://events-production-4a8f.up.railway.app/api/auth/forgot-password";

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
  "https://events-production-4a8f.up.railway.app/api/auth/update-password";

// Función para recuperar 2da vista
export const recovery = async (userData) => {
  try {
    const response = await axios.post(API_URL_RECOVERY, userData, {
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
export const siteKey = "0x4AAAAAAA5HdJNb8hGl-r8p";
export const validateCaptcha = async (captchaToken) => {
  try {
    const response = await axios.post(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      new URLSearchParams({
        secret: siteKey,
        response: captchaToken,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.success;
  } catch (error) {
    console.error("Error al validar CAPTCHA:", error.message);
    throw new Error("Error en la validación del CAPTCHA.");
  }
};

const API_LOGIN = "https://events-production-4a8f.up.railway.app/api/auth/login";
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(API_LOGIN, userData, {
      headers: {
        "Content-Type": "application/json", // Si la API requiere JSON
      },
    });
    return response.data;
    // Devolver los datos de la respuesta
  } catch (error) {
    // Manejar errores y devolver un mensaje adecuado
    if (error.response) {
      // Errores que vienen del servidor
      throw new Error(error.response.data.message || "Error al iniciar sesión");
    } else if (error.request) {
      // No se recibió respuesta del servidor
      throw new Error("No se pudo conectar al servidor");
    } else {
      // Otros errores
      throw new Error("Error desconocido: " + error.message);
    }
  }
};

const API_CONFIRM = "https://events-production-4a8f.up.railway.app/api/event/confirm";

// Función para confirmar asistencia
export const confirm = async (userData) => {
  try {
    const response = await axios.post(API_CONFIRM, userData, {
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
        error.response.data.message || "Error al confirmar usuario"
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

const API_CONFIRM_DECLINE =
  "https://events-production-4a8f.up.railway.app/api/event/confirmOrDecline";

// Función para confirmar asistencia
export const confirmDecline = async (userData) => {
  try {
    const response = await axios.post(API_CONFIRM_DECLINE, userData, {
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
        error.response.data.message || "Error al confirmar habitación"
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

const API_DATA_COMPANION =
  "https://events-production-4a8f.up.railway.app/api/event/getInvitationData";

// Función para confirmar asistencia
export const dataUserCompanion = async (userData) => {
  try {
    const response = await axios.post(API_DATA_COMPANION, userData, {
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
        error.response.data.message || "Error al cargar datos de la persona"
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
