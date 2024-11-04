import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createEntry = async (newEntry) => {
  const request = axios.post(baseUrl, newEntry);
  return request.then((response) => response.data);
};

const deleteEntry = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, createEntry, deleteEntry };
