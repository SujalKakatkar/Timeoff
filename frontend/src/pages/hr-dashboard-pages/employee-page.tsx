import { DataTable } from '@/components/table-items/data-table';
import { HrEmployeeColumns } from '@/components/table-items/employee-table-items/hr-employee-table-columns';
import type { HrEmployeeTableRow } from '@/components/table-items/employee-table-items/hr-employee-table-schema';
import { HrEmployeeTabs } from '@/components/table-items/employee-table-items/hr-employee-table-tabs';
import { useHRStore } from '@/store/useHRStore'
import React from 'react'


/*
A searchable and filterable table(by department and manager)
*/

function EmployeesPage() {
  const getEmployees = useHRStore(s => s.getEmployeeList);
  const employeeData = useHRStore(s => s.employees)
  React.useEffect(() => {
    getEmployees()
  }, [getEmployees])
  return (
    <>
      {
        employeeData.length > 0 && <DataTable<HrEmployeeTableRow>
          data={employeeData}
          columns={HrEmployeeColumns}
          tableTabs={HrEmployeeTabs}
        />
      }
    </>
  )
}

export default EmployeesPage