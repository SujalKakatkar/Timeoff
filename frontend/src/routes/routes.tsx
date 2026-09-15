import ManagerDashboard from '@/components/dashboards/manager/manager-dashboard'
import AuthLayout from '@/layouts/auth-layout'
import HeroLayout from '@/layouts/hero-layout'
import MainLayout from '@/layouts/main-layout'
import EmployeeDashboardPage from '@/pages/employee-dashboard-page'
import HeroPage from '@/pages/hero-page'
import HRDashboardPage from '@/pages/hr-dashboard.page'
import LoginPage from '@/pages/login-page'
import NotFoundPage from '@/pages/not-found-page'
import ProfileCompletePage from '@/pages/profile-detail-page'
import SignupPage from '@/pages/signup-page'
import { createBrowserRouter, type RouteObject } from 'react-router'


const routeConfig: RouteObject[] = [

    {
        element: <HeroLayout />,
        errorElement:<NotFoundPage/>,
        children: [
            {
                path: "/",
                element: <HeroPage />
            }
            //todo: also increate term and conditons page pricing
        ]
    },

    //todo:add a wrapper component to render the correct dashboard base on the role of the user
    {
        element: <MainLayout />,
        children: [
            {
                path: "/employee-dashboard",
                element: <EmployeeDashboardPage />
            },
            {
                path:"/hr-dash",
                element:<HRDashboardPage/>
            },
            {
                path:"/manager-dashboard",
                element:<ManagerDashboard/>
            }
        ]

    },
    //todo:create layout without navbar where only logo is placed on the top left for auth routes
    {
        element: <AuthLayout />,
        errorElement:<NotFoundPage/>,
        children: [
            {
                path: "/auth/signin",
                element: <LoginPage />

            },
            {
                path: "/auth/signup",
                element: <SignupPage />
            },
            {
                path:'/auth/profile-details',
                element:<ProfileCompletePage/>
            }
            // {
            //     path:"/auth/reset-password"
            // }
        ]
    },
    {
        path:"*",
        element:<NotFoundPage/>
    }


];


export const routes = createBrowserRouter(routeConfig);