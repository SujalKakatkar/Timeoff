import { api } from "@/api/axios";
import type { Department } from "@/types/auth";
import { useEffect, useState } from "react";

export function useDepartment() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    useEffect(() => {
        let cancelled = false
        api.get("/department")
            .then((res) => { if (!cancelled) setDepartments(res.data) })
            .catch(() => { if (!cancelled) setError(true) })
            .finally(() => { if (!cancelled) setLoading(false) })

        return () => { cancelled = true }
    },[])

    return { departments, loading, error }
}