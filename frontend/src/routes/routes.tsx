import {
    AuthLayout,
    NotFoundPage,
    HeroLayout,
    HeroPage,
    HROverviewPage,
    EmployeesDetailPage,
    EmployeesPage,
    HolidaysPage,
    LeaveRequestsDetailPage,
    LeaveRequestsPage,
    LeaveTypesPage,
    ManagersPage,
    ReportsPage,
    ManagerEmployeesDetailPage,
    ManagerHolidayPage,
    ManagerLeaveRequestDetailsPage,
    ManagerLeaveRequestPage,
    ManagerLeaveTypePage,
    ManagerReportsPage,
    ManagerOverviewPage,
    EmployeeHistoryPage,
    EmployeeHolidayPage,
    EmployeeLeaveBalancePage,
    EmployeeLeaveRequestPage,
    EmployeeLeaveRequestDetailsPage,
    EmployeeOverviewPage,
    EmployeeReportPage,
    SignupPage,
    LoginPage,
    ProtectedLayout,
    DashboardLayout,
    ProfileCompletePage
} from './index'
import { createBrowserRouter, type RouteObject } from 'react-router'
import { EmployeeSidebarItems, HRSidebarItems, managerSidebarItems } from '@/constants/sidebar-items';
import AccountInfo from '@/pages/account-info';


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
        element: <ProtectedLayout role='HR' />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/hr",
                element: <DashboardLayout sidebarItems={HRSidebarItems} />,
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
                    { path: "profile", element: <AccountInfo /> }
                ]
            }
        ]
    },
    {
        element: <ProtectedLayout role='MANAGER' />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/manager",
                element: <DashboardLayout sidebarItems={managerSidebarItems} />,
                children: [
                    { index: true, element: <ManagerOverviewPage /> },
                    { path: "leave-requests", element: <ManagerLeaveRequestPage /> },
                    { path: "leave-requests/:id", element: <ManagerLeaveRequestDetailsPage /> },
                    { path: "leave-types", element: <ManagerLeaveTypePage /> },
                    { path: "holidays", element: <ManagerHolidayPage /> },
                    { path: "reports", element: <ManagerReportsPage /> },
                    { path: "employees/:id", element: <ManagerEmployeesDetailPage /> },
                    { path: "profile", element: <AccountInfo /> }
                ]
            }
        ]
    },
    {
        element: <ProtectedLayout role='EMPLOYEE' />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/employee",
                element: <DashboardLayout sidebarItems={EmployeeSidebarItems} />,
                children: [
                    { index: true, element: <EmployeeOverviewPage /> },
                    { path: "create-leave", element: <EmployeeLeaveRequestPage /> },
                    { path: "leave-history", element: <EmployeeHistoryPage /> },
                    { path: "leave-requests/:id", element: <EmployeeLeaveRequestDetailsPage /> },
                    { path: "leave-balance", element: <EmployeeLeaveBalancePage /> },
                    { path: "holidays", element: <EmployeeHolidayPage /> },
                    { path: "reports", element: <EmployeeReportPage /> },
                    { path: "profile", element: <AccountInfo /> }

                ]
            }
        ]
    },
    {
        element: <ProtectedLayout />,
        errorElement: <NotFoundPage />,
        children: [
            { path: "/complete-profile", element: <ProfileCompletePage /> }
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
            }
        ]
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
];


export const routes = createBrowserRouter(routeConfig);