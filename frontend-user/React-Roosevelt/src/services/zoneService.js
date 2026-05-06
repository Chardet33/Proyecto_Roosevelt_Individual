import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getZonas = async () => {  
  const response = await axios.get(`${apiUrl}/api/zonas`);  
  return response.data;
};