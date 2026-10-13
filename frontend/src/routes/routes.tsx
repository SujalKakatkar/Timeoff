import {
    AuthLayout,
    NotFoundPage,
    HeroLayout,
    HeroPage,
    HRDashboardLayout,
    HROverviewPage,
    EmployeesDetailPage,
    EmployeesPage,
    HolidaysPage,
    LeaveRequestsDetailPage,
    LeaveRequestsPage,
    LeaveTypesPage,
    ManagersPage,
    ReportsPage,
    ManagerDashboardLayout,
    ManagerEmployeesDetailPage,
    ManagerHolidayPage,
    ManagerLeaveRequestDetailsPage,
    ManagerLeaveRequestPage,
    ManagerLeaveTypePage,
    ManagerReportsPage,
    ManagerOverviewPage,
    EmployeeDashboardLayout,
    EmployeeHistoryPage,
    EmployeeHolidayPage,
    EmployeeLeaveBalancePage,
    EmployeeLeaveRequestPage,
    EmployeeLeaveRequestDetailsPage,
    EmployeeOverviewPage,
    EmployeeReportPage,
    SignupPage,
    LoginPage,
    ProfileCompletePage,
    ProtectedLayout
} from './index'
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
        ]
    },

    {
        element: <ProtectedLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                element:<ProtectedLayout role='HR'/>,
                children:[
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
                    }
                ]
            },
            {
                element:<ProtectedLayout role='MANAGER'/>,
                children:[
                    {
                        path: "/manager",
                        element: <ManagerDashboardLayout />,
                        children: [
                            { index: true, element: <ManagerOverviewPage /> },
                            { path: "leave-requests", element: <ManagerLeaveRequestPage /> },
                            { path: "leave-requests/:id", element: <ManagerLeaveRequestDetailsPage /> },
                            { path: "leave-types", element: <ManagerLeaveTypePage /> },
                            { path: "holidays", element: <ManagerHolidayPage /> },
                            { path: "reports", element: <ManagerReportsPage /> },
                            { path: "employees/:id", element: <ManagerEmployeesDetailPage /> },

                        ]
                    }
                ]
            },
             {
                element:<ProtectedLayout role='EMPLOYEE'/>,
                children:[
                    {
                        path: "/employee",
                        element: <EmployeeDashboardLayout />,
                        children: [
                            { index: true, element: <EmployeeOverviewPage /> },
                            { path: "create-leave", element: <EmployeeLeaveRequestPage /> },
                            { path: "leave-history", element: <EmployeeHistoryPage /> },
                            { path: "leave-requests/:id", element: <EmployeeLeaveRequestDetailsPage /> },
                            { path: "leave-balance", element: <EmployeeLeaveBalancePage /> },
                            { path: "holidays", element: <EmployeeHolidayPage /> },
                            { path: "reports", element: <EmployeeReportPage /> },

                        ]
                    }
                ]
            },
        ]

    },

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
        ]
    },
    {
        path: "*",
        element: <NotFoundPage />
    }


];


export const routes = createBrowserRouter(routeConfig);