import type { Role } from "@/types/auth";

export const HOME: Record<Role, string> = {
    HR: "/hr",
    MANAGER: "/manager",
    EMPLOYEE: "/employee",
};