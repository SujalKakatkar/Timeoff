
export type TableTabs<TData> = {
    value: string,
    label: string,
    filter: (row: TData) => boolean
    showCount?: number

}