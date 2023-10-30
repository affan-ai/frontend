import axios from "axios";

const API_HOST = "http://localhost";
const API_PORT = 5000;

export async function getForumData() {
  const response = await axios.get(`${API_HOST}:${API_PORT}/api/forum`);
  return response.data;
}

export async function addForumPost(formData: FormData) {
  const response = await axios.post(`${API_HOST}:${API_PORT}/api/forum`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
