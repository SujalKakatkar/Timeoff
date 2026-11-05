import type { User } from "@/types/types";


export const isProfileComplete = (user: User) => {
    
    return Boolean(user.address && user.dept && user.phone)
}   