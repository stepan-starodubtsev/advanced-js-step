export class Visit {
  constructor(doctor, purpose, description, urgency, fullName) {
    this.doctor = doctor;
    this.purpose = purpose;
    this.description = description;
    this.urgency = urgency;
    this.fullName = fullName;
  }
}

export class VisitCardiologist extends Visit {
  constructor(
    purpose,
    description,
    urgency,
    fullName,
    pressure,
    bmi,
    diseases,
    age
  ) {
    super("Cardiologist", purpose, description, urgency, fullName);
    this.pressure = pressure;
    this.bmi = bmi;
    this.diseases = diseases;
    this.age = age;
  }
}

export class VisitDentist extends Visit {
  constructor(purpose, description, urgency, fullName, lastVisitDate) {
    super("Dentist", purpose, description, urgency, fullName);
    this.lastVisitDate = lastVisitDate;
  }
}

export class VisitTherapist extends Visit {
  constructor(purpose, description, urgency, fullName, age) {
    super("Therapist", purpose, description, urgency, fullName);
    this.age = age;
  }
}
