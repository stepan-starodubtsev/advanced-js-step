import api from "./axios";

export async function fetchVisits() {
  const response = await api.get("/");
  return response.data;
}

export async function createVisit(visitData) {
  const response = await api.post("/", visitData);
  return response.data;
}

export async function updateVisit(id, updatedData) {
  console.log(updatedData);
  console.log(id);
  const response = await api.put(`/${id}`, updatedData);
  return response.data;
}

export async function deleteVisit(id) {
  await api.delete(`/${id}`);
}
