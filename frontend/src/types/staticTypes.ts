import type React from "react";


export interface StatsCardType {
    title: string,
    count:number,
    icon:React.ReactNode,
    footerHeadline:string,
    footerSubtext:string
}

export interface SidebarItem {
    title: string,
    url: string,
    icon: React.ReactNode
}


//table tabs
export type TableTabs<TData> = {
    value: string,
    label: string,
    filter: (row: TData) => boolean
    showCount?: number

}