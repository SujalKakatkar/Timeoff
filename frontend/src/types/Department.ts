

export interface DepartmentRequest{
    name:string
}

export interface DepartmentResponse extends DepartmentRequest{
    deptId:number
}