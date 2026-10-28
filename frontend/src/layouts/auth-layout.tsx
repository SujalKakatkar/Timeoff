import { HOME } from '@/constants/routes';
import Loading from '@/pages/loading';
import { useAuthStore } from '@/store/UseAuthStore';
import { CommandIcon } from 'lucide-react'
import { Link, Navigate, Outlet } from 'react-router'

function AuthLayout() {
  const status = useAuthStore((s) => s.status);
  const user = useAuthStore((s) => s.user);
  console.log("public route", { status, user });


  if (status === "loading") return <Loading />;

  if (status === "authenticated" && user) {
    return <Navigate to={HOME[user.role] ?? "/"} replace />;
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to={"/"} className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <CommandIcon className="size-4" />
          </div>
          TimeOff
        </Link>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout       