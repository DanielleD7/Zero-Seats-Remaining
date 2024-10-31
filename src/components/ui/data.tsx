export type Course = {
    id: string
    subject: string
    number: string
    title: string
    description: string
    prereqs: string[]
    coreqs: string[]
    sections: Section[]
}

export type Section = {
    id: string
    days: string[]
    time: string
    location: string
    professor: string
    seatsOpen: number
    seats: number
}

export type Enroll = {
    course: string
    section: string
}

export const Enrollment: Enroll[] = []

export const Courses: Course[] = [
    {
        id: "CSCI 220",
        subject: "CSCI",
        number: "220",
        title: "Computer Programming I",
        description: "An introduction to programming and problem solving.",
        prereqs: [],
        coreqs: ["CSCI 220L"],
        sections: [
            {
                id: "01",
                days: ["M", "W", "F"],
                time: "09:30 AM - 10:20 AM",
                location: "HWEA 302",
                professor: "Instructor Not Available",
                seatsOpen: 18,
                seats: 24
            },
            {
                id: "02",
                days: ["T", "H"],
                time: "08:30 AM - 09:45 AM",
                location: "HWEA 302",
                professor: "Stalvey, RoxAnn",
                seatsOpen: 13,
                seats: 24
            },
            {
                id: "03",
                days: ["T", "H"],
                time: "03:35 PM - 04:50 PM",
                location: "HWEA 302",
                professor: "Stalvey, RoxAnn",
                seatsOpen: 17,
                seats: 24
            }
        ],
    },
    {
        id: "CSCI 220L",
        subject: "CSCI",
        number: "220L",
        title: "Programming I Laboratory",
        description: "This course is designed to apply the concepts being covered in CSCI 220.",
        prereqs: [],
        coreqs: ["CSCI 220"],
        sections: [
            {
                id: "01",
                days: ["W"],
                time: "02:15 PM - 04:45 PM",
                location: "HWEA 302",
                professor: "Instructor Not Available",
                seatsOpen: 14,
                seats: 22
            },
            {
                id: "02",
                days: ["M"],
                time: "02:15 PM - 04:45 PM",
                location: "HWEA 302",
                professor: "Instructor Not Available",
                seatsOpen: 6,
                seats: 18
            },
            {
                id: "03",
                days: ["M"],
                time: "11:30 PM - 02:00 PM",
                location: "HWEA 302",
                professor: "Instructor Not Available",
                seatsOpen: 16,
                seats: 18
            },
            {
                id: "04",
                days: ["W"],
                time: "11:30 PM - 02:00 PM",
                location: "HWEA 302",
                professor: "Instructor Not Available",
                seatsOpen: 17,
                seats: 18
            }
        ],
    },
    {
        id: "CSIS 601",
        subject: "CSIS",
        number: "601",
        title: "Model Data/Database Design",
        description: "A database design project is part of the requirement and includes hands-on data modeling, design, development, and implementation.",
        prereqs: [],
        coreqs: [],
        sections: [{
            id: "01",
            days: ["W"],
            time: "05:30 PM - 08:15 PM",
            location: "The Citadel",
            professor: "Ravan, John",
            seatsOpen: 11,
            seats: 15
        }],
    },
    {
        id: "CSIS 605",
        subject: "CSIS",
        number: "605",
        title: "Applied Algorithms",
        description: "A course that covers algorithms.",
        prereqs: [],
        coreqs: [],
        sections: [{
            id: "01",
            days: ["R"],
            time: "05:30 PM - 08:15 PM",
            location: "HWEA 300",
            professor: "Ghosh, Kris",
            seatsOpen: 7,
            seats: 12
        }],
    },
    {
        id: "CSIS 614",
        subject: "CSIS",
        number: "614",
        title: "Advanced Operating Systems",
        description: "This course covers a broad range of advanced operating systems concepts.",
        prereqs: [],
        coreqs: [],
        sections: [{
            id: "01",
            days: ["M"],
            time: "05:30 PM - 08:15 PM",
            location: "HWEA 300",
            professor: "LeClerc, Anthony",
            seatsOpen: 11,
            seats: 12
        }],
    },
    {
        id: "CSIS 635",
        subject: "CSIS",
        number: "635",
        title: "Fundamentals/ Agile Project Mgmt",
        description: "This course explores agile-related practices, methodologies, and applications in development and operational project environments.",
        prereqs: [],
        coreqs: [],
        sections: [{
            id: "01",
            days: [],
            time: "05:30 PM - 08:15 PM",
            location: "Online",
            professor: "Instructor Not Available",
            seatsOpen: 0,
            seats: 3
        }],
    },
    {
        id: "CSIS 641",
        subject: "CSIS",
        number: "641",
        title: "Advanced Cybersecurity",
        description: "This course will cover the techniques used to secure cybersystems.",
        prereqs: [],
        coreqs: [],
        sections: [{
            id: "01",
            days: ["T"],
            time: "05:30 PM - 08:15 PM",
            location: "The Citadel",
            professor: "Instructor Not Available",
            seatsOpen: 8,
            seats: 8
        }],
    },
    {
        id: "CSIS 690",
        subject: "CSIS",
        number: "690",
        title: "ST: Data Dependent Digital Forensics",
        description: "A course in the special study of an advanced or new topic in computer science, information science or software engineering.",
        prereqs: [],
        coreqs: [],
        sections: [{
            id: "01",
            days: ["T"],
            time: "05:30 PM - 08:15 PM",
            location: "HWEA 300",
            professor: "Ghosh, Kris",
            seatsOpen: 3,
            seats: 10
        }],
    },
]