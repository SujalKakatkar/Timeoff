
export type Role = "HR" | "MANAGER" | "EMPLOYEE";

export interface User {
    userId: number,
    name: string,
    email: string;
    role: Role
}



export interface LoginResponse extends User {
    accessToken: string;
}

export interface AccessTokenResponse {
    accessToken: string;
}