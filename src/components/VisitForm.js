import { createVisit } from "../api/visits";

export function openVisitForm() {
  const formModal = document.createElement("div");
  formModal.classList.add("modal");

  formModal.innerHTML = `
    <div class="modal-content">
      <h2>Create Visit</h2>
      <form id="visit-form">
        <input type="text" id="fullname" placeholder="Full Name" required />
        <select id="doctor">
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dentist">Dentist</option>
          <option value="Therapist">Therapist</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <button id="close-btn">Close</button>
    </div>
  `;

  document.body.appendChild(formModal);

  document
    .getElementById("close-btn")
    .addEventListener("click", () => formModal.remove());

  const visitForm = document.getElementById("visit-form");

  visitForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const doctor = document.getElementById("doctor").value;

    console.log("Form submitted:", { fullname, doctor });

    try {
      createVisit({ fullname, doctor });
    } catch (error) {
      console.error("Error creating visit:", error);
    }

    formModal.remove();
  });
}
