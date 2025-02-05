export class Visit {
  constructor(id=null, fullName, purpose, urgency, description, doctor) {
    this.id = id;
    this.doctor = doctor;
    this.purpose = purpose;
    this.description = description;
    this.urgency = urgency;
    this.fullName = fullName;
  }
}