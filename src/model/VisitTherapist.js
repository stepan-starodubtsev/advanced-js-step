import {Visit} from "./Visit.js";

export class VisitTherapist extends Visit {
    constructor(id=null,
                fullName,
                purpose,
                urgency,
                description,
                rest
    ) {
        super(id, fullName, purpose, urgency, description, "Therapist");
        this.age = rest.age;
    }
}