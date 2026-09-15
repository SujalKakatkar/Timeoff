import React from 'react'
import { SidebarInset, SidebarProvider } from '../../ui/sidebar'
import { AppSidebar } from '../../dashboard-items/app-sidebar'
import { SiteHeader } from '../../dashboard-items/site-header'
import { SectionCards } from '../../dashboard-items/section-cards'
import { ChartAreaInteractive } from '../../dashboard-items/chart-area-interactive'
import { DataTable } from '../../dashboard-items/data-table-items/data-table'
import data from '@/api/data.json'
import { LayoutDashboardIcon,   FileChartColumnIcon,  Tag, ClipboardList, CalendarDays, Users, CalendarOff, Clock, TrendingUp } from "lucide-react"
import type {   SidebarItem, sidebarUserData } from '@/types/sidebar'
import type {  StatsCardType } from '@/types/staticTypes'

const userData:sidebarUserData = {
    fullName: "sujal",
    email: "sujal@example.com",
}

const HRSidebarItems: SidebarItem[] = [
    {
        title: "Dashboard",
        url: "#",
        icon: (
            <LayoutDashboardIcon
            />
        ),
    },
    {
        title: "Leave Requests",
        url: "#",
        icon: (
            <ClipboardList
            />
        ),
    },
    {
        title: "Leave Types",
        url: "#",
        icon: (
            <Tag
            />
        ),
    },
    {
        title: "Holidays",
        url: "#",
        icon: (
            <CalendarDays
            />
        ),
    },
    {
        title: "Reports",
        url: "#",
        icon: (
            <FileChartColumnIcon
            />
        ),
    },

]

const hrDashboardStats:StatsCardType[] = [
    {
        title: "Total Employees",
        count: 180,
        description: "12 managers · 168 individual contributors",
        icon: <Users/>,
        footerHeadline: "4 new joiners this month",
        footerSubtext: "12 managers · 168 ICs",
    },
    {
        title: "On Leave Today",
        count: 24,
        description: "13% of total workforce",
        icon: <CalendarOff/>,
        footerHeadline: "13% of workforce is out",
        footerSubtext: "Compared to 18 yesterday",

    },
    {
        title: "Pending Approvals",
        count: 7,
        description: "3 pending for more than 2 days",
        icon: <Clock/>,
        footerHeadline: "3 pending for 2+ days",
        footerSubtext: "Needs manager attention",
    },
    {
        title: "Avg. Leave Balance",
        count: 12.4,
        description: "Days remaining per employee",
        icon: <TrendingUp/>,
        footerHeadline: "Trending down this quarter",
        footerSubtext: "Per employee, org-wide",
    },
];

function HRDashboard() {

    //todo: this is a template with fake data you have to make such it should adopt the way you want in this project
  return (
      <SidebarProvider
          style={
              {
                  "--sidebar-width": "calc(var(--spacing) * 72)",
                  "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
          }
      >
          <AppSidebar userData={userData} sidebarItems={HRSidebarItems}  variant="inset" />
          <SidebarInset>
              <SiteHeader />
              <div className="flex flex-1 flex-col">
                  <div className="@container/main flex flex-1 flex-col gap-2">
                      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                          <SectionCards cardItems={hrDashboardStats} />
                          <div className="px-4 lg:px-6">
                              <ChartAreaInteractive />
                          </div>
                          <DataTable data={data} />
                      </div>
                  </div>
              </div>
          </SidebarInset>
      </SidebarProvider>
  )
}

export default HRDashboard