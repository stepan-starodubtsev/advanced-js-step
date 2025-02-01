import { login } from "../api/auth";

export function openLoginModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <h2>Login</h2>
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button id="login-btn">Login</button>
      <button id="close-btn">Close</button>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("login-btn").addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await login(email, password);
      location.reload();
    } catch (error) {
      alert("Login failed!");
    }
  });

  document.getElementById("close-btn").addEventListener("click", () => {
    modal.remove();
  });
}
