import axios from "axios";

async function handleLogin(username, password) {
  try {
    const response = await axios.post(
      "https://dry-dusk-82752-48663a91dffc.herokuapp.com/login",
      { username, password },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    console.log("Respuesta del servidor:", response.status, response.data);
    return response;
  } catch (error) {
    // Manejar el error de forma más informativa
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error(
        "Error en la respuesta del servidor:",
        error.response.status,
        error.response.data,
      );
      return error.response; // Devolver la respuesta de error para manejarla en el endpoint
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      // Algo sucedió en la configuración de la solicitud que desencadenó un error
      console.error("Error al configurar la solicitud:", error.message);
    }
    throw error; // Lanzar el error para que el endpoint lo maneje
  }
}

export { handleLogin };

