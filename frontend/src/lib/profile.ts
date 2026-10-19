import type { User } from "@/types/auth";


export const isProfileComplete = (user: User) => {
    
    return Boolean(user.address && user.dept && user.phone)
}   