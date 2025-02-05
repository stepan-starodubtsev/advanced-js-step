import {createHeader} from "./components/Header";
import {createFilters} from "./components/Filter";
import {deleteVisit, fetchVisits} from "./api/visits";
import {openLoginModal} from "./components/Modal";
import {openVisitForm} from "./components/VisitModal";
import {createVisitCard} from "./components/VisitCard.js";

async function renderVisits() {
    const visitsContainer = document.createElement("div");
    visitsContainer.classList.add("visits-container");

    try {
        const visits = await fetchVisits();
        visits.forEach((visit) => {
            const visitCard = createVisitCard(visit);
            visitsContainer.appendChild(visitCard);
        });
    } catch (error) {
        console.error("Error fetching visits:", error);
    }

    document.body.appendChild(visitsContainer);

    document.querySelectorAll(".visit-btn-delete").forEach(element => element.addEventListener("click", (event) => {
        event.preventDefault();
        const visitCard = event.target.closest(".visit-card");
        deleteVisit(visitCard.dataset.id);
        location.reload();
    }));

    document.querySelectorAll(".visit-btn-update").forEach(element => element.addEventListener("click", (event) => {
        event.preventDefault();
        const visitCard = event.target.closest(".visit-card");
        openVisitForm()
    }));
}

export function initializeApp() {
    createHeader();
    createFilters();

    const token = localStorage.getItem("token");
    if (token) {
        renderVisits().catch(error => {
            console.error(error);
        });
    }
}
