export interface Certification {
    title: string;
    organization: string;
    icon: string;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

export interface DoctorProfile {
    name: string;
    initials: string;
    specialization: string;
    availableForConsultation: boolean;
    email: string;
    phone: string;
    address: Address;
    degree: string;
    medicalSchool: string;
    graduationYear: number;
    licenseNumber: string;
    experience: number;
    certifications: Certification[];
    digitalSignature: string;
}
