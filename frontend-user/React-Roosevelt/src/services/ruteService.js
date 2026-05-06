import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getRutas = async () => {  
  const response = await axios.get(`${apiUrl}/api/rutas`);  
  return response.data;
};