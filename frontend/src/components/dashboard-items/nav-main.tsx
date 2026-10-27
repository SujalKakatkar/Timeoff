import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { findActiveItem } from "@/lib/nav"
import type { SidebarItem } from "@/types/sidebar"
import { Link, useLocation } from "react-router"

export function NavMain({
  items,
}: {
  items: SidebarItem[]
}) {
  const { pathname } = useLocation()
  const { setOpenMobile } = useSidebar();
  const active = findActiveItem(items, pathname)
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={active?.url === item.url}
                render={<Link to={item.url} onClick={() => setOpenMobile(false)} />}
                className="data-active:bg-sidebar-primary data-active:text-sidebar-primary-foreground data-active:hover:bg-sidebar-primary/90"
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
