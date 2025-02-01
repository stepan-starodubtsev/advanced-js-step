import api from "./axios";

// export async function login(email, password) {
//   const response = await api.post("/login", { email, password });
//   localStorage.setItem("token", response.data.token);
//   return response.data.token;
// }

export async function login(email, password) {
  try {
    const response = await api.post("/login", { email, password });

    console.log({ response });

    if (!response.data) {
      throw new Error("Invalid login response: No token received");
    }

    const token = response.data;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw new Error("Login failed. Please check your credentials.");
  }
}

export function logout() {
  localStorage.removeItem("token");
}
