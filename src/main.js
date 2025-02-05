import { createHeader } from "./components/Header";
import { createFilters } from "./components/Filter";
import { fetchVisits } from "./api/visits";
import { openLoginModal } from "./components/Modal";
import { openVisitForm } from "./components/VisitModal";

async function renderVisits() {
  const visitsContainer = document.createElement("div");
  visitsContainer.classList.add("visits-container");

  try {
    const visits = await fetchVisits();
    visits.forEach((visit) => {
      const visitCard = document.createElement("div");
      visitCard.classList.add("visit-card");
      visitCard.dataset.doctor = visit.doctor;
      visitCard.dataset.urgency = visit.urgency;
      visitCard.dataset.fullname = visit.fullName;
      visitCard.innerHTML = `
        <div class="visit-header">${visit.fullName} - ${visit.doctor}</div>
        <div class="visit-details">${visit.purpose}</div>
      `;
      visitsContainer.appendChild(visitCard);
    });
  } catch (error) {
    console.error("Error fetching visits:", error);
  }

  document.body.appendChild(visitsContainer);
}

export function initializeApp() {
  createHeader();
  createFilters();

  const token = localStorage.getItem("token");
  if (token) {
    renderVisits();
  }

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("auth-button")) {
      if (token) {
        openVisitForm();
      } else {
        openLoginModal();
      }
    }
  });
}
