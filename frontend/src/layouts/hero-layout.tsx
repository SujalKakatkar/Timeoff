import { Footer } from '@/components/navigation/footer'
import Navbar from '@/components/navigation/navbar'
import { Outlet } from 'react-router'

function HeroLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default HeroLayout