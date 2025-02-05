import { createVisit } from "../api/visits";

class VisitFormModal {
  constructor() {
    this.formModal = document.createElement("div");
    this.formModal.classList.add("modal");

    this.formModal.innerHTML = `
      <div class="modal-content">
        <h2>Create Visit</h2>
        <form id="visit-form">
          <input type="text" id="fullname" placeholder="Full Name" required />
          <select id="doctor">
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dentist">Dentist</option>
            <option value="Therapist">Therapist</option>
          </select>
          <!-- Dynamic doctor-specific fields will be appended here -->
          <div id="doctor-fields"></div>
          <button type="submit">Submit</button>
        </form>
        <button id="close-btn">Close</button>
      </div>
    `;

    this.form = this.formModal.querySelector("#visit-form");
    this.doctorSelect = this.formModal.querySelector("#doctor");
    this.doctorFields = this.formModal.querySelector("#doctor-fields");

    this.initialize();
  }

  initialize() {
    document.body.appendChild(this.formModal);

    this.formModal
      .querySelector("#close-btn")
      .addEventListener("click", () => this.close());

    this.doctorSelect.addEventListener("change", () =>
      this.updateDoctorFields()
    );

    this.form.addEventListener("submit", (event) => this.createVisit(event));

    this.updateDoctorFields();
  }

  updateDoctorFields() {
    const doctor = this.doctorSelect.value;
    this.doctorFields.innerHTML = ""; 

    if (doctor === "Cardiologist") {
      this.doctorFields.innerHTML = `
        <input type="text" name="bp" placeholder="Звичайний тиск" required>
        <input type="text" name="bmi" placeholder="Індекс маси тіла" required>
        <input type="text" name="diseases" placeholder="Перенесені захворювання серцево-судинної системи" required>
        <input type="number" name="age" placeholder="Вік" required>
      `;
    } else if (doctor === "Dentist") {
      this.doctorFields.innerHTML = `
        <input type="date" name="lastVisitDate" placeholder="Дата останнього відвідування" required>
      `;
    } else if (doctor === "Therapist") {
      this.doctorFields.innerHTML = `
        <input type="number" name="age" placeholder="Вік" required>
      `;
    }
  }

  async createVisit(event) {
    event.preventDefault(); 

    const fullname = this.form.querySelector("#fullname").value;
    const doctor = this.doctorSelect.value;

    const doctorSpecificData = {};
    const inputs = this.doctorFields.querySelectorAll("input");
    inputs.forEach((input) => {
      doctorSpecificData[input.name] = input.value;
    });

    const visitData = {
      fullname,
      doctor,
      ...doctorSpecificData,
    };

    console.log("Form submitted:", visitData);

    try {
      await createVisit(visitData); 
      this.close(); 
    } catch (error) {
      console.error("Error creating visit:", error);
    }
  }

  close() {
    this.formModal.remove(); 
  }
}

export function openVisitForm() {
  new VisitFormModal();
}
