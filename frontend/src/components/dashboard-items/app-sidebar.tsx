import * as React from "react"

import { NavMain } from "@/components/dashboard-items/nav-main"
import { NavUser } from "@/components/dashboard-items/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {  CommandIcon } from "lucide-react"
import type {  sidebarUserData, SidebarItems } from "@/types/sidebar"


type AppSidebarTypes = React.ComponentProps<typeof Sidebar> & {
  sidebarItems: SidebarItems,
  userData:sidebarUserData
};

export function AppSidebar({ sidebarItems,userData, ...props }: AppSidebarTypes) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="#" />}
            >
              <CommandIcon className="size-5!" />
              <span className="text-base font-semibold">TimeOff</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
