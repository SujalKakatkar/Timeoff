import AuthLayout from '@/layouts/auth-layout'
import EmployeeDashboardLayout from '@/layouts/employee-dashboard-layout'
import HeroLayout from '@/layouts/hero-layout'
import HRDashboardLayout from '@/layouts/hr-dashboard-layout'
import MainLayout from '@/layouts/main-layout'
import ManagerDashboardLayout from '@/layouts/manager-dashboard-layout'
import EmployeeDashboardPage from '@/pages/employee-dashboard-page'
import EmployeeHistoryPage from '@/pages/employee-dashboard-pages/employee-history-page'
import EmployeeHolidayPage from '@/pages/employee-dashboard-pages/employee-holiday-page'
import EmployeeLeaveBalancePage from '@/pages/employee-dashboard-pages/employee-leave-balance-page'
import EmployeeLeaveRequestDetailsPage from '@/pages/employee-dashboard-pages/employee-leave-request-details-page'
import EmployeeLeaveRequestPage from '@/pages/employee-dashboard-pages/employee-leave-request-page'
import EmployeeOverviewPage from '@/pages/employee-dashboard-pages/employee-overview-page'
import EmployeeReportPage from '@/pages/employee-dashboard-pages/employee-report-page'
import HeroPage from '@/pages/hero-page'
import EmployeesDetailPage from '@/pages/hr-dashboard-pages/employee-details-page'
import EmployeesPage from '@/pages/hr-dashboard-pages/employee-page'
import HolidaysPage from '@/pages/hr-dashboard-pages/holiday-page'
import HROverviewPage from '@/pages/hr-dashboard-pages/hr-overview-page'
import LeaveRequestsDetailPage from '@/pages/hr-dashboard-pages/leave-request-details-page'
import LeaveRequestsPage from '@/pages/hr-dashboard-pages/leave-requests-page'
import LeaveTypesPage from '@/pages/hr-dashboard-pages/leave-type'
import ManagersPage from '@/pages/hr-dashboard-pages/managers-page'
import ReportsPage from '@/pages/hr-dashboard-pages/reports-page'
import LoginPage from '@/pages/login-page'
import ManagerEmployeesDetailPage from '@/pages/manager-dashboard-pages/manager-employee-details-page'
import ManagerHolidayPage from '@/pages/manager-dashboard-pages/manager-holiday-page'
import ManagerLeaveRequestDetailsPage from '@/pages/manager-dashboard-pages/manager-leave-request-Details-page'
import ManagerLeaveRequestPage from '@/pages/manager-dashboard-pages/manager-leave-request-page'
import ManagerLeaveTypePage from '@/pages/manager-dashboard-pages/manager-leave-type-page'
import ManagerReportsPage from '@/pages/manager-dashboard-pages/manager-reports-page'
import ManagerOverviewPage from '@/pages/manager-dashboard-pages/manger-overview-page'
import NotFoundPage from '@/pages/not-found-page'
import ProfileCompletePage from '@/pages/profile-detail-page'
import SignupPage from '@/pages/signup-page'
import { createBrowserRouter, type RouteObject } from 'react-router'


const routeConfig: RouteObject[] = [

    {
        element: <HeroLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/",
                element: <HeroPage />
            }
            //todo: also increase term and conditions page pricing
        ]
    },

    //todo:add a wrapper component to render the correct dashboard base on the role of the user
    {
        element: <MainLayout />,
        children: [
            {
                path: "/hr",
                element: <HRDashboardLayout />,
                children: [
                    { index: true, element: <HROverviewPage /> },
                    { path: "leave-requests", element: <LeaveRequestsPage /> },
                    { path: "managers", element: <ManagersPage /> },
                    { path: "leave-requests/:id", element: <LeaveRequestsDetailPage /> },
                    { path: "leave-types", element: <LeaveTypesPage /> },
                    { path: "holidays", element: <HolidaysPage /> },
                    { path: "reports", element: <ReportsPage /> },
                    { path: "employees", element: <EmployeesPage /> },
                    { path: "employees/:id", element: <EmployeesDetailPage /> },
                ]
            },
            {
                path: "/manager",
                element: <ManagerDashboardLayout />,
                children:[
                    {index:true, element:<ManagerOverviewPage/>},
                    { path: "leave-requests", element: <ManagerLeaveRequestPage /> },
                    { path: "leave-requests/:id", element: <ManagerLeaveRequestDetailsPage  /> },
                    { path: "leave-types", element: <ManagerLeaveTypePage /> },
                    { path: "holidays", element: <ManagerHolidayPage /> },
                    { path: "reports", element: <ManagerReportsPage /> },
                    { path: "employees/:id", element: <ManagerEmployeesDetailPage /> },
                   
                ]
            },
             {
                path: "/employee-dashboard",
                element: <EmployeeDashboardLayout />,
                 children: [
                     { index: true, element: <EmployeeOverviewPage /> },
                     { path: "create-leave", element: <EmployeeLeaveRequestPage /> },
                     { path: "leave-history", element: <EmployeeHistoryPage/> },
                     { path: "leave-requests/:id", element: <EmployeeLeaveRequestDetailsPage /> },
                     { path: "leave-balance", element: <EmployeeLeaveBalancePage /> },
                     { path: "holidays", element: <EmployeeHolidayPage /> },
                     { path: "reports", element: <EmployeeReportPage /> },

                 ]
            },
        ]

    },
    //todo:create layout without navbar where only logo is placed on the top left for auth routes
    {
        element: <AuthLayout />,
        errorElement: <NotFoundPage />,
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
                path: '/auth/profile-details',
                element: <ProfileCompletePage />
            }
            // {
            //     path:"/auth/reset-password"
            // }
        ]
    },
    {
        path: "*",
        element: <NotFoundPage />
    }


];


export const routes = createBrowserRouter(routeConfig);