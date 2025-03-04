import axios from "axios";

const corsOptions = {
  origin: "*",
  methods: "POST",
  allowedHeaders: ["Accept", "Content-Type"],
};

axios.defaults.baseURL = "https://dry-dusk-82752-48663a91dffc.herokuapp.com";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = corsOptions.origin;

async function handleLogin(username, password) {
  try {
    const response = await axios.post("/login", { username: username, password: password }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log("Respuesta del servidor:", response.status, response.data);
    return response;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error en la respuesta del servidor:",
        error.response.status,
        error.response.data,
      );
      return error.response;
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      console.error("Error al configurar la solicitud:", error.message);
    }
    throw error;
  }
}

function exportUsername(username) {
  return username;
}

export { handleLogin, exportUsername };

