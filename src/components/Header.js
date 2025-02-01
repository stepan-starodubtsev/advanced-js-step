export function createHeader() {
  const header = document.createElement("header");
  header.classList.add("header");

  const logo = document.createElement("div");
  logo.textContent = "Doctor Visits";
  logo.classList.add("logo");

  const authButton = document.createElement("button");
  authButton.classList.add("auth-button");

  const token = localStorage.getItem("token");
  authButton.textContent = token ? "Create Visit" : "Login";

  authButton.addEventListener("click", () => {
    if (token) {
      openCreateVisitModal();
    } else {
      openLoginModal();
    }
  });

  header.append(logo, authButton);
  document.body.prepend(header);
}
