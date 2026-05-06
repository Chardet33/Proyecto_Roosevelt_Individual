import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getTipoObjetos = async () => {  
  const response = await axios.get(`${apiUrl}/api/tiposobjeto`);  
  return response.data;
};