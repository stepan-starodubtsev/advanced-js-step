import {createVisit, updateVisit} from "../api/visits";
import {Visit} from "../model/Visit.js";
import {VisitCardiologist} from "../model/VisitCardiologist.js";
import {VisitDentist} from "../model/VisitDentist.js";
import {VisitTherapist} from "../model/VisitTherapist.js";

class VisitFormModal {
    constructor(visit) {
        this.formModal = document.createElement("div");
        this.formModal.classList.add("modal");
        this.formModal.innerHTML = `
      <div class="modal-content">
        <h2 id="doctor-header">Create Visit</h2>
        <form id="visit-form">
          <input type="text" id="fullname" placeholder="Full Name" required />
          <textarea id="purpose" placeholder="Purpose of visit" required></textarea>
          <textarea id="description" placeholder="Visit description" required></textarea>
          <select id="doctor">
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dentist">Dentist</option>
            <option value="Therapist">Therapist</option>
          </select>
          <select id="urgency">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
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

        this.initialize(visit);
    }

    initialize(visit) {
        document.body.appendChild(this.formModal);

        this.formModal
            .querySelector("#close-btn")
            .addEventListener("click", () => this.close());

        this.doctorSelect.addEventListener("change", () =>
            this.updateDoctorFields()
        );


        this.formModal.addEventListener("click", (event) => {
            if (event.target === this.formModal) {
                this.close();
            }
        });

        if (visit) {
            const header = this.formModal.querySelector("#doctor-header");
            header.textContent = "Edit Visit";

            const fullName = this.formModal.querySelector("#fullname");
            fullName.value = visit.fullName;

            const purpose = this.formModal.querySelector("#purpose");
            purpose.value = visit.purpose;

            const description = this.formModal.querySelector("#description");
            description.value = visit.description;

            this.doctorSelect.value = visit.doctor;

            this.form.addEventListener("submit", (event) => this.confirmVisit(event, visit.id));
        } else {
            this.form.addEventListener("submit", (event) => this.confirmVisit(event));
        }

        this.updateDoctorFields(visit);

    }

    updateDoctorFields(visit) {
        const doctor = this.doctorSelect.value;
        this.doctorFields.innerHTML = "";

        if (doctor === "Cardiologist") {
            this.doctorFields.innerHTML = `
        <input type="text" name="pressure" placeholder="Звичайний тиск" required>
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
        if (visit) {
            const allDoctorFields = this.doctorFields.querySelectorAll("input");
            allDoctorFields.forEach((field) => {
                field.value = visit[field.name];
            })
        }
    }

    async confirmVisit(event, id = null) {
        event.preventDefault();

        const fullname = this.form.querySelector("#fullname").value;
        const purpose = this.form.querySelector("#purpose").value;
        const description = this.form.querySelector("#description").value;
        const doctor = this.doctorSelect.value;
        const urgency = this.form.querySelector("#urgency").value;

        const doctorSpecificData = {};
        const inputs = this.doctorFields.querySelectorAll("input");
        inputs.forEach((input) => {
            doctorSpecificData[input.name] = input.value;
        });

        let visitData;
        switch (doctor) {
            case "Cardiologist":
                visitData = new VisitCardiologist(id, fullname,
                    purpose,
                    urgency,
                    description,
                    doctorSpecificData);
                break;
            case "Dentist":
                visitData = new VisitDentist(id, fullname,
                    purpose,
                    urgency,
                    description,
                    doctorSpecificData);
                break;
            case "Therapist":
                visitData = new VisitTherapist(id, fullname,
                    purpose,
                    urgency,
                    description,
                    doctorSpecificData);
                break;
            default:
                break;
        }

        if (visitData.id) {
            try {
                console.log("Visit updated:", await updateVisit(id, visitData));
                location.reload();
                this.close();
            } catch (error) {
                console.error("Error updating visit:", error);
            }
        } else {
            try {
                console.log("Visit created:", await createVisit(visitData));
                location.reload();
                this.close();
            } catch (error) {
                console.error("Error creating visit:", error);
            }
        }
    }

    close() {
        this.formModal.remove();
    }
}

export function openVisitForm(visit) {
    new VisitFormModal(visit);
}
