import apiClient from "../client/apiClient";

const sendRequest = async (path, params) => {
  const { data } = await apiClient.get(path, { params });
  return data;
};

export { sendRequest };
