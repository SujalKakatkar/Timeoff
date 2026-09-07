import Authlayout from '@/layouts/Authlayout'
import Herolayout from '@/layouts/Herolayout'
import Mainlayout from '@/layouts/Mainlayout'
import EmployeeDashboardPage from '@/pages/EmployeeDashboardPage'
import HeroPage from '@/pages/HeroPage'
import HRDashboardPage from '@/pages/HRDashboardPage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProfileCompletePage from '@/pages/ProfileCompletePage'
import SignupPage from '@/pages/SignupPage'
import { createBrowserRouter, type RouteObject } from 'react-router'


const routeConfig: RouteObject[] = [

    {
        element: <Herolayout />,
        errorElement:<NotFoundPage/>,
        children: [
            {
                path: "/",
                element: <HeroPage />
            }
            //todo: also increate term and conditons page pricing
        ]
    },

    //todo:add layouts base on the role of the user
    {
        element: <Mainlayout />,
        children: [
            {
                path: "/",
                element: <EmployeeDashboardPage />
            },
            {
                path:"/hrdash",
                element:<HRDashboardPage/>
            }
        ]

    },
    //todo:create layout without navbar where only logo is placed on the top left for auth routes
    {
        element: <Authlayout />,
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