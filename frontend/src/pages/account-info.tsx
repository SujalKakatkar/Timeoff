import { useAuthStore } from "@/store/UseAuthStore"

function AccountInfo() {
    const user = useAuthStore(s => s.user)

    if(!user) return (<p>No user found</p>)
    return (
        <div></div>
    )
}

export default AccountInfo  