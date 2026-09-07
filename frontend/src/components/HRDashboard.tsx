import React from 'react'
import { SidebarInset, SidebarProvider } from './ui/sidebar'
import { AppSidebar } from './dashboard-items/app-sidebar'
import { SiteHeader } from './dashboard-items/site-header'
import { SectionCards } from './dashboard-items/section-cards'
import { ChartAreaInteractive } from './dashboard-items/chart-area-interactive'
import { DataTable } from './dashboard-items/data-table'
import data from '@/api/data.json'

function HRDashboard() {

    //todo: this is a templete with fake data you have to make such it should adopt the way you want in this project
  return (
      <SidebarProvider
          style={
              {
                  "--sidebar-width": "calc(var(--spacing) * 72)",
                  "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
          }
      >
          <AppSidebar variant="inset" />
          <SidebarInset>
              <SiteHeader />
              <div className="flex flex-1 flex-col">
                  <div className="@container/main flex flex-1 flex-col gap-2">
                      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                          <SectionCards />
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