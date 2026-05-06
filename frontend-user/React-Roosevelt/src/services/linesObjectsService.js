import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getLineasObjetos = async () => {
  const response = await axios.get(`${apiUrl}/api/lineasobjetos`);

  return response.data;
};