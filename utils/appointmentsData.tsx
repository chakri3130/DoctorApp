export interface Appointment {
    name: string;
    id: number;
    time: string;
    date: string;
    reason: string;
    age: number;
    gender: 'Male' | 'Female';
    image: string;
}

export const appointmentsData: Appointment[] = [
    {
        name: 'Sarah Johnson',
        id: 101,
        time: '10:30 AM',
        date: '2025-11-25',
        reason: 'General Checkup',
        age: 34,
        gender: 'Female',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
        name: 'Michael Chen',
        id: 102,
        time: '11:00 AM',
        date: '2025-11-25',
        reason: 'Follow-up Consultation',
        age: 45,
        gender: 'Male',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
        name: 'Emily Davis',
        id: 103,
        time: '11:30 AM',
        date: '2025-11-25',
        reason: 'Routine Check-up',
        age: 28,
        gender: 'Female',
        image: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
        name: 'Robert Martinez',
        id: 104,
        time: '02:00 PM',
        date: '2025-11-25',
        reason: 'Blood Pressure Monitoring',
        age: 52,
        gender: 'Male',
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    {
        name: 'Jennifer Wilson',
        id: 105,
        time: '02:30 PM',
        date: '2025-11-25',
        reason: 'Diabetes Management',
        age: 41,
        gender: 'Female',
        image: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    {
        name: 'David Thompson',
        id: 106,
        time: '03:00 PM',
        date: '2025-11-26',
        reason: 'Annual Physical Exam',
        age: 38,
        gender: 'Male',
        image: 'https://randomuser.me/api/portraits/men/6.jpg',
    },
    {
        name: 'Lisa Anderson',
        id: 107,
        time: '09:00 AM',
        date: '2025-11-26',
        reason: 'Prescription Renewal',
        age: 55,
        gender: 'Female',
        image: 'https://randomuser.me/api/portraits/women/7.jpg',
    },
    {
        name: 'James Taylor',
        id: 108,
        time: '09:30 AM',
        date: '2025-11-26',
        reason: 'Heart Health Consultation',
        age: 60,
        gender: 'Male',
        image: 'https://randomuser.me/api/portraits/men/8.jpg',
    },
    {
        name: 'Patricia Brown',
        id: 109,
        time: '10:00 AM',
        date: '2025-11-26',
        reason: 'Allergy Testing',
        age: 33,
        gender: 'Female',
        image: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
        name: 'Christopher Lee',
        id: 110,
        time: '10:30 AM',
        date: '2025-11-26',
        reason: 'Post-Surgery Follow-up',
        age: 47,
        gender: 'Male',
        image: 'https://randomuser.me/api/portraits/men/10.jpg',
    },
];