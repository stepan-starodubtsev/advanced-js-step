import {deleteVisit} from "../api/visits.js";
import {openVisitForm} from "./VisitModal.js";

export function createVisitCard(visit) {
    const visitCard = document.createElement("div");
    visitCard.classList.add("visit-card");
    visitCard.dataset.id = visit.id;
    visitCard.dataset.fullname = visit.fullName;
    console.log(visit.fullName)
    visitCard.dataset.doctor = visit.doctor;
    visitCard.dataset.urgency = visit.urgency;
    visitCard.innerHTML = `
        <div class="visit-header">
            <div class="visit-title">${visit.fullName} -    ${visit.doctor}</div>
            <button class="visit-btn-delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </button>
        </div>
        <p class="visit-content">Urgency: ${visit.urgency}</p>
        <div class="visit-details">
            <p class="visit-content">Purpose: ${visit.purpose}</p>
            <p class="visit-content">Description: ${visit.description}</p>
        </div>
        <div class="visit-footer">
            <button class="visit-btn-toogle">More info</button>
            <button class="visit-btn-update">Update</button>
        </div>
      `;
    return visitCard;
}
