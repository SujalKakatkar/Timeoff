import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/UseAuthStore"
import { LogOutIcon } from "lucide-react"

export function NavUser() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  const initial = user?.name?.[0]?.toUpperCase() ?? "?"

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-1 hover:bg-accent rounded-lg">
        <SidebarMenuButton
          size="lg"
          render={<div />}
          className="min-w-0 flex-1 cursor-default hover:bg-transparent active:bg-transparent"
        >
          <Avatar className="size-8 rounded-lg grayscale">
            <AvatarFallback className="rounded-lg">{initial}</AvatarFallback>
          </Avatar>
          <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user?.name}</span>
            <span className="truncate text-xs capitalize text-foreground/70">
              {user?.role}
            </span>
          </div>
        </SidebarMenuButton>

        <Button
          variant="ghost"
          size="icon"
          onClick={logout}
          aria-label="Log out"
          title="Log out"
          className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
        >
          <LogOutIcon className="size-4" />
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}