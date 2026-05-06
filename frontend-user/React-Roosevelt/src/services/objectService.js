import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getObjetos = async () => {  
  const response = await axios.get(`${apiUrl}/api/objetos`);  
  return response.data;
};