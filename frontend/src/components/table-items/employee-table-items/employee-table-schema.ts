

import z from 'zod'

//

export const EmployeeTableSchema = z.object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    phone: z.number(),
    email: z.email(),
    dept: z.string(),
    isActive: z.boolean() //todo: make this as leave status 
})

export type EmployeeTableRow = z.infer<typeof EmployeeTableSchema>;


//fake data

export const fakeEmployees: EmployeeTableRow[] = [
    {
        id: 1,
        name: "Ananya Rao",
        address: "204 MG Road, Bengaluru, KA 560001",
        phone: 9845012345,
        email: "ananya.rao@company.com",
        dept: "Engineering",
        isActive: true,
    },
    {
        id: 2,
        name: "Vikram Shah",
        address: "12 Linking Road, Mumbai, MH 400050",
        phone: 9820098765,
        email: "vikram.shah@company.com",
        dept: "Design",
        isActive: true,
    },
    {
        id: 3,
        name: "Priya Menon",
        address: "45 Anna Salai, Chennai, TN 600002",
        phone: 9840011223,
        email: "priya.menon@company.com",
        dept: "Sales",
        isActive: false,
    },
    {
        id: 4,
        name: "Rohit Verma",
        address: "78 Sector 18, Noida, UP 201301",
        phone: 9911223344,
        email: "rohit.verma@company.com",
        dept: "Engineering",
        isActive: true,
    },
    {
        id: 5,
        name: "Sana Iyer",
        address: "33 Koregaon Park, Pune, MH 411001",
        phone: 9765432109,
        email: "sana.iyer@company.com",
        dept: "Engineering",
        isActive: true,
    },
    {
        id: 6,
        name: "Karan Malhotra",
        address: "9 Civil Lines, Jaipur, RJ 302006",
        phone: 9314455667,
        email: "karan.malhotra@company.com",
        dept: "Design",
        isActive: false,
    },
    {
        id: 7,
        name: "Divya Nair",
        address: "56 MG Road, Kochi, KL 682016",
        phone: 9447788990,
        email: "divya.nair@company.com",
        dept: "Sales",
        isActive: true,
    },
    {
        id: 8,
        name: "Arjun Kapoor",
        address: "21 Banjara Hills, Hyderabad, TS 500034",
        phone: 9848112233,
        email: "arjun.kapoor@company.com",
        dept: "Marketing",
        isActive: true,
    },
    {
        id: 9,
        name: "Neha Joshi",
        address: "67 FC Road, Pune, MH 411004",
        phone: 9822334455,
        email: "neha.joshi@company.com",
        dept: "Marketing",
        isActive: false,
    },
    {
        id: 10,
        name: "Farhan Sheikh",
        address: "14 Salt Lake, Kolkata, WB 700064",
        phone: 9830045566,
        email: "farhan.sheikh@company.com",
        dept: "Engineering",
        isActive: true,
    },
    {
        id: 11,
        name: "Meera Pillai",
        address: "88 T Nagar, Chennai, TN 600017",
        phone: 9884477889,
        email: "meera.pillai@company.com",
        dept: "Sales",
        isActive: true,
    },
    {
        id: 12,
        name: "Aditya Bose",
        address: "5 Park Street, Kolkata, WB 700016",
        phone: 9836601122,
        email: "aditya.bose@company.com",
        dept: "Design",
        isActive: false,
    },
]