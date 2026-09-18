import { useSortable } from "@dnd-kit/sortable"
import { GripVerticalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import type { features } from "./table-features"
import { FlexRender, type Row, type RowData } from "@tanstack/react-table"
import type { tableSchema } from "./table-schema"
import type z from "zod"

import { CSS } from "@dnd-kit/utilities"

export function DragHandle({ id }: { id: number }) {
    const { attributes, listeners } = useSortable({
        id,
    })
    return (
        <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:bg-transparent"
        >
            <GripVerticalIcon className="size-3 text-muted-foreground" />
            <span className="sr-only">Drag to reorder</span>
        </Button>
    )
}

export function DraggableRow<TData extends RowData & { id: number }>({
    row,
}: {
    row: Row<typeof features, TData>
}) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.id,
    })
    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
            data-dragging={isDragging}
            ref={setNodeRef}
            className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
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