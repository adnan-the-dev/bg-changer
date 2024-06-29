import { handleApi } from "../hendleApi";
import urls from "./urls";

export const colorApi = async (data) => {
  const body = data;
  const response = await handleApi(`${urls.background}`, "POST", body);
  return response;
};

export const getColorsButton = async () => {
  const response = await handleApi(`${urls.colors}`, "GET");
  return response;
};

export const DeleteColorsButton = async () => {
  const response = await handleApi(`${urls.DeleteBackground}`, "DELETE");
  return response;
};





