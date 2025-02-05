import {Visit} from "./Visit.js";

export class VisitCardiologist extends Visit {

    constructor(
        id=null,
        fullName,
        purpose,
        urgency,
        description,
        rest
    ) {
        super(id, fullName, purpose, urgency, description, "Cardiologist");
        this.pressure = rest.pressure;
        this.bmi = rest.bmi;
        this.diseases = rest.diseases;
        this.age = rest.age;
    }
}