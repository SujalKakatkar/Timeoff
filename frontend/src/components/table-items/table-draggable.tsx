import { useSortable } from "@dnd-kit/sortable"
import { GripVerticalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import type { features } from "./table-features"
import { FlexRender, type Row, type RowData } from "@tanstack/react-table"


import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"

export function DragHandle({ id }: { id: number | string }) {
    const { attributes, listeners } = useSortable({
        id,
    })
    return (
        <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            size="icon"
            onClick={(e) => e.stopPropagation()}
            className="size-7 text-muted-foreground hover:bg-transparent"
        >
            <GripVerticalIcon className="size-3 text-muted-foreground" />
            <span className="sr-only">Drag to reorder</span>
        </Button>
    )
}

export function DraggableRow<TData extends RowData & { userId: number | string }>({
    row,
    onRowClick,
}: {
    row: Row<typeof features, TData>,
    onRowClick?: (row: TData) => void

}) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.userId,
    })
    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
            data-dragging={isDragging}
            ref={setNodeRef}
            className={cn(                                // ✅ CHANGED: was a plain string, now wrapped in cn()
                "relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80",
                onRowClick && "cursor-pointer"            // ✅ NEW: pointer cursor only when row is clickable
            )}
            onClick={onRowClick ? () => onRowClick(row.original) : undefined}
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transition,
            }}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    <FlexRender cell={cell} />
                </TableCell>
            ))}
        </TableRow>
    )
}