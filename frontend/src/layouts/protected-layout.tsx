import { useAuthStore } from "@/store/UseAuthStore";
import type { Role } from "../types/auth";
import { Navigate, Outlet, useLocation } from "react-router";
import { HOME } from "@/constants/routes";
import Loading from "@/pages/loading";

interface Props {
    role?: Role;
}

export default function ProtectedLayout({ role }: Props) {
    const status = useAuthStore((s) => s.status);
    const user = useAuthStore((s) => s.user);
    const location = useLocation();

    if (status === "loading") return <Loading />;

    if (status === "anonymous" || !user) {
        return <Navigate to="/auth/signin" state={{ from: location }} replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to={HOME[user.role] ?? "/"} replace />;
    }

    return <Outlet />;
}