import HrEmployeeSheet from '@/components/sheets/employee-sheet';
import { DataTable } from '@/components/table-items/data-table';
import { HrEmployeeColumns } from '@/components/table-items/employee-table-items/hr-employee-table-columns';
import type { HrEmployeeTableRow } from '@/components/table-items/employee-table-items/hr-employee-table-schema';
import { HrEmployeeTabs } from '@/components/table-items/employee-table-items/hr-employee-table-tabs';
import { useHRStore } from '@/store/useHRStore'
import React from 'react'


/*
A searchable and filterable table(by department and manager)

design patterns,
when user click on any row it should open a sheet  data about 
the user and it should have a button to go to a full page view. 
we can set the id in params to get prevent the hot reload, 

problem
!when user tries to come back to the employee page the filter may gone because we are storing it in the useState

solution
*keep all the filters in the params instead of state and so do with the user id when detailed page is opened
*/

function EmployeesPage() {
  const getEmployees = useHRStore(s => s.getEmployeeList);
  const employeeData = useHRStore(s => s.employees)
  React.useEffect(() => {
    getEmployees()
  }, [getEmployees])
  console.log(employeeData);
  
  return (
    <>
      {
        employeeData.length > 0 && <DataTable<HrEmployeeTableRow>
          data={employeeData}
          columns={HrEmployeeColumns}
          tableTabs={HrEmployeeTabs}
          renderRowSheet={(emp) => <HrEmployeeSheet emp={emp} />}
        />
      }
    </>
  )
}

export default EmployeesPage