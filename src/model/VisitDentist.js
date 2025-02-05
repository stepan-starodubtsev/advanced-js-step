import {Visit} from "./Visit.js";

export class VisitDentist extends Visit {
    constructor(id=null,
                fullName,
                purpose,
                urgency,
                description,
                rest
    ) {
        super(id, fullName, purpose, urgency, description, "Dentist");
        this.lastVisitDate = rest.lastVisitDate;
    }
}