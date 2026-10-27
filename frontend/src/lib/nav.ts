import type { SidebarItem } from "@/types/sidebar"

// Returns the sidebar item that best matches the current path.
export function findActiveItem(
    items: SidebarItem[],
    pathname: string
): SidebarItem | undefined {
    let best: SidebarItem | undefined

    for (const item of items) {
        const matches = pathname === item.url || pathname.startsWith(item.url + "/")

        if (matches && (!best || item.url.length > best.url.length)) {
            best = item
        }
    }

    return best
}