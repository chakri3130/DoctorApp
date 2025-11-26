import { DoctorProfile } from "../types/profile.types";

export const mockProfileData: DoctorProfile = {
    name: "Dr. Robert Anderson",
    initials: "DR",
    specialization: "Cardiologist",
    availableForConsultation: true,
    email: "dr.anderson@hospital.com",
    phone: "+1 (555) 123-4567",
    address: {
        street: "123 Medical Center Dr, Suite 200",
        city: "New York",
        state: "NY",
        zip: "10001"
    },
    degree: "Doctor of Medicine (MD)",
    medicalSchool: "Harvard Medical School",
    graduationYear: 2010,
    licenseNumber: "MD-123456-NY",
    experience: 15,
    certifications: [
        {
            title: "Board Certified Cardiologist",
            organization: "American Board of Internal Medicine",
            icon: "ribbon"
        },
        {
            title: "Advanced Cardiac Life Support",
            organization: "American Heart Association",
            icon: "ribbon-outline"
        }
    ],
    digitalSignature: "Dr. R. Anderson"
};
