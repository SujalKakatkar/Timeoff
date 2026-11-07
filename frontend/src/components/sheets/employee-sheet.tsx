import { Badge } from '../ui/badge'
import { SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet'
import type { HrEmployeeTableRow } from '../table-items/employee-table-items/hr-employee-table-schema'

export default function HrEmployeeSheet({ emp }: { emp: HrEmployeeTableRow }) {
    return (
        <>
            <SheetHeader>
                <SheetTitle>{emp?.name}</SheetTitle>
                <SheetDescription>Employee ID: {emp.userId}</SheetDescription>
            </SheetHeader>

            <div className="space-y-4 p-4">
                <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="font-medium">{emp.dept}</p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline">
                        {emp.active ? "Active" : "Not Active"}
                    </Badge>
                </div>
            </div>
        </>
    )
}
