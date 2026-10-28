import { Footer } from '@/components/navigation/footer'
import Navbar from '@/components/navigation/navbar'
import { HOME } from '@/constants/routes';
import Loading from '@/pages/loading';
import { useAuthStore } from '@/store/UseAuthStore';
import { Navigate, Outlet } from 'react-router'

function HeroLayout() {

  const status = useAuthStore((s) => s.status);
  const user = useAuthStore((s) => s.user);
  console.log("public route", { status, user });

  if (status === "loading") return <Loading />;

  if (status === "authenticated" && user) {
    return <Navigate to={HOME[user.role] ?? "/"} replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default HeroLayout