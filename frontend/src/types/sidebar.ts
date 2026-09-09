

export interface SidebarItem {
    title : string,
    url:string,
    icon: React.ReactNode
}


export interface SidebarItems {
    navMain: SidebarItem[],
    // navSecondary:SidebarItem[]
    // documents:SidebarItem[]
}


export interface sidebarUserData {
    fullName: string,
    email: string,
}