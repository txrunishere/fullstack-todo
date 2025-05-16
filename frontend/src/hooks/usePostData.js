import axios from "axios";

export const usePostData = async (url, data) => {
  const userData = await axios.post(url, data);
  return userData;
};
