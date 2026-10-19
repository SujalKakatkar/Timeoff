
export type Role = "HR" | "MANAGER" | "EMPLOYEE";

export interface User {
    userId: number;
    name: string;
    phone: number;
    dept: string;
    address: string;
    email: string;
    role: Role;
}

export type Department = {
    deptId: number,
    name: string
}


export interface LoginResponse extends User {
    accessToken: string;
}

export interface AccessTokenResponse {
    accessToken: string;
}