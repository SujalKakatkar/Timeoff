import * as React from "react"
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import {
  arrayMove,
} from "@dnd-kit/sortable"
import {
  useTable,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Columns3Icon, ChevronDownIcon, PlusIcon } from "lucide-react"
import { features } from "./table-features"
import type { TableTabs } from "@/types/table"
import DataTableGrid from "./data-table-grid"

export function DataTable<TData extends RowData & { id: number }>({
  data: initialData,
  columns,
  tableTabs
}: {
  data: TData[],
  columns: ColumnDef<typeof features, TData>[],
  tableTabs: TableTabs<TData>[]
}) {
  const [data, setData] = React.useState(() => initialData)
  const [activeTab, setActiveTab] = React.useState(tableTabs[0]?.value ?? "")
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )


  const currentTab = tableTabs.find((tab) => tab.value === activeTab)
  const filterData = currentTab ? data.filter(currentTab.filter) : data

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [filterData]
  )
  const table = useTable({
    features,
    data: filterData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
  })
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        {/* //*mobile device menu */}
        {tableTabs.length > 0 && (
          <Select
            value={activeTab}
            onValueChange={(value) => {
              if (value) setActiveTab(value)
            }}
            items={tableTabs.map(({ value, label }) => ({ value, label }))}
          >
            <SelectTrigger
              className="flex w-fit @4xl/main:hidden"
              size="sm"
              id="view-selector"
            >
              <SelectValue placeholder="Select a view" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  tableTabs.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {tableTabs.length > 0 && (
            <TabsList className="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
              {
                tableTabs.map(({ value, label }) => (
                  <TabsTrigger value={value} key={value}>{label}</TabsTrigger>

                ))
              }
            </TabsList>
          )}

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" size="sm" />}
            >
              <Columns3Icon data-icon="inline-start" />
              Columns
              <ChevronDownIcon data-icon="inline-end" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* //todo 2. this must be removed or change according to the utility of the table like in holiday and leave type table we need this */}
          <Button variant="outline" size="sm">
            <PlusIcon
            />
            <span className="hidden lg:inline">Add Section</span>
          </Button>
        </div>
      </div>
      {tableTabs.length > 0 ? (
          <TabsContent
            value={activeTab}
            className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
          >
            <DataTableGrid<TData>
              table={table}
              dataIds={dataIds}
              sensors={sensors}
              sortableId={sortableId}
              onDragEnd={handleDragEnd}
              columnsLength={columns.length} />
          </TabsContent>
        ) : (
          <div
            className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
          >
            <DataTableGrid<TData>
              table={table}
              dataIds={dataIds}
              sensors={sensors}
              sortableId={sortableId}
              onDragEnd={handleDragEnd}
              columnsLength={columns.length}
            />
          </div>
        )}
    </Tabs>
  )
}

