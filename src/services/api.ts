import axios from "axios";

const api = axios.create({
  baseURL: "https://boasorte.teddybackoffice.com.br",
});

export default api;
