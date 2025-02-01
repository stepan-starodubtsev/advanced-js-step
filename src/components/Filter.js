export function createFilters() {
  const filtersContainer = document.createElement("div");
  filtersContainer.classList.add("filters");

  filtersContainer.innerHTML = `
    <select id="doctor-filter">
      <option value="">All Doctors</option>
      <option value="Cardiologist">Cardiologist</option>
      <option value="Dentist">Dentist</option>
      <option value="Therapist">Therapist</option>
    </select>
    <select id="urgency-filter">
      <option value="">All Urgencies</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
    <input type="text" id="search-filter" placeholder="Search by name...">
  `;

  filtersContainer.addEventListener("input", applyFilters);

  document.body.append(filtersContainer);
}

function applyFilters() {
  const doctor = document.getElementById("doctor-filter").value;
  const urgency = document.getElementById("urgency-filter").value;
  const search = document.getElementById("search-filter").value.toLowerCase();

  const visits = document.querySelectorAll(".visit-card");
  visits.forEach((visit) => {
    const matchesDoctor = !doctor || visit.dataset.doctor === doctor;
    const matchesUrgency = !urgency || visit.dataset.urgency === urgency;
    const matchesSearch =
      !search || visit.dataset.fullname.toLowerCase().includes(search);

    visit.style.display =
      matchesDoctor && matchesUrgency && matchesSearch ? "block" : "none";
  });
}
