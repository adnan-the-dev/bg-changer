import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL_API;

const getColorApi = async (baseUrl, setLoading) => {
  let response = null;

  try {
    setLoading(true);
    response = await axios.get(baseUrl);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }

  return response;
};

export default getColorApi;

export const getPostColorApi = async (payLoad) => {
  try {
    axios.post(`${baseUrl}/background`, payLoad).then((response) => {
      console.log(response);
    });
  } catch (error) {
    console.log(error);
  }
};
